// ==========================================
// CUSTOMIZATION SECTION - EASY TO MODIFY
// ==========================================

// Grid Configuration
const GRID_SIZE = 20;           // Size of each grid cell (pixels)
const CANVAS_SIZE = 400;        // Canvas dimensions (must be divisible by GRID_SIZE)
const GRID_COUNT = CANVAS_SIZE / GRID_SIZE;

// Default Game Settings (can be overridden by UI controls)
let GAME_SPEED = 100;           // Milliseconds between moves (lower = faster)
let SNAKE_COLOR = '#4CAF50';    // Default snake color (green)
let FOOD_COLOR = '#FF5722';     // Default food color (red/orange)
let BG_COLOR = '#1a1a1a';       // Default background color (dark)

// Visual Customization Options
const SNAKE_BORDER = true;      // Set to false to remove snake segment borders
const SNAKE_BORDER_COLOR = '#2d6a2f';  // Border color for snake segments
const SNAKE_BORDER_WIDTH = 2;   // Border thickness in pixels

const FOOD_SHAPE = 'circle';    // Options: 'circle', 'square', 'diamond'
const FOOD_GLOW = true;         // Add glow effect to food
const FOOD_GLOW_COLOR = 'rgba(255, 87, 34, 0.5)';

const GRID_LINES = true;        // Show grid lines on canvas
const GRID_LINE_COLOR = '#333'; // Grid line color

// Score Configuration
const POINTS_PER_FOOD = 10;     // Points awarded for each food item

// ==========================================
// GAME STATE VARIABLES
// ==========================================

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let snake = [];
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let food = { x: 0, y: 0 };
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameLoop = null;
let isGameRunning = false;

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
    attachEventListeners();
    updateHighScoreDisplay();
});

function initializeGame() {
    // Initialize snake in the center, length 3
    snake = [
        { x: Math.floor(GRID_COUNT / 2), y: Math.floor(GRID_COUNT / 2) },
        { x: Math.floor(GRID_COUNT / 2) - 1, y: Math.floor(GRID_COUNT / 2) },
        { x: Math.floor(GRID_COUNT / 2) - 2, y: Math.floor(GRID_COUNT / 2) }
    ];
    
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    score = 0;
    updateScoreDisplay();
    spawnFood();
    drawGame();
}

// ==========================================
// EVENT LISTENERS
// ==========================================

function attachEventListeners() {
    // Keyboard controls
    document.addEventListener('keydown', handleKeyPress);
    
    // UI Controls
    document.getElementById('startBtn').addEventListener('click', toggleGame);
    document.getElementById('resetBtn').addEventListener('click', resetGame);
    
    // Customization controls
    document.getElementById('snakeColor').addEventListener('change', (e) => {
        SNAKE_COLOR = e.target.value;
        drawGame();
    });
    
    document.getElementById('foodColor').addEventListener('change', (e) => {
        FOOD_COLOR = e.target.value;
        drawGame();
    });
    
    document.getElementById('bgColor').addEventListener('change', (e) => {
        BG_COLOR = e.target.value;
        drawGame();
    });
    
    document.getElementById('speed').addEventListener('change', (e) => {
        GAME_SPEED = parseInt(e.target.value);
        if (isGameRunning) {
            stopGame();
            startGame();
        }
    });
}

function handleKeyPress(e) {
    // Arrow keys and WASD support
    const key = e.key.toLowerCase();
    
    // Prevent default scrolling behavior
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
        e.preventDefault();
    }
    
    // Update direction (prevent 180-degree turns)
    if ((key === 'arrowup' || key === 'w') && direction.y === 0) {
        nextDirection = { x: 0, y: -1 };
    } else if ((key === 'arrowdown' || key === 's') && direction.y === 0) {
        nextDirection = { x: 0, y: 1 };
    } else if ((key === 'arrowleft' || key === 'a') && direction.x === 0) {
        nextDirection = { x: -1, y: 0 };
    } else if ((key === 'arrowright' || key === 'd') && direction.x === 0) {
        nextDirection = { x: 1, y: 0 };
    }
}

// ==========================================
// GAME LOOP CONTROLS
// ==========================================

function toggleGame() {
    if (isGameRunning) {
        stopGame();
    } else {
        startGame();
    }
}

function startGame() {
    if (!isGameRunning) {
        isGameRunning = true;
        document.getElementById('startBtn').textContent = 'Pause';
        gameLoop = setInterval(updateGame, GAME_SPEED);
    }
}

function stopGame() {
    if (isGameRunning) {
        isGameRunning = false;
        document.getElementById('startBtn').textContent = 'Resume';
        clearInterval(gameLoop);
    }
}

function resetGame() {
    stopGame();
    document.getElementById('startBtn').textContent = 'Start Game';
    initializeGame();
}

// ==========================================
// GAME LOGIC
// ==========================================

function updateGame() {
    // Update direction
    direction = { ...nextDirection };
    
    // Calculate new head position
    const newHead = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
    };
    
    // Check for collisions
    if (checkCollision(newHead)) {
        gameOver();
        return;
    }
    
    // Add new head
    snake.unshift(newHead);
    
    // Check if food was eaten
    if (newHead.x === food.x && newHead.y === food.y) {
        score += POINTS_PER_FOOD;
        updateScoreDisplay();
        spawnFood();
    } else {
        // Remove tail if no food eaten
        snake.pop();
    }
    
    drawGame();
}

function checkCollision(position) {
    // Wall collision
    if (position.x < 0 || position.x >= GRID_COUNT || 
        position.y < 0 || position.y >= GRID_COUNT) {
        return true;
    }
    
    // Self collision
    for (let segment of snake) {
        if (segment.x === position.x && segment.y === position.y) {
            return true;
        }
    }
    
    return false;
}

function spawnFood() {
    // Generate random position that's not occupied by snake
    let newFood;
    do {
        newFood = {
            x: Math.floor(Math.random() * GRID_COUNT),
            y: Math.floor(Math.random() * GRID_COUNT)
        };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    
    food = newFood;
}

function gameOver() {
    stopGame();
    
    // Update high score
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
        updateHighScoreDisplay();
    }
    
    alert(`Game Over! Your score: ${score}`);
    document.getElementById('startBtn').textContent = 'Start Game';
}

// ==========================================
// RENDERING
// ==========================================

function drawGame() {
    // Clear canvas
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    
    // Draw grid lines (if enabled)
    if (GRID_LINES) {
        drawGridLines();
    }
    
    // Draw food
    drawFood();
    
    // Draw snake
    drawSnake();
}

function drawGridLines() {
    ctx.strokeStyle = GRID_LINE_COLOR;
    ctx.lineWidth = 0.5;
    
    for (let i = 0; i <= GRID_COUNT; i++) {
        // Vertical lines
        ctx.beginPath();
        ctx.moveTo(i * GRID_SIZE, 0);
        ctx.lineTo(i * GRID_SIZE, CANVAS_SIZE);
        ctx.stroke();
        
        // Horizontal lines
        ctx.beginPath();
        ctx.moveTo(0, i * GRID_SIZE);
        ctx.lineTo(CANVAS_SIZE, i * GRID_SIZE);
        ctx.stroke();
    }
}

function drawSnake() {
    snake.forEach((segment, index) => {
        const x = segment.x * GRID_SIZE;
        const y = segment.y * GRID_SIZE;
        
        // Draw snake segment
        ctx.fillStyle = SNAKE_COLOR;
        ctx.fillRect(x, y, GRID_SIZE, GRID_SIZE);
        
        // Draw border (if enabled)
        if (SNAKE_BORDER) {
            ctx.strokeStyle = SNAKE_BORDER_COLOR;
            ctx.lineWidth = SNAKE_BORDER_WIDTH;
            ctx.strokeRect(x, y, GRID_SIZE, GRID_SIZE);
        }
        
        // Draw eyes on head
        if (index === 0) {
            drawSnakeEyes(x, y);
        }
    });
}

function drawSnakeEyes(x, y) {
    ctx.fillStyle = '#000';
    const eyeSize = 3;
    const eyeOffset = 6;
    
    // Position eyes based on direction
    if (direction.x === 1) { // Moving right
        ctx.fillRect(x + GRID_SIZE - eyeOffset, y + 5, eyeSize, eyeSize);
        ctx.fillRect(x + GRID_SIZE - eyeOffset, y + GRID_SIZE - 8, eyeSize, eyeSize);
    } else if (direction.x === -1) { // Moving left
        ctx.fillRect(x + eyeOffset - eyeSize, y + 5, eyeSize, eyeSize);
        ctx.fillRect(x + eyeOffset - eyeSize, y + GRID_SIZE - 8, eyeSize, eyeSize);
    } else if (direction.y === -1) { // Moving up
        ctx.fillRect(x + 5, y + eyeOffset - eyeSize, eyeSize, eyeSize);
        ctx.fillRect(x + GRID_SIZE - 8, y + eyeOffset - eyeSize, eyeSize, eyeSize);
    } else { // Moving down
        ctx.fillRect(x + 5, y + GRID_SIZE - eyeOffset, eyeSize, eyeSize);
        ctx.fillRect(x + GRID_SIZE - 8, y + GRID_SIZE - eyeOffset, eyeSize, eyeSize);
    }
}

function drawFood() {
    const x = food.x * GRID_SIZE;
    const y = food.y * GRID_SIZE;
    const centerX = x + GRID_SIZE / 2;
    const centerY = y + GRID_SIZE / 2;
    
    // Draw glow effect (if enabled)
    if (FOOD_GLOW) {
        ctx.shadowBlur = 15;
        ctx.shadowColor = FOOD_GLOW_COLOR;
    }
    
    ctx.fillStyle = FOOD_COLOR;
    
    // Draw food based on selected shape
    if (FOOD_SHAPE === 'circle') {
        ctx.beginPath();
        ctx.arc(centerX, centerY, GRID_SIZE / 2 - 2, 0, Math.PI * 2);
        ctx.fill();
    } else if (FOOD_SHAPE === 'diamond') {
        ctx.beginPath();
        ctx.moveTo(centerX, y + 2);
        ctx.lineTo(x + GRID_SIZE - 2, centerY);
        ctx.lineTo(centerX, y + GRID_SIZE - 2);
        ctx.lineTo(x + 2, centerY);
        ctx.closePath();
        ctx.fill();
    } else { // square
        ctx.fillRect(x + 2, y + 2, GRID_SIZE - 4, GRID_SIZE - 4);
    }
    
    // Reset shadow
    ctx.shadowBlur = 0;
}

// ==========================================
// UI UPDATES
// ==========================================

function updateScoreDisplay() {
    document.getElementById('score').textContent = score;
}

function updateHighScoreDisplay() {
    document.getElementById('highScore').textContent = highScore;
}
