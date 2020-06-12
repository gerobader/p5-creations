function TimeRect(x, y, w, height, colors, time, scale, colorTimer, type) {
  this.pos = createVector(x, y);
  this.width = w;
  this.height = height;
  this.colors = colors;
  this.colorTimer = colorTimer;
  this.time = time;
  this.scale = scale;
  this.lastTime = time();
  this.type = type;

  this.offsetCalculated = false;
  this.milliOffset = 0;

  this.update = function () {
    let t = this.time();
    if (this.scale === 24) t = (t + timeOffset) % 24;
    const target = map(t, 0, this.scale, 0, width);
    if (target === 0) {
      this.width = target;
    } else {
      this.width = lerp(this.width, target, 0.1);
    }
  };

  this.addIndicator = function () {
    let ms = (millis() - this.milliOffset) % 1000;
    let t = this.time();
    if (t !== this.lastTime) {
      this.lastTime = t;
      if(!this.offsetCalculated) {
        this.milliOffset = millis();
        this.offsetCalculated = true;
      }
    }
    fill(this.colors[this.colorTimer() % 2]);
    arc(this.width, map(ms, 0,1000, this.pos.y, this.pos.y + this.height), 15, 15, radians(90) , radians(270));
    fill(this.colors[(this.colorTimer() + 1) % 2]);
    arc(this.width, map(ms, 0,1000, this.pos.y, this.pos.y + this.height), 15, 15, radians(270) , radians(90));
  };

  this.display = function () {
    stroke(0);
    fill(this.colors[this.colorTimer() % 2]);
    rect(this.pos.x, this.pos.y, width, this.height);

    fill(this.colors[(this.colorTimer() + 1) % 2]);
    rect(this.pos.x, this.pos.y, this.width, this.height);

    let t = this.time();
    if(type === 's'){
      this.addIndicator();
    }
    if (this.scale === 24) t = (t + timeOffset) % 24;
    if(t < 10) t = '0' + t;
    fill(255, 100);
    strokeWeight(2);
    textSize(100);
    stroke(200);
    text(t, width - 150, this.pos.y + this.height/2 + 40);

  }
}
