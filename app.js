"use strict"

// Global game-variables
const game = {
    canvas: null,
    context: null,
    width: 800,
    height: 600,
};

const ball = {
    pos: {
        x: game.width / 2,
        y: game.height / 2
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: "#FF0000",
    radius: 20
};

function draw() {
    //draw background
    game.context.fillStyle = "black";
    game.context.fillRect(0, 0, game.width, game.height);
    //draw ball
    game.context.fillStyle = ball.color;
    game.context.fillRect(ball.pos.x - ball.radius, ball.pos.y - ball.radius,
                          ball.radius, ball.radius);
    //TODO: draw bouncing ball
}

function update() {
    //TODO: update game logic
    draw();
}

document.addEventListener("DOMContentLoaded", () => {
    game.canvas = document.getElementById("spelletje");
    game.context = game.canvas.getContext("2d");

    setInterval(update, 1/60);
})
