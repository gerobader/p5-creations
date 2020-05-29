function Particle(x, y, mass) {
  this.pos = createVector(x,y);
  this.vel = createVector(0.5 * animationSpeed, 0.5 * animationSpeed);
  this.acc = createVector(0, 0);
  this.mass = mass;

  this.update = function () {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  };

  this.applyForce = function (force) {
    const f = force.copy();
    this.acc.add(f.div(this.mass));
  };

  this.applyGravity = function (gravity) {
    const g = createVector(0, gravity);
    this.acc.add(g);
  };

  this.applyFriction = function (coefficient) {
    const friction = this.vel.copy();
    friction.normalize();
    friction.mult(-coefficient);
    this.applyForce(friction);
  };

  this.applyDrag = function(coefficient) {
    const drag = this.vel.copy();
    drag.normalize();
    drag.mult(-coefficient * this.vel.mag() * this.vel.mag());
    this.applyForce(drag);
  };

  this.gravtityAttraction = function (attractor) {
    const force = attractor.copy();
    force.sub(this.pos);
    const distance = force.mag();
    const strength = (G * this.mass * 40) / (distance * distance);
    force.normalize();
    force.mult(strength);
    this.applyForce(force);
  };

  this.uniformAttraction = function (attractor) {
    const force = attractor.copy();
    force.sub(this.pos).normalize();
    force.mult(animationSpeed);
    this.applyForce(force)
  };

  this.applyBounds = function () {
    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.vel.x *= -1;
    }
    if (this.pos.x > width){
      this.pos.x = width;
      this.vel.x *= -1;
    }
    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.vel.y *= -1;
    }
    if (this.pos.y > height) {
      this.pos.y = height;
      this.vel.y *= -1;
    }
  };

  this.display = function () {
   stroke(0);
   fill(200);
   //ellipse(this.pos.x, this.pos.y, this.mass * 10);
   point(this.pos.x, this.pos.y);
  };
}
