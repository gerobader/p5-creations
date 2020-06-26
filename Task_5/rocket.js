function Rocket(x, y, thrust, flightTime, isPowered) {
  this.pos = createVector(x, y);
  this.isPowered = isPowered;
  if (this.isPowered) {
    this.vel = createVector(0, 0);
  } else {
    this.vel = thrust;
  }
  this.thrust = thrust;
  this.acc = createVector(0, 0);
  this.flightTime = flightTime;
  this.isExploded = false;
  this.startTime = millis();

  this.explosionParticles = [];
  this.hue = random(360);

  this.explode = function () {
    this.isExploded = true;
    let hasFlashers = random() < 0.05;
    for (let i = 0; i < random(40,80); i++) {
      let p;
      const dir = p5.Vector.random2D();
      if (isPowered) {
        dir.mult(random(1, 2));
        p = new Particle(this.pos.x, this.pos.y, this.hue, 100, random(100, 400), true, 4, dir, false);
        p.calcIntitialVel(this.vel);
        if(hasFlashers) {
          dir.mult(random(0.8, 1.2));
          const f = new Particle(this.pos.x, this.pos.y, this.hue, 100, random(300, 700), true, 4, dir, true);
          this.explosionParticles.push(f);
        }
      } else {
        hasFlashers = random() < 0.3;
        dir.mult(random(5, 8));
        p = new Particle(this.pos.x, this.pos.y, this.hue, 100, random(100, 300), true, 4, dir, false);
        if(hasFlashers) {
          dir.mult(random(0.8, 1.2));
          const f = new Particle(this.pos.x, this.pos.y, this.hue, 100, random(300, 700), true, 4, dir, true);
          this.explosionParticles.push(f);
        }
      }
      this.explosionParticles.push(p);
    }
  };

  this.applyForce = function (force) {
    this.acc.add(force)
  };

  this.update = function () {
    this.vel.add(this.acc);
    if (!this.isExploded){
      this.vel.limit(7);
    }
    this.pos.add(this.vel);
    this.acc.mult(0);
  };

  this.display = function () {
    stroke(56, 100, 100);
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
  };

  this.run = function () {
    if(!this.isExploded) {
      if(this.isPowered) {
        this.acc.add(this.thrust);
      }
      this.applyForce(gravity);
      this.update();
      this.display();
      if (millis() - this.startTime > this.flightTime) {
        this.explode();
      }
    } else {
      for (let i = this.explosionParticles.length - 1; i >= 0; i--) {
        const particle = this.explosionParticles[i];
        if (particle.lifespan <= 0) {
          this.explosionParticles.splice(i, 1);
          continue;
        }
        particle.applyForce(gravity);
        particle.update();
        particle.display();
      }
    }
  }
}