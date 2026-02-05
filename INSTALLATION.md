# 📋 Setup & Installation Guide

## Complete Step-by-Step Instructions

### Prerequisites
- Git (for version control)
- A text editor (VS Code recommended)
- GitHub account
- Vercel account (free)

---

## 🔧 STEP 1: Initial Setup

### Option A: Clone from GitHub
```bash
git clone <your-github-repository-url>
cd valentine-website
```

### Option B: Fresh Setup
```bash
mkdir valentine-website
cd valentine-website
git init
```

Then copy all the created files into this directory.

---

## 📦 STEP 2: Add Your Personal Content

### 2.1 Add Personal Photos

1. Create an `assets/images/` folder if not present
2. Optimize your photos using [Squoosh.app](https://squoosh.app/):
   - Convert to .webp format
   - Keep each image under 300KB
   - Recommended size: 1080x1350px (mobile-friendly)

3. Name them sequentially:
   ```
   img1.webp
   img2.webp
   img3.webp
   img4.webp
   img5.webp
   img6.webp
   img7.webp
   img8.webp
   img9.webp
   img10.webp
   (add more if you want)
   ```

4. Place in `assets/images/` folder

### 2.2 Customize Messages (Optional)

Edit `assets/gifs.json`:

```json
{
  "day": "Rose Day 🌹",
  "message": "Add your personal message here!",
  "tenorId": "12517852071596871944"
}
```

Each day can have your own special message.

### 2.3 Find Custom GIFs (Optional)

1. Go to [tenor.com](https://tenor.com)
2. Search for cute/romantic GIFs
3. Right-click on a GIF → Share → Copy post ID
4. Update the `tenorId` in `assets/gifs.json`

Example: URL `https://tenor.com/view/gif-12345` → ID is `12345`

---

## 🌐 STEP 3: Local Testing

### Using Python (Easiest)
```bash
python -m http.server 8000
```

Then open: `http://localhost:8000`

### Using VS Code Live Server
1. Install "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Test All Features
✅ Enter "Tanvi" + password "xyzzz"
✅ Click YES button
✅ Go through all 8 days
✅ View gallery
✅ Check mobile responsiveness (F12 → Device mode)

---

## 🚀 STEP 4: Push to GitHub

### Create GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Create repository named: `valentine-website`
3. Don't initialize with README (we have one)
4. Click "Create repository"

### Push Code to GitHub
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial Valentine website commit"

# Rename branch to main
git branch -M main

# Add remote (copy from GitHub repo)
git remote add origin https://github.com/YOUR_USERNAME/valentine-website.git

# Push to GitHub
git push -u origin main
```

---

## ✨ STEP 5: Deploy to Vercel

### Method 1: Automatic Deployment (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Sign up / Log in with GitHub
3. Click "New Project"
4. Select your `valentine-website` repository
5. Click "Deploy"
6. Wait 30-60 seconds
7. Your site will be live at: `valentine-website.vercel.app`

### Method 2: Manual Deployment
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts
4. Your site will be live!

---

## 🎯 STEP 6: Final Checks

Before showing to Tanvi, verify:

- [ ] ✅ All 10 personal photos are in gallery
- [ ] ✅ Password works (Tanvi + xyzzz)
- [ ] ✅ All 8 days load without errors
- [ ] ✅ Animations work smoothly
- [ ] ✅ Responsive on mobile
- [ ] ✅ Site loads on Vercel URL
- [ ] ✅ Custom messages are personalized
- [ ] ✅ NO button runs away 😄

---

## 🔧 File-by-File Explanation

### `index.html`
- Main page structure
- 4 sections: Password, Proposal, Celebration, Gallery
- Tenor GIF embeds
- Form inputs

### `style.css`
- All styling and animations
- Responsive breakpoints for mobile
- Gradient backgrounds
- Animation keyframes
- Accessibility (focus states, reduced motion)

### `script.js`
- Page navigation logic
- Password validation
- YES button cursor tracking
- Current day progression
- Animation triggers (confetti, balloons, sparkles)
- Gallery initialization
- Data loading from JSON

### `assets/gifs.json`
- Centralized GIF configuration
- Easy to update without editing HTML/CSS
- Contains Tenor IDs for all GIFs

### `vercel.json`
- Deployment configuration
- Cache headers for optimization
- Tells Vercel how to deploy

### `.gitignore`
- Tells Git which files to ignore
- Excludes node_modules, .vercel, etc.

---

## 🐛 Troubleshooting

### "GIFs not loading"
- Check internet connection
- Verify all tenorIds in gifs.json are correct
- Try refreshing browser
- Check browser console (F12) for errors

### "Images not showing in gallery"
- Ensure files are named: img1.webp, img2.webp, etc.
- Confirm they're in `assets/images/` folder
- Check file paths are lowercase
- Verify .webp format (not .jpg, .png)

### "Password not working"
- Make sure you entered "tanvi" (case-insensitive)
- Password is "xyzzz" (case-sensitive)
- Clear browser cache if changed code

### "Button animation janky on mobile"
- This is normal - use touch instead
- Animations optimized for desktop
- Check `@media (prefers-reduced-motion)` in CSS

### "Deploy on Vercel failed"
- Check all files are pushed to GitHub
- No node_modules needed (static site)
- vercel.json is properly formatted
- No environment variables needed

---

## 📝 Making Changes After Deployment

### Update Messages
1. Edit `assets/gifs.json`
2. Push to GitHub:
   ```bash
   git add .
   git commit -m "Update messages"
   git push
   ```
3. Vercel auto-redeploys (30-60 seconds)

### Add More Photos
1. Optimize and add to `assets/images/`
2. Push to GitHub
3. Auto-deployed!

### Change GIFs
1. Update tenorId in `assets/gifs.json`
2. Git push (auto-deploy)

### Update Styling
1. Modify `style.css`
2. Test locally first
3. Git push

---

## 🎓 Advanced Customization

### Add Background Music
```js
// In script.js
const audio = new Audio('assets/ambient-music.mp3');
audio.volume = 0.3;
audio.loop = true;
// Play on YES click
```

### Add Typing Animation
```js
function typeMessage(element, text, speed = 50) {
    let index = 0;
    function type() {
        if (index < text.length) {
            element.textContent += text[index];
            index++;
            setTimeout(type, speed);
        }
    }
    type();
}
```

### Customize Colors
Edit `:root` in `style.css`:
```css
:root {
    --primary-pink: #your-color;
    --primary-red: #your-color;
}
```

---

## 📞 Need Help?

- Check browser console: F12 → Console tab
- Test locally before deploying
- Verify file names are exact (case-sensitive on Linux)
- Check Vercel deployment logs

---

## ✅ Ready to Propose?

1. ✅ Test everything locally
2. ✅ Push to GitHub
3. ✅ Deploy to Vercel
4. ✅ Share the link with Tanvi
5. ✅ Watch her smile! 💖

Good luck! This is going to be amazing! 🚀❤️
