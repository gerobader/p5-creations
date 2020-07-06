const flock = [];

let alignSlider, cohesionSlider, seperationSlider;
let boundary;

function setup() {
  let canvas = createCanvas(window.innerWidth, window.innerHeight - 30);
  canvas.parent('canvas-container');
  alignSlider = createSlider(0, 5, 1, 0.1);
  cohesionSlider = createSlider(0, 5, 1, 0.1);
  seperationSlider = createSlider(0, 5, 1, 0.1);
  for (let i = 0; i < 2000; i++) {
    const b = new Boid();
    flock.push(b);
  }
  boundary = new Rectangle(width / 2, height / 2, width / 2, height / 2);
  rectMode(CENTER);
  noFill();
}

function draw() {
  background(51);
  const qt = new QuadTree(boundary, 4);
  for (const boid of flock) {
    qt.insert(boid);
  }
  qt.show();

  for (const boid of flock) {
    boid.update();
    boid.flock(flock, qt);
    boid.edges();
    boid.show();
  }
}
