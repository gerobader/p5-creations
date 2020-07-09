const flock = [];
const attractors = [];
let predators = [];

let alignSlider, cohesionSlider, seperationSlider, attractionSlider;
let alignValue, cohesionValue, seperationValue, attractionValue;
let showQt;
let boundary;

let noiseOffset = 0;

function setup() {
  let canvas = createCanvas(window.innerWidth, window.innerHeight - 30);
  canvas.parent('canvas-container');
  createSpan("Align: ");
  alignSlider = createSlider(0, 5, 2, 0.1);
  alignValue = createSpan();
  createSpan(" | Cohesion: ");
  cohesionSlider = createSlider(0, 5, 1, 0.1);
  cohesionValue = createSpan();
  createSpan(" | Seperation: ");
  seperationSlider = createSlider(0, 5, 2, 0.1);
  seperationValue = createSpan();
  createSpan(" | Attraction: ");
  attractionSlider = createSlider(0, 5, 2, 0.1);
  attractionValue = createSpan();
  showQt = createCheckbox(" | Show QuadTree: ", false);
  for (let i = 0; i < 400; i++) {
    flock.push(new Boid());
  }
  attractors.push(new Attractor(width / 2, height / 2));
  for (let i = 0; i < 2; i++) {
    predators.push(new Predator());
  }
  boundary = new Rectangle(width / 2, height / 2, width / 2, height / 2);
  rectMode(CENTER);
  noFill();
}

function draw() {
  background(40, 85, 161);
  alignValue.html(alignSlider.value());
  cohesionValue.html(cohesionSlider.value());
  seperationValue.html(seperationSlider.value());
  attractionValue.html(attractionSlider.value());
  const qt = new QuadTree(boundary, 4);
  for (const boid of flock) {
    qt.insert(boid);
  }
  if (showQt.checked()) {
    qt.show();
  }
  const attractorQT = new QuadTree(boundary, 4);
  for (const attractor of attractors) {
    attractorQT.insert(attractor);
  }

  for (const predator of predators) {
    predator.update();
    predator.attack();
    predator.edges();
    predator.show();
  }

  for (const boid of flock) {
    boid.update();
    boid.flock(flock, qt);
    boid.attraction(attractorQT);
    boid.flight(predators);
    boid.edges();
    boid.show();
  }
  noiseOffset += 0.005;
}

function displayQuadTree() {
  sho
}
