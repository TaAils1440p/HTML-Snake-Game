const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");

const gridSize = 20;
let snake = [{ x: 200, y: 200 }];
let direction = "RIGHT";
let food = { x: getRandomCoord(), y: getRandomCoord() };
let gameInterval;

document.addEventListener("keydown", changeDirection);
startButton.addEventListener("click", startGame);

function startGame() {
    clearInterval(gameInterval); // Réinitialiser l'ancien jeu s'il y en a un
    snake = [{ x: 200, y: 200 }];
    direction = "RIGHT";
    food = { x: getRandomCoord(), y: getRandomCoord() };
    gameInterval = setInterval(updateGame, 100);
}

function updateGame() {
    moveSnake();
    if (checkCollision()) {
        clearInterval(gameInterval);
        alert("Game Over!");
        return;
    }
    drawGame();
}

function moveSnake() {
    let head = { ...snake[0] };
    if (direction === "UP") head.y -= gridSize;
    if (direction === "DOWN") head.y += gridSize;
    if (direction === "LEFT") head.x -= gridSize;
    if (direction === "RIGHT") head.x += gridSize;
    
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        food = { x: getRandomCoord(), y: getRandomCoord() };
    } else {
        snake.pop();
    }
}

function checkCollision() {
    let head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function drawGame() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
    
    ctx.fillStyle = "lime";
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, gridSize, gridSize));
}

function changeDirection(event) {
    const key = event.key;
    if (key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

function getRandomCoord() {
    return Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
}