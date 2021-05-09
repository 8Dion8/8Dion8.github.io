var cell_size = 30;
var width = 1080 / cell_size;
var height = 720 / cell_size;

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

  this.draw = function () {
    stroke(color);
    strokeWeight(3);
    line(
      this.x0 * cell_size + 1,
      this.y0 * cell_size + 1,
      this.x1 * cell_size + 1,
      this.y1 * cell_size + 1
    );
  };
}

function drawGrid() {
  strokeWeight(2);
  stroke([82, 130, 214]);
  for (var i = 1; i < width - 1; i++) {
    line(i * cell_size + 1, 0, i * cell_size + 1, height * cell_size);
  }
  for (var i = 1; i < height - 1; i++) {
    line(0, i * cell_size + 1, width * cell_size, i * cell_size);
  }
}

var start = new Goal(2, 1, "Vertical", 6, [10, 240, 30]);
var end = new Goal(10, 5, "Horizontal", 6, [240, 10, 10]);

function setup() {
  createCanvas(1080, 720);
}
function draw() {
  background([242, 238, 203]);
  drawGrid();
  start.draw();
  end.draw();
}
