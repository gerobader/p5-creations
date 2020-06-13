function BackgroundRect(x, y,w, h, c1, c2, c3) {
  this.pos = createVector(x, y);
  this.width = w;
  this.height = h;
  this.dayColor = c1;
  this.setColor = c2;
  this.nightColor = c3;

  this.display = function () {
    let elColor;
    if(currentHour < 17 && currentHour > 6){
      elColor = this.dayColor;
    } else if (currentHour === 17) {
      elColor = lerpColor(this.dayColor, this.setColor, map(currentMinute, 0, 60, 0, 1));
    } else if (currentHour === 18) {
      elColor = lerpColor(this.setColor, this.nightColor, map(currentMinute, 0, 60, 0, 1));
    } else if (currentHour > 18 || currentHour < 5){
      elColor = this.nightColor;
    } else if(currentHour === 5) {
      elColor = lerpColor(this.nightColor, this.setColor, map(currentMinute, 0, 60, 0, 1));
    } else if(currentHour === 6) {
      elColor = lerpColor(this.setColor, this.dayColor, map(currentMinute, 0, 60, 0, 1));
    }
    fill(elColor);
    rect(this.pos.x, this.pos.y, width, h);
  }
}
