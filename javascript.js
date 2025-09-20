// Variables and Constants
const artBoard = document.querySelector(".container__art-board"),
  boxSize = document.querySelector("#size-slider"),
  boxSizeIndicator = document.createElement("div");

let boxNumber = 16,
  colorChosen = document.querySelector("#color-picker"),
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

  boxSizeIndicator.classList.toggle("container__art-board__size");
  boxSizeIndicator.textContent = `${boxNumber} x ${boxNumber}`;
}

function startDrawing(e) {
  if (e.target.classList.contains("container__art-board__box")) {
    drawing = true;

    e.target.style.backgroundColor = `${colorChosen.value}`;
  }
}

function continueDrawing(e) {
  if (!drawing) return;
  if (e.target.classList.contains("container__art-board__box")) {
    e.target.style.backgroundColor = colorChosen.value;
  }
}

function stopDrawing() {
  drawing = false;
}

createBoxes();
