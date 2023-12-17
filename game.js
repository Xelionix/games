// Constants
const WIDTH = 800;
const HEIGHT = 600;
const PLAYER_RADIUS = 20;
const COIN_SIZE = 20;

// Colors
const WHITE = '#FFFFFF';
const BLUE = '#0000FF';
const YELLOW = '#FFFF00';

// Game variables
let playerX = WIDTH / 2;
let playerY = HEIGHT / 2;
let coins = [];
let score = 0;

// Set up the game canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Main game loop
function gameLoop() {
    // Update player position
    playerX += (keys.right - keys.left) * 5;
    playerY += (keys.down - keys.up) * 5;

    // Spawn a new coin at a random position
    if (Math.random() < 0.02) {
        const coinX = Math.random() * (WIDTH - COIN_SIZE);
        const coinY = Math.random() * (HEIGHT - COIN_SIZE);
        coins.push({ x: coinX, y: coinY });
    }

    // Check for collision with coins
    coins = coins.filter((coin) => {
        const playerRect = { x: playerX - PLAYER_RADIUS, y: playerY - PLAYER_RADIUS, width: 2 * PLAYER_RADIUS, height: 2 * PLAYER_RADIUS };
        const coinRect = { x: coin.x, y: coin.y, width: COIN_SIZE, height: COIN_SIZE };

        if (!(playerRect.x > coinRect.x + coinRect.width ||
              playerRect.x + playerRect.width < coinRect.x ||
              playerRect.y > coinRect.y + coinRect.height ||
              playerRect.y + playerRect.height < coinRect.y)) {
            // Collision detected
            score += 1;
            return false; // Remove the coin from the array
        }

        return true; // Keep the coin in the array
    });

    // Draw the game elements
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = WHITE;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = BLUE;
    ctx.beginPath();
    ctx.arc(playerX, playerY, PLAYER_RADIUS, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = YELLOW;
    for (const coin of coins) {
        ctx.beginPath();
        ctx.moveTo(coin.x, coin.y);
        ctx.lineTo(coin.x + COIN_SIZE, coin.y);
        ctx.lineTo(coin.x + COIN_SIZE / 2, coin.y + COIN_SIZE);
        ctx.closePath();
        ctx.fill();
    }

    // Display the score
    ctx.fillStyle = BLUE;
    ctx.font = '24px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);

    requestAnimationFrame(gameLoop);
}

// Keyboard input
const keys = { left: false, right: false, up: false, down: false };
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') keys.left = true;
    if (event.key === 'ArrowRight') keys.right = true;
    if (event.key === 'ArrowUp') keys.up = true;
    if (event.key === 'ArrowDown') keys.down = true;
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft') keys.left = false;
    if (event.key === 'ArrowRight') keys.right = false;
    if (event.key === 'ArrowUp') keys.up = false;
    if (event.key === 'ArrowDown') keys.down = false;
});

// Start the game loop
gameLoop();
