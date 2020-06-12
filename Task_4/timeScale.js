function TimeScale(start, stop, currentRotation) {
  this.start = start;
  this.stop = stop;
  this.targetRotation = currentRotation;
  this.currentRotation = currentRotation;
  this.rotationOffset = currentRotation;

  this.display = function () {
    push();
    translate(width/2, height/2);
    if(currentHour < 18 && currentHour > 5){
      this.targetRotation = this.rotationOffset;
    } else {
      this.targetRotation = this.rotationOffset + 180;
    }
    this.currentRotation = lerp(this.currentRotation, this.targetRotation, 0.1);
    rotate(radians(this.currentRotation));
    strokeWeight(1);
    textSize(20);
    stroke(0);
    fill(255);
    let x;
    let y;
    for(let i = this.start; i < this.stop + 1; i++) {
      x = (height/2 - 20) * Math.sin(-radians(map(i % 24, this.start, this.stop, 90,  270)));
      y = (height/2 - 20) * Math.cos(-radians(map(i % 24, this.start, this.stop, 90,  270)));
      text(i % 24, x, y);
    }
    pop();
  }
}
