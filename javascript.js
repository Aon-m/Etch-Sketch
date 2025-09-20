// Get user input
// Create number of divs using loops
//

let boxNumber = +prompt("How many boxes?", 16);
const artBoard = document.querySelector(".container__art-board");

function createBoxes() {
  for (let i = 1; i <= boxNumber * boxNumber; i++) {
    const box = document.createElement("div");
    box.className = "container__art-board__box";
    artBoard.appendChild(box);
  }

  artBoard.style.gridTemplateColumns = `repeat(${boxNumber}, 1fr)`;
  artBoard.style.gridTemplateRows = `repeat(${boxNumber}, 1fr)`;
}

createBoxes();
