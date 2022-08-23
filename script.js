const container = document.querySelector("#container")
const clear = document.querySelector("#clear");
const rainbowBtn = document.queryCommandIndeterm("#rainbow");
const eraserBtn = document.queryCommandIndeterm("#eraser");
const gridLinesSwitch = document.getElementById("grid-lines");
const range = document.getElementById("range");
const penColor = document.getElementById("pen-color");
const bgColor = document.getElementById("background-color");
let maxRow = 16;
let isDrawing = false;
let hue = 0;
let gridLinesOn = true;
range.value = 16;
rangeUpdate()
window.addEventListener("mousedown", () => { isDrawing = true });
window.addEventListener("mouseup", () => { isDrawing = false });

let colorMode = document.getElementById("color-mode");
let rainbowMode = document.getElementById("rainbow-mode");
let eraserMode = document.getElementById("eraser-mode");

// create the grid boxes
function createGrid(maxRow, maxRow) {
    for (let i = 0; i < (maxRow * maxRow); i++) {
        let box = document.createElement("div");
        container.appendChild(box);
        container.style.gridTemplateRows = `repeat(${maxRow}, 1fr)`;
        container.style.gridTemplateColumns = `repeat(${maxRow}, 1fr)`;
        box.classList.add("box");
        if (gridLinesOn) { box.classList.add("grid-lines") };
        box.addEventListener("mousedown", changeColor1)
        box.addEventListener("mouseover", changeColor2)
    }
}

function changeColor2() {
    if (isDrawing) {
        if (colorMode.checked) {
            this.style.backgroundColor = penColor.value;
        }
        if (rainbowMode.checked) {
            this.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
            hue = hue + 12;
            if (hue >= 360) { hue = 0 }
        }
        if (eraserMode.checked) {
            this.style.backgroundColor = container.style.backgroundColor;
        }
    }
}

function changeColor1() {
    if (colorMode.checked) {
        this.style.backgroundColor = penColor.value;
    }
    if (rainbowMode.checked) {
        this.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
        hue = hue + 12;
        if (hue >= 360) { hue = 0 }
    }
    if (eraserMode.checked) {
        this.style.backgroundColor = container.style.backgroundColor;
    }
}

createGrid(maxRow, maxRow)
let boxes = document.querySelectorAll(".box")

// hide grid lines
gridLinesSwitch.addEventListener("change", toggleGridLines);
function toggleGridLines() {
    let boxes = document.querySelectorAll(".box");
    gridLinesOn = !gridLinesOn;
    for (let box of boxes) { box.classList.toggle("grid-lines") }
    container.classList.toggle("grid-lines");
}

// display current range value
range.addEventListener("input", rangeUpdate)
function rangeUpdate() { document.getElementById("result").textContent = `${range.value} x ${range.value}` }

// update grid size based on slider value
range.addEventListener("mouseup", updateGrid);
function updateGrid() {
    container.innerHTML = "";
    createGrid(range.value, range.value);
}

// clear grid
clear.addEventListener("click", () => {
    container.innerHTML = "";
    createGrid(range.value, range.value);
    container.style.backgroundColor = bgColor.value
})

// update background color based on user selection
bgColor.addEventListener("input", () => { container.style.backgroundColor = bgColor.value });
