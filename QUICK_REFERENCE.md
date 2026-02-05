# ⚡ Quick Reference Guide

Your complete Valentine's website is ready! This is your quick-start checklist.

---

## 📁 Project Files (All Created)

✅ **Core Files:**
- `index.html` - Main page with all 4 sections
- `style.css` - Complete styling + animations
- `script.js` - All interactive logic
- `assets/gifs.json` - GIF configuration (easy to edit)

✅ **Configuration:**
- `vercel.json` - Deployment settings
- `package.json` - Project metadata
- `.gitignore` - Files to ignore in Git
- `.gitattributes` - Line ending rules

✅ **Documentation:**
- `README.md` - Overview & features
- `INSTALLATION.md` - Step-by-step setup
- `CUSTOMIZE.md` - Personalization guide
- `QUICK_REFERENCE.md` - This file!

✅ **Folders (Create):**
- `assets/images/` - Your personal photos (create this)

---

## 🎯 The 4-Page Flow

### Page 1: Password Check 🔐
- **Screen:** "Click here if you are Tanvi 💖"
- **GIF:** Cute capybara
- **Input:** Name + password ("xyzzz")
- **Access:** Only "Tanvi" can continue

### Page 2: Proposal 💝
- **Screen:** "Will you be my Valentine?"
- **GIF:** Wedding-themed love animation
- **Button:** Large YES button (follows cursor secretly!)
- **NO Button:** Runs away when you try to click it 😄

### Pages 3-10: Celebration 🎉
- **8 Special Days:** Rose → Propose → Chocolate → Teddy → Promise → Hug → Kiss → Valentine
- **Each has:** Custom message + beautiful GIF
- **Animations:** Confetti, balloons, sparkles
- **Next Button:** Cycles through all 8 days

### Page 11: Memory Gallery 📸
- **Layout:** Two columns of photos
- **Animation:** Left scrolls up, right scrolls down
- **Effect:** Infinite looping camera roll
- **Photos:** Your personal images

---

## 🚀 Launch in 3 Steps

### Step 1: Add Your Photos
```
1. Optimize images to .webp (use squoosh.app)
2. Place in assets/images/
3. Name: img1.webp, img2.webp, img3.webp, etc.
```

### Step 2: Test Locally
```bash
python -m http.server 8000
# OR use VS Code Live Server extension
```
Then visit: `http://localhost:8000`

### Step 3: Deploy to Vercel
```bash
git add .
git commit -m "Initial commit"
git push
# Then: vercel.com → New Project → Deploy
```

---

## 🔧 Common Edits  

### Change a Message
**File:** `assets/gifs.json`
```json
"message": "A rose for the prettiest girl in my world"
         👆 Change to your message
```

### Change a GIF
**File:** `assets/gifs.json`
1. Find GIF on tenor.com
2. Copy post ID: `12345678901234567890`
3. Replace `tenorId` value

### Change a Color
**File:** `style.css` (find `:root`)
```css
--primary-pink: #ff69b4;  /* Change hex code */
```

### Change Password
**File:** `script.js`
```js
const PASSWORD = "xyzzz";  /* Change to new password */
```

### Change Name
**File:** `script.js`
```js
if (name.toLowerCase() !== 'tanvi') {
                              👆 Change name
```

---

## 🎨 Color Codes Quick Copy

**Pinks:**
- `#ff69b4` - Hot pink
- `#ffb6c1` - Light pink
- `#ff1493` - Deep pink

**Reds:**
- `#e91e63` - Pink-red
- `#c41e3a` - Deep red
- `#ff0000` - Pure red

**Purples:**
- `#8e44ad` - Purple
- `#9b59b6` - Light purple

---

## 🎬 GIF Tenor IDs (Provided)

```
Password Page:     12256602399307210452 (Capybara)
Proposal Page:     16918696612896855928 (Wedding love)
Rose Day:          12517852071596871944 (Love heart)
Propose Day:       12630807861956171243 (I love you)
Chocolate Day:     26291282             (Kiss)
Teddy Day:         12630807861956171243 (Love sticker)
Promise Day:       12630807861956171243 (I love you)
Hug Day:           24676320             (Big hugs)
Kiss Day:          16848068541201977632 (Kiss sticker)
Valentine's Day:   13300892748761143712 (Kiss I love you)
```

---

## 📋 Pre-Deployment Checklist

Before sharing with Tanvi:

- [ ] Test all 4 pages locally
- [ ] Enter "Tanvi" + "xyzzz" works
- [ ] All 8 celebration days show
- [ ] Gallery displays your photos
- [ ] Animations are smooth
- [ ] Mobile looks good (F12 → Device mode)
- [ ] YES button tracks cursor (desktop)
- [ ] NO button runs away (fun!)
- [ ] All text is personalized
- [ ] Vercel link is ready

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| GIFs not loading | Check internet, clear cache, F12 for errors |
| Photos not showing | Ensure names are `img1.webp`, `img2.webp`, etc. |
| Password doesn't work | Name is case-insensitive, password isn't |
| Button not tracking | Only works with mouse, not touch |
| Site won't deploy | Check all files pushed to GitHub |
| Changes not showing | Wait 30-60s for Vercel to rebuild |

---

## 📱 File Sizes

```
index.html  ~12 KB
style.css   ~35 KB
script.js   ~25 KB
gifs.json   ~2 KB
Total:      ~74 KB (very lean!)

+ Your images (optimized webp: 300KB each)
```

---

## 🌍 Share Your Site

After deploying to Vercel:

```
Your unique URL:
https://valentine-website.vercel.app

Send to Tanvi:
"I built something special for you... 💖"
[Send link]
```

---

## 💡 Pro Tips

1. **Backup before major changes** - Git is your friend
   ```bash
   git commit -m "Backup before color change"
   ```

2. **Test on phone before showing** - Responsive design matters
   
3. **Keep GIFs under 2MB each** - Vercel has limits

4. **Use `git status`** to see what changed
   ```bash
   git status
   ```

5. **Revert bad changes easily**
   ```bash
   git restore filename.ext
   ```

---

## 📞 Common Commands

```bash
# See current folder
pwd

# List all files
ls -la

# Start local server
python -m http.server 8000

# Check Git status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your message"

# Push to GitHub
git push

# View last 5 commits
git log --oneline -5
```

---

## 🎉 You're All Set!

Everything you need is created and ready to customize. Here's what to do next:

1. ✅ **Add your 10 personal photos** to `assets/images/`
2. ✅ **Customize messages** in `assets/gifs.json`
3. ✅ **Test locally** with Python server
4. ✅ **Push to GitHub**
5. ✅ **Deploy on Vercel**
6. ✅ **Share with Tanvi** 💖

---

## 📚 Full Documentation Files

- **README.md** - Features & overview
- **INSTALLATION.md** - Complete setup guide
- **CUSTOMIZE.md** - Personalization deep dive
- **This file!** - Quick reference

---

**Good luck with your proposal! Make her smile! 🌹❤️**

Questions? Check the docs or experiment locally - you can't break anything! 💪
