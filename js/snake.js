const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const background = new Image();
background.src = 'img/background.jpeg';
const food = new Image();
food.src = 'img/food.png';
 
let box = 32;
let score = 0;

let foodCoord = {
    x: Math.floor((Math.random() * 15 + 3)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
};

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 9 * box,
};

document.addEventListener('keydown', toDirect);

let direction;

function toDirect(event) {
    if ((event.keyCode == 37) && (direction != 'right')) {
        direction = 'left';
    } else if ((event.keyCode == 38) && (direction != 'down')) {
        direction = 'up';
    } else if ((event.keyCode == 39) && (direction != 'left')) {
        direction = 'right';
    } else if ((event.keyCode == 40) && (direction != 'up')) {
        direction = 'down';
    }
}

function eatTail(head, snakeElements) {
    for (let i = 0; i < snakeElements.length; i++) {
        if (head.x == snakeElements[i].x && head.y == snakeElements[i].y) {
            clearInterval(game);
        }
    }
}

function fillCanvas() {
    // ctx.drawImage(background, 0, 0);
    // ctx.drawImage(food, foodCoord.x, foodCoord.y);

    // for (let i = 0; i < snake.length; i++) {
    //     ctx.fillStyle = i == 0 ? 'rgb(0, 153, 0)' : 'rgb(102, 204, 0)';
    //     ctx.fillRect(snake[i].x, snake[i].y, box, box);
    // }

    // ctx.fillStyle = 'white';
    // ctx.font = '50px Arial';
    // ctx.fillText(score, box, box * 1.5);
    // ctx.strokeStyle = 'red';
    // ctx.lineWidth = 1; 
    // ctx.beginPath(); 
    // ctx.moveTo(0, 64); 
    // ctx.lineTo(608, 64); 
    // ctx.stroke(); 


    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX == foodCoord.x && snakeY == foodCoord.y) {
        score += Math.floor((Math.random() * 17 + 8));
        foodCoord = {
            x: Math.floor((Math.random() * 15 + 3)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box,
        };
    } else {
        snake.pop();
    }

    if (snakeX < 0 || snakeX > box * 18 || snakeY < box * 2 || snakeY > box * 18) {
        clearInterval(game);
        return;
    } //?????????????????????

    if (direction == 'left') {
        snakeX -= box;
    }
    if (direction == 'right') {
        snakeX += box;
    }
    if (direction == 'up') {
        snakeY -= box;
    }
    if (direction == 'down') {
        snakeY += box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead, snake);

    snake.unshift(newHead);

    ctx.drawImage(background, 0, 0);
    ctx.drawImage(food, foodCoord.x, foodCoord.y);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? 'rgb(0, 153, 0)' : 'rgb(102, 204, 0)';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = 'white';
    ctx.font = '50px Arial';
    ctx.fillText(score, box, box * 1.5);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1; 
    ctx.beginPath(); 
    ctx.moveTo(0, 64); 
    ctx.lineTo(608, 64); 
    ctx.stroke(); 
}

let game = setInterval(fillCanvas, 125);