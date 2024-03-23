"use strict"

// Global game-variables
const game = {
    canvas: null,
    context: null,
    width: 800,
    height: 600,
    frametime: 1 / 60
};

const ball = {
    pos: {
        x: game.width / 2,
        y: game.height / 4
    },
    velocity: {
        x: 50 * game.frametime,
        y: 0
    },
    accelleration: {
        x: 0,
        y: 0.1 * game.frametime
    },
    color: "red",
    radius: 20,
};

function updateBall() {
    //update movement
    ball.velocity.x += ball.accelleration.x;
    ball.velocity.y += ball.accelleration.y;
    ball.pos.x += ball.velocity.x;
    ball.pos.y += ball.velocity.y;

    //bounds/bounce checking ;)
    const ballLeft = ball.pos.x - ball.radius;
    const ballRight = ball.pos.x + ball.radius;
    const ballBottom = ball.pos.y + ball.radius;
    const ballTop = ball.pos.y - ball.radius;
    //horizontal
    if (ballLeft < 0 || ballRight > game.width) {
        ball.velocity.x = -ball.velocity.x;
        ball.pos.x = ballLeft < 0 ? ball.radius : game.width - ball.radius;
    }
    //vertical
    if (ballBottom > game.height || ballTop < 0) {
        ball.velocity.y = -ball.velocity.y;
        ball.pos.y = ballBottom > game.height ? game.height - ball.radius : ball.radius;
    }
}

function draw(context) {
    //draw background
    context.fillStyle = "black";
    context.fillRect(0, 0, game.width, game.height);
    //draw ball (pacman)
    context.beginPath();
    context.arc(ball.pos.x, ball.pos.y, ball.radius, Math.PI / 6,  Math.PI * 11 / 6);
    context.lineTo(ball.pos.x, ball.pos.y); //close the mouth
    context.fillStyle = ball.color;
    context.fill();
    //draw "UI"
    context.beginPath();
    context.fillStyle = "yellow";
    context.strokeStyle = "yellow";
    context.strokeRect(5, 5, 400, 60);
    context.fillText(`yPos: ${ball.pos.y}`, 10, 30);
    context.fillText(`xPos: ${ball.pos.x}`, 10, 55);
}

function update() {
    updateBall();
    draw(game.context);
}

document.addEventListener("DOMContentLoaded", () => {
    game.canvas = document.getElementById("spelletje");

    //Initialise the context class
    game.context = game.canvas.getContext("2d");
    game.context.font = "20px cursive";
    game.context.lineWidth = 5;

    setInterval(update, game.frametime);
})
