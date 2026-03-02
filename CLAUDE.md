# CLAUDE.md — Open Innovation Fund Builder

## Project Overview

This is a **pure frontend, zero-build-step** web application that guides users through designing an open innovation grant fund. It is a standalone tool that runs directly in the browser from the file system — no server, no npm, no compilation.

The app is split into two sequential parts:
- **Part 1** (`index.html`): A guided canvas to capture the fund's strategic foundation (Why / Who / Feel)
- **Part 2** (`method-cards.html`): An interactive method card explorer where users select and bank tactical methods across 8 fund-building stages

---

## File Structure

```
fundbuilder/
├── index.html            # Part 1 — Fund Thesis Canvas (8 screens, self-contained JS)
├── method-cards.html     # Part 2 — Method Cards tool (inline JS overrides app.js)
├── app.js                # Shared JS — method card data + all shared functions
├── styles.css            # All styles (~1,570 lines, one file for the whole app)
├── BRINK_PATTERN_PLANE-01.png  # Background pattern image used in splash screens
└── README.md             # Basic project description
```

**There is no build system.** Files are edited directly. Changes are immediately visible by refreshing the browser.

---

## Technology Stack

| Concern       | Technology                                      |
|---------------|------------------------------------------------|
| Markup        | Vanilla HTML5                                  |
| Styling       | Vanilla CSS3 (Flexbox + Grid)                  |
| Logic         | Vanilla JavaScript (ES6+, no frameworks)       |
| Fonts         | Google Fonts — Lora, Libre Franklin, Inconsolata |
| PDF export    | jsPDF v2.5.1 (CDN)                             |
| Canvas render | html2canvas v1.4.1 (CDN)                       |

CDN scripts are loaded in each HTML `<head>`:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
```

---

## Application Architecture

### Part 1 — Fund Thesis Canvas (`index.html`)

An 8-screen single-page experience driven by a `screens` array and the `goToScreen(index)` function. All logic lives in an inline `<script>` tag at the bottom of the file.

**Screen map:**
| Index | ID                  | Purpose                              |
|-------|---------------------|--------------------------------------|
| 0     | `screen-intro`      | Splash / entry point                 |
| 1     | `screen-howto`      | Framework explanation (Why/Who/Feel) |
| 2     | `screen-why`        | 4 textarea inputs for "Why"          |
| 3     | `screen-who`        | 6 textarea inputs for "Who"          |
| 4     | `screen-feel`       | 4 textarea inputs for "Feel"         |
| 5     | `screen-canvas`     | Generated canvas summary + export    |
| 6     | `screen-reflection` | Reflection prompts before Part 2     |
| 7     | `screen-part2`      | Transition splash to Part 2          |

**Navigation:** The toolbar Back button calls `toolbarBack()`. Each screen has inline `onclick="goToScreen(n)"` buttons. Progress bar updates automatically based on screen index.

**Canvas generation:** `buildCanvas()` → `populateCanvas()` → `populateQuadrant()` reads textarea values and injects them as `.quadrant-item` divs into the three-column canvas grid.

**Export:** `exportCanvasPDF()` builds a temporary DOM element, renders it with html2canvas, then saves with jsPDF. `exportCanvas()` downloads a plain `.txt` file using a Blob + anchor trick.

**Reset:** `resetCanvas()` clears all `.question-input` textareas and returns to screen 0.

**Transition to Part 2:** `proceedToCards()` does `window.location.href = 'method-cards.html'`.

---

### Part 2 — Method Cards (`method-cards.html` + `app.js`)

The tool has two top-level screens (`p2-screen-howto`, `p2-screen-main`) and three sub-screens within `p2-screen-main`:

| Sub-screen ID      | Name      | Purpose                                          |
|--------------------|-----------|--------------------------------------------------|
| `p2-sub-stages`    | `stages`  | Stage selector grid + inline card expansion      |
| `p2-sub-review`    | `review`  | Journey map of banked cards + export             |
| `p2-sub-next`      | `next`    | "What Comes Next" placeholder screen             |

Navigation is controlled by `goToP2Screen(n)` and `showP2SubScreen(name)`.

**Stage selector:** An 8-circle grid (4×2). Each circle has `onclick="selectStage('X')"` and a `data-stage` attribute. When clicked, the grid collapses to a compact nav row and the card section expands inline via CSS accordion (`.cards-section.visible`).

**Important override:** `method-cards.html` redefines `selectStage()` in its inline script. This local version handles the CSS accordion behaviour and stage theming — it supersedes the version in `app.js`. `goBackToStages()` is also locally overridden to collapse the card section without hiding the entire stage area.

**Card flip:** CSS 3D transform (`rotateY(180deg)`) on `.method-card.flipped`. Only one card can be flipped at a time; `currentFlippedCard` tracks the index.

**Banking:** `bankCard(index)` pushes to `bankedCards[currentStage]` and calls `updateJourneyMap()`. Already-banked cards get the `.banked` class and their Bank button is disabled.

---

### Shared Logic (`app.js`)

Loaded only by `method-cards.html`. Contains:

1. **Global state:**
   ```js
   let currentStage = '';          // currently selected stage key (A–H)
   let currentFlippedCard = null;  // index of the currently flipped card
   let bankedCards = { A:[], B:[], C:[], D:[], E:[], F:[], G:[], H:[] };
   ```

2. **`methodCards` data object** — 8 stages (A–H), each with a `title`, `description`, and `cards` array of `{ title, advice }` objects.

3. **Core functions:**
   - `selectStage(stage)` — base version (overridden in method-cards.html)
   - `displayCards(cards)` — renders card HTML into `#cards-grid`
   - `flipCard(index)` — toggles `.flipped` on a card
   - `flipAllCards()` — toggles `.flipped` on all visible cards
   - `bankCard(index)` — saves card to `bankedCards`, calls `updateJourneyMap()`
   - `updateJourneyMap()` — re-renders all journey map stacks
   - `viewBankedCard(stage, index)` — opens the site modal with card content
   - `getRandomCard()` — picks a random stage + card
   - `goBackToStages()` — base version (overridden in method-cards.html)
   - `exportAdvice()` — text file export of banked cards
   - `exportAdvicePDF()` — PDF export of banked cards (uses html2canvas + jsPDF)
   - `exportText()` — alias for `exportAdvice()`
   - `showSiteModal(title, body)` / `closeSiteModal()` — custom modal replacing `alert()`

---

## Method Card Data Reference

8 stages, identified by letters A–H. Stage order in the UI grid does **not** match alphabetical order — the grid layout is:

```
Row 1: A  D  C  G
Row 2: B  E  F  H
```

Color themes are assigned by column position (`stage-col-1` through `stage-col-4`):
- Col 1 (A, B): theme-1 (teal/dark)
- Col 2 (D, E): theme-2
- Col 3 (C, F): theme-3
- Col 4 (G, H): theme-4

Card counts: A=5, B=5, C=5, D=5, E=5, F=4, G=4, H=4

---

## Design System & CSS Conventions (`styles.css`)

### Colors
| Token        | Value      | Usage                             |
|--------------|------------|-----------------------------------|
| Dark teal    | `#06333d`  | Primary text, backgrounds, headings |
| Off-white    | `#f0f1ef`  | Page background                   |
| Coral        | `#ff405f`  | CTAs, accents, active states      |
| Blue         | `#4472ec`  | Secondary accent                  |
| Pink         | `#e99cd1`  | Tertiary accent                   |
| Mid-gray     | `#789096`  | Muted text                        |

### Typography
- **Display/headings:** Lora (serif), weight 400–600
- **Body/UI:** Libre Franklin (sans-serif), weight 300–700
- **Buttons/mono:** Inconsolata (monospace), weight 400–700

### Naming conventions
- **CSS classes:** kebab-case (`.stage-selector`, `.card-inner`, `.cards-grid`)
- **CSS IDs:** kebab-case with section prefix (`#screen-why`, `#stack-A`, `#journey-D`)
- **JS variables:** camelCase (`bankedCards`, `currentStage`, `currentFlippedCard`)
- **JS functions:** camelCase (`selectStage`, `bankCard`, `exportAdvicePDF`)

### Responsive breakpoints
- `768px` — tablet adjustments
- `480px` — mobile adjustments
- `1100px` — wide-screen max-width cap

### Key CSS patterns
- Card flip: `.method-card.flipped .card-inner { transform: rotateY(180deg); }` — pure CSS 3D
- Card section accordion: `.cards-section` uses `max-height: 0` → `max-height: 2000px` on `.visible`
- Stage grid compact mode: `.stage-grid.compact` reduces stage circles to a slim nav row
- Column theme colours applied via `.stage-theme-1` through `.stage-theme-4` on `.cards-section`
- Journey map columns use `.col-theme-1` through `.col-theme-4`

---

## Development Workflow

### Running locally
Open either HTML file directly in a browser — no server required:
```
open index.html
open method-cards.html
```

### Making changes
- **UI changes:** Edit `styles.css` and refresh
- **Logic changes:** Edit `app.js` (shared) or the inline `<script>` blocks in each HTML file
- **Content changes (card text):** Edit the `methodCards` object in `app.js`
- **Screen content changes:** Edit the corresponding `<div id="screen-*">` in `index.html`

### No build step, no linting, no tests
There is no automated test suite, linter, or formatter configured. Manual browser testing is the verification method. Keep changes simple and verify by refreshing the browser.

### Git workflow
- Commits should be small and focused
- Branch naming follows the convention: `claude/<description>-<id>`

---

## Key Conventions to Follow

1. **No frameworks.** Do not introduce React, Vue, or any JS framework. Keep vanilla JS.
2. **No build tools.** Do not add webpack, vite, npm scripts, or package.json. The project must remain open-file-in-browser ready.
3. **No new files without good reason.** The project is intentionally minimal. Prefer editing existing files.
4. **Inline styles in export functions are intentional.** The PDF export functions build temporary DOM elements with explicit inline styles because html2canvas does not read external CSS reliably. Do not refactor these to use CSS classes.
5. **The `selectStage` override in method-cards.html is intentional.** The inline script purposefully replaces the base function from `app.js` to add accordion/theme behaviour. Do not remove either version.
6. **All data is in-memory only.** There is no localStorage, no backend, no persistence between page loads. This is by design.
7. **Use `showSiteModal()` instead of `alert()`.** Native alerts are replaced by the custom `#site-modal` system.
8. **Export functions must clean up temporary DOM.** Any `div` appended to `document.body` for PDF rendering must be removed in both the `.then()` and `.catch()` handlers.
9. **Card count affects grid layout.** `displayCards()` sets `cardsGrid.className = 'cards-grid cards-${cards.length}'` — CSS uses `.cards-4` and `.cards-5` variants for different gap/sizing. Preserve this when changing card counts.
10. **The journey map column order must match the stage selector grid order.** Both use the same A/D/C/G, B/E/F/H column arrangement.

---

## Known Incomplete Areas

- The "What Comes Next" sub-screen (`p2-sub-next`) contains placeholder Lorem Ipsum text — not yet written.
- No localStorage persistence — users lose all selections on page reload.
- No ARIA roles or labels — accessibility is minimal.
- `README.md` references an outdated file structure (`css/`, `js/`, `assets/` subdirectories) that does not match the current flat layout.
- README lists stages A–G but the app has 8 stages (A–H).
- `exportText()` in `app.js` is just an alias for `exportAdvice()` — it exists for backwards compatibility with older button onclick references.
