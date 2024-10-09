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
let bubbleTimer = null;

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
    message = ""; 
    messagePosition = { x: 0, y: 0 }; 
    gameLoop();
}

function restartGame() {
    startGame();
}

function gameLoop() {
    if (gameOver) return;

    draw();
    setTimeout(gameLoop, 100); 
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / 20)),
        y: Math.floor(Math.random() * (canvas.height / 20))
    };
}

function drawBull(x, y) {
    ctx.fillStyle = "brown";
    ctx.fillRect(x * 20, y * 20, 20, 20);
}

function drawBear(x, y) {
    ctx.fillStyle = "red";
    ctx.fillRect(x * 20, y * 20, 20, 20);
}

function collision(head) {
    return snake.some(segment => segment.x === head.x && segment.y === head.y);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    snake.forEach(segment => {
        drawBull(segment.x, segment.y);
    });

    drawBear(food.x, food.y);

    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        placeFood();
        showRandomMessage(head.x, head.y);
    } else {
        snake.pop();
    }

    if (head.x < 0 || head.x >= canvas.width / 20 || head.y < 0 || head.y >= canvas.height / 20 || collision(head)) {
        gameOver = true;
        gameOverDisplay.innerText = "YOU'RE LIQUIDATED. TRY AGAIN!";
        gameOverDisplay.style.display = "block";
        scoreDisplay.innerText = `Score: ${score}`;
        return;
    }

    scoreDisplay.innerText = `Score: ${score}`;

    if (message) {
        drawMessage(messagePosition.x, messagePosition.y, message);
    }
}

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

function showRandomMessage(x, y) {
    message = messages[Math.floor(Math.random() * messages.length)];
    messagePosition = { x: x, y: y };
    bubbleTimer = setTimeout(() => {
        message = ""; // Clear the message after some time
    }, 2000); // Message lasts for 2 seconds
}

function drawMessage(x, y, text) {
    const padding = 5;
    const borderRadius = 10;

    const textWidth = ctx.measureText(text).width;
    const textHeight = 20; 

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo((x) * 20 + borderRadius, (y) * 20);
    ctx.lineTo((x) * 20 + textWidth + padding + borderRadius, (y) * 20);
    ctx.quadraticCurveTo((x) * 20 + textWidth + padding + borderRadius, (y) * 20 + borderRadius, (x) * 20 + textWidth + padding + borderRadius, (y) * 20 + textHeight + borderRadius);
    ctx.lineTo((x) * 20 + borderRadius, (y) * 20 + textHeight + borderRadius);
    ctx.quadraticCurveTo((x) * 20, (y) * 20 + textHeight + borderRadius, (x) * 20, (y) * 20 + textHeight);
    ctx.lineTo((x) * 20, (y) * 20);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "white"; 
    ctx.fillText(text, (x) * 20 + padding, (y) * 20 + textHeight - 5);
}

startGame();
