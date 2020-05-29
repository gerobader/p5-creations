let colorInput;
let layerOffsetXInput;
let layerOffsetYInput;
let displayWrapper;

const width = 600;
const height = 400;
let singleColor = false;
let noiseLod = 1;
let falloff = 50;
let noiseIncrement = 0.01;
let noiseLayers = [];
const perlin = Perlin();

function setup() {
  pixelDensity(1);
  let canvas = createCanvas(width, height);
  canvas.parent('canvas-container');
  noLoop();
}

function draw() {
  background(255);
  perlin.compute();
}

function Perlin() {
  function compute() {
    if (noiseLayers.length > 0) {
      loadPixels();
      let yOff = 0;
      let pxRed;
      let noiseVal;
      let xNoise;
      let yNoise;

      let lastRed = 0;
      let lastGreen = 0;
      let lastBlue = 0;
      let lastAlpha = 0;
      let redC = 0;
      let greenC = 0;
      let blueC = 0;
      let alphaC = 0;
      let alpha = 0;
      noiseDetail(noiseLod, falloff);
      for (let y = 0; y < height; y++) {
        let xOff = 0;
        for (let x = 0; x < width; x++) {
          let highestNoise = 0;
          for (const noiseLayer of noiseLayers) {
            const {xOffset, yOffset, layerColor} = noiseLayer;
            xNoise = xOffset + xOff;
            yNoise = yOffset + yOff;
            noiseVal = noise(xNoise, yNoise);
            // https://de.wikipedia.org/wiki/Alpha_Blending
            alpha = noiseVal * 255;
            if(singleColor){
              if (noiseVal > highestNoise) {
                redC = red(layerColor);
                greenC = green(layerColor);
                blueC = blue(layerColor);
                alphaC = alpha;
                highestNoise = noiseVal;
              }
            } else {
              alphaC = alpha + (1 - noiseVal) * lastAlpha;
              redC = 1 / alphaC * (alpha * red(layerColor) + (1 - noiseVal) * lastAlpha * lastRed);
              greenC = 1 / alphaC * (alpha * green(layerColor) + (1 - noiseVal) * lastAlpha * lastGreen);
              blueC = 1 / alphaC * (alpha * blue(layerColor) + (1 - noiseVal) * lastAlpha * lastBlue);
              lastRed = redC;
              lastGreen = greenC;
              lastBlue = blueC;
              lastAlpha = alphaC;
            }
          }
          pxRed = (y * width + x) * 4;
          pixels[pxRed] = redC;
          pixels[pxRed + 1] = greenC;
          pixels[pxRed + 2] = blueC;
          pixels[pxRed + 3] = alphaC;
          xOff += noiseIncrement
        }
        yOff += noiseIncrement;
      }
      updatePixels();
    } else {
      textSize(32);
      text('No Layers active', 150, 100);
      fill(0, 102, 153);
    }
  }

  return {
    compute: compute,
  }
}

function setupListeners(){
  const lodInput = document.getElementById('lod');
  lodInput.addEventListener('change', setNoiseLod);

  const falloffInput = document.getElementById('falloff');
  falloffInput.addEventListener('change', setFalloff);

  const incrementInput = document.getElementById('increment');
  incrementInput.addEventListener('change', setIncrement);

  colorInput = document.getElementById('layer-color');
  layerOffsetXInput = document.getElementById('offset-x');
  layerOffsetYInput = document.getElementById('offset-y');
  const addLayerButton = document.getElementById('add-layer');
  addLayerButton.addEventListener('click', addNoiseLayer);

  const createRandomButton = document.getElementById('create-random');
  createRandomButton.addEventListener('click', createRandomLayers);

  displayWrapper = document.getElementById('display-wrapper');
}

function addNoiseLayer(){
  noiseLayers.push({
    layerColor: hexToRgb(colorInput.value),
    xOffset: parseFloat(layerOffsetXInput.value),
    yOffset: parseFloat(layerOffsetYInput.value)
  });
  redraw();
  showLayersInDom();
}

function createRandomLayers() {
  noiseLayers = [];
  for(let i = 0; i < int(random(2, 10)); i++) {
    noiseLayers.push({
      layerColor: color(random(255), random(255), random(255)),
      xOffset: random(0, 1000),
      yOffset: random(0, 1000)
    });
  }
  redraw();
  showLayersInDom();
}

function handleSingleColorControl(cb) {
  singleColor = cb.checked;
  redraw();
}

function setNoiseLod(e) {
  noiseLod = int(e.target.value);
  redraw();
}

function setFalloff(e) {
  falloff = parseFloat(e.target.value);
  redraw();
}

function setIncrement(e) {
  noiseIncrement = parseFloat(e.target.value);
  redraw();
}

function hexToRgb(hex) {
  // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? color(
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ) : null;
}

function showLayersInDom() {
  displayWrapper.innerHTML = '';
  for (let i = 0; i < noiseLayers.length; i++) {
    let container = document.createElement('div');
    container.classList.add('layer-wrapper');
    const {layerColor, xOffset, yOffset} = noiseLayers[i];
    const infoSpan1 = document.createElement('span');
    let layerInfo = `Layer ${i + 1}: Color:`;
    const text1 = document.createTextNode(layerInfo);
    infoSpan1.appendChild(text1);
    const color = document.createElement('div');
    color.classList.add('color');
    color.setAttribute('style', `background: rgb(${red(layerColor)}, ${green(layerColor)}, ${blue(layerColor)});`)
    const infoSpan2 = document.createElement('span');
    layerInfo = `Offset X: ${xOffset} | Offset Y: ${yOffset}`;
    const text2 = document.createTextNode(layerInfo);
    infoSpan2.appendChild(text2);
    container.appendChild(infoSpan1);
    container.appendChild(color);
    container.appendChild(infoSpan2);
    displayWrapper.appendChild(container);
  }
}
