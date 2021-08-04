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

    let canvas2 = document.getElementById('secondCanvas2');
    let ctx2 = canvas2.getContext("2d");

    let noiseArray = [];
    for (let i = 0; i < resolution; i++) {
        noiseArray.push(new Array(resolution));
    }

    let threshold = 80;

    ctx2.strokeStyle = "#FFFFFF"
    ctx2.fillStyle = "#000000"

    for (let x = 0; x < resolution; x++) {
        for (let y = 0; y < resolution; y++) {
            let val = (Math.floor(noise.perlin2(x / 5, y / 5) * 100) + 150) / 2;
            noiseArray[x][y] = val;
            ctx0.fillStyle = "rgb(" + val + "," + val + "," + val + ")";
            ctx0.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);

            ctx1.fillStyle = "#000000"
            ctx1.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            if (val > threshold) {
                ctx1.fillStyle = "#FFFFFF";
                ctx1.fillRect(x * cellSize - 3, y * cellSize - 3, 6, 6);
            }
            
            //console.log(val);

            ctx2.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);

        }
    }

    for (let x = 0; x < resolution; x++) {
        for (let y = 0; y < resolution; y++) {
            if (noiseArray[x][y] > threshold) {
                //console.log(noiseArray);
                if (x != resolution - 1 && noiseArray[x + 1][y] > threshold) {
                    //console.log("horizontal line at ", x, y);
                    ctx2.beginPath();
                    ctx2.moveTo(x * cellSize, y * cellSize);
                    ctx2.lineTo(x * cellSize + cellSize, y * cellSize);
                    ctx2.stroke();
                }
                if (y != resolution - 1 && noiseArray[x][y + 1] > threshold) {
                    //console.log("vertical line at ", x, y);
                    ctx2.beginPath();
                    ctx2.moveTo(x * cellSize, y * cellSize);
                    ctx2.lineTo(x * cellSize, y * cellSize + cellSize);
                    ctx2.stroke();
                }
                if (x != resolution - 1 && y != resolution - 1 && noiseArray[x + 1][y + 1] > threshold) {
                    //console.log("diagonal line at ", x, y);
                    ctx2.beginPath();
                    ctx2.moveTo(x * cellSize, y * cellSize);
                    ctx2.lineTo(x * cellSize + cellSize, y * cellSize + cellSize);
                    ctx2.stroke();

                }
                if (y != 0 && x != resolution - 1 && noiseArray[x + 1][y - 1] > threshold) {
                    ctx2.beginPath();
                    ctx2.moveTo(x * cellSize, y * cellSize);
                    ctx2.lineTo(x * cellSize + cellSize, y * cellSize - cellSize);
                    ctx2.stroke();
                }
            }
        }
    }



}