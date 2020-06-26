function BigBoi(x, y) {
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.lifeTime = 0;
  this.maxLifeTime = 250;
  this.exploded = false;

  this.rockets = [];

  this.applyForce = function (force) {
    this.acc.add(force)
  };

  this.explodeSetup = function () {
    this.exploded = true;
    background(15, 50);
    for (let i = 0; i < 30; i++) {
      const thrustDir = p5.Vector.random2D();
      thrustDir.mult(random(1, 15));
      this.rockets.push(new Rocket(this.pos.x, this.pos.y, thrustDir, random(800, 1500), false));
    }
  };

  this.explode = function () {
    for (let i = this.rockets.length - 1; i >= 0; i--) {
      const rocket = this.rockets[i];
      if(rocket.isExploded && rocket.explosionParticles.length === 0) {
        this.rockets.splice(i , 1);
      }
      rocket.run();
    }
  };

  this.update = function () {
    if (this.lifeTime <= this.maxLifeTime) {
      this.applyForce(createVector(0, -0.08));
    }
    this.vel.add(this.acc);
    this.vel.limit(6);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.lifeTime++;
  };

  this.display = function () {
    if(this.lifeTime <= this.maxLifeTime) {
      stroke(map(this.lifeTime, 0, this.maxLifeTime, 55, 0), 100, 100);
      strokeWeight(20);
      point(this.pos.x, this.pos.y);
    } else {
      if (!this.exploded) {
        this.applyForce(gravity);
        stroke(map(this.lifeTime, 0, this.maxLifeTime, 55, 0), 100, 100);
        strokeWeight(20);
        point(this.pos.x, this.pos.y);
        if (this.vel.y >= 0) {
          this.explodeSetup();
        }
      } else {
        this.explode();
      }
    }
  };
}