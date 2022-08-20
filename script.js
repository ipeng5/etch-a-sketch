const container = document.getElementById("container");
const range = document.getElementById("range");
const penColor = document.getElementById("pen-color");
const bgColor = document.getElementById("background-color");
const eraser = document.getElementById("eraser");
const gridLine = document.getElementById("grid-line");
let trigger = false;
let maxRow = 30;

container.addEventListener('mousedown', () => {
    trigger = true;
});

container.addEventListener('mouseup', () => {
    trigger = false;
});

// create cells in grid
function createGrid(maxRow, maxRow) {
    for (let i = 0; i < (maxRow * maxRow); i++) {
        let cell = document.createElement("div");
        container.appendChild(cell);
        container.style.gridTemplateRows = `repeat(${maxRow}, 1fr)`;
        container.style.gridTemplateColumns = `repeat(${maxRow}, 1fr)`;
        cell.classList.add('cell');
        cell.style.border = "1px solid gray";
        cell.addEventListener('mousedown', () => { cell.style.backgroundColor = penColor.value });
        cell.addEventListener('mouseover', () => { if (trigger) cell.style.backgroundColor = penColor.value });
        bgColor.addEventListener("change", () => { container.style.backgroundColor = bgColor.value });
    }
}
createGrid(maxRow, maxRow)


gridLine.addEventListener("change", changeGrid)
function changeGrid() {
     if (e.target.checked) { console.log("checked") } else { container.style.backgroundColor = "red" } 
}


// display current range value
range.addEventListener("input", rangeUpdate)
function rangeUpdate() {
    document.getElementById("result").textContent = `${range.value} x ${range.value}`;
}

// display default size range value
rangeUpdate()

// update grid size based on slider value
range.addEventListener("mouseup", updateGrid);
function updateGrid() {
    let cells = container.querySelectorAll(".cell");
    cells.forEach(cell => cell.remove());
    createGrid(range.value, range.value);
}


