/// < reference path="./p5.global-mode.d.ts" / >

var gridWidth = 100;
var gridHeight = 50;
var cellSize = Math.min(1000 / gridWidth, 500 / gridHeight);
var mainloop = true;
var ants = [];
var walls = [];
var foods = []; //english language left the chat
var dirs = [
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
];

for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
        ants.push(new Ant(i * 4, j * 4));
    }
} //*/

for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        foods.push(new Food(i + 80, j + 30));
    }
}

for (let i = 0; i < 40; i++) {
    walls.push(new Wall(60, 49 - i));
}

for (let i = 0; i < 40; i++) {
    walls.push(new Wall(30, i));
}

function atXY(x, y) {
    rect(x * cellSize, y * cellSize, cellSize, cellSize);
    if (x == -1 || y == -1 || x == gridWidth || y == gridHeight) {
        return null;
    }
    for (let ant of ants) {
        if (ant.x == x && ant.y == y) {
            return ant;
        }
    }
    for (let food of foods) {
        if (food.x == x && food.y == y) {
            return food;
        }
    }
    for (let wall of walls) {
        if (wall.x == x && wall.y == y) {
            return wall;
        }
    }
    return null;
}

function drawGrid() {
    stroke("#000000");
    for (let i = 1; i < gridWidth; i++) {
        line(i * cellSize + 1, 0, i * cellSize + 1, gridHeight * cellSize);
    }
    for (let i = 1; i < gridHeight; i++) {
        line(0, i * cellSize + 1, gridWidth * cellSize, i * cellSize);
    }
}

function Ant(x, y) {
    this.x = x;
    this.y = y;
    this.val = 2;
    this.direction = dirs[Math.floor(Math.random() * dirs.length)];

    this.inView = function () {
        fill("#008800");
        switch (this.direction.toString()) {
            case "0,1":
                return [
                    atXY(this.x - 1, this.y + 1),
                    atXY(this.x, this.y + 1),
                    atXY(this.x + 1, this.y + 1),
                ];
            case "1,1":
                return [
                    atXY(this.x, this.y + 1),
                    atXY(this.x + 1, this.y + 1),
                    atXY(this.x + 1, this.y),
                ];
            case "1,0":
                return [
                    atXY(this.x + 1, this.y + 1),
                    atXY(this.x + 1, this.y),
                    atXY(this.x + 1, this.y - 1),
                ];
            case "1,-1":
                return [
                    atXY(this.x + 1, this.y),
                    atXY(this.x + 1, this.y - 1),
                    atXY(this.x, this.y - 1),
                ];
            case "0,-1":
                return [
                    atXY(this.x + 1, this.y - 1),
                    atXY(this.x, this.y - 1),
                    atXY(this.x - 1, this.y - 1),
                ];
            case "-1,-1":
                return [
                    atXY(this.x, this.y - 1),
                    atXY(this.x - 1, this.y - 1),
                    atXY(this.x - 1, this.y),
                ];
            case "-1,0":
                return [
                    atXY(this.x - 1, this.y - 1),
                    atXY(this.x - 1, this.y),
                    atXY(this.x - 1, this.y + 1),
                ];
            case "-1,1":
                return [
                    atXY(this.x - 1, this.y),
                    atXY(this.x - 1, this.y + 1),
                    atXY(this.x, this.y + 1),
                ];
        }
    };

    this.draw = function () {
        fill("#FF0000");
        rect(this.x * cellSize, this.y * cellSize, cellSize, cellSize);
    };
}

function Food(x, y) {
    this.x = x;
    this.y = y;
    this.val = 3;

    this.draw = function () {
        fill("#00FF00");
        rect(this.x * cellSize, this.y * cellSize, cellSize, cellSize);
    };
}

function Wall(x, y) {
    this.x = x;
    this.y = y;
    this.val = 1;

    this.draw = function () {
        fill("#888888");
        rect(this.x * cellSize, this.y * cellSize, cellSize, cellSize);
    };
}

function setup() {
    createCanvas(gridWidth * cellSize, gridHeight * cellSize);
    frameRate(2);
}

//ants.push(new Ant(6,5));
//ants.push(new Ant(7,5));

//console.log(ants);

function draw() {
    background([255, 255, 255]);
    for (let ant of ants) {
        ant.draw();
        var inview = ant.inView();
        //ant.direction = dirs[Math.floor(Math.random() * dirs.length)];
    }
    for (let food of foods) {
        food.draw();
    }
    for (let wall of walls) {
        wall.draw();
    }
    drawGrid();
}
