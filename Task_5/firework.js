function Firework(x, y, interval, minRocketLifetime, maxRocketLifetime) {
  this.firework = [];
  this.pos = createVector(x, y);
  this.interval = interval;
  this.minRocketLifetime = minRocketLifetime;
  this.maxRocketLifetime = maxRocketLifetime;
  this.timer = 0;

  this.addFirework = function () {
    const thrust = createVector(random(-0.05, 0.05), random(-0.2, -0.25));
    this.firework.push(new Rocket(this.pos.x, this.pos.y, thrust, random(this.minRocketLifetime, this.maxRocketLifetime), true));
  };

  this.update = function () {
    for (let i = this.firework.length - 1; i >= 0; i--) {
      const rocket = this.firework[i];
      if(rocket.isExploded && rocket.explosionParticles.length === 0) {
        this.firework.splice(i , 1);
      }
      rocket.run(true);
    }
  };

  this.run = function () {
    this.timer++;
    this.update();
    if(this.timer % this.interval === 0) {
      this.addFirework();
    }
  }
}