# 🎨 Customization Guide

Complete guide to personalizing every aspect of the Valentine's website.

---

## 🎭 Messages & Content

### Edit Daily Messages

Open `assets/gifs.json` and modify the `message` field:

```json
{
  "day": "Rose Day 🌹",
  "message": "A rose for the prettiest girl in my world",
  "tenorId": "12517852071596871944"
}
```

**Example personalization:**

```json
{
  "day": "Rose Day 🌹",
  "message": "As beautiful as this rose, you light up my world every single day 🌹",
  "tenorId": "12517852071596871944"
}
```

All 8 days:
1. **Rose Day** - First impression, romantic
2. **Propose Day** - About choosing her
3. **Chocolate Day** - Sweet compliments
4. **Teddy Day** - Warm emotions
5. **Promise Day** - Future commitments
6. **Hug Day** - Physical affection
7. **Kiss Day** - Romantic gestures
8. **Valentine's Day** - Grand finale

---

## 🎬 Finding & Changing GIFs

### How to Find Tenor IDs

1. **Go to tenor.com**
2. **Search** for: "cute proposal", "hug", "kiss", "love", etc.
3. **Right-click** on a GIF you like
4. **Select "Copy post ID"** (or check the URL)

### Example URL → ID Conversion
```
URL: https://tenor.com/view/kiss-gif-id-13300892748761143712
ID: 13300892748761143712
```

### GIF Recommendations by Day

**Rose Day:**
- "cute love" - romantic animations
- "rose flower" - floral visuals

**Propose Day:**
- "engagement" - celebration GIFs
- "couple proposal" - proposal themes

**Chocolate Day:**
- "chocolate" - sweet treats
- "kiss chocolate" - romantic eating

**Teddy Day:**
- "teddy bear hug" - cuddly animals
- "cute teddy" - adorable bears

**Promise Day:**
- "pinky promise" - promise gestures
- "couple promise" - relationship moments

**Hug Day:**
- "warm hug" - affectionate hugs
- "virtual hug" - cute hugging animations

**Kiss Day:**
- "kiss" - romantic kisses
- "flying kiss" - cute kiss animations

**Valentine's Day:**
- "valentine" - romantic scenes
- "love forever" - eternal love themes

### Replace a GIF in JSON

```json
// Before
{
  "day": "Kiss Day 😘",
  "message": "Flying kisses just for you",
  "tenorId": "16848068541201977632"  // Old ID
}

// After
{
  "day": "Kiss Day 😘",
  "message": "Flying kisses just for you",
  "tenorId": "13300892748761143712"  // New ID
}
```

---

## 🎨 Colors & Styling

### Change All Pink Colors at Once

Edit `style.css` root variables:

```css
:root {
    --primary-pink: #ff69b4;      /* Main pink */
    --primary-red: #e91e63;        /* Red accent */
    --light-pink: #ffc0cb;         /* Light pink background */
    --white: #ffffff;              /* Text background */
    --dark-text: #2c3e50;          /* Text color */
    --gradient-pink: linear-gradient(135deg, #ff69b4, #e91e63);
}
```

### Color Palette Ideas

**Romantic Red Theme:**
```css
--primary-pink: #c41e3a;      /* Red */
--primary-red: #8b0000;        /* Dark red */
--light-pink: #ffb3ba;         /* Light red */
```

**Soft Blush Theme:**
```css
--primary-pink: #f1a5b7;      /* Blush */
--primary-red: #d4526e;        /* Rose */
--light-pink: #fde4e6;         /* Very light pink */
```

**Coral Theme:**
```css
--primary-pink: #ff6b6b;      /* Coral */
--primary-red: #ff4444;        /* Orange coral */
--light-pink: #ffc0c0;         /* Light coral */
```

### Change Purple/Blue Theme
```css
:root {
    --primary-pink: #8e44ad;      /* Purple */
    --primary-red: #6c3483;        /* Dark purple */
    --light-pink: #d7bde2;         /* Light purple */
    --gradient-pink: linear-gradient(135deg, #9b59b6, #8e44ad);
}
```

### Change Button Colors Only

Find in `style.css`:
```css
#yesBtn {
    background: var(--gradient-pink);  /* Change this to custom gradient */
}

#noBtn {
    color: var(--primary-red);  /* Change button text color */
    border: 2px solid var(--primary-red);
}
```

---

## 🖼️ Adding Personal Photos

### Step 1: Prepare Images

Use [Squoosh.app](https://squoosh.app/) to optimize:

1. Open your image
2. Convert to **WebP** format
3. Compress to **300KB or less**
4. Check dimensions (1080x1350px ideal)
5. Download

### Step 2: Add to Project

1. Create folder: `assets/images/`
2. Name files sequentially:
   ```
   img1.webp
   img2.webp
   img3.webp
   (etc)
   ```
3. Upload to GitHub

### Step 3: Customize Gallery Display

Edit in `script.js`:

```js
function initializeGallery() {
    const sampleImages = [
        'assets/images/img1.webp',
        'assets/images/img2.webp',
        'assets/images/img3.webp',
        // Add more paths here
        'assets/images/img15.webp'
    ];
    // Rest of code...
}
```

### Step 4: Change Column Layout

Edit `style.css` gallery section:

```css
.gallery-wrapper {
    height: 60vh;        /* Change to 40vh, 80vh, etc. */
    padding: 20px;       /* Change padding */
}

.gallery-left {
    animation: scroll-up 30s linear infinite;  /* Change 30s to faster/slower */
}

.gallery-right {
    animation: scroll-down 30s linear infinite;
}
```

---

## ✍️ Change Password & Name

### Update Validation Logic

In `script.js`, change:

```js
// Current
const PASSWORD = "xyzzz";
if (name.toLowerCase() !== 'tanvi') {
    // Access denied
}

// New Example
const PASSWORD = "mySecretPassword123";
if (name.toLowerCase() !== 'your-girlfriends-name') {
    // Access denied
}
```

**⚠️ Note:** Keep name lowercase in comparison, but password is case-sensitive.

---

## 🎵 Add Background Music (Optional)

### Create Audio Directory
```
assets/
├── audio/
│   └── ambient.mp3
```

### Add to HTML

In `index.html`, add before `</body>`:

```html
<audio id="bgMusic" loop volume="0.3">
    <source src="assets/audio/ambient.mp3" type="audio/mpeg">
</audio>
```

### Play on YES Button

In `script.js`:

```js
document.getElementById('yesBtn').addEventListener('click', function () {
    const audio = document.getElementById('bgMusic');
    audio.play();
    
    yesPresses++;
    // ... rest of code
});
```

**Free music sources:**
- [Free Music Archive](https://freemusicarchive.org/)
- [YouTube Audio Library](https://www.youtube.com/audiolibrary)
- [Pixabay Music](https://pixabay.com/music/)

---

## 🎯 Customize Button Behavior

### Make NO Button Harder to Click

Edit `script.js`:

```js
document.getElementById('noBtn').addEventListener('mouseenter', function () {
    const randomX = (Math.random() - 0.5) * 500;  // Larger range
    const randomY = (Math.random() - 0.5) * 500;
    this.style.transform = `translate(${randomX}px, ${randomY}px)`;
});
```

### Change YES Button Size

Edit `style.css`:

```css
#yesBtn {
    padding: 20px 50px;        /* Increase padding for bigger button */
    font-size: 1.3rem;         /* Increase text size */
    border-radius: 20px;       /* Rounder corners */
}
```

### Smaller YES Button
```css
#yesBtn {
    padding: 12px 25px;
    font-size: 0.95rem;
}
```

---

## 🎊 Customize Animations

### Change Floating Hearts Speed

Edit `style.css`:

```css
@keyframes float-up {
    0% {
        transform: translateY(100vh) rotate(0deg);
    }
    100% {
        transform: translateY(-100vh) rotate(360deg);
    }
    /* ^ Change 'rotate(360deg)' to 'rotate(720deg)' for faster spin */
}
```

### More/Fewer Floating Hearts

In `script.js`:

```js
function createFloatingHearts() {
    const container = document.querySelector('.background-hearts');
    const heartCount = 15;  // Change this number (higher = more hearts)
    
    for (let i = 0; i < heartCount; i++) {
        // ...
    }
}
```

### Change Confetti Elements

In `script.js`:

```js
function createConfetti() {
    const confettiPieces = [
        '❤️', '💖', '💝',
        '🎉', '✨', '💫',
        '🌹', '💐', '💍'  // Add more emojis
    ];
    // ...
}
```

---

## 🌍 Customize Text & Titles

### Change Proposal Question

Edit `index.html`:

```html
<!-- Before -->
<h1 class="proposal-title">Will you be my Valentine? 💝</h1>

<!-- After -->
<h1 class="proposal-title">Will you marry me? 💍</h1>
```

### Change Page Title

Edit `index.html` head:

```html
<!-- Before -->
<title>Will You Be My Valentine? 💖</title>

<!-- After -->
<title>A Special Proposal For You 💖</title>
```

### Change Entry Screen Text

Edit `index.html`:

```html
<!-- Before -->
<h1 class="title-text">Click here if you are Tanvi 💖</h1>

<!-- After -->
<h1 class="title-text">This is for you, Tanvi 💖</h1>
```

---

## 📱 Responsive Adjustments

### Make Font Bigger on Mobile

Edit `style.css` media query:

```css
@media (max-width: 480px) {
    .title-text, .proposal-title, .celebration-title {
        font-size: 1.8rem;  /* Increase from 1.5rem */
    }
    
    #yesBtn {
        font-size: 1.2rem;  /* Increase from 1rem */
    }
}
```

### Change Mobile Spacing

```css
@media (max-width: 480px) {
    .page {
        padding: 20px;  /* More padding on mobile */
    }
    
    .password-container,
    .proposal-container {
        padding: 30px 20px;  /* More internal padding */
    }
}
```

---

## 🚀 Deploy Changes

After editing any file:

```bash
# Stage changes
git add .

# Commit with message
git commit -m "Updated messages and colors"

# Push to GitHub
git push

# Vercel auto-deploys in 30-60 seconds
```

---

## ✨ Pro Customization Tips

1. **Test locally first** before pushing
2. **Use browser DevTools** (F12) to see changes live
3. **Keep backups** of original code
4. **Mobile first** - test on phone before deploying
5. **Color contrast** - ensure text is readable

---

## 🎭 Cool Combinations

### Romantic Dark Mode
```css
--primary-pink: #ff4081;
--primary-red: #c2185b;
--light-pink: #f8bbd0;
Background: dark gray (#333)
```

### Fun & Playful
```css
--primary-pink: #ff6b9d;
--primary-red: #ffa06b;
--light-pink: #ffb884;
```

### Elegant & Minimal
```css
--primary-pink: #d64161;
--primary-red: #a71d31;
--light-pink: #f4a8b8;
```

---

Have fun customizing! Make it uniquely yours! 💖
