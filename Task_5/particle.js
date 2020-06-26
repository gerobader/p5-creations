function Particle(x, y, hue, intensity, lifespan, rocketParticle, size, vel, flasher) {
  this.pos = createVector(x, y);
  this.vel = vel;
  this.acc = createVector(0, 0);
  this.maxLifespan = lifespan;
  this.lifespan = lifespan;
  this.hue = hue;
  this.intensity = intensity;
  this.size = size;
  this.rocketParticle = rocketParticle;
  this.isFlasher = flasher;

  this.applyForce = function (force) {
    this.acc.add(force)
  };

  this.calcIntitialVel = function (vel) {
    if (this.rocketParticle) {
      this.vel.mult(random(0.1, 2));
    }
    this.vel.add(vel);
  };

  this.update = function () {
    this.vel.add(this.acc);
    if (this.vel.y > 0 && this.rocketParticle && this.maxLifespan - this.lifespan > 50) {
      this.vel.limit(3);
      if (this.isFlasher){
        this.vel.limit(2);
      }
    }
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.lifespan -= 2;
  };

  this.display = function () {
    if (this.isFlasher) {
      if(this.maxLifespan - this.lifespan > 60){
        stroke(0, 0, random(0, 100));
      } else {
        stroke(0, 0, 0)
      }
    }else{
      stroke(this.hue, this.intensity, map(this.lifespan, 0, this.maxLifespan, 0, 100));
    }
    strokeWeight(this.size);
    point(this.pos.x, this.pos.y);
  };
}