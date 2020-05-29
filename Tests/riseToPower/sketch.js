const width = 1420;
const height = 1000;

const lineCoords = [];
const criticalYears = [];

function setup() {
  let canvas = createCanvas(width, height);
  canvas.parent('canvas-container');
  noLoop();
}

function draw() {
  background(0);
  stroke(255);
  translate(20, height - 20);
  strokeWeight(1);
  line(0, 0, 0, - (height - 40));
  line(0, 0, width - 40, 0);
  strokeWeight(1);
  for(let j = 0; j < lineCoords.length; j++) {
    line(lineCoords[j].x, 0, lineCoords[j].x, lineCoords[j].y);
  }
}

function calculateMeaningOfUniverse() {
  console.log("calculating, hang on");
  const ageOfUniverse = 13800000000;
  let timeInterval = 4200000000;
  let stepSize = 1;
  let x = 0;
  while (x < ageOfUniverse) {
    if(x % 10000000 === 0) {
      lineCoords.push(createVector(x*0.0000001, -stepSize));
    }
    if(x % timeInterval === 0 && x !== 0) {
      stepSize *= 2;
      criticalYears.push(ageOfUniverse - x);
      console.log("Increasing stepSize", stepSize);
      console.log("YEAR:", x);
      if (ageOfUniverse - x <= timeInterval) {
        timeInterval /= 10;
        console.log("timeInterval decimated", timeInterval);
      }
    }
    x += 1;
  }
  console.log(criticalYears);
  redraw();
}
