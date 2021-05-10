/// < reference path="./p5.global-mode.d.ts" / >

var cell_size;
var gridWidth = 32;
var gridHeight = 20;

function Goal(x, y, direction, length, color) {
    this.x0 = x;
    this.y0 = y;
    if (direction == "Vertical") {
        this.x1 = x;
        this.y1 = y + length;
    } else if (direction == "Horizontal") {
        this.x1 = x + length;
        this.y1 = y;
    }

    this.draw = function() {
        stroke(color);
        strokeWeight(cell_size / 10);
        line(
            this.x0 * cell_size + 1,
            this.y0 * cell_size + 1,
            this.x1 * cell_size + 1,
            this.y1 * cell_size + 1
        );
    };
}

function drawGrid() {
    strokeWeight(cell_size / 15);
    stroke([82, 130, 214]);
    for (var i = 1; i < gridWidth; i++) {
        line(i * cell_size + 1, 0, i * cell_size + 1, gridHeight * cell_size);
    }
    for (var i = 1; i < gridHeight; i++) {
        line(0, i * cell_size + 1, gridWidth * cell_size, i * cell_size);
    }
}

var start = new Goal(2, 1, "Vertical", 6, [10, 240, 30]);
var end = new Goal(10, 5, "Horizontal", 6, [240, 10, 10]);
var Для_Ксю = new Goal(20, 10, "Horizontal", 10, [139, 0, 139]);

function setup() {
    cell_size = Math.min(windowWidth / gridWidth, windowHeight / gridHeight);
    createCanvas(gridWidth * cell_size, gridHeight * cell_size);
}

function draw() {
    background([242, 238, 203]);
    drawGrid();
    start.draw();
    end.draw();
    Для_Ксю.draw();
}

function windowResized() {
    cell_size = Math.min(windowWidth / gridWidth, windowHeight / gridHeight);
    resizeCanvas(gridWidth * cell_size, gridHeight * cell_size);
}