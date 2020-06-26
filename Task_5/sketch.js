let gravity;

const fireworks = [];
const fountains = [];

let bigBois = [];
let timer = 0;
function setup() {
  let canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent('canvas-container');
  gravity = createVector(0, 0.07);
  const offsetCount = Math.ceil(width / 1902);
  for (let i = 0; i < offsetCount; i++){
    createFireworks(i);
  }
  for (let firework of fireworks) {
    firework.addFirework();
  }
  background(0);
}

function draw() {
  colorMode(RGB);
  background(0, 50);
  colorMode(HSB);
  if(mouseIsPressed){
    console.log(mouseX, height - mouseY);
  }
  bigBoiTimer();
  for (let firework of fireworks) {
    firework.run()
  }
  for (let fountain of fountains) {
    fountain.display();
  }
  timer++;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function bigBoiTimer() {
  if (timer % 800 === 200){
    bigBois.push(new BigBoi(random(width / 5, 4 * (width / 5)), height - 200));
  }
  for (let i = bigBois.length - 1; i >= 0; i--) {
    const bigBoi = bigBois[i];
    if (bigBoi.exploded && bigBoi.rockets.length === 0) {
      bigBois.splice(i, 1);
      continue;
    }
    bigBoi.update();
    bigBoi.display();
  }
}

function createFireworks(offset) {
  if (width > 30 * (offset + 1)) {
    fireworks.push(new Firework(30 + (offset * 1902), height - 529, parseInt(random(80, 200)), 1000, 2300));
  }
  if (width > 422 * (offset + 1)) {
    fireworks.push(new Firework(422 + (offset * 1902), height - 564, parseInt(random(80, 200)), 1000, 2300));
  }
  if (width > 622 * (offset + 1)) {
    fireworks.push(new Firework(622 + (offset * 1902), height - 489, parseInt(random(80, 200)), 1100, 2300));
  }
  if (width > 1295 * (offset + 1)) {
    fireworks.push(new Firework(1295 + (offset * 1902), height - 602, parseInt(random(80, 200)), 700, 2000));
    fireworks.push(new Firework(1295 + (offset * 1902), height - 602, parseInt(random(80, 200)), 700, 2000));
  }
  if (width > 1802 * (offset + 1)) {
    fireworks.push(new Firework(1802 + (offset * 1902), height - 509, parseInt(random(80, 200)), 700, 2000));
  }

  if(width > 716 * (offset + 1)) {
    fountains.push(new Fountain(716 + (offset * 1902), height - 814, -2, -4));
    fountains.push(new Fountain(716 + (offset * 1902), height - 614, -2, -4));
  }
  if(width > 800 * (offset + 1)) {
    fountains.push(new Fountain(800 + (offset * 1902), height - 814, 2, -4));
    fountains.push(new Fountain(800 + (offset * 1902), height - 614, 2, -4));
  }
}


