const width = 800;
const height = 600;
const increment = 0.1;
const debug = false;

const scl = 10;
let fr;
let cols, rows;

let zoff = 0;

let particleCount = 4000;
const particles = [];

function setup() {
  pixelDensity(1);
  let canvas = createCanvas(width, height);
  canvas.parent('canvas-container');
  if (debug) {
    particleCount = 1
  }
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');
  window.setInterval(() => {fr.html(floor(frameRate()));}, 500);
  for(let i = 0; i < particleCount; i++) {
    particles[i] = new Rocket(random(width), random(height), 3);
  }
  background(255);
}

function draw() {
  if(debug) {
    background(255);
  }
  //zoff += 0.01;
  for (let i = 0; i < particleCount; i++) {
    particles[i].follow(0.2);
    particles[i].update();
    particles[i].applyBounds();
    particles[i].show();
  }
}
