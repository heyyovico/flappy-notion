const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let snake = [{ x: 5, y: 5 }];
let food = {};
let direction = { x: 1, y: 0 }; // Start moving to the right
let gameOver = false;

const bullImage = new Image();
bullImage.src = 'bull.png'; // Ensure the path is correct

const bearImage = new Image();
bearImage.src = 'bear.png'; // Ensure the path is correct

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
                if (direction.y === 0) direction = { x: 0, y: -1 }; // Prevent reversing
                break;
            case "ArrowDown":
                if (direction.y === 0) direction = { x: 0, y: 1 }; // Prevent reversing
                break;
            case "ArrowLeft":
                if (direction.x === 0) direction = { x: -1, y: 0 }; // Prevent reversing
                break;
            case "ArrowRight":
                if (direction.x === 0) direction = { x: 1, y: 0 }; // Prevent reversing
                break;
        }
    }
});

function startGame() {
    snake = [{ x: 5, y: 5 }];
    direction = { x: 1, y: 0 }; // Start moving to the right
    placeFood();
    gameOver = false;
    gameLoop(); // Start the game loop
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
    ctx.drawImage(bullImage, x * 20, y * 20, 20, 20);
}

function drawBear(x, y) {
    ctx.drawImage(bearImage, x * 20, y * 20, 20, 20);
}

function collision(head) {
    return snake.some(segment => segment.x === head.x && segment.y === head.y);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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
        placeFood();
    } else {
        snake.pop();
    }

    // Check for game over
    if (head.x < 0 || head.x >= canvas.width / 20 || head.y < 0 || head.y >= canvas.height / 20 || collision(head)) {
        gameOver = true;
        alert("YOU'RE LIQUIDATED. TRY AGAIN!");
        return;
    }
}

// Initialize the game
startGame();
