// Variables and Constants
const artBoard = document.querySelector(".container__art-board"),
  boxSize = document.querySelector("#size-slider"),
  boxSizeIndicator = document.createElement("div"),
  cleanBtn = document.querySelector("#clean"),
  eraserBtn = document.querySelector("#eraser"),
  lightenBtn = document.querySelector("#lighten-mode"),
  shadingBtn = document.querySelector("#shading-mode"),
  rainbowBtn = document.querySelector("#rainbow-mode"),
  brushBtn = document.querySelector("#brush-mode");

let boxNumber = 16,
  colorChosen = document.querySelector("#color-picker"),
  mode = brushMode,
  red = null,
  blue = null,
  green = null,
  drawing = false;

// Eventlisteners
// Inputs
boxSize.insertAdjacentElement("afterend", boxSizeIndicator);

// Drawing
boxSize.addEventListener("input", () => createBoxes());
artBoard.addEventListener("mousedown", startDrawing);
artBoard.addEventListener("mousemove", continueDrawing);

// Global drawing glitch prevention
artBoard.addEventListener("dragstart", (e) => e.preventDefault());
document.addEventListener("mouseup", stopDrawing);
document.addEventListener("dragend", stopDrawing);
document.addEventListener("mouseleave", stopDrawing);

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
eraserBtn.addEventListener("click", () => {
  mode = eraserMode;
});
cleanBtn.addEventListener("click", clean);

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
  if (e.target.classList.contains("container__art-board__box")) {
    mode(e);
  }
}

function stopDrawing() {
  drawing = false;
}

function brushMode(e) {
  e.target.style.backgroundColor = colorChosen.value;
}

function rainbowMode(e) {
  red = Math.floor(Math.random() * 256);
  green = Math.floor(Math.random() * 256);
  blue = Math.floor(Math.random() * 256);

  e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

function eraserMode(e) {
  e.target.style.backgroundColor = "#ffffff";
}

function lightenMode(e) {}

function shadingMode(e) {}

function clean() {
  document
    .querySelectorAll(".container__art-board__box")
    .forEach((box) => (box.style.backgroundColor = "#ffffff"));
  red = null;
  blue = null;
  green = null;
}

// Startup Commands
createBoxes();
