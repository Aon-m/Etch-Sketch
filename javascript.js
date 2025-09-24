// Variables and Constants
const artBoard = document.querySelector(".container__art-board"),
  boxSize = document.querySelector("#size-slider"),
  boxSizeIndicator = document.createElement("div"),
  cleanBtn = document.querySelector("#clean"),
  eraserBtn = document.querySelector("#eraser"),
  lightenBtn = document.querySelector("#lighten-mode"),
  shadingBtn = document.querySelector("#shading-mode"),
  rainbowBtn = document.querySelector("#rainbow-mode"),
  brushBtn = document.querySelector("#brush-mode"),
  modeBtn = document.querySelectorAll(".container__button");

let boxNumber = 16,
  colorChosen = document.querySelector("#color-picker"),
  mode = brushMode,
  lastBox,
  drawing = false;

// Eventlisteners
// Inputs
boxSize.insertAdjacentElement("afterend", boxSizeIndicator);
colorChosen.addEventListener("input", dynamicColors);

// Drawing
// Desktop
boxSize.addEventListener("input", () => createBoxes());
artBoard.addEventListener("mousedown", startDrawing);
artBoard.addEventListener("mousemove", continueDrawing);

// Mobile
artBoard.addEventListener("touchstart", startDrawing);
artBoard.addEventListener("touchmove", continueDrawing);

// Global drawing glitch prevention
// Desktop
artBoard.addEventListener("dragstart", (e) => e.preventDefault());
document.addEventListener("mouseup", stopDrawing);
document.addEventListener("dragend", stopDrawing);
document.addEventListener("mouseleave", stopDrawing);

// Mobile
artBoard.addEventListener("touchend", stopDrawing);
artBoard.addEventListener("touchcancel", stopDrawing);
artBoard.addEventListener("touchmove", (e) => e.preventDefault(), {
  passive: false,
});

// Button modes
lightenBtn.addEventListener("click", () => {
  mode = lightenMode;
});
shadingBtn.addEventListener("click", () => {
  mode = shadingMode;
});
rainbowBtn.addEventListener("click", () => {
  mode = rainbowMode;
});
brushBtn.addEventListener("click", () => {
  mode = brushMode;
});
colorChosen.addEventListener("click", () => {
  mode = brushMode;
});
eraserBtn.addEventListener("click", () => {
  mode = eraserMode;
});
cleanBtn.addEventListener("click", clean);

// Mode indicator
modeBtn.forEach((btn) => btn.addEventListener("click", indicateSelectedMode));
brushBtn.classList.add("container__button--mode");

// Functions
function createBoxes() {
  document
    .querySelectorAll(".container__art-board__box")
    .forEach((box) => box.remove());

  boxNumber = +boxSize.value;

  for (let i = 1; i <= boxNumber * boxNumber; i++) {
    const box = document.createElement("div");
    box.className = "container__art-board__box";
    artBoard.appendChild(box);
    box.style.backgroundColor = "#ffffff";
  }

  artBoard.style.gridTemplateColumns = `repeat(${boxNumber}, 1fr)`;
  artBoard.style.gridTemplateRows = `repeat(${boxNumber}, 1fr)`;

  boxSizeIndicator.textContent = `${boxNumber} x ${boxNumber}`;
  boxSizeIndicator.classList.add("container__art-board__size");
}

function startDrawing(e) {
  if (e.target.classList.contains("container__art-board__box")) {
    drawing = true;

    mode(e);
  }
}

function continueDrawing(e) {
  if (!drawing) return;
  if (!e.target.classList.contains("container__art-board__box")) return;

  if (mode === brushMode || mode === clean) {
    mode(e);
  } else {
    if (e.target !== lastBox) {
      mode(e);
      lastBox = e.target;
    }
  }
}

function stopDrawing() {
  drawing = false;
  lastBox = null;
}

function brushMode(e) {
  e.target.style.backgroundColor = colorChosen.value;
}

function rainbowMode(e) {
  let red = Math.floor(Math.random() * 256);
  green = Math.floor(Math.random() * 256);
  blue = Math.floor(Math.random() * 256);

  e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

function eraserMode(e) {
  e.target.style.backgroundColor = "#ffffff";
}

function lightenMode(e) {
  let currentColor = window.getComputedStyle(e.target).backgroundColor;
  let hslValue = rgbToHsl(currentColor);
  let lightness = hslValue[2],
    saturation = hslValue[1],
    hue = hslValue[0];
  if (lightness >= 100) return;
  lightness = Math.min(lightness + 10, 100);
  e.target.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function shadingMode(e) {
  let currentColor = window.getComputedStyle(e.target).backgroundColor;
  let hslValue = rgbToHsl(currentColor);
  let lightness = hslValue[2],
    saturation = hslValue[1],
    hue = hslValue[0];
  if (lightness <= 0) return;
  lightness = Math.max(lightness - 10, 0);
  e.target.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function clean() {
  document
    .querySelectorAll(".container__art-board__box")
    .forEach((box) => (box.style.backgroundColor = "#ffffff"));
  red = null;
  blue = null;
  green = null;
}

function rgbToHsl(rgbStr) {
  const [r, g, b] = rgbStr.match(/\d+/g).slice(0, 3).map(Number);

  let rNorm = r / 255;
  let gNorm = g / 255;
  let bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;

  // Lightness
  let l = (max + min) / 2;

  // Saturation
  let s = 0;
  if (delta != 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
  }

  // Hue
  let h = 0;
  if (delta != 0) {
    if (max === rNorm) {
      h = 60 * (((gNorm - bNorm) / delta) % 6);
    } else if (max === gNorm) {
      h = 60 * ((bNorm - rNorm) / delta + 2);
    } else {
      h = 60 * ((rNorm - gNorm) / delta + 4);
    }
  }

  if (h < 0) h += 360;

  return [h, s * 100, l * 100];
}

function dynamicColors() {
  document.documentElement.style.setProperty(
    "--color-variable",
    colorChosen.value
  );
}

function indicateSelectedMode(e) {
  if (!e.currentTarget.classList.contains("container__button")) return;
  if (e.currentTarget.classList.contains("container__button--clean")) return;
  modeBtn.forEach((btn) => btn.classList.remove("container__button--mode"));
  e.currentTarget.classList.add("container__button--mode");
}

// Startup Commands
createBoxes();
