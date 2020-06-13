let secondsRect;
let minutesRect;
let hoursRect;

let timeOffset = 0;
let lastTarget;

let roboto;

const oldVersion = false;

let sky;
let ground;
let sun;
let moon;
const stars = [];
const starCount = 100;
let dayScale;
let nightScale;
let actualSecond;
let actualMinute;
let actualHour;
let runtimeSeconds = 0;
let runtimeHours = 0;
let addHour = false;
let lastSecond;
let runtimeMillis;
let offsetCalculated = false;
let milliOffset = 0;

let currentHour = 0;
let currentMinute = 0;
let lastMinute = 0;
let currentSecond= 0;

let timeMultiplicator = 1;
let timeSlider;
let timeInput;
let fadeOutButton;

let fadeOutScale = false;

function preload() {
  roboto = loadFont('Roboto-Regular.ttf');
}

function setup() {
  let canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent('canvas-container');
  textFont(roboto);
  const fr = document.getElementById('fps');
  if(oldVersion) {
    secondsRect = new TimeRect(0, 2 * height / 3, 0, height / 3, [color(252, 172, 0), color(255, 87, 51)], second, 60, minute, 's');
    minutesRect = new TimeRect(0, height / 3, 0, height/3, [color(199, 0, 57), color(144, 12, 63)], minute, 60, hour, 'm');
    hoursRect = new TimeRect(0, 0, 0, height/3, [color(88, 24, 69), color(41, 15, 48)], hour, 24, day, 'h');
  } else {
    lastSecond = second();
    actualSecond = second();
    actualMinute = minute();
    actualHour = hour();
    calculateTime();
    sky = new BackgroundRect(0, 0, width, height/1.5, color(112, 215, 255), color(0, 136, 148), color(25));
    ground = new BackgroundRect(0, height/1.5 , width, height - height/1.5, color(13, 191, 0), color(8, 138, 15), color(1, 26, 2));
    sun = new CelestialBody(0, color(255, 243, 8), color(235, 66, 9), 17, 6, false);
    sun.constructor();
    moon = new CelestialBody(180, color(199, 10), color(214, 255),18, 5, true);
    moon.constructor();
    for(let i = 0; i < starCount; i++){
      stars.push(new Star(random(width / 2), random(360), 2, random(50, 255)));
      stars[i].constructor();
    }
    stars.push(new Star(1, 0, 5, 255));
    dayScale = new TimeScale(6, 18, 0);
    nightScale = new TimeScale(18, 30, 180);
  }
  window.setInterval(() => {fr.innerHTML = floor(frameRate());}, 500);
}

function draw() {
  background(51);
  const d = day();
  const h = hour();
  const m = minute();

  if(oldVersion) {
    hoursRect.update(d);
    hoursRect.display();
    minutesRect.update(h);
    minutesRect.display();
    secondsRect.update(m);
    secondsRect.display();
  } else {
    if (!offsetCalculated){
      if (second() !== lastSecond) {
        offsetCalculated = true;
        milliOffset = millis();
      }
    }
    calculateTime();
    strokeWeight(0);
    sky.display();
    for(let i = 0; i < starCount + 1; i++){
      stars[i].display();
    }
    moon.display();
    sun.display();
    dayScale.display();
    nightScale.display();
    ground.display();
  }
}

function calculateTime() {
  runtimeMillis = (millis() - milliOffset) * timeMultiplicator;
  runtimeSeconds = Math.floor(runtimeMillis / 1000);
  currentSecond = (actualSecond + runtimeSeconds) % 60;
  currentMinute = (actualMinute + Math.floor((runtimeSeconds + actualSecond) / 60)) % 60;

  // for some reason, instead of doing this: currentHour = (actualHour + timeOffset + Math.floor((actualMinute + runtimeMinutes) / 60)) % 24;
  // i have to do this., or else the hour would update 1-3 frames late
  if(Math.abs(currentMinute - lastMinute) > 40) {
    if(addHour){
      runtimeHours++;
      addHour = false;
    }
  } else if(!addHour) {
    addHour = true;
  }
  currentHour = (actualHour + timeOffset + runtimeHours) % 24;
  lastMinute = currentMinute;
}

function setTimeOffset({target}) {
  lastTarget.classList.remove('active');
  target.classList.add('active');
  lastTarget = target;
  timeOffset = parseInt(target.dataset.time)
}

function resetTime() {
  timeMultiplicator = 1;
  timeSlider.value = 1;
  timeInput.value = 1;
  offsetCalculated = false;
  milliOffset = 0;
  currentHour = 0;
  currentMinute = 0;
  lastMinute = 0;
  currentSecond= 0;
  runtimeSeconds = 0;
  runtimeHours = 0;
  lastSecond = second();
  actualSecond = second();
  actualMinute = minute();
  actualHour = hour();
  calculateTime();
}

function setupListeners(){
  const de = document.getElementById('de');
  lastTarget = de;
  de.addEventListener('click', setTimeOffset);
  const br = document.getElementById('br');
  br.addEventListener('click', setTimeOffset);
  const jp = document.getElementById('jp');
  jp.addEventListener('click', setTimeOffset);

  timeSlider = document.getElementById('time-slider');
  timeSlider.addEventListener('change', (e) => setTimeMultiplicator(e));

  timeInput = document.getElementById('time-input');
  timeInput.addEventListener('change', (e) => setTimeMultiplicator(e));

  fadeOutButton = document.getElementById('fade-out');
  fadeOutButton.addEventListener('click', setScaleFade);
}

function setScaleFade() {
  fadeOutScale = !fadeOutScale;
  fadeOutButton.innerHTML = fadeOutScale ? 'Disable Fade out' : 'Enable Fade out';
}

function setTimeMultiplicator(e) {
  timeMultiplicator = parseInt(e.target.value);
  timeSlider.value = timeMultiplicator;
  timeInput.value = timeMultiplicator;
}
