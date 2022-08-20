const container = document.getElementById("container");
const range = document.getElementById("range");
const penColor = document.getElementById("pen-color");
const bgColor = document.getElementById("background-color");
const eraser = document.getElementById("eraser");
const random = document.getElementById("random");
const gridLinesSwitch = document.getElementById("grid-lines");
const reset = document.getElementById("reset");
const cells = document.querySelectorAll(".cell");
let gridLinesOn = true;
let drawing = false;
let randomOn = false;
let maxRow = 30;
let ranColor

container.addEventListener('mousedown', () => { drawing = true });
container.addEventListener('mouseup', () => { drawing = false });


// Reset the board
reset.addEventListener('click', () => {
    let cells = document.querySelectorAll(".cell");
    maxRow = 30;
    document.getElementById("result").textContent = "30 x 30"
    range.value = 30;
    createGrid(30);
    container.style.backgroundColor = "#ffffff";
    for (let cell of cells) { cell.style.backgroundColor = container.style.backgroundColor };
});


gridLinesSwitch.addEventListener("change", toggleGridLines)

// create cells in grid
function createGrid(maxRow, maxRow) {
    for (let i = 0; i < (maxRow * maxRow); i++) {
        let cell = document.createElement("div");
        container.appendChild(cell);
        container.style.gridTemplateRows = `repeat(${maxRow}, 1fr)`;
        container.style.gridTemplateColumns = `repeat(${maxRow}, 1fr)`;
        cell.classList.add('cell');
        cell.addEventListener('mouseover', () => {
             ranColor = "white";

            if (drawing && !randomOn) { cell.style.backgroundColor = penColor.value }
            if (randomOn) { getRandom(); };
            function getRandom() {
                let r = Math.floor(Math.random() * 255);
                let g = Math.floor(Math.random() * 255);
                let b = Math.floor(Math.random() * 255);
                color = `rgb(${r}, ${g}, ${b})`;
                ranColor.value = rgbToHex(r, g, b);
                cell.style.backgroundColor = ranColor.value;
            }

            function rgbToHex(r, g, b) {
                return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
            };
            // Convert RGB to HEX
            function componentToHex(r) {
                let hex = r.toString(16);
                return hex.length == 1 ? "0" + hex : hex;
            };
        });
        cell.addEventListener('mousedown', () => {
            if (randomOn) {
                if (randomOn) { getRandom(); };
                function getRandom() {
                    let r = Math.floor(Math.random() * 255);
                    let g = Math.floor(Math.random() * 255);
                    let b = Math.floor(Math.random() * 255);
                    color = `rgb(${r}, ${g}, ${b})`;
                    ranColor.value = rgbToHex(r, g, b);
                    cell.style.backgroundColor = ranColor.value;
                }

                function rgbToHex(r, g, b) {
                    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
                };
                // Convert RGB to HEX
                function componentToHex(r) {
                    let hex = r.toString(16);
                    return hex.length == 1 ? "0" + hex : hex;
                };
            } else { cell.style.backgroundColor = penColor.value };
        });
        bgColor.addEventListener("change", () => { container.style.backgroundColor = bgColor.value });
        if (gridLinesOn) { cell.classList.add("grid-lines") };

    }
}

random.addEventListener("click", () => {
    randomOn = !randomOn;
    random.classList.toggle("active");
    console.log(random.classList)
})



function toggleGridLines() {
    let cells = document.querySelectorAll(".cell");
    gridLinesOn = !gridLinesOn;
    for (let cell of cells) { cell.classList.toggle("grid-lines") }
    container.classList.toggle("grid-lines");
}

createGrid(maxRow, maxRow)
rangeUpdate()

// display current range value
range.addEventListener("input", rangeUpdate)
function rangeUpdate() { document.getElementById("result").textContent = `${range.value} x ${range.value}` }

// update grid size based on slider value
range.addEventListener("mouseup", updateGrid);
function updateGrid() {
    cells.forEach(cell => cell.remove());
    createGrid(range.value, range.value);
}


