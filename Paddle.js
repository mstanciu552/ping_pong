class Paddle {
  constructor(name, x, y, player) {
    this.name = name;
    this.width = 20;
    this.height = 200;
    this.score = 0;

    this.x = x;
    this.y = y - this.height;
    this.COLOR = color(255);
    this.speed = 11;

    this.player = player;
  }

  // Getters
  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  getCenter() {
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    };
  }

  getOuterPoints() {
    return {
      right: {
        up: new Point(this.x + this.width, this.y),
        down: new Point(this.x + this.width, this.y + this.height),
      },
      left: {
        up: new Point(this.x, this.y),
        down: new Point(this.x, this.y + this.height),
      },
    };
  }

  getScore() {
    return this.score;
  }

  // Setters
  setScore(score) {
    this.score = score;
  }

  draw() {
    noStroke();
    fill(this.COLOR);
    rect(this.x, this.y, this.width, this.height);

    this.keepScore();
  }

  move() {
    if (this.player === 1) {
      if (key === "w") this.y -= this.speed;
      else if (key === "s") this.y += this.speed;
    } else if (this.player === 2) {
      if (keyCode === UP_ARROW) this.y -= this.speed;
      else if (keyCode === DOWN_ARROW) this.y += this.speed;
    }
  }

  keepScore() {
    textSize(32);
    fill(255);
    if (this.player === 1) text(`${this.name}: ${this.score}`, 60, 30);
    else text(`${this.name}: ${this.score}`, width - 200, 30);
  }
}
