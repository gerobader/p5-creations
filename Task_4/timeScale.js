function TimeScale(start, stop, startRotation) {
  this.start = start;
  this.stop = stop;
  this.targetRotation = startRotation;
  this.currentRotation = startRotation;
  this.rotationOffset = startRotation;

  this.display = function () {
    push();
    translate(width/2, height/1.5);
    if(currentHour < 18 && currentHour > 5){
      this.targetRotation = this.rotationOffset;
    } else {
      this.targetRotation = this.rotationOffset + 180;
    }
    this.currentRotation = lerp(this.currentRotation, this.targetRotation, 0.1);
    rotate(radians(this.currentRotation));
    strokeWeight(1);
    textSize(24);
    textAlign(CENTER);
    let x;
    let y;
    for(let i = this.start; i < this.stop + 1; i++) {
      x = (height/1.7 - 20) * Math.sin(-radians(map(i % 24, this.start, this.stop, 90,  270)));
      y = (height/1.7 - 20) * Math.cos(-radians(map(i % 24, this.start, this.stop, 90,  270)));
      let a = 0;
      if (fadeOutScale) {
        if (i % 24 === currentHour) {
          a = 255 - map(currentMinute, 0, 60, 0, 155);
        } else if ((i - 1) % 24 === currentHour) {
          a = 100 + map(currentMinute, 0, 60, 0, 155);
        } else if ((i - 2 ) % 24 === currentHour) {
          a = map(currentMinute, 0, 60, 0, 100);
        } else if ((i + 1) % 24 === currentHour) {
          a = 100 - map(currentMinute, 0, 60, 0, 100);
        }
      } else {
        a = 255;
      }
      stroke(0, a);
      fill(255, a);
      text(i % 24, x, y);
    }
    pop();
  }
}
