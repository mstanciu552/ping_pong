class Ball {
  constructor(x, y, w, h) {
    // Screen dimensions
    this.screenWidth = w;
    this.screenHeight = h;

    // Drawing
    this.x = x;
    this.y = y;
    this.radius = 25;
    this.COLOR = color(255, 0, 0);

    // Physics
    this.speed = 6;

    let direction = [-1, 1];

    this.dirX = direction[floor(random(0, 2))] * this.speed;
    this.dirY = direction[floor(random(0, 2))] * this.speed;
  }

  // Getters
  getRadius() {
    return this.radius;
  }

  getCenter() {
    return {
      x: this.x,
      y: this.y,
    };
  }

  getOuterBounds() {
    return {
      right: {
        up: new Point(this.x + this.radius, this.y - this.radius),
        down: new Point(this.x + this.radius, this.y + this.radius),
      },
      left: {
        up: new Point(this.x - this.radius, this.y - this.radius),
        down: new Point(this.x - this.radius, this.y + this.radius),
      },
    };
  }

  draw() {
    noStroke();
    fill(this.COLOR);
    ellipse(this.x, this.y, this.radius * 2);
  }

  move() {
    this.x += this.dirX;
    this.checkLimitX();

    this.y += this.dirY;
    this.checkLimitY();
  }

  // Check if the ball is within the board on X axis
  checkLimitX() {
    if (
      !(
        this.getOuterBounds().left.up.x > 0 &&
        this.getOuterBounds().right.up.x <= this.screenWidth
      )
    ) {
      // Game over
      this.x = width / 2;
      this.y = height / 2;

      handleGameOver();
    }
  }

  // Check if the ball is within the board on Y axis
  checkLimitY() {
    if (
      !(this.y > 0 + this.radius && this.y <= this.screenHeight - this.radius)
    )
      this.dirY = -this.dirY;
  }

  checkCollision(paddle, player) {
    // Right side of the ball -> left side of the paddle
    if (player === 2) {
      let rightSideOfBall = this.getOuterBounds().right;
      let leftSideOfPaddle = paddle.getOuterPoints().left;

      if (
        leftSideOfPaddle.up.x <= rightSideOfBall.up.x &&
        leftSideOfPaddle.down.x <= rightSideOfBall.down.x
      )
        if (
          leftSideOfPaddle.up.y <= rightSideOfBall.up.y &&
          rightSideOfBall.up.y <= leftSideOfPaddle.down.y &&
          leftSideOfPaddle.up.y <= rightSideOfBall.up.y &&
          rightSideOfBall.down.y <= leftSideOfPaddle.down.y
        ) {
          this.dirX = -this.dirX;
          this.x -= 30;
          paddle.setScore(paddle.getScore() + 1);
        }
      // Left side of the ball -> right side of the paddle
    } else if (player === 1) {
      let leftSideOfBall = this.getOuterBounds().left;
      let rightSideOfPaddle = paddle.getOuterPoints().right;

      if (
        rightSideOfPaddle.up.x >= leftSideOfBall.up.x &&
        rightSideOfPaddle.down.x >= leftSideOfBall.down.x
      )
        if (
          rightSideOfPaddle.up.y <= leftSideOfBall.up.y &&
          leftSideOfBall.up.y <= rightSideOfPaddle.down.y &&
          rightSideOfPaddle.up.y <= leftSideOfBall.up.y &&
          leftSideOfBall.down.y <= rightSideOfPaddle.down.y
        ) {
          this.dirX = -this.dirX;
          this.x += 30;
          paddle.setScore(paddle.getScore() + 1);
        }
    }
  }
}
