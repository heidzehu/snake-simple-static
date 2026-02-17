# 🐍 Snake Game - Simple Static Version (No Docker Building!)

**The EASIEST way to deploy a Snake game on Akash Network!**

No Docker Hub, no building, no complex setup - just 2 files and deploy! 🚀

---

## 🎯 What Makes This Simple?

### ❌ What You DON'T Need:
- Docker installed on your computer
- Docker Hub account
- GitHub Actions setup
- Building Docker images
- Managing secrets/tokens
- Python or FastAPI knowledge

### ✅ What You DO Need:
- GitHub account (free)
- 2 files (index.html + snake.js)
- Akash CLI + wallet with AKT tokens
- 5 minutes

---

## 📁 Project Structure

```
snake-game/
├── index.html       # Complete game (HTML + CSS + structure)
├── snake.js         # Game logic (CUSTOMIZABLE!)
├── deploy.yaml      # Akash deployment config
└── README.md        # This file
```

**That's it! Just 2 files for the game + 1 deployment file.**

---

## 🚀 QUICK START (5 Minutes Total)

### Step 1: Upload to GitHub (2 minutes)

1. **Go to github.com** and sign in

2. **Click "+" → "New repository"**
   ```
   Repository name: snake-game
   Public ✓
   ```

3. **Click "Create repository"**

4. **Click "uploading an existing file"**

5. **Drag and drop:**
   - `index.html`
   - `snake.js`
   - `deploy.yaml`
   - `README.md`

6. **Click "Commit changes"**

✅ Done! Your files are on GitHub.

---

### Step 2: Update deploy.yaml (1 minute)

1. **On GitHub, click on `deploy.yaml`**

2. **Click the pencil icon** (edit)

3. **Find these lines:**
   ```yaml
   wget -q https://raw.githubusercontent.com/YOUR_GITHUB_USERNAME/snake-game/main/index.html
   wget -q https://raw.githubusercontent.com/YOUR_GITHUB_USERNAME/snake-game/main/snake.js
   ```

4. **Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username**
   
   Example:
   ```yaml
   wget -q https://raw.githubusercontent.com/helen123/snake-game/main/index.html
   wget -q https://raw.githubusercontent.com/helen123/snake-game/main/snake.js
   ```

5. **Commit the change**

✅ Deploy file is ready!

---

### Step 3: Deploy to Akash (2 minutes)

On your computer with Akash CLI:

```bash
# Download the deploy file
curl -O https://raw.githubusercontent.com/YOUR_GITHUB_USERNAME/snake-game/main/deploy.yaml

# Deploy to Akash
akash tx deployment create deploy.yaml --from YOUR_WALLET

# Follow the prompts:
# - Wait for bids (10-30 seconds)
# - Accept a bid: akash tx market lease create --dseq DEPLOYMENT_ID --from YOUR_WALLET
# - Send manifest: akash provider send-manifest deploy.yaml --dseq DEPLOYMENT_ID --provider PROVIDER_ADDRESS --from YOUR_WALLET
# - Get your URL: akash provider lease-status --dseq DEPLOYMENT_ID --provider PROVIDER_ADDRESS --from YOUR_WALLET
```

✅ Your game is LIVE! 🎉

---

## 🎨 How to Customize

### Change Snake Color

1. **Edit `snake.js` on GitHub** (click pencil icon)

2. **Find line 9:**
   ```javascript
   let SNAKE_COLOR = '#4CAF50';
   ```

3. **Change to any color:**
   ```javascript
   let SNAKE_COLOR = '#FF1493';  // Hot pink!
   let SNAKE_COLOR = '#00FFFF';  // Cyan!
   let SNAKE_COLOR = '#FFD700';  // Gold!
   ```

4. **Commit changes**

5. **Redeploy to Akash** (closes old, creates new with fresh files)

### More Customization Options

All in `snake.js` - look for the **"CUSTOMIZATION SECTION"** at the top:

```javascript
// Grid size
const GRID_SIZE = 20;           // Make cells bigger/smaller

// Game speed
let GAME_SPEED = 100;           // Lower = faster

// Colors
let SNAKE_COLOR = '#4CAF50';
let FOOD_COLOR = '#FF5722';
let BG_COLOR = '#1a1a1a';

// Food shape
const FOOD_SHAPE = 'circle';    // Options: 'circle', 'square', 'diamond'

// Visual effects
const FOOD_GLOW = true;         // Glowing food
const GRID_LINES = true;        // Show grid lines

// Scoring
const POINTS_PER_FOOD = 10;     // Points per food eaten
```

### Change Theme (CSS)

Edit `index.html` and find the `:root` section (around line 11):

```css
:root {
    --primary-color: #4CAF50;      /* Main color */
    --secondary-color: #FF5722;    /* Accent color */
    --bg-dark: #0a0a0a;           /* Dark background */
}
```

**Example themes:**

**Neon Blue:**
```css
--primary-color: #00d9ff;
--secondary-color: #ff00ff;
--bg-dark: #0a0014;
```

**Retro Green:**
```css
--primary-color: #00ff00;
--secondary-color: #ffff00;
--bg-dark: #000000;
```

---

## 🔄 How It Works

```
┌─────────────────────────────────────────────────┐
│ GITHUB                                          │
│ Your 2 files stored here (free)                │
│ - index.html                                    │
│ - snake.js                                      │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│ AKASH PROVIDER                                  │
│ 1. Starts nginx:alpine container (public image)│
│ 2. Downloads your files from GitHub            │
│ 3. Serves them on port 80                      │
│ 4. You get a URL!                               │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│ YOUR SNAKE GAME IS LIVE! 🎉                     │
│ http://provider-url.akash.network               │
└─────────────────────────────────────────────────┘
```

**No building, no registries, no complexity!**

---

## 💰 Cost

**GitHub:** FREE  
**nginx image:** FREE (public)  
**Akash hosting:** ~$1-2/month (cheaper than full build version!)

**Why cheaper?**
- Uses only 0.1 CPU (vs 0.5)
- Uses only 128MB RAM (vs 512MB)
- No building overhead

---

## 🐛 Troubleshooting

### "Files not downloading"

**Problem:** Container can't download from GitHub

**Solution:**
1. Make sure your repo is **Public** (not private)
2. Check the URLs in deploy.yaml are correct
3. Check you replaced `YOUR_GITHUB_USERNAME` with actual username
4. Try visiting the URL in browser to verify:
   ```
   https://raw.githubusercontent.com/YOUR_USERNAME/snake-game/main/index.html
   ```

---

### "Container keeps restarting"

**Problem:** nginx exits immediately

**Solution:**
1. Check provider logs: `akash provider lease-logs`
2. Look for error messages
3. Common issue: GitHub username typo in deploy.yaml

---

### "Game loads but looks broken"

**Problem:** CSS not loading

**Solution:**
1. This shouldn't happen since CSS is embedded in index.html
2. Check browser console for errors (F12)
3. Verify index.html uploaded correctly

---

### "Want to update the game"

**Process:**
1. Edit files on GitHub
2. Commit changes
3. Close old Akash deployment
4. Create new deployment (downloads fresh files)

**Note:** Changes won't appear automatically since files are downloaded on startup. You must redeploy to see updates.

---

## 🎓 Workshop Tips

### For Workshop Leaders:

**Before Workshop:**
1. Create template repo with these files
2. Test deployment yourself
3. Note: participants need main/master branch (check yours)

**During Workshop:**
```
Time breakdown:
- Upload to GitHub: 2 min
- Edit deploy.yaml: 1 min  
- Deploy to Akash: 5 min
- Customize colors: 5 min
- Total: ~13 minutes
```

**What participants need:**
- ✅ GitHub account
- ✅ Akash CLI installed
- ✅ Wallet with 5 AKT tokens
- ❌ No Docker
- ❌ No Docker Hub
- ❌ No build tools

---

## 🎯 Advantages of This Approach

### ✅ Pros:
- **Simplest possible** - just 2 files
- **No accounts needed** - except GitHub & Akash
- **No building** - nginx image already exists
- **Cheapest** - $1-2/month
- **Fast deploy** - container starts in seconds
- **Easy to understand** - clear what's happening
- **Perfect for workshops** - minimal setup

### ⚠️ Limitations:
- Files download on every container start (~5 seconds)
- No backend/API capabilities (pure frontend)
- Must redeploy to see changes (not live updates)
- Relies on GitHub being accessible

---

## 🚀 Next Steps

Once deployed, you can:

1. **Share your game URL** with friends
2. **Customize colors** to make it unique
3. **Learn Akash** deployment process
4. **Add more features** to the game
5. **Try different games** with the same approach

---

## 📚 Resources

- **Akash Docs:** https://docs.akash.network/
- **Akash Discord:** https://discord.akash.network/
- **This approach works for ANY static website!**

---

## 💡 Pro Tips

### Make it faster:
Bundle both files into one HTML:
- Copy all of `snake.js` 
- Paste into `<script>` tags in index.html
- Now you only download 1 file!

### Add more files:
Just add more `wget` lines:
```bash
wget -q https://raw.githubusercontent.com/USER/snake-game/main/style.css
wget -q https://raw.githubusercontent.com/USER/snake-game/main/config.json
```

### Use a CDN:
Host files on GitHub Pages first, then reference:
```
wget -q https://YOUR_USERNAME.github.io/snake-game/index.html
```
Faster downloads!

---

## 🎉 Success!

You now have:
- ✅ A working Snake game
- ✅ Deployed on Akash Network
- ✅ No complex setup
- ✅ Easy to customize
- ✅ Cheap to run (~$1-2/month)

**Welcome to decentralized web hosting!** 🌐

---

## 🤝 Contributing

This is a starter template. Feel free to:
- Fork and customize
- Share with others
- Suggest improvements
- Create your own games

**Happy deploying!** 🚀
