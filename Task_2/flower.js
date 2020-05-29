// adapted from https://p5js.org/examples/simulate-recursive-tree.html
function Flower(xPos, yPos, size, branches) {
  this.xPos = xPos;
  this.yPos = yPos;
  this.size = size;
  this.branches = branches;

  this.drawFlower = function () {
    colorMode(HSL);
    push();
    translate(this.xPos, this.yPos);
    fill(107, 96, 73);
    stroke(0);
    strokeWeight(0.5);
    // create angle that is determined by noise and increased by wind
    const noiseAngle = radians((noise(this.xPos / 1000, 0, zoff) * wind) - 0.5 * wind);
    rotate(noiseAngle);
    rect(-this.size/20, -this.size, this.size/10, this.size);
    //line(0,0,0,-this.size);
    translate(0,-this.size);
    this.branch(this.size, radians(20), this.branches, 0 );
    pop();
  };

  this.branch = function (h, angle, branches, counter) {
    // the angle gets smalles the smaller the branches are
    const noiseAngle = radians(((noise(this.xPos / 1000, 0, zoff) * wind) - 0.5 * wind) * ((branches - counter) / 2));
    h *= 0.66;
    counter++;
    strokeWeight(0.5);
    fill(107, 100 - (3 * (counter / branches)), 73 - (36 * (counter/branches)));
    if (counter < branches) {
      push();
      rotate(angle + noiseAngle);
      rect(-h/20, -h, h/10, h);
      translate(0, -h);
      if(counter === branches - 1) {
        stroke(0.1);
        fill(55, 98, 50);
        circle(0, -h, 2 * h);
      } else {
        this.branch(h, angle, branches, counter);
      }
      pop();

      push();
      rotate(-angle + noiseAngle);
      rect(-h/20, -h, h/10, h);
      translate(0, -h);
      if (counter === branches - 1){
        stroke(0.1);
        fill(55, 98, 50);
        circle(0, -h, 2 * h);
      } else {
        this.branch(h, angle, branches, counter);
      }
      pop();
    }
  }
}
