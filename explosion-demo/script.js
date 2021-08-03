var resolution = 100;
var cellSize = 500 / resolution;


function firstCanvas() {
    let canvas = document.getElementById('firstCanvas');
    let ctx = canvas.getContext("2d");
    let noiseArray = [];
    for (let i = 0; i < resolution; i++) {
        noiseArray.push(new Array(resolution));
    }
    for (let x = 0; x < resolution; x++) {
        for (let y = 0; y < resolution; y++) {
            let val = (Math.floor(noise.perlin2(x / 15, y / 15) * 300) + 150) / 2;
            noiseArray[x][y] = val;
            ctx.fillStyle = "rgb(" + val + "," + val + "," + val + ")";
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            //console.log(val);
        }
    }
}