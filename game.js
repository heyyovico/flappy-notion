const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let snake = [{ x: 5, y: 5 }];
let food = {};
let direction = { x: 0, y: 0 };
let score = 0;
let gameOver = false;
const scoreDisplay = document.getElementById("score");
const gameOverDisplay = document.getElementById("gameOver");
let message = "";
let messagePosition = { x: 0, y: 0 };

document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        if (gameOver) {
            restartGame();
        } else {
            startGame();
        }
    } else if (!gameOver) {
        switch (event.code) {
            case "ArrowUp":
                if (direction.y === 0) direction = { x: 0, y: -1 };
                break;
            case "ArrowDown":
                if (direction.y === 0) direction = { x: 0, y: 1 };
                break;
            case "ArrowLeft":
                if (direction.x === 0) direction = { x: -1, y: 0 };
                break;
            case "ArrowRight":
                if (direction.x === 0) direction = { x: 1, y: 0 };
                break;
        }
    }
});

function startGame() {
    score = 0;
    snake = [{ x: 5, y: 5 }];
    direction = { x: 0, y: 0 };
    placeFood();
    gameOver = false;
    gameOverDisplay.style.display = "none";
    message = ""; // Reset message
    messagePosition = { x: 0, y: 0 }; // Reset message position
    gameLoop();
}

function restartGame() {
    startGame();
}

function gameLoop() {
    if (gameOver) return;

    draw();
    setTimeout(gameLoop, 100); // Adjust game speed here
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / 20)),
        y: Math.floor(Math.random() * (canvas.height / 20))
    };
}

function drawBull(x, y) {
    ctx.fillStyle = "brown"; // Change this to an actual bull image if desired
    ctx.fillRect(x * 20, y * 20, 20, 20);
}

function drawBear(x, y) {
    ctx.fillStyle = "red"; // Change this to an actual bear image if desired
    ctx.fillRect(x * 20, y * 20, 20, 20);
}

function collision(head) {
    return snake.some(segment => segment.x === head.x && segment.y === head.y);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the canvas border
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;
    ctx.strokeRect(0, 0, canvas.width, canvas.height); // Draw the canvas border

    // Draw the snake (bulls)
    snake.forEach(segment => {
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
        showRandomMessage(head.x, head.y);
    } else {
        snake.pop();
    }

    // Check for game over
    if (head.x < 0 || head.x >= canvas.width / 20 || head.y < 0 || head.y >= canvas.height / 20 || collision(head)) {
        gameOver = true;
        gameOverDisplay.innerText = "YOU'RE LIQUIDATED. TRY AGAIN!";
        gameOverDisplay.style.display = "block";
        scoreDisplay.innerText = `Score: ${score}`;
        return;
    }

    // Update score display
    scoreDisplay.innerText = `Score: ${score}`;

    // Draw the message if it exists
    if (message) {
        drawMessage(head.x, head.y, message);
    }
}

// Chat bubble settings
const bubbleOffset = { x: 0, y: -25 };
function showRandomMessage(x, y) {
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
    message = messages[Math.floor(Math.random() * messages.length)];
    messagePosition = { x: x, y: y }; // Set message position to the bull's position
}

function drawMessage(x, y, text) {
    const padding = 5;
    const borderRadius = 10;

    // Calculate text dimensions
    const textWidth = ctx.measureText(text).width;
    const textHeight = 20; // Approximate height of the text

    // Draw chat bubble background
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo((x + bubbleOffset.x) * 20 + borderRadius, (y + bubbleOffset.y) * 20);
    ctx.lineTo((x + bubbleOffset.x) * 20 + textWidth + padding + borderRadius, (y + bubbleOffset.y) * 20);
    ctx.quadraticCurveTo((x + bubbleOffset.x) * 20 + textWidth + padding + borderRadius, (y + bubbleOffset.y) * 20 + borderRadius, (x + bubbleOffset.x) * 20 + textWidth + padding + borderRadius, (y + bubbleOffset.y) * 20 + textHeight + borderRadius);
    ctx.lineTo((x + bubbleOffset.x) * 20 + borderRadius, (y + bubbleOffset.y) * 20 + textHeight + borderRadius);
    ctx.quadraticCurveTo((x + bubbleOffset.x) * 20, (y + bubbleOffset.y) * 20 + textHeight + borderRadius, (x + bubbleOffset.x) * 20, (y + bubbleOffset.y) * 20 + textHeight);
    ctx.lineTo((x + bubbleOffset.x) * 20, (y + bubbleOffset.y) * 20);
    ctx.closePath();
    ctx.fill();

    // Draw message text
    ctx.fillStyle = "white"; // Message text color
    ctx.fillText(text, (x + bubbleOffset.x) * 20 + padding, (y + bubbleOffset.y) * 20 + textHeight - 5);
}

// Initialize the game
startGame();
