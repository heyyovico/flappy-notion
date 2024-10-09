const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");
const gameOverDisplay = document.getElementById("gameOver");

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 15, y: 15 };
let score = 0;
let gameOver = false;

// Draw the bull
function drawBull(x, y) {
    ctx.fillStyle = "#ffcc00"; // Bull color
    ctx.fillRect(x * 20, y * 20, 18, 18);
    ctx.fillStyle = "#000"; // Bull eyes
    ctx.beginPath();
    ctx.arc(x * 20 + 5, y * 20 + 5, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x * 20 + 15, y * 20 + 5, 3, 0, Math.PI * 2);
    ctx.fill();
}

// Draw the bear
function drawBear(x, y) {
    ctx.fillStyle = "#ff0000"; // Bear color
    ctx.fillRect(x * 20, y * 20, 18, 18);
}

// Main draw function
function draw() {
    if (gameOver) return;

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
    placeFood();
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
    }
}

document.addEventListener("keydown", changeDirection);
setInterval(draw, 100);
