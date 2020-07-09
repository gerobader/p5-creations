class Predator {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = random(3, 4);
    this.acc = 0;
    this.noiseX = random(100);
    this.noiseY = random(100);
    this.direction = createVector(map(noise(this.noiseX,this.noiseY, noiseOffset), 0, 1, -1, 1), map(noise(this.noiseX + 4, this.noiseY + 4, noiseOffset), 0, 1, -1, 1));
    this.maxSpeed = 20;
    this.isAttacking = false;
  }

  attack() {
    const attractorPos = createVector(width / 2, height / 2);
    const attackDirection = p5.Vector.sub(attractorPos, this.pos);
    attackDirection.setMag(1);
    if (p5.Vector.dot(attackDirection, this.direction) > 0.8) {
      this.isAttacking = true;
      this.acc = 0.4;
      this.direction.add(attackDirection);
    } else {
      this.isAttacking = false;
    }
  }

  edges() {
    if (this.pos.x > width) {
      this.pos.x = 0;
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
    }
  }

  update() {
    this.vel += this.acc;
    if (!this.isAttacking) {
      const newDirection = createVector(map(noise(this.noiseX,this.noiseY, noiseOffset), 0, 1, -1, 1), map(noise(this.noiseX + 4,this.noiseY + 4, noiseOffset), 0, 1, -1, 1));
      newDirection.setMag(0.2);
      this.direction.add(newDirection);
      if (this.vel > 4) {
        this.vel *= 0.987;
      }
    }
    if (this.vel > this.maxSpeed) {
      this.vel = this.maxSpeed;
    }
    this.pos.add(this.direction.setMag(this.vel));
    this.direction.setMag(1);
    this.acc = 0;
  }

  show() {
    strokeWeight(1);
    fill(68, 75, 87);
    stroke(68, 75, 87);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.direction.heading());
    ellipse(0, 0, 75, 25);
    pop();
  }
}