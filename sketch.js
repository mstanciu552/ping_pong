var ball;

var player1;
var player2;

function setup() {
  createCanvas(800, 640);
  ball = new Ball(400, 300, width, height);

  player1 = new Paddle("player1", 20, height / 2, 1);
  player2 = new Paddle("player2", width - 40, height / 2, 2);
}

function draw() {
  background(51);

  ball.draw();
  ball.move();

  player1.draw();
  if (keyIsPressed) player1.move(key);
  ball.checkCollision(player1, 1);

  player2.draw();
  if (keyIsPressed) player2.move(keyCode);
  ball.checkCollision(player2, 2);

  debug();
}

function startGame(div, button) {
  loop();
  div.remove();
  button.remove();
}

function handleGameOver() {
  noLoop();

  let div = createDiv("").size(400, 100);
  div.html(
    `<h1>Winner is <b>${
      player1.getScore() < player2.getScore() ? player2.name : player1.name
    }</b></h1>`,
    true
  );

  let button = createButton("Replay")
    .size(100, 30)
    .mousePressed(() => startGame(div, button));
}

function debug() {
  if (mouseIsPressed) {
    console.log(`Mouse X: ${mouseX}\nMouse Y: ${mouseY}`);
    console.log(
      `Ball Outer Side Left: ${ball.getCenter().x - ball.getRadius()}`
    );
    console.log(
      `Ball Outer Side Right: ${ball.getCenter().x + ball.getRadius()}`
    );
  }
}
