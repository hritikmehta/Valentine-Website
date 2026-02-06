/* ================================================================
   VALENTINE'S WEBSITE - JAVASCRIPT LOGIC
   Romantic Interactive Website for Tanvi
   ================================================================ */

// Configuration Constants
const PASSWORD = "ilovebb";
let valentineData = null;
let currentDayIndex = 0;

/* ================================================================
   PAGE SWITCHING UTILITIES
   ================================================================ */

/**
 * Switch between pages with animation
 * @param {string} pageName - ID of page to show
 */
function showPage(pageName) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    const targetPage = document.getElementById(pageName);
    if (targetPage) {
        targetPage.classList.add('active');
        window.scrollTo(0, 0);
    }
}

/* ================================================================
   LOAD VALENTINE DATA FROM JSON
   ================================================================ */

async function loadValentineData() {
    try {
        const response = await fetch('assets/gifs.json');
        valentineData = await response.json();
        console.log('Valentine data loaded:', valentineData);
    } catch (error) {
        console.error('Error loading valentine data:', error);
        // Fallback data if JSON fails
        loadFallbackData();
    }
}

function loadFallbackData() {
    valentineData = {
        passwordPage: {
            tenorId: "12256602399307210452"
        },
        proposalPage: {
            tenorId: "16918696612896855928"
        },
        accessDenied: {
            tenorId: "16578671122851061924"
               // "26291282"
        },
        valentineDays: [
            {
                day: "Rose Day 🌹",
                message: "A rose for the prettiest girl in my world",
                tenorId: "16578671122851061924"
            },
            {
                day: "Propose Day 💍",
                message: "I choose you today and always",
                tenorId: "12630807861956171243"
            },
            {
                day: "Chocolate Day 🍫",
                message: "You're sweeter than chocolate",
                tenorId: "26291282"
            },
            {
                day: "Teddy Day 🧸",
                message: "Hug this teddy until I hug you",
                tenorId: "12630807861956171243"
            },
            {
                day: "Promise Day 🤝",
                message: "I promise to annoy you forever",
                tenorId: "12630807861956171243"
            },
            {
                day: "Hug Day 🤗",
                message: "Sending you the warmest virtual hug",
                tenorId: "24676320"
            },
            {
                day: "Kiss Day 😘",
                message: "Flying kisses just for you",
                tenorId: "16848068541201977632"
            },
            {
                day: "Valentine's Day ❤️",
                message: "Will you be my forever Valentine?",
                tenorId: "13300892748761143712"
            }
        ]
    };
}

/* ================================================================
   PAGE 1: PASSWORD/IDENTITY LOGIC
   ================================================================ */

document.getElementById('passwordForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('nameInput').value.trim();
    const password = document.getElementById('passwordInput').value;
    const errorDiv = document.getElementById('errorMessage');

    // Clear previous error
    errorDiv.innerHTML = '';

    // Validate credentials
    if (name.toLowerCase() !== 'potato') {
        // Access denied - show running man GIF
        errorDiv.innerHTML = `
            <div style="text-align: center;">
                <p style="font-size: 1.2rem; margin-bottom: 20px;">🏃 Access denied 😜</p>
                <p>This is only for Tanvi!</p>
                <div class="tenor-container" style="margin-top: 20px;">
                    <div class="tenor-gif-embed" data-postid="26291282" data-share-method="host" data-aspect-ratio="1" data-width="100%"></div>
                </div>
            </div>
        `;
        // Force reload Tenor embeds
        setTimeout(() => {
            const script = document.createElement('script');
            script.src = 'https://tenor.com/embed.js';
            script.async = true;
            document.body.appendChild(script);
        }, 100);
        return;
    }

    if (password !== PASSWORD) {
        errorDiv.innerHTML = '❌ Wrong password! Try again.';
        return;
    }

    // All correct - proceed to proposal page
    document.body.classList.add('post-auth');
    showPage('proposalPage');
    document.getElementById('nameInput').value = '';
    document.getElementById('passwordInput').value = '';
});

/* ================================================================
   PAGE 2: PROPOSAL LOGIC
   ================================================================ */

let yesPresses = 0;

document.getElementById('yesBtn').addEventListener('click', function () {
    yesPresses++;
    currentDayIndex = (yesPresses - 1) % valentineData.valentineDays.length;

    // Trigger celebrations
    createBalloons();
    createConfetti();
    createSparkles();

    // Show celebration page
    showCelebrationPage();
});

/**
 * Track cursor movement for YES button - Expand toward cursor direction
 */
document.addEventListener('mousemove', function (e) {
    const yesBtn = document.getElementById('yesBtn');

    if (yesBtn && yesBtn.offsetParent !== null) {
        const btnRect = yesBtn.getBoundingClientRect();
        const btnCenterX = btnRect.left + btnRect.width / 2;
        const btnCenterY = btnRect.top + btnRect.height / 2;

        // Calculate distance from cursor to button
        const dx = e.clientX - btnCenterX;
        const dy = e.clientY - btnCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Scale button based on proximity - closer = bigger
        const maxDistance = 500;
        const scale = Math.max(1, 2 - (distance / maxDistance));

        // Move button slightly toward cursor
        const angle = Math.atan2(dy, dx);
        const moveAmount = 25;
        const moveX = Math.cos(angle) * moveAmount;
        const moveY = Math.sin(angle) * moveAmount;

        yesBtn.style.transform = `translate(${moveX}px, ${moveY}px) scale(${scale})`;
    }
});

// Reset button on mouse leave
document.addEventListener('mouseleave', function () {
    const yesBtn = document.getElementById('yesBtn');
    if (yesBtn) {
        yesBtn.style.transform = 'translate(0, 0) scale(1)';
    }
});

// NO button runs far away when hovered
document.getElementById('noBtn').addEventListener('mouseenter', function () {
    const randomX = (Math.random() - 0.5) * 500;
    const randomY = (Math.random() - 0.5) * 500;
    this.style.position = 'fixed';
    this.style.transform = `translate(${randomX}px, ${randomY}px)`;
});

/* ================================================================
   PAGE 3: CELEBRATION LOGIC
   ================================================================ */

function showCelebrationPage() {
    showPage('celebrationPage');

    const dayData = valentineData.valentineDays[currentDayIndex];

    // Update content
    document.getElementById('celebrationDay').textContent = dayData.day;
    document.getElementById('celebrationMessage').textContent = dayData.message;

    // Create Tenor embed - simplified for better rendering
    const gifContainer = document.getElementById('celebrationGifContainer');
    gifContainer.innerHTML = `<div class="tenor-gif-embed" data-postid="${dayData.tenorId}" data-share-method="host" data-aspect-ratio="1" data-width="100%"></div>`;
    
    // Force reload Tenor embeds after a brief delay
    // setTimeout(() => {
        console.log("Reloading tenor script")
        const script = document.createElement('script');
        script.src = 'https://tenor.com/embed.js';
        script.async = true;
        document.body.appendChild(script);
        console.log("Tenor script reloaded")
    // }, 100);
    
    console.log(`Loading Tenor GIF for ${dayData.day} with ID: ${dayData.tenorId}`);

    // Populate celebration gallery with images
    populateCelebrationGallery();
}

// Back button from celebration page
document.getElementById('backBtn').addEventListener('click', function () {
    showPage('proposalPage');
});

// Next button - cycle to next day
document.getElementById('nextBtn').addEventListener('click', function () {
    currentDayIndex = (currentDayIndex + 1) % valentineData.valentineDays.length;
    
    // Trigger celebrations
    createBalloons();
    createConfetti();
    createSparkles();
    
    showCelebrationPage();
});

/* ================================================================
   CELEBRATION EFFECTS
   ================================================================ */

/**
 * Create balloons that float upward
 */
function createBalloons() {
    const container = document.getElementById('confettiContainer');
    const balloonCount = 15;
    const colors = ['#ff69b4', '#e91e63', '#ffc0cb', '#ff1493', '#c71585'];

    for (let i = 0; i < balloonCount; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = Math.random() * window.innerWidth + 'px';
        balloon.style.top = window.innerHeight + 'px';
        balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.setProperty('--tx', (Math.random() - 0.5) * 300 + 'px');
        balloon.style.setProperty('--rotate', Math.random() * 360 + 'deg');

        container.appendChild(balloon);

        // Remove balloon after animation
        setTimeout(() => balloon.remove(), 4000);
    }
}

/**
 * Create confetti explosion
 */
function createConfetti() {
    const container = document.getElementById('confettiContainer');
    const confettiCount = 50;
    const confettiPieces = ['💖', '💕', '💗', '💓', '💝', '🌹', '💐', '🎀', '✨'];

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.textContent = confettiPieces[Math.floor(Math.random() * confettiPieces.length)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = Math.random() * window.innerHeight + 'px';
        confetti.style.setProperty('--tx', (Math.random() - 0.5) * 400 + 'px');
        confetti.style.fontSize = (0.8 + Math.random() * 0.8) + 'rem';

        container.appendChild(confetti);

        // Remove confetti after animation
        setTimeout(() => confetti.remove(), 3000);
    }
}

/**
 * Create sparkles around cursor
 */
function createSparkles() {
    const container = document.getElementById('sparkles-container');
    const sparkleCount = 30;

    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.textContent = '✨';

        const randomX = (Math.random() - 0.5) * window.innerWidth;
        const randomY = (Math.random() - 0.5) * window.innerHeight;

        sparkle.style.left = window.innerWidth / 2 + 'px';
        sparkle.style.top = window.innerHeight / 2 + 'px';
        sparkle.style.setProperty('--tx', randomX + 'px');
        sparkle.style.setProperty('--ty', randomY + 'px');
        sparkle.style.fontSize = (1 + Math.random() * 1.5) + 'rem';

        container.appendChild(sparkle);

        // Remove sparkle after animation
        setTimeout(() => sparkle.remove(), 1000);
    }
}

/* ================================================================
   PAGE 4: GALLERY LOGIC - TRULY INFINITE CAROUSEL
   ================================================================ */

function populateCelebrationGallery() {
    const galleryLeft = document.getElementById('celebrationGalleryLeft');
    const galleryRight = document.getElementById('celebrationGalleryRight');

    // Clear existing items to prevent pileup
    galleryLeft.innerHTML = '';
    galleryRight.innerHTML = '';

    // All 12 images
    const availableImages = [
        'assets/images/img1.webp',
        'assets/images/img2.webp',
        'assets/images/img3.webp',
        'assets/images/img4.webp',
        'assets/images/img5.webp',
        'assets/images/img6.webp',
        'assets/images/img7.webp',
        'assets/images/img8.webp',
        'assets/images/img9.webp',
        'assets/images/img10.webp',
        'assets/images/img11.webp',
        'assets/images/img12.webp'
    ];

    // Distribute images: odd indices to left, even indices to right
    availableImages.forEach((imgPath, index) => {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'gallery-item';

        const img = document.createElement('img');
        img.src = imgPath;
        img.alt = '';

        img.onerror = function() {
            console.warn(`Image failed to load: ${imgPath}`);
            this.parentElement.style.display = 'none';
        };

        imgContainer.appendChild(img);

        // Odd indices to left, even to right
        if (index % 2 === 0) {
            galleryLeft.appendChild(imgContainer);
        } else {
            galleryRight.appendChild(imgContainer);
        }
    });

    console.log(`Celebration gallery loaded: ${galleryLeft.children.length} images left, ${galleryRight.children.length} images right`);
}

function initializeGallery() {
    const galleryLeft = document.getElementById('galleryLeft');
    const galleryRight = document.getElementById('galleryRight');
    const toggleBtn = document.getElementById('toggleGalleryBtn');

    // All 12 images
    const allImages = [
        'assets/images/img1.webp',
        'assets/images/img2.webp',
        'assets/images/img3.webp',
        'assets/images/img4.webp',
        'assets/images/img5.webp',
        'assets/images/img6.webp',
        'assets/images/img7.webp',
        'assets/images/img8.webp',
        'assets/images/img9.webp',
        'assets/images/img10.webp',
        'assets/images/img11.webp',
        'assets/images/img12.webp'
    ];

    // Extract GIF URLs from Tenor IDs
    const gifItems = [];
    if (valentineData && valentineData.valentineDays) {
        valentineData.valentineDays.forEach(day => {
            gifItems.push({
                tenorId: day.tenorId,
                name: day.day,
                aspectRatio: day.aspectRatio || 1
            });
        });
    }

    // Add additional GIFs from metadata
    if (valentineData && valentineData.passwordPage) {
        gifItems.unshift({
            tenorId: valentineData.passwordPage.tenorId,
            name: valentineData.passwordPage.name,
            aspectRatio: valentineData.passwordPage.aspectRatio || 1
        });
    }

    // Store states for toggling
    window.galleryState = {
        currentSet: 0,
        isShowingImages: true,
        allImages: allImages,
        gifItems: gifItems,
        imageSet1: allImages.slice(0, 6), // First 6 images
        imageSet2: allImages.slice(6, 12), // Next 6 images
        galleryLeft: galleryLeft,
        galleryRight: galleryRight
    };

    // Load initial images
    loadGallerySet(allImages.slice(0, 6));

    // Toggle button functionality
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function () {
            toggleGalleryContent();
        });
    }
}

function loadGallerySet(itemPaths) {
    const { galleryLeft, galleryRight } = window.galleryState;

    // Mark existing items for fade out
    const existingItems = galleryLeft.querySelectorAll('.gallery-item');
    existingItems.forEach(item => {
        item.classList.add('transitioning');
    });

    const existingRightItems = galleryRight.querySelectorAll('.gallery-item');
    existingRightItems.forEach(item => {
        item.classList.add('transitioning');
    });

    // Clear after transition animation
    setTimeout(() => {
        galleryLeft.innerHTML = '';
        galleryRight.innerHTML = '';

        // Load 6 items - 3 on each side
        itemPaths.forEach((itemPath, index) => {
            const itemContainer = document.createElement('div');
            itemContainer.className = 'gallery-item entering';

            const img = document.createElement('img');
            img.src = itemPath;
            img.alt = '';

            img.onerror = function () {
                console.warn(`Image failed to load: ${itemPath}`);
                this.parentElement.style.display = 'none';
            };

            itemContainer.appendChild(img);

            // First 3 items to left, next 3 to right
            if (index < 3) {
                galleryLeft.appendChild(itemContainer);
            } else {
                galleryRight.appendChild(itemContainer);
            }
        });

        console.log(`Gallery loaded: 3 items left, 3 items right`);
    }, 800);
}

function loadGalleryGifs(gifItems) {
    const { galleryLeft, galleryRight } = window.galleryState;

    // Mark existing items for fade out
    const existingItems = galleryLeft.querySelectorAll('.gallery-item');
    existingItems.forEach(item => {
        item.classList.add('transitioning');
    });

    const existingRightItems = galleryRight.querySelectorAll('.gallery-item');
    existingRightItems.forEach(item => {
        item.classList.add('transitioning');
    });

    setTimeout(() => {
        galleryLeft.innerHTML = '';
        galleryRight.innerHTML = '';

        // Take up to 6 GIFs and display them
        const displayGifs = gifItems.slice(0, 6);
        displayGifs.forEach((gifItem, index) => {
            const itemContainer = document.createElement('div');
            itemContainer.className = 'gallery-item entering';

            // Create a Tenor embed container
            const gifEmbed = document.createElement('div');
            gifEmbed.className = 'tenor-gif-embed';
            gifEmbed.setAttribute('data-postid', gifItem.tenorId);
            gifEmbed.setAttribute('data-share-method', 'host');
            gifEmbed.setAttribute('data-aspect-ratio', gifItem.aspectRatio);
            gifEmbed.setAttribute('data-width', '100%');
            gifEmbed.style.width = '100%';
            gifEmbed.style.height = '100%';

            itemContainer.appendChild(gifEmbed);

            // Add to left or right
            if (index < 3) {
                galleryLeft.appendChild(itemContainer);
            } else {
                galleryRight.appendChild(itemContainer);
            }
        });

        // Reload Tenor embed script
        const script = document.createElement('script');
        script.src = 'https://tenor.com/embed.js';
        script.async = true;
        document.body.appendChild(script);

        console.log(`GIFs loaded: ${displayGifs.length} items`);
    }, 800);
}

function toggleGalleryContent() {
    const state = window.galleryState;

    if (state.isShowingImages) {
        // Switch to GIFs
        if (state.gifItems.length > 0) {
            loadGalleryGifs(state.gifItems);
            state.isShowingImages = false;
            document.getElementById('toggleGalleryBtn').textContent = 'Show Images 🖼️';
        }
    } else {
        // Switch to images
        if (state.currentSet === 0) {
            loadGallerySet(state.imageSet1);
            state.currentSet = 1;
        } else {
            loadGallerySet(state.imageSet2);
            state.currentSet = 0;
        }
        state.isShowingImages = true;
        document.getElementById('toggleGalleryBtn').textContent = 'Next Set 💕';
    }
}

// Back button from gallery
document.getElementById('backFromGalleryBtn').addEventListener('click', function () {
    yesPresses = 0;
    currentDayIndex = 0;
    showPage('proposalPage');
});

/* ================================================================
   INITIALIZATION
   ================================================================ */

document.addEventListener('DOMContentLoaded', async function () {
    // Load valentine data
    await loadValentineData();

    // Initialize gallery
    initializeGallery();

    // Show first page
    showPage('passwordPage');

    console.log('❤️ Valentine Website Initialized!');
});

/* ================================================================
   HELPER: Audio for YES click (optional enhancement)
   ================================================================ */

function playSound(frequency = 800, duration = 100) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = frequency;
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch (error) {
        console.log('Audio not available');
    }
}

/* ================================================================
   LOGGING FOR DEBUGGING
   ================================================================ */

console.log('%c❤️ Valentine Website Ready! 💖', 'color: #ff69b4; font-size: 16px; font-weight: bold;');
