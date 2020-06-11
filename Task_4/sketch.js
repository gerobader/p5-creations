let secondsRect;
let minutesRect;
let hoursRect;

let timeOffset = 0;
let lastTarget;

let roboto;

function preload() {
  roboto = loadFont('Roboto-Regular.ttf');
}

function setup() {
  let canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent('canvas-container');
  textFont(roboto);
  const fr = document.getElementById('fps');
  secondsRect = new TimeRect(0, 2 * height / 3, 0, height / 3, [color(252, 172, 0), color(255, 87, 51)], second, 60);
  minutesRect = new TimeRect(0, height / 3, 0, height/3, [color(199, 0, 57), color(144, 12, 63)], minute, 60);
  hoursRect = new TimeRect(0, 0, 0, height/3, [color(88, 24, 69), color(41, 15, 48)], hour, 24);
  window.setInterval(() => {fr.innerHTML = floor(frameRate());}, 500);
}

function draw() {
  background(51);
  const d = day();
  const h = hour();
  const m = minute();

  hoursRect.update(d);
  hoursRect.display();

  minutesRect.update(h);
  minutesRect.display();

  secondsRect.update(m);
  secondsRect.display();
}

function setTimeOffset({target}) {
  lastTarget.classList.remove('active');
  target.classList.add('active');
  lastTarget = target;
  timeOffset = parseInt(target.dataset.time)
}

function setupListeners(){
  const de = document.getElementById('de');
  lastTarget = de;
  de.addEventListener('click', setTimeOffset);
  const br = document.getElementById('br');
  br.addEventListener('click', setTimeOffset);
  const jp = document.getElementById('jp');
  jp.addEventListener('click', setTimeOffset);
}