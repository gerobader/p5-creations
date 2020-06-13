function CelestialBody(anglePrefix, c1, c2, dayCutoff, nightCutoff, hasCraters) {
  this.anglePrefix = anglePrefix;
  this.angle = 0;
  this.targetAngle = 0;
  this.lastTarget = 0;
  this.targetHour = 0;
  this.dayColor = c1;
  this.nightColor = c2;
  this.nightCutoff = nightCutoff;
  this.dayCutoff = dayCutoff;
  this.hasCraters = hasCraters;
  this.pos = createVector(0, 0);

  this.orbiterAngle = 0;
  this.orbiterTarget = 0;
  this.lastOrbiterTarget = 0;
  this.targetMinute = 0;

  this.constructor = function () {
    this.targetHour = (currentHour + 1) % 24;
    this.targetAngle = map(this.targetHour, 0, 24, 0 + this.anglePrefix, 360 + this.anglePrefix);
    this.lastTarget = map(currentHour, 0, 24, 0 + this.anglePrefix, 360 + this.anglePrefix);
    this.angle = lerp(this.lastTarget, this.targetAngle, map(currentMinute, 0, 60, 0, 1));

    this.targetMinute = (currentMinute + 1) % 60;
    this.orbiterTarget = map(this.targetMinute, 0, 24, 0, 360);
    this.lastOrbiterTarget = map(currentMinute, 0, 24, 0, 360);
    this.orbiterAngle = lerp(this.lastTarget, this.targetAngle, map(currentSecond, 0, 60, 0, 1));
  };

  this.showOrbiter = function() {
    this.targetMinute = (currentMinute + 1) % 60;
    this.orbiterTarget = map(this.targetMinute, 0, 60, 180, 540);
    this.lastOrbiterTarget = map(currentMinute, 0, 60, 180, 540);

    if (this.targetMinute === 0) {
      this.orbiterAngle = lerp(this.lastOrbiterTarget, 540, map(currentSecond, 0, 60, 0, 1));
    } else {
      this.orbiterAngle = lerp(this.lastOrbiterTarget, this.orbiterTarget, map(currentSecond, 0, 60, 0, 1));
    }
    const x = 60 * Math.sin(radians(-this.orbiterAngle));
    const y = 60 * Math.cos(radians(-this.orbiterAngle));
    translate(this.pos.x + x, this.pos.y + y);
    rotate(radians(this.orbiterAngle));
    strokeWeight(0);
    rectMode(CENTER);
    fill(100);
    rect(0, 0 , 4, 12);
    fill(50);
    rect(0, 0, 10, 3);
    strokeWeight(1);
    stroke(255);
    line(0, -1, 0, 1);
    line(-3, -1, -3, 1);
    line(3, -1, 3, 1);
  };

  this.display = function () {
    this.targetHour = (currentHour + 1) % 24;
    this.targetAngle = map(this.targetHour, 0, 24, 0 + this.anglePrefix, 360 + this.anglePrefix);
    this.lastTarget = map(currentHour, 0, 24, 0 + this.anglePrefix, 360 + this.anglePrefix);
    if (this.targetHour === 0) {
      this.angle = lerp(this.lastTarget, 360 + this.anglePrefix, map(currentMinute, 0, 60, 0, 1));
    } else {
      this.angle = lerp(this.lastTarget, this.targetAngle, map(currentMinute, 0, 60, 0, 1));
    }
    let c;
    if(currentHour > this.nightCutoff && currentHour < this.dayCutoff){
      c = this.dayColor;
    }else if (currentHour === dayCutoff) {
      c = lerpColor(this.dayColor, this.nightColor, map(currentMinute, 0, 60, 0, 1));
    } else if (currentHour > this.dayCutoff || currentHour < this.nightCutoff) {
      c = this.nightColor;
    } else if(currentHour === this.nightCutoff){
      c = lerpColor(this.nightColor, this.dayColor, map(currentMinute, 0, 60, 0, 1));
    }
    push();
    fill(c);
    stroke(c);
    translate(width/2, height/1.5);
    this.pos.x = (height / 2 - 50) * Math.sin(radians(-this.angle));
    this.pos.y = (height / 2 - 50) * Math.cos(radians(-this.angle));
    strokeWeight(1);
    line(this.pos.x, this.pos.y, this.pos.x * 1.3, this.pos.y * 1.3);
    line(this.pos.x, this.pos.y + 40, this.pos.x, this.pos.y + 60);
    line(this.pos.x, this.pos.y - 40, this.pos.x, this.pos.y - 60);
    line(this.pos.x + 40, this.pos.y, this.pos.x + 60, this.pos.y);
    line(this.pos.x - 40, this.pos.y, this.pos.x - 60, this.pos.y);
    strokeWeight(0);
    rectMode(CENTER);
    rect(this.pos.x, this.pos.y , 50, 50);
    if (this.hasCraters) {
      fill(0, 50);
      rect(this.pos.x-12, this.pos.y-13 , 10, 13);
      rect(this.pos.x-13, this.pos.y + 1, 10, 10);
      rect(this.pos.x, this.pos.y - 10 , 10, 10);
      rect(this.pos.x+12, this.pos.y-8 , 11, 9);
    }
    this.showOrbiter();
    pop();
  }
}
