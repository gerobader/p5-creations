const width = 1400;
const height = 1000;
let explode = false;
let explosion;

let explosionStrength = 15;

let font;
const exploParticles = [];
let followPointCollection;
let followParticleCollection;

const animatedText = ['Generative Gestaltung'];
let singleLetterText = "I'm indestructable! :)";
const smallLetters = ['i', 'l', 'j', 't', "'", 'I', 'r'];
const largeLetters = ['m', 'M'];

let clickInfo = {text: '(click anywhere in the canvas!)', x: width / 2 - 100, y: height/2 + 50};
let clickCount = -1;
let evade = false;
let end = false;
let countClicks = true;
let finale = false;
function preload() {
  font = loadFont('Roboto-Regular.ttf');
}
function setup() {
  let canvas = createCanvas(width, height);
  canvas.parent('canvas-container');
  fr = createP('');
  window.setInterval(() => {fr.html(floor(frameRate()));}, 500);
  textFont(font);
  background(51);
  const exploPoints = font.textToPoints('explosion!', 400, height / 2, 130);
  for (const p of exploPoints) {
    exploParticles.push(new Particle(p.x, p.y, 1, 8, 0, false));
  }
  setupFollowers(10, 150, 70);
}

function draw() {
  colorMode(RGB);
  textSize(13);
  fill(255);
  noStroke();
  text(clickInfo.text, clickInfo.x, clickInfo.y);
  background(51, 50);
  for(const particle of exploParticles) {
    if(explode){
      particle.explode(explosion, explosionStrength)
    }
    particle.applyGravity(0.7);
    particle.applyFriction(0.1);
    particle.applyBounds();
    particle.update();
    particle.displayExplo();
  }
  for(let h = 0; h < followParticleCollection.length; h++) {
    for (let i = 0; i < followParticleCollection[h].length; i++) {
      const particle = followParticleCollection[h][i];
      if(explode){
        particle.explode(explosion, end ? explosionStrength : explosionStrength * 30);
      }
      if(!end){
        particle.follow();
      }else{
        particle.applyGravity(0.7);
        particle.applyFriction(0.2);
        particle.applyBounds();
      }
      particle.update();
      particle.displayRainbow();
    }
  }
  if(evade) {
    evadeMouse();
  }
  explode = false;
}

function mouseClicked() {
  if(mouseX < width && mouseY < height) {
    if(clickCount < 7 && mouseX > 865 && mouseY > 864){
      countClicks = true
    }
    if(countClicks) clickCount++;
    background(255);
    explosion = createVector(mouseX, mouseY);
    explode = true;
    switch(clickCount){
      case 0:
        clickInfo.text = '';
        clickInfo.x = width - 100;
        clickInfo.y = 15;
        break;
      case 4:
        singleLetterText = "Now i'm here!";
        setupFollowers(width - 500, height - 50, 70);
        countClicks = false;
        break;
      case 5:
        singleLetterText = "Get me!";
        setupFollowers(10, height - 150, 50);
        evade = true;
      default:
        break;
    }
    if(finale && mouseX > 1177 && mouseY < 148){
      end = true;
      setTimeout(function () {
        clickCount = -1;
        evade = false;
        end = false;
        countClicks = true;
        finale = false;
      },3000);
    }
  }
}

function evadeMouse() {
  if(mouseX < 240 && mouseY > height - 220){
    singleLetterText = "Gotcha!";
    setupFollowers(width-200, 120, 50);
    evade = false;
    clickCount++;
    countClicks = false;
    finale = true;
  }
}

function setExplosionStrength() {
  explosionStrength = parseInt(document.getElementById('explo-slider').value);
  document.getElementById('display').innerHTML = explosionStrength;
}

function setupFollowers(x, y, fontSize) {
  followPointCollection = [];
  followParticleCollection = [];

  for (let i = 0; i < animatedText.length; i++) {
    const words = animatedText[i];
    followPointCollection.push(font.textToPoints(words, 10,  70, 70));
  }

  let lastLetterWidth = 0;
  for (let i = 0; i < singleLetterText.length; i++) {
    const letter = singleLetterText[i];
    let letterWidth = 45 * (fontSize / 70);
    if(letter === " "){
      lastLetterWidth += 20  * (fontSize / 70);
      continue;
    }
    if(smallLetters.includes(letter)) letterWidth = 20  * (fontSize / 70);
    if(largeLetters.includes(letter)) letterWidth = 60  * (fontSize / 70);
    followPointCollection.push(font.textToPoints(letter, x + lastLetterWidth, y, fontSize));
    lastLetterWidth += letterWidth;
  }

  for(const followLetter of followPointCollection) {
    const particleArray = [];
    for(let i = 0; i < followLetter.length; i++) {
      particleArray.push(new Particle(followLetter[i].x, followLetter[i].y, 1, 4, i, true, followLetter));
    }
    followParticleCollection.push(particleArray);
  }
}
