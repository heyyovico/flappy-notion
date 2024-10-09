const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");
const gameOverDisplay = document.getElementById("gameOver");
const messageDisplay = document.createElement('div'); // Create a div to display messages
document.body.appendChild(messageDisplay); // Append it to the body
messageDisplay.style.fontSize = '24px'; // Set font size for the messages
messageDisplay.style.position = 'absolute'; // Position it absolutely
messageDisplay.style.top = '50px'; // Position it below the canvas
messageDisplay.style.left = '50%'; // Center it horizontally
messageDisplay.style.transform = 'translateX(-50%)'; // Center it correctly
messageDisplay.style.display = 'none'; // Hide it by default

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 15, y: 15 };
let score = 0;
let gameOver = false;
let gameStarted = false; // Track if the game has started

// Load images
const bullImage = new Image();
bullImage.src = 'bull.png'; // Ensure this file exists in your repo
const bearImage = new Image();
bearImage.src = 'bear.png'; // Ensure this file exists in your repo

// Array of random messages
const messages = [
    "PUMP IT",
    "YOLO",
    "DEGEN MODE",
    "APE",
    "ALL IN",
    "STONKS",
    "HODL",
    "STOP JEETING MFER",
    "PUNISH THE PAPERHANDS"
];

// Draw the bull (snake)
function drawBull(x, y) {
    ctx.drawImage(bullImage, x * 20, y * 20, 20, 20);
}

// Draw the bear (food)
function drawBear(x, y) {
    ctx.drawImage(bearImage, x * 20, y * 20, 20, 20);
}

// Main draw function
function draw() {
    if (gameOver) return; // Stop drawing if game is over

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake (bulls)
    snake.forEach((segment) => {
        drawBull(segment.x, segment.y);
    });

    // Draw the food (bear)
    drawBear(food.x, food.y);

    // Move the snake
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    // Check if snake eats food
    if (head.x === food.x && head.y === food.y) {
        score++;
        placeFood();
        showRandomMessage(); // Show a random message when eating a bear
    } else {
        snake.pop();
    }

    // Check for game over
    if (head.x < 0 || head.x >= canvas.width / 20 || head.y < 0 || head.y >= canvas.height / 20 || collision(head)) {
        gameOver = true;
        gameOverDisplay.style.display = "block"; // Show game over message
        scoreDisplay.innerText = `Score: ${score}`; // Display the score
        return;
    }

    // Update score display
    scoreDisplay.innerText = `Score: ${score}`;
}

function placeFood() {
    food.x = Math.floor(Math.random() * (canvas.width / 20));
    food.y = Math.floor(Math.random() * (canvas.height / 20));
}

function collision(head) {
    return snake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y);
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    score = 0;
    gameOver = false;
    gameOverDisplay.style.display = "none"; // Hide game over message
    messageDisplay.style.display = 'none'; // Hide random message
    placeFood();
    scoreDisplay.innerText = `Score: ${score}`; // Reset score display
}

function showRandomMessage() {
    const randomIndex = Math.floor(Math.random() * messages.length);
    messageDisplay.innerText = messages[randomIndex]; // Set random message
    messageDisplay.style.display = 'block'; // Show the message
    setTimeout(() => {
        messageDisplay.style.display = 'none'; // Hide after 2 seconds
    }, 2000);
}

function changeDirection(event) {
    switch (event.key) {
        case "ArrowUp":
            if (direction.y === 0) {
                direction = { x: 0, y: -1 };
            }
            break;
        case "ArrowDown":
            if (direction.y === 0) {
                direction = { x: 0, y: 1 };
            }
            break;
        case "ArrowLeft":
            if (direction.x === 0) {
                direction = { x: -1, y: 0 };
            }
            break;
        case "ArrowRight":
            if (direction.x === 0) {
                direction = { x: 1, y: 0 };
            }
            break;
        case " ":
            if (!gameStarted) {
                gameStarted = true; // Set game as started
                resetGame(); // Reset game state
            } else if (gameOver) {
                resetGame(); // Reset game if already over
            }
            break;
    }
}

document.addEventListener("keydown", changeDirection);
setInterval(draw, 100);
