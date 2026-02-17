# ⚡ ULTRA-SIMPLE DEPLOYMENT GUIDE

## Deploy Snake Game in 5 Minutes - No Docker Required!

---

## ✅ What You Need

- [ ] GitHub account (create at github.com)
- [ ] Akash CLI installed
- [ ] Akash wallet with 5 AKT tokens

**That's it!**

---

## 🚀 3 Simple Steps

### STEP 1: Upload to GitHub (2 min)

1. Go to **github.com** → Click **"+"** → **"New repository"**
2. Name: `snake-game` → Make it **Public** → **"Create repository"**
3. Click **"uploading an existing file"**
4. Drag these files:
   - `index.html`
   - `snake.js`
   - `deploy.yaml`
5. Click **"Commit changes"**

---

### STEP 2: Edit deploy.yaml (1 min)

1. Click on **`deploy.yaml`** → Click **pencil icon** (edit)
2. **Line 18-19** - Replace `YOUR_GITHUB_USERNAME` with your actual username
3. Example: 
   ```yaml
   wget -q https://raw.githubusercontent.com/helen123/snake-game/main/index.html
   wget -q https://raw.githubusercontent.com/helen123/snake-game/main/snake.js
   ```
4. Click **"Commit changes"**

---

### STEP 3: Deploy to Akash (2 min)

```bash
# Download deploy file
curl -O https://raw.githubusercontent.com/YOUR_USERNAME/snake-game/main/deploy.yaml

# Deploy!
akash tx deployment create deploy.yaml --from YOUR_WALLET
```

**Follow the prompts, accept a bid, get your URL!** 🎉

---

## 🎨 Customize Your Snake

**Edit `snake.js` on GitHub:**

```javascript
// Line 9 - Change snake color
let SNAKE_COLOR = '#FF1493';  // Hot pink!

// Line 8 - Change speed  
let GAME_SPEED = 50;  // Super fast!

// Line 19 - Change food shape
const FOOD_SHAPE = 'diamond';  // Try: 'circle', 'square', 'diamond'
```

**Commit → Redeploy → See changes!**

---

## 💰 Cost

**Setup:** FREE  
**Running:** ~$1-2/month (Akash only)

---

## 🐛 Problems?

**Can't download files?**
→ Make sure repo is Public, check username spelling

**Game looks broken?**
→ Check browser console (F12), verify files uploaded

**Container restarts?**
→ Check Akash logs, verify deploy.yaml syntax

---

## 🎉 Done!

You just deployed a game on decentralized cloud with:
- ✅ No Docker installation
- ✅ No building
- ✅ No complex setup
- ✅ 2 files total

**Welcome to Web3!** 🌐
