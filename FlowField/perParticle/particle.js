function Particle(x = 0, y = 0, maxSpeed = 4, speedX = 0, speedY = 0) {
  this.pos = createVector(x,y);
  this.vel = createVector(speedX, speedY);
  this.acc = createVector(0, 0);
  this.maxSpeed = maxSpeed;
  this.prevPos = this.pos.copy();
  this.forceVector = undefined;

  this.update = function () {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  };

  this.follow = function (fieldStrength) {
    const x = floor(this.pos.x / scl);
    const y = floor(this.pos.y / scl);
    const noiseAngle = noise(x * increment, y * increment, zoff) * TWO_PI  * 4;
    this.forceVector = p5.Vector.fromAngle(noiseAngle);
    this.forceVector.setMag(fieldStrength);
    this.applyForce(this.forceVector);
  };

  this.applyForce = function (force) {
    this.acc.add(force);
  };

  this.applyBounds = function () {
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.resetPrevPos();
    }
    if (this.pos.x > width){
      this.pos.x = 0;
      this.resetPrevPos();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.resetPrevPos();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.resetPrevPos();
    }
  };

  this.resetPrevPos = function () {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  };

  this.show = function () {
    stroke(0, 255);
    strokeWeight(1);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    if (debug) {
      stroke(0, 255);
      strokeWeight(1);
      push();
      translate(20, 20);
      rotate(this.forceVector.heading());
      line(0, 0, scl, 0);
      pop();
    }
    this.resetPrevPos();
  }
}
