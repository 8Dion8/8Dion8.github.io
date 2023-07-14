/// < reference path="./p5.global-mode.d.ts" / >

var gridWidth = 100;
var gridHeight = 50;
var cellSize = Math.min(1000 / gridWidth, 500 / gridHeight);
var mainloop = true;
var ants = [];
var walls = [];
var foods = []; //english language left the chat
var toHomeMarkers = [];
var toFoodMarkers = [];
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
}

for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        foods.push(new Food(i + 30, j + 20));
    }
}

/*
for (let i = 0; i < 40; i++) {
    walls.push(new Wall(60, 49 - i));
}

for (let i = 0; i < 40; i++) {
    walls.push(new Wall(30, i));
}
*/
/*
ants.push(new Ant(1, 1));

for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
        foods.push(new Food(i + 5, j + 2));
    }
}
/*
ants.push(new Ant(3,1));
ants.push(new Ant(1,3));
foods.push(new Food(2 + 6, 1 + 4));
foods.push(new Food(3 + 6, 1 + 4));
foods.push(new Food(4 + 6, 1 + 4));
foods.push(new Food(5 + 6, 1 + 4));
foods.push(new Food(5 + 6, 2 + 4));
foods.push(new Food(5 + 6, 3 + 4));
foods.push(new Food(5 + 6, 4 + 4));
foods.push(new Food(5 + 6, 5 + 4));
foods.push(new Food(4 + 6, 5 + 4));
foods.push(new Food(3 + 6, 5 + 4));
foods.push(new Food(2 + 6, 5 + 4));
foods.push(new Food(1 + 6, 5 + 4));
foods.push(new Food(1 + 6, 4 + 4));
foods.push(new Food(1 + 6, 3 + 4));
foods.push(new Food(1 + 6, 2 + 4));
foods.push(new Food(1 + 6, 1 + 4));
//*/

function atXY(x, y) {
    //rect(x * cellSize, y * cellSize, cellSize, cellSize);
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
    for (let tohomemarker of toHomeMarkers) {
        if (tohomemarker.x == x && tohomemarker.y == y) {
            return tohomemarker;
        }
    }
    for (let tofoodmarker of toFoodMarkers) {
        if (tofoodmarker.x == x && tofoodmarker.y == y) {
            return tofoodmarker;
        }
    }

    return new Empty(x, y);
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

function Empty(x, y) {
    this.x = x;
    this.y = y;
    this.val = 2;
}

function Ant(x, y) {
    this.x = x;
    this.y = y;
    this.val = 1;
    this.direction = dirs[Math.floor(Math.random() * dirs.length)];
    this.carryingFood = false;

    this.inView = function () {
        fill("#00880033");

        return [
            atXY(this.x + 1, this.y),
            atXY(this.x + 1, this.y + 1),
            atXY(this.x + 1, this.y - 1),
            atXY(this.x - 1, this.y),
            atXY(this.x - 1, this.y + 1),
            atXY(this.x - 1, this.y - 1),
            atXY(this.x, this.y + 1),
            atXY(this.x, this.y - 1),
        ];
        //*/
        /*
        switch (this.direction.toString()) {
            case "0,1":
                return [
                    atXY(this.x - 1, this.y),
                    atXY(this.x - 1, this.y + 1),
                    atXY(this.x, this.y + 1),
                    atXY(this.x + 1, this.y + 1),
                    atXY(this.x + 1, this.y),
                ];
            case "1,1":
                return [
                    atXY(this.x - 1, this.y + 1),
                    atXY(this.x, this.y + 1),
                    atXY(this.x + 1, this.y + 1),
                    atXY(this.x + 1, this.y),
                    atXY(this.x + 1, this.y - 1),
                ];
            case "1,0":
                return [
                    atXY(this.x, this.y + 1),
                    atXY(this.x + 1, this.y + 1),
                    atXY(this.x + 1, this.y),
                    atXY(this.x + 1, this.y - 1),
                    atXY(this.x, this.y - 1),
                ];
            case "1,-1":
                return [
                    atXY(this.x + 1, this.y + 1),
                    atXY(this.x + 1, this.y),
                    atXY(this.x + 1, this.y - 1),
                    atXY(this.x, this.y - 1),
                    atXY(this.x - 1, this.y - 1),
                ];
            case "0,-1":
                return [
                    atXY(this.x + 1, this.y),
                    atXY(this.x + 1, this.y - 1),
                    atXY(this.x, this.y - 1),
                    atXY(this.x - 1, this.y - 1),
                    atXY(this.x - 1, this.y),
                ];
            case "-1,-1":
                return [
                    atXY(this.x + 1, this.y - 1),
                    atXY(this.x, this.y - 1),
                    atXY(this.x - 1, this.y - 1),
                    atXY(this.x - 1, this.y),
                    atXY(this.x - 1, this.y + 1),
                ];
            case "-1,0":
                return [
                    atXY(this.x, this.y - 1),
                    atXY(this.x - 1, this.y - 1),
                    atXY(this.x - 1, this.y),
                    atXY(this.x - 1, this.y + 1),
                    atXY(this.x, this.y + 1),
                ];
            case "-1,1":
                return [
                    atXY(this.x - 1, this.y - 1),
                    atXY(this.x - 1, this.y),
                    atXY(this.x - 1, this.y + 1),
                    atXY(this.x, this.y + 1),
                    atXY(this.x + 1, this.y + 1),
                ];
        }*/
    };

    /*
    Cell priority
    5: Food
    4: toFoodMarker
    3: toHomeMarker
    2: Empty
    1: Ant
    0: Wall
    */

    this.move = () => {
        var movesInView = this.inView();
        let possibleMoves = [];
        if (!this.carryingFood) {
            for (let i of movesInView) {
                if (i != null && i.val == 5) {
                    possibleMoves.push(i);
                }
            }

            if (possibleMoves.length == 0) {
                for (let tofoodmarker of toFoodMarkers) {
                    if (tofoodmarker.x == this.x && tofoodmarker.y == this.y) {
                        let move = tofoodmarker;
                        toHomeMarkers.push(
                            new toHomeMarker(
                                this.x,
                                this.y,
                                this.x - this.direction[0],
                                this.y - this.direction[1]
                            )
                        );
                        this.direction = [
                            move.parentX - this.x,
                            move.parentY - this.y,
                        ];
                        this.x = move.parentX;
                        this.y = move.parentY;
                        return;
                    }
                }
                let possibleMoves = [];
                for (let i of movesInView) {
                    if (i != null && i.val == 4) {
                        possibleMoves.push(i);
                    }
                }
                if (possibleMoves.length == 0) {
                    for (let i of movesInView) {
                        if (i != null && i.val > 1) {
                            possibleMoves.push(i);
                        }
                    }
                    if (possibleMoves.length == 0) {
                        //this.direction = [-this.x, -this.y];
                        return;
                    } else {
                        let move =
                            possibleMoves[
                                Math.floor(Math.random() * possibleMoves.length)
                            ];
                        toHomeMarkers.push(
                            new toHomeMarker(
                                this.x,
                                this.y,
                                this.x - this.direction[0],
                                this.y - this.direction[1]
                            )
                        );
                        this.direction = [move.x - this.x, move.y - this.y];
                        this.x = move.x;
                        this.y = move.y;
                    }
                } else {
                    let move =
                        possibleMoves[
                            Math.floor(Math.random() * possibleMoves.length)
                        ];
                    toHomeMarkers.push(
                        new toHomeMarker(
                            this.x,
                            this.y,
                            this.x - this.direction[0],
                            this.y - this.direction[1]
                        )
                    );
                    this.direction = [move.x - this.x, move.y - this.y];
                    this.x = move.x;
                    this.y = move.y;
                }
            } else {
                let move =
                    possibleMoves[
                        Math.floor(Math.random() * possibleMoves.length)
                    ];
                toHomeMarkers.push(
                    new toHomeMarker(
                        this.x,
                        this.y,
                        this.x - this.direction[0],
                        this.y - this.direction[1]
                    )
                );
                this.direction = [move.x - this.x, move.y - this.y];
                this.x = move.x;
                this.y = move.y;
                this.carryingFood = true;
                move.eat();
            }
        } else {
            for (let tohomemarker of toHomeMarkers) {
                if (tohomemarker.x == this.x && tohomemarker.y == this.y) {
                    let move = tohomemarker;
                    toHomeMarkers.push(
                        new toFoodMarker(
                            this.x,
                            this.y,
                            this.x - this.direction[0],
                            this.y - this.direction[1]
                        )
                    );
                    this.direction = [
                        move.parentX - this.x,
                        move.parentY - this.y,
                    ];
                    this.x = move.parentX;
                    this.y = move.parentY;
                    return;
                }
            }
            for (let i of movesInView) {
                if (i != null && i.val == 3) {
                    possibleMoves.push(i);
                }
            }
            if (possibleMoves.length > 0) {
                let move =
                    possibleMoves[
                        Math.floor(Math.random() * possibleMoves.length)
                    ];
                toFoodMarkers.push(
                    new toFoodMarker(
                        this.x,
                        this.y,
                        this.x - this.direction[0],
                        this.y - this.direction[1]
                    )
                );
                this.direction = [move.x - this.x, move.y - this.y];
                this.x = move.x;
                this.y = move.y;
            } else {
                for (let i of movesInView) {
                    if (i != null && 1 < i.val && i.val < 5) {
                        possibleMoves.push(i);
                    }
                }
                if (possibleMoves.length != 0) {
                    let move =
                        possibleMoves[
                            Math.floor(Math.random() * possibleMoves.length)
                        ];

                    toFoodMarkers.push(
                        new toFoodMarker(
                            this.x,
                            this.y,
                            this.x - this.direction[0],
                            this.y - this.direction[1]
                        )
                    );
                    this.direction = [move.x - this.x, move.y - this.y];
                    this.x = move.x;
                    this.y = move.y;
                } else {
                    return;
                }
            }
        }
        if (this.x < 20 && this.y < 20) {
            this.carryingFood = false;
        }
    };

    this.draw = function () {
        fill("#000000");
        rect(this.x * cellSize, this.y * cellSize, cellSize, cellSize);
    };
}

function toHomeMarker(x, y, parentX, parentY) {
    this.x = x;
    this.y = y;
    this.val = 3;
    this.strength = 64;
    this.degradeCoef = 0.5;
    this.parentX = parentX;
    this.parentY = parentY;
    this.draw = function () {
        //console.log("#0000FF" + Math.ceil(this.strength).toString(16));
        fill("#0000FF" + Math.ceil(this.strength).toString(16));
        rect(this.x * cellSize, this.y * cellSize, cellSize, cellSize);
        //fill("#FF0000");
        /*line(
            this.x * cellSize + cellSize / 2,
            this.y * cellSize + cellSize / 2,
            this.parentX * cellSize + cellSize / 2,
            this.parentY * cellSize + cellSize / 2
        );*/
    };
}

function toFoodMarker(x, y, parentX, parentY) {
    this.x = x;
    this.y = y;
    this.val = 4;
    this.strength = 64;
    this.degradeCoef = 0.5;
    this.parentX = parentX;
    this.parentY = parentY;
    this.draw = function () {
        //console.log("#FF0000" + Math.ceil(this.strength).toString(16));
        fill("#FF0000" + Math.ceil(this.strength).toString(16));
        rect(this.x * cellSize, this.y * cellSize, cellSize, cellSize);
        //fill("#0000FF");
        /*line(
            this.x * cellSize + cellSize / 2,
            this.y * cellSize + cellSize / 2,
            this.parentX * cellSize + cellSize / 2,
            this.parentY * cellSize + cellSize / 2
        );*/
    };
}

function Food(x, y) {
    this.x = x;
    this.y = y;
    this.val = 5;

    this.eat = function () {
        this.x = -Infinity;
        this.y = -Infinity;
    };

    this.draw = function () {
        fill("#00FF0033");
        rect(this.x * cellSize, this.y * cellSize, cellSize, cellSize);
    };
}

function Wall(x, y) {
    this.x = x;
    this.y = y;
    this.val = 0;

    this.draw = function () {
        fill("#888888");
        rect(this.x * cellSize, this.y * cellSize, cellSize, cellSize);
    };
}

function setup() {
    createCanvas(gridWidth * cellSize, gridHeight * cellSize);
    frameRate(60);
}

//ants.push(new Ant(6,5));
//ants.push(new Ant(7,5));

//console.log(ants);

function draw() {
    background([255, 255, 255]);
    drawGrid();
    var i = 0;
    for (let tofoodmarker of toFoodMarkers) {
        tofoodmarker.draw();
        tofoodmarker.strength -= tofoodmarker.degradeCoef;
        if (tofoodmarker.strength <= 0) {
            toFoodMarkers.splice(i, i);
        }
        i++;
    }
    var i = 0;
    for (let tohomemarker of toHomeMarkers) {
        tohomemarker.draw();
        tohomemarker.strength -= tohomemarker.degradeCoef;
        if (tohomemarker.strength <= 0) {
            toHomeMarkers.splice(i, i);
        }
        i++;
    }
    for (let ant of ants) {
        ant.move();
        ant.draw();
    }
    for (let food of foods) {
        food.draw();
    }
    for (let wall of walls) {
        wall.draw();
    }
}
/*
за себя
  | за свое здоровье
  | за свою учебу
  | за свое развитие
  | за мои отношения с другими

за свои вещи
за последствия моих действий

*/
