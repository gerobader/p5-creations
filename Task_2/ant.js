// adapted from Schiffman FlowFields https://thecodingtrain.com/CodingChallenges/024-perlinnoiseflowfield.html
function Ant(x, y, maxSpeed, scale, noiseIncrement) {
  this.pos = createVector(x,y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.maxSpeed = maxSpeed;
  this.prevPos = this.pos.copy();
  this.forceVector = createVector(0, 0);
  this.scale = scale;
  this.noiseIncrement = noiseIncrement;

  this.update = function () {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed * map(this.pos.y, 400, 500, 0.5, 2));
    this.pos.add(this.vel);
    this.acc.mult(0);
  };

  this.applyForce = function (force) {
    this.acc.add(force);
  };

  this.follow = function (fieldStrength) {
    const x = floor(this.pos.x / this.scale);
    const y = floor(this.pos.y / this.scale);
    const noiseAngle = noise(x * this.noiseIncrement, y * this.noiseIncrement, zoff / 10) * TWO_PI * 4;
    this.forceVector = p5.Vector.fromAngle(noiseAngle);
    this.forceVector.setMag(fieldStrength);
    this.applyForce(this.forceVector);
  };

  this.resetPrevPos = function () {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  };

  this.applyBounds = function () {
    if (this.pos.x < 0) {
      this.pos.x = 600;
      this.resetPrevPos();
    }
    if (this.pos.x > 540){
      this.pos.x = 120;
      this.resetPrevPos();
    }

    if (this.pos.y < height * skyBound) {
      this.pos.y = height;
      this.resetPrevPos();
    }
    if (this.pos.y > height) {
      this.pos.y = height * skyBound;
      this.resetPrevPos();
    }
  };

  this.drawAnt = function () {
    stroke(0);
    if(this.pos.y < 410) {
      noStroke();
    } else {
      strokeWeight(map(this.pos.y, 410, 500, 1, 3));
    }
    point(this.pos.x, this.pos.y)
  };
}
