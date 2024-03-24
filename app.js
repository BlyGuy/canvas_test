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
    color: "yellow",
    radius: 20,
    mouthOpen: 0,
    mouthOpenSpeed: 1,
    mouthIsOpening: true
};

function updateBallColor(color) {
    ball.color = color;
}

function updateBallSpeed(speed) {
    const newVelocity = speed * game.frametime
    if (ball.velocity.x > 0) {
        ball.velocity.x = newVelocity;
        return;
    }
    ball.velocity.x = - newVelocity;
}

function updateBallBounciness(bounciness) {
    const newAccelleration = bounciness * game.frametime;
    ball.accelleration.y = newAccelleration;
}

function updateBall() {
    //update mouth animation
    if (ball.mouthIsOpening) {
        ball.mouthOpen += ball.mouthOpenSpeed * game.frametime;
        if (ball.mouthOpen >= 1) {
            ball.mouthIsOpening = false;
            ball.mouthOpen = 1;
        }
    } else {
        ball.mouthOpen -= ball.mouthOpenSpeed * game.frametime;
        if (ball.mouthOpen <= 0) {
            ball.mouthIsOpening = true;
            ball.mouthOpen = 0;
        }
    }

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
    const mouthAngle = Math.PI / 4 * ball.mouthOpen;
    context.beginPath();
    context.arc(ball.pos.x, ball.pos.y, ball.radius, mouthAngle,  2 * Math.PI - mouthAngle);
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
