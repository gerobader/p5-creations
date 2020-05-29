const width = 1000;
const height = 1000;
const movers = [];
const G = 9;
const gravity = 0.2;

const animationSpeed = 10;

function setup() {
  let canvas = createCanvas(width, height);
  canvas.parent('canvas-container');
  for(let i = 0; i < 6; i++) {
    movers.push(new Mover(random(width), random(height), random(2, 10)));
  }
  background(255);
}

function draw() {
  //background(255);
  const attractor = createVector(500, 500);
  for(const m of movers) {
    const wind = createVector(0.1, 0);
    //m.applyForce(wind);
   // m.applyGravity(gravity);
    //m.applyDrag(0.1);
    //m.applyFriction(0.01);
    m.uniformAttraction(attractor);


    m.update();
    m.applyBounds();
    m.display();
  }
  fill(0);
  ellipse(attractor.x, attractor.y, 10);
}