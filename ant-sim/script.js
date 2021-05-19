var canvas = document.getElementById("ant-display") as HTMLCanvasElement;
var ctx = canvas.getContext("2d");
var gridWidth = 100;
var gridHeight = 50;
var cellSize = Math.min(1000 / gridWidth, 500 / gridHeight);
var mainloop = true;
var ants = [];
var walls = [];
var foods = []; //english language left the chat

function atXY(x, y) {
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
    ctx.fillStyle = "#000000";
    for (let i = 1; i < gridWidth; i++) {
        ctx.moveTo(i * cellSize + 1, 0);
        ctx.lineTo(i * cellSize + 1, gridHeight * cellSize);
        ctx.stroke();
    }
    for (let i = 1; i < gridHeight; i++) {
        ctx.moveTo(0, i * cellSize + 1);
        ctx.lineTo(gridWidth * cellSize, i * cellSize);
        ctx.stroke();
    }
}

function Ant(x, y) {
    this.x = x;
    this.y = y;
    this.direction = [0, 1];

    this.inView = function () {
        switch (this.direction) {
            case [0, 1]:
        }
    };

    this.draw = function () {
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(this.x * cellSize, this.y * cellSize, cellSize, cellSize);
    };
}

for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
        ants.push(new Ant(i * 2, j * 2));
    }
} //*/

//ants.push(new Ant(6,5));
//ants.push(new Ant(7,5));

console.log(ants);

//while (mainloop) {

for (let ant of ants) {
    ant.draw();
}
drawGrid();
//}
