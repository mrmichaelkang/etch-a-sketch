const body = document.querySelector("body");
const main = document.createElement("main");
const header = document.createElement("header");
const titleHeader = document.createElement("h1");
const grid = document.createElement("div");
const sizeBtn = document.createElement("button");
const fieldSet = document.createElement("fieldset");
const classicLabel = document.createElement("label");
const classicToggle = document.createElement("input");
const rgbLabel = document.createElement("label");
const rgbToggle = document.createElement("input");
const sidebar = document.createElement("div");
const width = 500;
const height = 500;
let size = 16;
let isDraggable = false;

sizeBtn.addEventListener("click", () => {
  size = parseInt(prompt("What size do you want the grid to be?"));
  if (size <= 100 && size > 0) {
    removeGrid();
    generateGrid(size);
  } else {
    alert("Size needs to be between 1 and 100");
  }
});

classicToggle.addEventListener("click", () => {
  rgbToggle.checked = false;
});

rgbToggle.addEventListener("click", () => {
  classicToggle.checked = false;
});

function fillSquare(e) {
  if (isDraggable) {
    if (rgbToggle.checked && e.target.style.backgroundColor === "white") {
      const [red, green, blue] = getRandomRGB();
      e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    } else if (classicToggle && e.target.style.backgroundColor === "white") {
      e.target.style.backgroundColor = "gray";
    }
  }
}

function generateGrid(size) {
  for (let i = 0; i < size; i++) {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.classList.add("row");
    for (let j = 0; j < size; j++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.style.backgroundColor = "white";
      square.style.width = `${width / size}px`;
      square.style.height = `${height / size}px`;
      square.style.border = "1px solid gray";

      square.addEventListener("mousedown", (e) => {
        e.preventDefault();
        isDraggable = true;
      });
      square.addEventListener("mouseover", fillSquare);
      square.addEventListener("mouseup", () => {
        isDraggable = false;
      });

      row.appendChild(square);
    }
    grid.appendChild(row);
  }
  main.appendChild(grid);
}

function removeGrid() {
  const rows = document.querySelectorAll(".row");
  rows.forEach((row) => grid.removeChild(row));
}

function getRandomRGB() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return [red, green, blue];
}

grid.classList.add("grid");
grid.style.width = `${width}px`;
grid.style.height = `${height}px`;
grid.style.border = "1px solid gray";
titleHeader.textContent = "Etch a Sketch";
sizeBtn.textContent = "Change Grid Size";
classicLabel.textContent = "Classic ";
rgbLabel.textContent = "RGB ";
sidebar.classList.add("sidebar");
classicToggle.type = "radio";
classicToggle.checked = true;
rgbToggle.type = "radio";

header.appendChild(titleHeader);
main.appendChild(header);
main.appendChild(sizeBtn);
classicLabel.appendChild(classicToggle);
rgbLabel.appendChild(rgbToggle);
fieldSet.appendChild(classicLabel);
fieldSet.appendChild(rgbLabel);
sidebar.appendChild(fieldSet);
main.appendChild(sidebar);

body.appendChild(header);
body.appendChild(main);

generateGrid(size);
