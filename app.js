let currentStage = '';
let currentFlippedCard = null;
let bankedCards = {
    A: [], B: [], C: [], D: [], E: [], F: [], G: [], H: []
};

// Data from the spreadsheet
const methodCards = {
    A: {
        title: "Design & Thesis Development",
        description: "Methods for defining your fund's core purpose and approach",
        cards: [
            {
                title: "Marketplace of Ideas",
                advice: "Create open spaces (e.g., calls for ideas, pitch sessions, or online platforms) where people can share and refine concepts, fostering cross-sector collaboration and uncovering unexpected solutions."
            },
            {
                title: "Proposition Testing",
                advice: "Create a quick sketch of the fund and talk to people about it."
            },
            {
                title: "Landscape Analysis",
                advice: "Consider gaps and underfunded spaces to see where outsized impact can be made."
            },
            {
                title: "Participatory Co-Design",
                advice: "Engage potential applicants early in the fund design process to shape priorities, criteria, and support structures. Frontier Tech Futures used a design print methodology to engage with the 'would be' applicants of the funding and design out the details of the offer."
            },
            {
                title: "Government-Led Approach",
                advice: "Align the fund's objectives with national priorities and policies, leveraging government leadership to build legitimacy, ensure sustainability, and attract co-investment from public and private partners."
            }
        ]
    },
    B: {
        title: "Strategy & Target Portfolio",
        description: "Methods for shaping your funding strategy and portfolio approach",
        cards: [
            {
                title: "Explore Unknown Areas",
                advice: "Frontier Technology Livestreaming explored the application of frontier tech for development. When venturing into unknown territory, start with small investments and build evidence systematically."
            },
            {
                title: "Catalyse Change",
                advice: "A fund can unlock transformative shifts by supporting unconventional solutions or emerging innovators. EdTech Hub Sandboxes catalysed new ways of scaling digital learning in LMICs by connecting local solutions with policy priorities. This typically does not need a big ticket investment."
            },
            {
                title: "Shape a Market",
                advice: "In systems change a grant programme can be a key component to incentivize participation from specific groups. The Oxygen CoLab's technology grant component was designed to incentivize industry to work towards the target product profile Brink designed with UNICEF."
            },
            {
                title: "Stimulate Ideas",
                advice: "Idea generation can be sparked through challenge funds. COVIDaction set out small funds to support companies to pivot their normal businesses to the pandemic response."
            },
            {
                title: "Scale Solutions",
                advice: "Scale solutions requires funds that support later-stage validation and market adoption. This objective requires a bigger investment [ticket size]."
            }
        ]
    },
    C: {
        title: "Awareness & Engagement",
        description: "Methods for building visibility and attracting the right applicants",
        cards: [
            {
                title: "Scout Networks",
                advice: "Get out there and find great ideas by talking to people in the know—whether that's at industry events, local meetups, or through word of mouth. Look beyond the usual suspects to uncover hidden gems."
            },
            {
                title: "Strategic Advertising",
                advice: "Spread the word through social media, newsletters, and local networks. Keep the message clear and simple so people know what's on offer and how they can get involved."
            },
            {
                title: "In-Person Roadshows",
                advice: "Show up where people are. Host sessions in key places to share what the fund's about, answer questions, and build real connections with potential applicants."
            },
            {
                title: "Educational Webinars",
                advice: "Hold online sessions that make it easy for anyone, anywhere to join the conversation. Use these sessions to explain the fund, share tips on applying, and answer questions openly."
            },
            {
                title: "Targeted Outreach",
                advice: "Reach out directly to people or groups who are doing interesting work but might not think this fund is for them. A personal invitation can go a long way."
            }
        ]
    },
    D: {
        title: "Financial Support",
        description: "Types of financial support available to offer as part of the Fund",
        cards: [
            {
                title: "Grants",
                advice: "Provide non-repayable, non-dilutive funding. Decide unrestricted vs restricted use, whether to require co-funding, and if disbursement is tied to milestones or outcomes"
            },
            {
                title: "Repayable Capital",
                advice: "Offer capital that's repaid only under agreed conditions or as a share of revenue, without taking equity. Choose the instrument (recoverable grant, forgivable loan, revenue-share), set triggers/caps/tenor, and define verification and reporting."
            },
            {
                title: "Equity",
                advice: "Invest in return for ownership or rights to future equity. Choose the form (priced equity, SAFE, convertible note), set ticket size, cap/discount, governance (board/observer), follow-on rights, and impact covenants."
            },
            {
                title: "Debt",
                advice: "Lend money with conditions associated. Select the facility (term loan, revolving credit, PO finance, asset finance), set interest/fees, grace period, collateral (if any), and currency/FX policy."
            },
            {
                title: "Market-Shaping",
                advice: "Underwrite demand so innovators can sell. You either commit to buy, pay for verified outcomes, or subsidize end-users. Specify performance standards, verification, payment schedules, and IP/data rights, with sunset and competition safeguards."
            }
        ]
    },
    E: {
        title: "Non-Financial Support",
        description: "Methods for designing comprehensive grantee support systems",
        cards: [
            {
                title: "Coaching",
                advice: "Support grantee teams with a coach, someone who offers critical friendship, connections and hustles on their behalf. At Brink our coaches are also experts in innovation methodologies like lean impact."
            },
            {
                title: "Technical Expertise",
                advice: "Connect grantees with niche experts to support their aims, broker and matchmake these connections as part of the value addition. On uBoraBora our education grantees benefit from world leading foundational learning experts as well as researchers."
            },
            {
                title: "Promotion",
                advice: "Being part of a grant programme is great for visibility. Work to promote what they're up to and be their biggest fans. On uBoraBora Brink supports teams to attend global conferences. On EdTech Hub we record podcasts, celebrate progress in webinars and on Frontier Tech we have secured features for grantees in notable publications like The Guardian."
            },
            {
                title: "P2P",
                advice: "Often the most valuable experts a grantee can learn from are the other grantees in the cohort. Make space for grantees to connect and learn from one another. On uBoraBora we have structures for turning the cohort into a learning network with regular deep dive sessions into what matters to our grantees e.g. how they are working to adapt teach support structures."
            },
            {
                title: "Learning Journey and Structured Curricula",
                advice: "Design a clear learning pathway that supports grantees throughout the funding period. On 100x the funding came with structured learning curricula."
            }
        ]
    },
    F: {
        title: "Engagement & Application",
        description: "Methods for creating inclusive and accessible application processes",
        cards: [
            {
                title: "Simple Application Forms",
                advice: "Keep the application form simple and straight-talking. Ask only what's essential and let people tell their stories in their own words. Make sure it's easy to complete on any device."
            },
            {
                title: "Video Applications",
                advice: "If you are trying to attract grantees who might not feel confident in the written form, give them the option to pitch their ideas through short videos. This lowers the barrier and brings ideas to life in a more personal way."
            },
            {
                title: "Inclusive Design",
                advice: "Design the process so everyone has a fair shot. Offer applications in multiple languages, provide clear guidance, and remove unnecessary complexity. Think about who might be left out and make changes to bring them in."
            },
            {
                title: "Office Hours & Chats",
                advice: "Set up informal chats where people can ask questions and get advice before applying. These sessions can demystify the process and give potential applicants the confidence to go for it."
            }
        ]
    },
    G: {
        title: "Selection & Rejection",
        description: "Methods for building fair and effective selection processes",
        cards: [
            {
                title: "Investment Committee",
                advice: "Assemble a group of people to work together, debate and decide on the final portfolio selection. The more diverse this group is the better."
            },
            {
                title: "Thesis-Connected Scoring",
                advice: "Create a scoring guide that matches what you're trying to achieve. Make it transparent so applicants know what matters most. Use it as a tool for focused discussions, not a box-ticking exercise."
            },
            {
                title: "Portfolio Selection",
                advice: "It might be tempting to score applications and 'select' the highest scorers, but that wouldn't create a portfolio. Your portfolio ought to connect to your thesis and objectives and that will mean selecting a rounded group of investments to make."
            },
            {
                title: "Meaningful Rejection",
                advice: "Rejection doesn't have to be the end. Design a process that's valuable even if it ends at selection. Offer thoughtful feedback and, where possible, connect applicants with others who might be able to help—whether that's other funders, networks, or collaborators."
            }
        ]
    },
    H: {
        title: "Portfolio Management",
        description: "Methods for managing and optimizing your grant portfolio",
        cards: [
            {
                title: "Progress Against Thesis",
                advice: "Keep checking how the portfolio is stacking up against the original goals. Are the ideas moving the needle in the right places? Regular reflections help spot what's working, what's not, and where to pivot or push harder."
            },
            {
                title: "Ongoing Coaching",
                advice: "Offer hands-on support tailored to each grantee's needs. This could mean one-on-one sessions, problem-solving calls, or connecting them with people who've been there before. The goal is to help them stay sharp and keep moving forward."
            },
            {
                title: "Community Building",
                advice: "Build a sense of community by keeping the conversation going. Use newsletters to share progress, lessons, and opportunities, and WhatsApp groups for real-time tips, wins, and quick questions. People learn best when they're learning together."
            },
            {
                title: "Exit & Double Down",
                advice: "For riskier or more exploratory theses, it's expected that some things won't work out. That's why it's important to have clear criteria and a regular rhythm for deciding when to exit investments that aren't delivering and double down on the ones showing promise."
            }
        ]
    }
};

function selectStage(stage) {
    currentStage = stage;
    document.getElementById('stage-selector').style.display = 'none';
    document.getElementById('cards-section').style.display = 'block';
    
    const stageData = methodCards[stage];
    document.getElementById('cards-title').textContent = stageData.title;
    document.getElementById('cards-description').textContent = stageData.description;
    
    displayCards(stageData.cards);
}

function displayCards(cards) {
    const cardsGrid = document.getElementById('cards-grid');
    cardsGrid.innerHTML = '';
    
    // Add dynamic class based on card count
    cardsGrid.className = `cards-grid cards-${cards.length}`;
    
    cards.forEach((card, index) => {
        const methodCard = document.createElement('div');
        methodCard.className = 'method-card';
        methodCard.onclick = () => flipCard(index);
        
        // Check if this card is already banked
        const isAlreadyBanked = bankedCards[currentStage].some(bankedCard => 
            bankedCard.title === card.title
        );
        
        if (isAlreadyBanked) {
            methodCard.classList.add('banked');
        }
        
        methodCard.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <div class="card-category">${methodCards[currentStage].title}</div>
                    <div class="card-title">${card.title}</div>
                    <div class="card-front-actions">
                        <button class="card-btn" onclick="event.stopPropagation(); flipCard(${index})">Flip</button>
                    </div>
                </div>
                <div class="card-back">
                    <div class="card-back-title">${card.title}</div>
                    <div class="card-advice">${card.advice}</div>
                    <div class="card-actions">
                        <button class="card-btn primary" onclick="event.stopPropagation(); bankCard(${index})" ${isAlreadyBanked ? 'disabled' : ''}>
                            ${isAlreadyBanked ? 'Banked' : 'Bank'}
                        </button>
                        <button class="card-btn" onclick="event.stopPropagation(); flipCard(${index})">Flip</button>
                    </div>
                </div>
            </div>
        `;
        
        cardsGrid.appendChild(methodCard);
    });
}

function flipCard(index) {
    const cards = document.querySelectorAll('.method-card');
    const targetCard = cards[index];
    
    // If there's a currently flipped card and it's not the one we're clicking
    if (currentFlippedCard !== null && currentFlippedCard !== index) {
        cards[currentFlippedCard].classList.remove('flipped');
    }
    
    // Toggle the target card
    targetCard.classList.toggle('flipped');
    
    // Update currentFlippedCard
    if (targetCard.classList.contains('flipped')) {
        currentFlippedCard = index;
    } else {
        currentFlippedCard = null;
    }
}

function flipAllCards() {
    const cards = document.querySelectorAll('.method-card');
    cards.forEach((card, index) => {
        card.classList.toggle('flipped');
    });
    currentFlippedCard = null;
}

function bankCard(index) {
    const stageData = methodCards[currentStage];
    const card = stageData.cards[index];
    
    bankedCards[currentStage].push({
        stage: currentStage,
        title: card.title,
        advice: card.advice
    });
    
    updateJourneyMap();
}

function updateJourneyMap() {
    Object.keys(bankedCards).forEach(stage => {
        const journeyStage = document.getElementById(`journey-${stage}`);
        const cardStack = document.getElementById(`stack-${stage}`);
        
        if (bankedCards[stage].length > 0) {
            journeyStage.classList.add('has-cards');
            cardStack.classList.add('has-cards');
            cardStack.innerHTML = bankedCards[stage].map((card, index) => `
                <div class="banked-card" onclick="viewBankedCard('${stage}', ${index})">
                    ${card.title}
                </div>
            `).join('');
            
            // Adjust card stack height based on number of cards - account for variable height cards
            cardStack.style.minHeight = `${Math.max(180, 60 + (bankedCards[stage].length * 60))}px`;
        } else {
            journeyStage.classList.remove('has-cards');
            cardStack.classList.remove('has-cards');
            cardStack.innerHTML = '';
            cardStack.style.minHeight = '220px';
        }
    });
    
    // Refresh current stage display to show banked cards as greyed out
    if (currentStage && methodCards[currentStage]) {
        displayCards(methodCards[currentStage].cards);
    }
}

function viewBankedCard(stage, index) {
    const card = bankedCards[stage][index];
    alert(`${card.title}\n\n${card.advice}`);
}

function getRandomCard() {
    const stages = Object.keys(methodCards);
    const randomStage = stages[Math.floor(Math.random() * stages.length)];
    const cards = methodCards[randomStage].cards;
    const randomIndex = Math.floor(Math.random() * cards.length);
    
    if (currentStage !== randomStage) {
        selectStage(randomStage);
    }
    
    setTimeout(() => {
        flipCard(randomIndex);
    }, 100);
}

function goBackToStages() {
    document.getElementById('cards-section').style.display = 'none';
    document.getElementById('stage-selector').style.display = 'block';
    currentStage = '';
    currentFlippedCard = null;
}

function exportAdvicePDF() {
    if (Object.values(bankedCards).every(stageCards => stageCards.length === 0)) {
        alert("No cards banked yet. Please select and bank some method cards first.");
        return;
    }

    const { jsPDF } = window.jspdf;
    
    // Create a temporary element for better PDF formatting
    const exportElement = document.createElement('div');
    exportElement.style.cssText = `
        background: #f0f1ef;
        padding: 40px;
        width: 800px;
        margin: 0 auto;
        font-family: 'Libre Franklin', sans-serif;
    `;

    // Add title
    const title = document.createElement('h1');
    title.textContent = 'Open Innovation Fund Builder - Your Method Cards';
    title.style.cssText = `
        text-align: center;
        margin-bottom: 30px;
        color: #06333d;
        font-size: 1.8rem;
        font-weight: 400;
        line-height: 1.2;
        font-family: 'Lora', Georgia, serif;
    `;
    exportElement.appendChild(title);
    
    // Add stages with banked cards
    Object.keys(bankedCards).forEach(stage => {
        if (bankedCards[stage].length > 0) {
            const stageSection = document.createElement('div');
            stageSection.style.cssText = `
                margin-bottom: 30px;
                page-break-inside: avoid;
            `;
            
            const stageTitle = document.createElement('h2');
            const stageTitleText = methodCards[stage]?.title || `Stage ${stage}`;
            stageTitle.textContent = stageTitleText;
            stageTitle.style.cssText = `
                color: #06333d;
                font-size: 1.3rem;
                font-weight: 600;
                margin-bottom: 16px;
                border-bottom: 2px solid #ff405f;
                padding-bottom: 8px;
                font-family: 'Libre Franklin', sans-serif;
            `;
            stageSection.appendChild(stageTitle);
            
            bankedCards[stage].forEach(card => {
                const cardDiv = document.createElement('div');
                cardDiv.style.cssText = `
                    background: #ffffff;
                    border: 1px solid rgba(6,51,61,0.12);
                    border-left: 3px solid #ff405f;
                    border-radius: 6px;
                    padding: 16px;
                    margin-bottom: 12px;
                    page-break-inside: avoid;
                `;
                
                const cardTitle = document.createElement('h3');
                cardTitle.textContent = card.title;
                cardTitle.style.cssText = `
                    color: #06333d;
                    font-size: 1rem;
                    font-weight: 600;
                    margin-bottom: 8px;
                    font-family: 'Libre Franklin', sans-serif;
                `;
                cardDiv.appendChild(cardTitle);
                
                const cardAdvice = document.createElement('p');
                cardAdvice.textContent = card.advice;
                cardAdvice.style.cssText = `
                    color: rgba(6,51,61,0.8);
                    font-size: 0.9rem;
                    line-height: 1.6;
                    margin: 0;
                    font-family: 'Libre Franklin', sans-serif;
                `;
                cardDiv.appendChild(cardAdvice);
                
                stageSection.appendChild(cardDiv);
            });
            
            exportElement.appendChild(stageSection);
        }
    });
    
    // Temporarily add to DOM for rendering
    document.body.appendChild(exportElement);
    
    html2canvas(exportElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        
        let position = 0;
        
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        
        pdf.save('open-innovation-fund-builder-cards.pdf');
        
        // Remove temporary element
        document.body.removeChild(exportElement);
    }).catch(error => {
        console.error('Error generating PDF:', error);
        document.body.removeChild(exportElement);
        alert('Error generating PDF. Please try the text export instead.');
    });
}

function exportAdvice() {
    let content = "Open Innovation Fund Builder - Your Method Cards\n\n";
    
    Object.keys(bankedCards).forEach(stage => {
        if (bankedCards[stage].length > 0) {
            const stageTitle = methodCards[stage]?.title || `Stage ${stage}`;
            content += `${stageTitle.toUpperCase()}\n`;
            content += "=".repeat(stageTitle.length) + "\n\n";
            
            bankedCards[stage].forEach(card => {
                content += `${card.title}\n`;
                content += "-".repeat(card.title.length) + "\n";
                content += `${card.advice}\n\n`;
            });
            content += "\n";
        }
    });
    
    if (content === "Open Innovation Fund Builder - Your Method Cards\n\n") {
        alert("No cards banked yet. Please select and bank some method cards first.");
        return;
    }
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'open-innovation-fund-builder-cards.txt';
    a.click();
    URL.revokeObjectURL(url);
}

function exportText() {
    exportAdvice();
}