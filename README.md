# Snake Game - Simple Static Version (No Docker Building!)


---


## 📁 Project Structure

```
snake-game/
├── index.html       # Complete game (HTML + CSS + structure)
├── snake.js         # Game logic (CUSTOMIZABLE!)
├── deploy.yaml      # Akash deployment config
└── README.md        # This file
```

---

### Note: Update deploy.yaml (1 minute)

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


---

### Deploy to Akash (2 minutes)

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

### "Want to update the game"

**Process:**
1. Edit files on GitHub
2. Commit changes
3. Close old Akash deployment
4. Create new deployment (downloads fresh files)

**Note:** Changes won't appear automatically since files are downloaded on startup. You must redeploy to see updates.

---
## 📚 Resources

- **Akash Docs:** https://docs.akash.network/
- **Akash Discord:** https://discord.akash.network/
- **This approach works for ANY static website!**

---


**Welcome to decentralized web hosting!** 🌐

---

## 🤝 Contributing

This is a starter template. Feel free to:
- Fork and customize
- Share with others
- Suggest improvements
- Create your own games

**Happy deploying!** 🚀
