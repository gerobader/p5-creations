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
    this.targetBoid = flock[parseInt(random(flock.length))];
  }

  attack(attractor) {
    let attackDirection = attractor ? p5.Vector.sub(attractor, this.pos) : p5.Vector.sub(this.targetBoid.pos, this.pos);
    const dist = attackDirection.mag();
    attackDirection.setMag(1);
    if (p5.Vector.dot(attackDirection, this.direction) > 0.7 && dist < 800) {
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
    noStroke();
    fill(25, 44, 48);

    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.direction.heading());

    push();
    //right flipper
    translate(4, 17);
    rotate(0.7);
    ellipse(0, 0, 10, 25);
    pop();

    push();
    //left flipper
    translate(4, -17);
    rotate(-0.7);
    ellipse(0, 0, 10, 25);
    pop();

    push();
    //left back flipper
    translate(-40, -8);
    rotate(-0.4);
    ellipse(0, 0, 13, 35);
    pop();

    push();
    //right back flipper
    translate(-40, 8);
    rotate(0.4);
    ellipse(0, 0, 13, 35);
    pop();


    //body
    ellipse(0, 0, 75, 25);

    fill(255);
    push();
    // rightEye
    translate(20, 10);
    rotate(-0.15);
    ellipse(0, 0, 10, 4);
    pop();
    push();
    // left eye
    translate(20, -10);
    rotate(0.15);
    ellipse(0, 0, 10, 4);
    pop();

    pop();
  }
}