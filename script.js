const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 20;
const tileCount = canvas.width / gridSize;
let snake = [{x: 10 * gridSize, y: 10 * gridSize}];
let apple = {x: 5 * gridSize, y: 5 * gridSize};
let dx = gridSize;
let dy = 0;
let score = 0;

function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, 100);
}

function update() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || collision(head)) {
        alert('Game Over');
        document.location.reload();
        return;
    }

    snake.unshift(head);
    
    if (head.x === apple.x && head.y === apple.y) {
        score++;
        placeApple();
    } else {
        snake.pop();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x, apple.y, gridSize, gridSize);

    ctx.fillStyle = 'green';
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, gridSize, gridSize);
    }

    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
}

function collision(head) {
    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }
    return false;
}

function placeApple() {
    apple = {
        x: Math.floor(Math.random() * tileCount) * gridSize,
        y: Math.floor(Math.random() * tileCount) * gridSize
    };
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (dy === 0) { dx = 0; dy = -gridSize; }
            break;
        case 'ArrowDown':
            if (dy === 0) { dx = 0; dy = gridSize; }
            break;
        case 'ArrowLeft':
            if (dx === 0) { dx = -gridSize; dy = 0; }
            break;
        case 'ArrowRight':
            if (dx === 0) { dx = gridSize; dy = 0; }
            break;
    }
});

gameLoop();
