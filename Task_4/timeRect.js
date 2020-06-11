function TimeRect(x, y, w, height, colors, time, scale) {
  this.pos = createVector(x, y);
  this.width = w;
  this.height = height;
  this.colors = colors;
  this.colorTimer = 0;
  this.time = time;
  this.scale = scale;

  this.update = function (colorTimer) {
    let t = this.time();
    if (this.scale === 24) t = (t + timeOffset) % 24;
    const target = map(t, 0, this.scale, 0, width);
    if (target === 0) {
      this.width = target;
    } else {
      this.width = lerp(this.width, target, 0.1);
    }
    this.colorTimer = colorTimer;
  };

  this.display = function () {
    stroke(0);
    fill(this.colors[this.colorTimer % 2]);
    rect(this.pos.x, this.pos.y, width, this.height);

    fill(this.colors[(this.colorTimer + 1) % 2]);
    rect(this.pos.x, this.pos.y, this.width, this.height);

    // const ms = millis() % 1000;
    //fill(this.colors[this.colorTimer % 2]);
    //arc(this.width, map(ms, 0,1000, this.pos.y, this.pos.y + this.height), 15, 15, radians(90) , radians(270));
    //fill(this.colors[(this.colorTimer + 1) % 2]);
    //arc(this.width, map(ms, 0,1000, this.pos.y, this.pos.y + this.height), 15, 15, radians(270) , radians(90));


    fill(255, 100);
    strokeWeight(2);
    textSize(100);
    stroke(200);
    let t = this.time();
    if (this.scale === 24) t = (t + timeOffset) % 24;
    if(t < 10) t = '0' + t;
    text(t, width - 150, this.pos.y + this.height/2 + 40);
  }
}
