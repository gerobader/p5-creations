// adapted from Schiffman FlowFields https://thecodingtrain.com/CodingChallenges/024-perlinnoiseflowfield.html
function Bee(x, y, maxSpeed, noiseSeed) {
  this.pos = createVector(x,y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.maxSpeed = maxSpeed;
  this.prevPos = this.pos.copy();
  this.forceVector = createVector(0, 0);
  this.noiseSeed = noiseSeed;

  this.update = function () {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  };

  this.applyForce = function (force) {
    this.acc.add(force);
  };

  this.follow = function (fieldStrength) {
    const x = floor(this.pos.x / scl);
    const y = floor(this.pos.y / scl);
    const noiseAngle = noise(x * increment + this.noiseSeed, y * increment + this.noiseSeed, zoff) * TWO_PI  * 4;
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

  this.drawBee = function () {
    push();
    translate(this.pos.x, this.pos.y);
    let rotateAngle = this.vel.heading();
    if(rotateAngle < - PI / 2) {
      rotateAngle = -PI - (rotateAngle);
      scale(-1,1);
    }
    if(rotateAngle > PI / 2) {
      rotateAngle = PI - (rotateAngle);
      scale(-1,1);
    }
    colorMode(RGB);
    fill(255, 220, 46);
    rotate(rotateAngle);
    stroke(0);

    //body
    strokeWeight(0.2);
    scale(1);
    ellipse(0, 0, 10, 5);
    strokeWeight(1);
    line(0, -2.5, 0 , 2.5);
    line(-2.5, -2, -2.5 , 2);
    line(2.5, -2, 2.5 , 2);
    strokeWeight(0.5);
    line(0, 2.5, -3.5, 4.5);
    line(-2.5, 2, -6, 4.5);
    line(2.5, 3, -1.5, 5);
    //head
    strokeWeight(0.5);
    ellipse(6.5, 0, 4, 4);
    line(7.5, -1, 9, -3);
    //wing
    fill(0, 132, 255, 50);
    rotate(radians(-50));
    ellipse(3, -3, 4, 6);
    pop();

    this.resetPrevPos();
  };
}
