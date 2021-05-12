/// < reference path="./p5.global-mode.d.ts" / >

var cell_size;
var gridWidth = 35;
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

function getMouseCoords() {
    let x = Math.floor((mouseX + cell_size / 5) / cell_size);
    let y = Math.floor((mouseY + cell_size / 5) / cell_size);
    return [x, y];
}

function includesCoordPair(arr, pairToFind) {
    for (let pair of arr) {
        if (
            pair[0][0] == pairToFind[0][0] &&
            pair[0][1] == pairToFind[0][1] &&
            pair[1][0] == pairToFind[1][0] &&
            pair[1][1] == pairToFind[1][1]
        ) {
            return true;
        }
    }
    return false;
}

function drawTrack(lines) {
    stroke([10, 200, 200]);
    strokeWeight(cell_size / 10);
    for (let toDraw of lines) {
        line(
            toDraw[0][0] * cell_size,
            toDraw[0][1] * cell_size,
            toDraw[1][0] * cell_size,
            toDraw[1][1] * cell_size
        );
    }
}

var start = new Goal(2, 1, "Vertical", 6, [10, 240, 30]);
var end = new Goal(10, 5, "Horizontal", 6, [240, 10, 10]);
var Для_Ксю = new Goal(20, 10, "Horizontal", 10, [139, 0, 139]);
var drawingTrack = false;
var mouseGridX = -1;
var mouseGridY = -1;
var newWallX0 = -1;
var newWallY0 = -1;
var newWallX1 = -1;
var newWallY1 = -1;
var trackCoords = [];
var tempMouseX, tempMouseY;
var widthInput, heightInput;

function setup() {
    cell_size = Math.min(windowWidth / gridWidth, windowHeight / (gridHeight + 1.5));
    createCanvas(gridWidth * cell_size, gridHeight * cell_size);
    widthInput = createInput();
    widthInput.position(0, gridHeight * cell_size);
    widthInput.size(cell_size * 4, cell_size);
    heightInput = createInput();
    heightInput.position(cell_size * 4, gridHeight * cell_size);
    heightInput.size(cell_size * 4, cell_size);
}

function draw() {
    background([242, 238, 203]);
    drawGrid();
    start.draw();
    end.draw();
    Для_Ксю.draw();
    if (mouseIsPressed == true) {
        [tempMouseX, tempMouseY] = getMouseCoords();
        if (tempMouseX != mouseGridX || tempMouseY != mouseGridY) {
            mouseGridX = tempMouseX;
            mouseGridY = tempMouseY;

            if (!drawingTrack == true) {
                drawingTrack = true;
                newWallX0 = mouseGridX;
                newWallY0 = mouseGridY;
            } else {
                drawingTrack = false;
                newWallX1 = mouseGridX;
                newWallY1 = mouseGridY;

                let pair = [
                    [newWallX0, newWallY0],
                    [newWallX1, newWallY1]
                ].sort();
                if (!includesCoordPair(trackCoords, pair)) {
                    trackCoords.push(pair);
                } else {
                    //console.log("Duplicate Found");
                    let newTrackCoords = []
                    for (let toCheck of trackCoords) {
                        if (!includesCoordPair([toCheck], pair)) {
                            newTrackCoords.push(toCheck);
                        }
                    }
                    trackCoords = newTrackCoords;
                }

                //console.log(trackCoords);
            }
        }
    } else {
        if (!drawingTrack == true) {
            mouseGridX = -1;
            mouseGridY = -1;
        }
    }

    drawTrack(trackCoords);

    if (drawingTrack == true) {
        strokeWeight(cell_size / 10);
        stroke([0, 130, 130]);
        line(newWallX0 * cell_size, newWallY0 * cell_size, mouseX, mouseY);

    }
    stroke([200, 0, 0]);
    circle(mouseGridX * cell_size, mouseGridY * cell_size, 6);
}

function windowResized() {
    cell_size = Math.min(windowWidth / gridWidth, windowHeight / (gridHeight + 1.5));
    resizeCanvas(gridWidth * cell_size, gridHeight * cell_size);
    widthInput.position(0, gridHeight * cell_size);
    widthInput.size(cell_size * 4, cell_size);
    heightInput.position(cell_size * 4, gridHeight * cell_size);
    heightInput.size(cell_size * 4, cell_size);
}