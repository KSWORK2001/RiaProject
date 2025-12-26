const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");
const videos = document.querySelectorAll(".video-bg video");

function stopAllVideos() {
    videos.forEach(v => {
        v.classList.remove("active");
        v.pause();
        v.currentTime = 0;
    });
}

// TAB SWITCHING
tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        contents.forEach(c => c.classList.remove("active"));

        tab.classList.add("active");
        document.getElementById(tab.dataset.tab).classList.add("active");

        stopAllVideos();
    });
});

// CARD → VIDEO HOVER
document.querySelectorAll(".dance-card").forEach(card => {
    const key = card.dataset.video;
    const video = document.getElementById(`video-${key}`);

    if (!video) return;

    card.addEventListener("mouseenter", () => {
        stopAllVideos();
        video.classList.add("active");
        video.play();
    });

    card.addEventListener("mouseleave", () => {
        video.classList.remove("active");
        video.pause();
        video.currentTime = 0;
    });
});

document.querySelectorAll(".dance-card").forEach(card => {
    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--y", `${e.clientY - rect.top}px`);
    });
});

// EXPANDING CARD FUNCTIONALITY
let expandedCard = null;
let originalCard = null;

function createExpandedCard(cardData, originalCardElement) {
    const expandedCard = document.createElement('div');
    expandedCard.className = 'expanded-card';
    expandedCard.innerHTML = `
        <div class="expanded-card-header">
            <div>
                <h2 class="expanded-card-title">${cardData.title}</h2>
                <div class="expanded-card-location">${cardData.location}</div>
            </div>
            <button class="expanded-card-close" onclick="closeExpandedCard()">×</button>
        </div>
        <div class="expanded-card-body">
            <div class="expanded-card-info">
                <div class="expanded-info-item">
                    <span class="info-label">📅</span>
                    <span>${cardData.date}</span>
                </div>
                <div class="expanded-info-item">
                    <span class="info-label">🕐</span>
                    <span>${cardData.time}</span>
                </div>
                <div class="expanded-info-item">
                    <span class="info-label">💰</span>
                    <span>${cardData.price}</span>
                </div>
            </div>
            <div class="expanded-card-details">
                <p class="expanded-card-description">${cardData.description}</p>
                <div class="expanded-card-features">
                    ${cardData.features.split(' • ').map(feature => 
                        `<span class="expanded-feature-tag">${feature}</span>`
                    ).join('')}
                </div>
                <button class="expanded-card-cta">Get More Info</button>
            </div>
        </div>
    `;
    
    return expandedCard;
}

function expandCard(card) {
    // Close any existing expanded card
    if (expandedCard) {
        closeExpandedCard();
    }
    
    // Store reference to original card
    originalCard = card;
    
    // Get card data
    const cardData = {
        title: card.dataset.title,
        location: card.dataset.location,
        date: card.dataset.date,
        time: card.dataset.time,
        price: card.dataset.price,
        description: card.dataset.description,
        features: card.dataset.features
    };
    
    // Create expanded card
    expandedCard = createExpandedCard(cardData, card);
    
    // Insert expanded card after the original card
    card.parentNode.insertBefore(expandedCard, card.nextSibling);
    
    // Hide original card with animation
    card.style.display = 'none';
    
    // Scroll expanded card into view
    setTimeout(() => {
        expandedCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
}

function closeExpandedCard() {
    if (!expandedCard || !originalCard) return;
    
    // Show original card
    originalCard.style.display = '';
    
    // Remove expanded card with animation
    expandedCard.style.animation = 'expandCard 0.4s ease-in reverse';
    
    setTimeout(() => {
        if (expandedCard && expandedCard.parentNode) {
            expandedCard.parentNode.removeChild(expandedCard);
        }
        expandedCard = null;
        originalCard = null;
    }, 400);
}

// Add click handlers to all dance cards
document.querySelectorAll('.dance-card').forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault();
        expandCard(card);
    });
});

// Close expanded card on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && expandedCard) {
        closeExpandedCard();
    }
});

// Make closeExpandedCard globally available
window.closeExpandedCard = closeExpandedCard;
