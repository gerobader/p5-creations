// adapted from shiffman pendulum https://www.youtube.com/playlist?list=PLRqwX-V7Uu6bR4BcLjHHTopXItSjRA7yG
function Pendulum(x, y, length, startingAngle) {
  this.pos = createVector(x, y);
  this.length = length;
  this.angle = startingAngle;

  this.aVel = 0;
  this.aAcc = 0;
  this.drag = 0.001;

  this.execute = function () {
    this.update();
    this.display();
  };

  this.update = function () {
    const time = map(mouseX, 0, window.innerWidth, 0, 1);
    this.aAcc = (-0.8 / this.length) * sin(this.angle);
    this.aVel += this.aAcc;
    this.aVel *= 1- this.drag;
    this.angle += this.aVel;
  };

  this.display = function () {
    push();
    translate(this.pos.x, this.pos.y );
    x = this.length * Math.sin(this.angle);
    y = this.length * Math.cos(this.angle);
    fill(255);
    stroke(100);
    line(0, 0, x, y);
    ellipse(x, y, 10, 10);
    pop();
  }
}

