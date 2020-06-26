function Fountain(x, y, xDir, yDir) {
  this.pos = createVector(x, y);
  this.dir = createVector(xDir, yDir);
  this.particles = [];
  this.timer = 0;

  this.display = function () {
    const p = new Particle(this.pos.x, this.pos.y, random(54, 60), random(100), random(90, 130), false, 2, p5.Vector.random2D(), false);
    p.calcIntitialVel(this.dir);
    this.particles.push(p);
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      if (particle.lifespan <= 0) {
        this.particles.splice(i, 1);
        continue;
      }
      particle.applyForce(gravity);
      particle.update();
      particle.display();
    }
    this.timer++;
  }
}