function Star(distanceFromOrigin, anglePrefix, size, brightness) {
  this.distanceFromOrigin = distanceFromOrigin;
  this.anglePrefix = anglePrefix;
  this.size = size;
  this.brightness = brightness;
  this.angle = 0;
  this.targetAngle = 0;
  this.lastTarget = 0;
  this.targetHour = 0;

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

    if(currentHour > 6 && currentHour < 18){
      fill(255, 0);
    }else if (currentHour === 18) {
      fill(lerpColor(color(255, 0), color(255, this.brightness), map(currentMinute, 0, 60, 0, 1)));
    } else if (currentHour > 18 || currentHour < 6) {
      fill(color(255, this.brightness));
    } else if(currentHour === 6){
      fill(lerpColor(color(255, this.brightness), color(255, 0), map(currentMinute, 0, 60, 0, 1)));
    }

    push();
    translate(width/2, height/3);
    const x = this.distanceFromOrigin * Math.sin(radians(-this.angle));
    const y = this.distanceFromOrigin * Math.cos(radians(-this.angle));
    strokeWeight(0);
    rectMode(CENTER);
    rect(x, y, this.size, this.size);
    pop();
  }
}
