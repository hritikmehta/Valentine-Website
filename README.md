# 💖 Valentine Interactive Website

A romantic, playful, and interactive Valentine's Day proposal website built with vanilla HTML, CSS, and JavaScript. Perfect for Vercel deployment.

## 🎯 Features

✨ **Interactive Proposal Page**: Large YES button that subtly follows cursor movement
💌 **8-Day Valentine Sequence**: Cycle through themed messages with Tenor GIFs
📸 **Image Gallery**: Dual-column flowing animation with personal memories
🎉 **Animations**: Floating hearts, balloons, confetti, and sparkles
🎨 **Responsive Design**: Works beautifully on mobile and desktop
🔐 **Password Protection**: Only Tanvi can access the proposal

## 📁 Project Structure

```
valentine-website/
├── index.html              # Main HTML file
├── style.css              # All styling (animations, responsive)
├── script.js              # All JavaScript logic
├── assets/
│   ├── gifs.json          # Tenor GIF configuration (easy to edit)
│   └── images/            # Personal photos (img1.webp - img10.webp)
├── vercel.json            # Vercel deployment config
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## 🚀 Quick Start

### Local Development

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd valentine-website
   ```

2. Open in VS Code or any text editor

3. Serve locally (using Python):
   ```bash
   python -m http.server 8000
   ```
   Then visit `http://localhost:8000`

   Or use VS Code's Live Server extension

### 🌐 Deploy to Vercel

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"
   - Your site will be live in seconds!

## 🎭 How It Works

### Page 1: Identity Check
- User enters name "Tanvi" and password "xyzzz"
- Access denied for others with cute running animation
- Special Capybara GIF on entry screen

### Page 2: Proposal
- "Will you be my Valentine?" - Main proposal page
- Large YES button that follows cursor subtly
- NO button runs away on hover
- Romantic wedding-themed GIF

### Pages 3-10: Celebration Days
Each day reveals:
- **Rose Day** 🌹: "A rose for the prettiest girl..."
- **Propose Day** 💍: "I choose you today..."
- **Chocolate Day** 🍫: "You're sweeter than chocolate..."
- **Teddy Day** 🧸: "Hug this teddy..."
- **Promise Day** 🤝: "I promise to annoy you forever..."
- **Hug Day** 🤗: "Sending warmest virtual hug..."
- **Kiss Day** 😘: "Flying kisses..."
- **Valentine's Day** ❤️: Final message with ultimate GIF

### Page 11: Memory Gallery
- Left column scrolls up continuously
- Right column scrolls down continuously
- Pause on hover
- Camera roll effect

## 🎨 Customization

### Edit Messages
Open `assets/gifs.json` and modify the `message` field for each day:
```json
{
  "day": "Rose Day 🌹",
  "message": "Your custom message here",
  "tenorId": "12517852071596871944"
}
```

### Change GIFs
1. Find GIFs on [tenor.com](https://tenor.com)
2. Get the GIF post ID from the URL
3. Update the `tenorId` in `assets/gifs.json`

### Add Personal Photos
1. Optimize images to `.webp` format (use [Squoosh](https://squoosh.app))
2. Keep each image under 300KB
3. Place in `assets/images/` folder as:
   - img1.webp, img2.webp, img3.webp, etc.
4. Update `script.js` gallery initialization if needed

### Change Colors
Edit CSS variables in `style.css`:
```css
:root {
    --primary-pink: #ff69b4;
    --primary-red: #e91e63;
    --light-pink: #ffc0cb;
}
```

## 🔐 Security Note

The password "xyzzz" is hardcoded. This site doesn't need backend security since it's just a fun proposal website. For anything sensitive, set up proper authentication!

## 📱 Browser Support

- ✅ Chrome, Firefox, Safari, Edge (latest versions)
- ✅ Mobile browsers (iOS Safari, Chrome Android)
- ✅ Works on tablets

## ⚡ Performance Tips

- All images are lazy-loaded
- Vercel CDN caches static assets
- GIFs loaded from Tenor (no local storage needed)
- Lightweight animations (CSS + vanilla JS)
- No heavy dependencies

## 🎵 Optional Enhancements

Want to add more features? Try:
- Background music on YES click
- Typing animation for messages
- Fireworks animation on final screen
- Sound effects
- More Valentine days
- Custom background music

## 💌 Pro Tips

1. **Test on mobile** before deployment
2. **Optimize all images** to .webp format
3. **Check GIF file sizes** - keep under 2MB each
4. **Use descriptive commit messages** if making changes
5. **Deploy daily** until you're ready to show Tanvi!

## 🐛 Troubleshooting

**GIFs not loading?**
- Check your internet connection (Tenor GIFs load from their CDN)
- Verify tenorId values in gifs.json

**Gallery images not showing?**
- Ensure images are in `assets/images/` folder
- Check file names match (img1.webp, img2.webp, etc.)
- Open browser console for error messages

**Button not tracking cursor?**
- Works best on desktop with mouse
- Mobile has touch interactions instead

## 📄 License

Free to use and modify for your Valentine! ❤️

---

Made with 💖 for Tanvi. May this proposal be as special as she is! 🌹
