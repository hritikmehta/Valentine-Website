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
    if (name.toLowerCase() !== 'Love') {
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
    const randomX = (Math.random() - 0.5) * 300;
    const randomY = (Math.random() - 0.5) * 300;
    this.style.transform = `translate(${randomX}px, ${randomY}px)`;
});

// Reset NO button position on mouse leave
document.getElementById('noBtn').addEventListener('mouseleave', function () {
    this.style.transform = 'translate(0, 0)';
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

    // Clear existing items
    galleryLeft.innerHTML = '';
    galleryRight.innerHTML = '';

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

    // Get 4 random images (2 for left, 2 for right)
    const randomImages = getRandomImages(allImages, 4);
    const leftImages = randomImages.slice(0, 2);
    const rightImages = randomImages.slice(2, 4);

    // Load left side images
    leftImages.forEach((imgPath) => {
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
        galleryLeft.appendChild(imgContainer);
    });

    // Load right side images
    rightImages.forEach((imgPath) => {
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
        galleryRight.appendChild(imgContainer);
    });

    console.log(`Celebration gallery loaded: 2 images left, 2 images right`);
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

    // Store state
    window.galleryState = {
        allImages: allImages,
        galleryLeft: galleryLeft,
        galleryRight: galleryRight
    };

    // Load initial random images
    loadRandomGallery();

    // Toggle button functionality
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function () {
            loadRandomGallery();
        });
        toggleBtn.textContent = 'Load More 💕';
    }
}

function getRandomImages(allImages, count) {
    // Shuffle array
    const shuffled = [...allImages].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

function loadRandomGallery() {
    const { allImages, galleryLeft, galleryRight } = window.galleryState;

    // Get 4 random images (2 for left, 2 for right)
    const randomImages = getRandomImages(allImages, 4);
    const leftImages = randomImages.slice(0, 2);
    const rightImages = randomImages.slice(2, 4);

    // Mark existing items for fade out
    const existingLeftItems = galleryLeft.querySelectorAll('.gallery-item');
    existingLeftItems.forEach(item => {
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

        // Load left side images
        leftImages.forEach((imgPath) => {
            const itemContainer = document.createElement('div');
            itemContainer.className = 'gallery-item entering';

            const img = document.createElement('img');
            img.src = imgPath;
            img.alt = '';

            img.onerror = function () {
                console.warn(`Image failed to load: ${imgPath}`);
                this.parentElement.style.display = 'none';
            };

            itemContainer.appendChild(img);
            galleryLeft.appendChild(itemContainer);
        });

        // Load right side images
        rightImages.forEach((imgPath) => {
            const itemContainer = document.createElement('div');
            itemContainer.className = 'gallery-item entering';

            const img = document.createElement('img');
            img.src = imgPath;
            img.alt = '';

            img.onerror = function () {
                console.warn(`Image failed to load: ${imgPath}`);
                this.parentElement.style.display = 'none';
            };

            itemContainer.appendChild(img);
            galleryRight.appendChild(itemContainer);
        });

        console.log(`Gallery loaded: 2 items left, 2 items right`);
    }, 800);
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
