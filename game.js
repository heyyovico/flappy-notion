const canvas = document.getElementById('flappyBirdCanvas');
const ctx = canvas.getContext('2d');

// Load images
const bird = new Image();
bird.src = 'https://i.imgur.com/OjTDsM2.png'; // Bird sprite

const bg = new Image();
bg.src = 'https://i.imgur.com/oDVzh93.png'; // Background

const fg = new Image();
fg.src = 'https://i.imgur.com/AqC7rUN.png'; // Foreground

const pipeNorth = new Image();
pipeNorth.src = 'https://i.imgur.com/ZlaDyvJ.png'; // North pipe

const pipeSouth = new Image();
pipeSouth.src = 'https://i.imgur.com/FlhhTLq.png'; // South pipe

// Game variables
const gap = 85;
let constant;

let bX = 10;
let bY = 150;
let gravity = 1.5;
let score = 0;

// Audio files
const fly = new Audio();
const scor = new Audio();
fly.src = 'https://www.soundjay.com/button/beep-07.wav';
scor.src = 'https://www.soundjay.com/button/beep-06.wav';

// Pipe coordinates
let pipes = [];

pipes[0] = {
    x: canvas.width,
    y: 0
};

// User presses key
document.addEventListener('keydown', moveUp);

function moveUp() {
    bY -= 25;
    fly.play();
}

// Draw images and pipes
function draw() {
    ctx.drawImage(bg, 0, 0);

    for (let i = 0; i < pipes.length; i++) {
        constant = pipeNorth.height + gap;
        ctx.drawImage(pipeNorth, pipes[i].x, pipes[i].y);
        ctx.drawImage(pipeSouth, pipes[i].x, pipes[i].y + constant);

        pipes[i].x--;

        if (pipes[i].x == 125) {
            pipes.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            });
        }

        // Detect collision
        if (
            (bX + bird.width >= pipes[i].x && bX <= pipes[i].x + pipeNorth.width &&
                (bY <= pipes[i].y + pipeNorth.height || bY + bird.height >= pipes[i].y + constant)) ||
            bY + bird.height >= canvas.height - fg.height
        ) {
            location.reload(); // Reload the page
        }

        if (pipes[i].x == 5) {
            score++;
            scor.play();
        }
    }

    ctx.drawImage(fg, 0, canvas.height - fg.height);
    ctx.drawImage(bird, bX, bY);

    bY += gravity;

    ctx.fillStyle = '#000';
    ctx.font = '20px Verdana';
    ctx.fillText('Score: ' + score, 10, canvas.height - 20);

    requestAnimationFrame(draw);
}

draw();
