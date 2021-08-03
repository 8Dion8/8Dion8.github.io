function hashCode(str) {
    return str.split('').reduce((prevHash, currVal) =>
        (((prevHash << 5) - prevHash) + currVal.charCodeAt(0)) | 0, 0);
}

function setSeed() {
    //from https://stackoverflow.com/questions/10211145/getting-current-date-and-time-in-javascript
    let currentDate = new Date();
    let seed = "" + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    noise.seed(hashCode(seed));
}

function firstCanvas() {
    let resolution = 100;
    let cellSize = 500 / resolution;
    let canvas = document.getElementById('firstCanvas');
    let ctx = canvas.getContext("2d");
    let noiseArray = [];
    for (let i = 0; i < resolution; i++) {
        noiseArray.push(new Array(resolution));
    }
    for (let x = 0; x < resolution; x++) {
        for (let y = 0; y < resolution; y++) {
            let val = (Math.floor(noise.perlin2(x / 10, y / 10) * 500) + 150) / 2;
            noiseArray[x][y] = val;
            ctx.fillStyle = "rgb(" + val + "," + val + "," + val + ")";
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            //console.log(val);
        }
    }
}

function secondCanvas() {
    let resolution = 10;
    let cellSize = 500 / resolution;
    let canvas0 = document.getElementById('secondCanvas0');
    let ctx0 = canvas0.getContext("2d");

    let canvas1 = document.getElementById('secondCanvas1');
    let ctx1 = canvas1.getContext("2d");

    let noiseArray = [];
    for (let i = 0; i < resolution; i++) {
        noiseArray.push(new Array(resolution));
    }

    let threshold = 80;

    for (let x = 0; x < resolution; x++) {
        for (let y = 0; y < resolution; y++) {
            let val = (Math.floor(noise.perlin2(x / 5, y / 5) * 100) + 150) / 2;
            noiseArray[x][y] = val;
            ctx0.fillStyle = "rgb(" + val + "," + val + "," + val + ")";
            ctx0.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            let bwval = (val > threshold) ? 230 : 10;
            ctx1.fillStyle = "rgb(" + bwval + "," + bwval + "," + bwval + ")";
            ctx1.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            //console.log(val);
        }
    }
}