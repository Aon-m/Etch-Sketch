// Get user input
// Create number of divs using loops
//

const artBoard = document.querySelector(".container__art-board"),
  userInput = document.querySelector("#size-slider");
let boxNumber = 16;

userInput.addEventListener("click", () => createBoxes());

function createBoxes() {
  document
    .querySelectorAll(".container__art-board__box")
    .forEach((box) => box.remove());

  boxNumber = +userInput.value;

  for (let i = 1; i <= boxNumber * boxNumber; i++) {
    const box = document.createElement("div");
    box.className = "container__art-board__box";
    artBoard.appendChild(box);
  }

  artBoard.style.gridTemplateColumns = `repeat(${boxNumber}, 1fr)`;
  artBoard.style.gridTemplateRows = `repeat(${boxNumber}, 1fr)`;
}
