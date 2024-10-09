<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Snake Game</title>
    <style>
        canvas {
            border: 1px solid black;
            display: block;
            margin: 0 auto;
        }
        #gameOver {
            display: none;
            text-align: center;
            font-size: 24px;
            color: red;
        }
        #score {
            text-align: center;
            font-size: 24px;
        }
    </style>
</head>
<body>
    <div id="score">Score: 0</div>
    <div id="gameOver">YOU'RE LIQUIDATED. TRY AGAIN!</div>
    <canvas id="gameCanvas" width="400" height="400"></canvas>
    
    <script>
        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");

        let snake = [{ x: 5, y: 5 }];
        let food = {};
        let direction = { x: 1, y: 0 }; // Start moving to the right
        let score = 0;
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
            score = 0;
            snake = [{ x: 5, y: 5 }];
            direction = { x: 1, y: 0 }; // Start moving to the right
            placeFood();
            gameOver = false;
            document.getElementById("gameOver").style.display = "none";
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
                score++;
                placeFood();
            } else {
                snake.pop();
            }

            // Check for game over
            if (head.x < 0 || head.x >= canvas.width / 20 || head.y < 0 || head.y >= canvas.height / 20 || collision(head)) {
                gameOver = true;
                document.getElementById("gameOver").style.display = "block";
                document.getElementById("score").innerText = `Score: ${score}`;
                return;
            }

            // Update score display
            document.getElementById("score").innerText = `Score: ${score}`;
        }

        // Initialize the game
        startGame();
    </script>
</body>
</html>
