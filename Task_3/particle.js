function Particle(x, y, mass, initialSize, index, isLoose, targets = undefined) {
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.mass = mass;
  this.initialSize = initialSize;
  this.index = index;
  this.isLoose = isLoose;
  this.targets = targets;

  this.update = function () {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  };

  this.applyForce = function (force) {
    const f = force.copy();
    this.acc.add(f.div(this.mass));
  };

  this.explode = function(position, strength) {
    const direction = p5.Vector.sub(this.pos, position);
    let distance = direction.mag();
    direction.normalize();
    this.isLoose = this.isLoose || distance < strength * 8;
    distance /= 100;
    if(distance < 1) distance = 1;
    if(this.isLoose) {
      this.applyForce(direction.mult(strength / distance));
    }
  };

  this.applyFriction = function (coefficient) {
    if(this.isLoose) {
      const friction = this.vel.copy();
      friction.normalize();
      friction.mult(-coefficient);
      this.applyForce(friction);
    }
  };

  this.applyGravity = function (gravity) {
    if(this.isLoose) {
      const g = createVector(0, gravity);
      this.acc.add(g);
    }
  };

  this.applyBounds = function () {
    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.vel.x *= -0.5;
    }
    if (this.pos.x > width){
      this.pos.x = width;
      this.vel.x *= -0.5;
    }
    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.vel.y *= -0.5;
    }
    if (this.pos.y > height - 4) {
      this.pos.y = height - 4;
      this.vel.y *= -0.5;
    }
  };

  this.follow = function () {
    let targetIndex = (this.index + 1) % this.targets.length;
    if(Math.abs(this.pos.x - this.targets[targetIndex].x) < 1
      && Math.abs(this.pos.y - this.targets[targetIndex].y) < 1) {
      this.index = (this.index + 1) % this.targets.length;
      this.vel.mult(0);
    }
    let target = createVector(this.targets[targetIndex].x, this.targets[targetIndex].y);
    let direction = p5.Vector.sub(target, this.pos);
    let distance = direction.copy();
    direction.normalize();
    this.vel = direction.mult((distance.mag() + 1) / 10);
  };

  this.displayExplo = function () {
    colorMode(HSB);
    let speed = this.vel.mag();
    if (speed > 40) speed = 0;
    if(speed > 0.5) {
      stroke(map(speed, 0.5, 40, 60, 0), 100, 100);
    } else {
      stroke(255);
    }
    strokeWeight(this.initialSize);
    point(this.pos.x, this.pos.y);
  };

  this.displayRainbow = function () {
    colorMode(HSL, 360);
    const hue = map(this.index, 0, this.targets.length, 0, 360);
    strokeWeight(this.initialSize);
    stroke(hue, 200, 200);
    point(this.pos.x, this.pos.y);
  }
}

