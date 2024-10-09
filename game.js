function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the canvas border
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5; // Set the line width for the border
    ctx.strokeRect(0, 0, canvas.width, canvas.height); // Draw the canvas border

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
        drawMessage(head.x * 20, head.y * 20, message);
    }
}
