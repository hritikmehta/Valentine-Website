/* ================================================================
   VALENTINE'S WEBSITE - JAVASCRIPT LOGIC
   Romantic Interactive Website for Tanvi
   ================================================================ */

// Configuration Constants
const PASSWORD = "xyzzz";
let valentineData = null;
let currentDayIndex = 0;
const TENOR_API_ENDPOINT = "https://media.tenor.com/embed?postid=";

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
            tenorId: "26291282"
        },
        valentineDays: [
            {
                day: "Rose Day 🌹",
                message: "A rose for the prettiest girl in my world",
                tenorId: "12517852071596871944"
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
    if (name.toLowerCase() !== 'tanvi') {
        // Access denied - show running man GIF
        errorDiv.innerHTML = `
            <div style="text-align: center;">
                <p style="font-size: 1.2rem; margin-bottom: 20px;">🏃 Access denied 😜</p>
                <p>This is only for Tanvi!</p>
                <div class="tenor-container" style="margin-top: 20px;">
                    <iframe src="https://media.tenor.com/embed?postid=${valentineData.accessDenied.tenorId}" 
                            frameBorder="0" allowFullScreen="true" width="100%" height="300" 
                            style="border-radius: 15px;"></iframe>
                </div>
            </div>
        `;
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

    // Create Tenor embed
    const gifContainer = document.getElementById('celebrationGifContainer');
    gifContainer.innerHTML = `
        <iframe src="https://media.tenor.com/embed?postid=${dayData.tenorId}" 
                frameBorder="0" allowFullScreen="true" width="100%" height="400" 
                style="border-radius: 20px;"></iframe>
    `;
    console.log(`Loading Tenor GIF for ${dayData.day} with ID: ${dayData.tenorId}`);

    // Always show next button (or gallery if it's the last day)
    if (currentDayIndex === valentineData.valentineDays.length - 1) {
        // Last day - show gallery button
        document.querySelector('.celebration-buttons').innerHTML = `
            <button id="galleryBtn" class="next-btn">View Gallery 📸</button>
        `;
        document.getElementById('galleryBtn').addEventListener('click', function () {
            showPage('galleryPage');
        });
    } else {
        // Show next button for other days
        document.querySelector('.celebration-buttons').innerHTML = `
            <button id="nextBtn" class="next-btn">Next 💝</button>
        `;
        document.getElementById('nextBtn').addEventListener('click', function () {
            document.getElementById('yesBtn').click();
        });
    }
    
    // Always populate the side galleries
    populateCelebrationGallery();
}

// Back button from celebration
document.getElementById('backBtn').addEventListener('click', function () {
    yesPresses = 0;
    currentDayIndex = 0;
    showPage('proposalPage');
});

/* ================================================================
   ANIMATION FUNCTIONS
   ================================================================ */

/**
 * Create floating balloons animation
 */
function createBalloons() {
    const container = document.getElementById('confettiContainer');
    const balloonColors = ['#ff69b4', '#ff1493', '#ff69b4', '#ffb6c1'];
    const balloonCount = 8;

    for (let i = 0; i < balloonCount; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = Math.random() * window.innerWidth + 'px';
        balloon.style.bottom = '-60px';
        balloon.style.backgroundColor = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        balloon.style.setProperty('--tx', (Math.random() - 0.5) * 200 + 'px');
        balloon.style.setProperty('--rotate', Math.random() * 720 + 'deg');

        container.appendChild(balloon);

        // Remove balloon after animation
        setTimeout(() => balloon.remove(), 4000);
    }
}

/**
 * Create confetti animation
 */
function createConfetti() {
    const container = document.getElementById('confettiContainer');
    const confettiPieces = ['❤️', '💖', '💝', '🎉', '✨', '💫'];
    const pieceCount = 40;

    for (let i = 0; i < pieceCount; i++) {
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
   PAGE 4: GALLERY LOGIC
   ================================================================ */

function populateCelebrationGallery() {
    const galleryLeft = document.getElementById('celebrationGalleryLeft');
    const galleryRight = document.getElementById('celebrationGalleryRight');

    // Clear existing items
    galleryLeft.innerHTML = '';
    galleryRight.innerHTML = '';

    // Check for available images (supports both .webp and .jpg)
    const availableImages = [
        'assets/images/img1.webp',
        'assets/images/img2.jpg',
        'assets/images/img3.jpg',
        'assets/images/img4.webp',
        'assets/images/img5.jpg',
        'assets/images/img6.jpg',
        'assets/images/img7.webp',
        'assets/images/img8.webp',
        'assets/images/img9.webp',
        'assets/images/img10.webp'
    ];

    // Distribute images between left and right columns
    availableImages.forEach((imgPath, index) => {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'gallery-item';

        const img = document.createElement('img');
        img.src = imgPath;
        img.alt = '';
        img.loading = 'lazy';
        img.onerror = function() {
            console.warn(`Image failed to load: ${imgPath}`);
            this.style.display = 'none';
        };

        imgContainer.appendChild(img);

        // Alternate between left and right
        if (index % 2 === 0) {
            galleryLeft.appendChild(imgContainer);
        } else {
            galleryRight.appendChild(imgContainer);
        }
    });

    // Duplicate items 3 times for smooth infinite scroll loop
    const allItems = [...galleryLeft.querySelectorAll('.gallery-item')];
    allItems.forEach(item => {
        const clone1 = item.cloneNode(true);
        const clone2 = item.cloneNode(true);
        const clone3 = item.cloneNode(true);
        galleryLeft.appendChild(clone1);
        galleryLeft.appendChild(clone2);
        galleryLeft.appendChild(clone3);
    });

    const allItemsRight = [...galleryRight.querySelectorAll('.gallery-item')];
    allItemsRight.forEach(item => {
        const clone1 = item.cloneNode(true);
        const clone2 = item.cloneNode(true);
        const clone3 = item.cloneNode(true);
        galleryRight.appendChild(clone1);
        galleryRight.appendChild(clone2);
        galleryRight.appendChild(clone3);
    });
}

function initializeGallery() {
    const galleryLeft = document.getElementById('galleryLeft');
    const galleryRight = document.getElementById('galleryRight');

    // Check for available images (supports both .webp and .jpg)
    const availableImages = [
        'assets/images/img1.webp',
        'assets/images/img2.jpg',
        'assets/images/img3.jpg',
        'assets/images/img4.webp',
        'assets/images/img5.jpg',
        'assets/images/img6.jpg',
        'assets/images/img7.webp',
        'assets/images/img8.webp',
        'assets/images/img9.webp',
        'assets/images/img10.webp'
    ];

    // Distribute images between left and right columns
    availableImages.forEach((imgPath, index) => {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'gallery-item';

        const img = document.createElement('img');
        img.src = imgPath;
        img.alt = '';
        img.loading = 'lazy';
        img.onerror = function() {
            console.warn(`Image failed to load: ${imgPath}`);
            this.style.display = 'none';
        };

        imgContainer.appendChild(img);

        // Alternate between left and right
        if (index % 2 === 0) {
            galleryLeft.appendChild(imgContainer);
        } else {
            galleryRight.appendChild(imgContainer);
        }
    });

    // Duplicate items 3 times for smooth infinite scroll loop
    const allItems = [...galleryLeft.querySelectorAll('.gallery-item')];
    allItems.forEach(item => {
        const clone1 = item.cloneNode(true);
        const clone2 = item.cloneNode(true);
        const clone3 = item.cloneNode(true);
        galleryLeft.appendChild(clone1);
        galleryLeft.appendChild(clone2);
        galleryLeft.appendChild(clone3);
    });

    const allItemsRight = [...galleryRight.querySelectorAll('.gallery-item')];
    allItemsRight.forEach(item => {
        const clone1 = item.cloneNode(true);
        const clone2 = item.cloneNode(true);
        const clone3 = item.cloneNode(true);
        galleryRight.appendChild(clone1);
        galleryRight.appendChild(clone2);
        galleryRight.appendChild(clone3);
    });
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
