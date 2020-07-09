const flock = [];
let predators = [];

let showQt = false;
let boundary;
let showAttractor = false;

let fixedAttractor;
let useFixedAttractor = false;
let useAttractor = true;
let followMouse = false;

let noiseOffset = 0;


function setup() {
  let canvas = createCanvas(window.innerWidth, window.innerHeight - 25);
  canvas.parent('canvas-container');
  fixedAttractor = createVector(width / 2, height / 2);
  for (let i = 0; i < 400; i++) {
    flock.push(new Boid());
  }
  for (let i = 0; i < 5; i++) {
    predators.push(new Predator());
  }
  boundary = new Rectangle(width / 2, height / 2, width / 2, height / 2);
  rectMode(CENTER);
  noFill();
  setupListeners();
}

function draw() {
  background(23, 163, 194);
  let attractorPoint;
  if (!followMouse) {
    if (useFixedAttractor) {
      attractorPoint = fixedAttractor;
    } else {
      attractorPoint = createVector();
      for (const boid of flock) {
        attractorPoint.add(boid.pos);
      }
      attractorPoint.div(flock.length);
    }
  } else {
    attractorPoint = createVector(mouseX, mouseY);
  }
  if (showAttractor) {
    strokeWeight(15);
    stroke(255, 0, 0);
    point(attractorPoint.x, attractorPoint.y);
  }
  const qt = new QuadTree(boundary, 4);
  for (const boid of flock) {
    qt.insert(boid);
  }
  if (showQt) {
    qt.show();
  }

  for (const boid of flock) {
    boid.update();
    boid.flock(qt);
    if (useAttractor) {
      boid.attraction(attractorPoint);
    }
    boid.flight(predators);
    if (useAttractor) {
      boid.avoidEdges();
    } else {
      boid.edges();
    }
    boid.show();
  }

  for (const predator of predators) {
    predator.update();
    if (useAttractor) {
      predator.attack(attractorPoint, useAttractor);
    } else {
      predator.attack();
    }
    predator.edges();
    predator.show();
  }

  noiseOffset += 0.005;
}

function setupListeners() {
  const showQTCheck = document.getElementById('qt');
  const fixer = document.getElementById('fixedAttractor');
  const attractorToggler = document.getElementById('useAttractor');
  const followMouseToggler = document.getElementById('followMouse');
  const showAttractorToggler = document.getElementById('showAttractor');

  showQTCheck.addEventListener('change', toggleQT);
  fixer.addEventListener('change', toggleAttractorType);
  attractorToggler.addEventListener('change', toggleAttractor);
  followMouseToggler.addEventListener('change', followMouseToggle);
  showAttractorToggler.addEventListener('change', showAttractorToggle);
}

function toggleQT() {
  showQt = !showQt;
}

function toggleAttractorType() {
  useFixedAttractor = !useFixedAttractor;
  if (!useFixedAttractor) {
    for(const boid of flock) {
      boid.perceptionRadius = 30;
    }
  } else {
    for(const boid of flock) {
      boid.perceptionRadius = 40;
    }
  }
}

function toggleAttractor() {
  useAttractor = !useAttractor;
  if (useAttractor) {
    for (const boid of flock) {
      boid.alignValue = 2;
      boid.separationValue = 2;
      boid.attractionValue = 2;
      boid.perceptionRadius = 40;
    }
  } else {
    if (useFixedAttractor) {
      useFixedAttractor = false;
      document.getElementById('fixedAttractor').checked = false;
    }
    for (const boid of flock) {
      boid.alignValue = 1;
      boid.separationValue = 1;
      boid.attractionValue = 1;
      boid.perceptionRadius = 100;
    }
  }
}

function followMouseToggle() {
  followMouse = !followMouse;
}

function showAttractorToggle(){
  showAttractor = !showAttractor;
}
