const width = 800;
const height = 500;
const increment = 0.01;
const debug = false;

const scl = 10;
let fr;
let cols, rows;

let zoff = 0;

const skyBound = 0.8;
let beeCount = 6;
const bees = [];

let maxAntCount  = 100;
const ants = [];

const distance = [];
const flowerCount = 6;
const flowers = [];
let wind;

function setup() {
  let canvas = createCanvas(width, height);
  canvas.parent('canvas-container');
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');
  window.setInterval(() => {fr.html(floor(frameRate()));}, 200);

  /** ANTS */
  const antPositions = [
    createVector(160, 480),
    createVector(320, 440),
    createVector(230, 415)
  ];
  let antCount = 0;
  let antSpawner = window.setInterval(
    () => {
      const antStart = antPositions[floor(random(3))];
      ants[antCount] = new Ant(
        antStart.x,
        antStart.y,
        random(0.2) + 0.2,
        4,
        0.1
      );
      antCount++;
      if (antCount === maxAntCount) {
        clearInterval(antSpawner);
      }
    },
    500
  );

  /** BEES */
  for(let i = 0; i < beeCount; i++) {
    bees[i] = new Bee(random(width), random(height), random(3) + 2, random(10));
  }

  /** FLOWERS */
  for(let i = 0; i < flowerCount; i++){
    distance.push(random(height * (1 - skyBound)) + height * skyBound);
  }
  distance.sort();
  for(let i = 0; i < distance.length; i++) {
    flowers.push(new Flower(
      map(random(1), 0, 1, 550, 700),
      distance[i],
      map(distance[i], 400, 500, 15, 40),
      round(random(2)) + 5
    ));
  }
  wind = random(20);
  background(0);
}

function draw() {
  setBackground();
  for (let i = 0; i < ants.length; i++) {
    ants[i].follow(0.5);
    ants[i].applyBounds();
    ants[i].update();
    ants[i].drawAnt();
  }
  drawLake();
  for(let i = 0; i < flowers.length; i++) {
    flowers[i].drawFlower();
  }
  for (let i = 0; i < beeCount / 2; i++) {
    bees[i].follow(0.4);
    bees[i].update();
    bees[i].applyBounds();
    bees[i].drawBee();
  }
  drawTree(90, 20, 10);
  for (let i = beeCount / 2; i < beeCount; i++) {
    bees[i].follow(0.4);
    bees[i].update();
    bees[i].applyBounds();
    bees[i].drawBee();
  }
  zoff += 0.01;
}

function setBackground() {
  // adapted from https://editor.p5js.org/REAS/sketches/S1TNUPzim
  colorMode(RGB);
  for (let y = 0; y < height; y++) {
    const skyMap = map(y, 0, height * skyBound, 0, 1);
    const groundMap = map(y, height * skyBound, height, 0, 1);
    let c;
    if (y < height * skyBound) {
      c = lerpColor(color(0, 173, 252), color(207, 240, 255), skyMap);
    } else {
      c = lerpColor(color(149, 255, 122), color(39, 194, 0), groundMap)
    }
    stroke(c);
    line(0, y, width, y);
  }
}

function drawLake() {
  noStroke();
  strokeWeight(1);
  fill(0, 152, 235);
  beginShape();
  vertex(width, 470);
  vertex(width - 30, 460);
  vertex(width - 30, 460);
  vertex(width - 50, 450);
  vertex(width - 70, 440);
  vertex(width - 80, 430);
  vertex(width - 90, 420);
  vertex(width - 95, 410);
  vertex(width - 100, 400);
  vertex(width, 400);
  endShape();
}

function drawTree(rindSkew, rindSmoothness, rindResolution) {
  colorMode(RGB);
  stroke(0);
  strokeWeight(1);
  fill(94, 60, 2);
  beginShape();
  vertex(170, height);
  vertex(140, height - 40);
  vertex(110, height - 100);
  vertex(90, height - 200);
  vertex(60, 0);
  vertex(0, 0);
  vertex(0, height);
  endShape();
  let lineX;
  for(let x = -70; x < 70; x += 10) {
    let lastPoint = createVector(x, 0);
    strokeWeight(map(x, -70, 70, 2, 1));
    for (let y = 0; y <= height; y+=rindResolution) {
      lineX = x + map(noise(x,y / rindSmoothness), 0, 1, -7, 7);
      line(lastPoint.x, lastPoint.y, lineX + pow(2, 1 + y / rindSkew), y);
      lastPoint.x = lineX + pow(2, 1 + y / rindSkew);
      lastPoint.y = y;
    }
  }
  strokeWeight(1);
  fill(0, 130, 20);
  ellipse(150 + noise(0, 0, zoff * 2) * 5,  noise(1, 2, zoff * 2) * wind, 250, 200);
  ellipse(20  + noise(5, 10, zoff * 2) * 5, noise(2, 9, zoff * 2) * wind, 250, 200);
}
