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

  this.constructor = function () {
    this.targetHour = (currentHour + 1) % 24;
    this.targetAngle = map(this.targetHour, 0, 24, 0 + this.anglePrefix, 360 + this.anglePrefix);
    this.lastTarget = map(currentHour, 0, 24, 0 + this.anglePrefix, 360 + this.anglePrefix);
    this.angle = lerp(this.lastTarget, this.targetAngle, map(currentMinute, 0, 60, 0, 1));
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

    if(currentHour > this.nightCutoff && currentHour < this.dayCutoff){
      fill(this.dayColor);
    }else if (currentHour === dayCutoff) {
      fill(lerpColor(this.dayColor, this.nightColor, map(currentMinute, 0, 60, 0, 1)));
    } else if (currentHour > this.dayCutoff || currentHour < this.nightCutoff) {
      fill(this.nightColor);
    } else if(currentHour === this.nightCutoff){
      fill(lerpColor(this.nightColor, this.dayColor, map(currentMinute, 0, 60, 0, 1)));
    }
    push();
    translate(width/2, height/2);
    const x = height / 3 * Math.sin(radians(-this.angle));
    const y = height / 3 * Math.cos(radians(-this.angle));
    strokeWeight(1);
    line(0,0, x * 2, y * 2);
    strokeWeight(0);
    rectMode(CENTER);
    rect(x, y , 50, 50);
    if (this.hasCraters) {
      fill(0, 50);
      rect(x-12, y-13 , 10, 13);
      rect(x-13, y + 1, 10, 10);
      rect(x, y - 10 , 10, 10);
      rect(x+12, y-8 , 11, 9);
    }
    pop();
  }
}
