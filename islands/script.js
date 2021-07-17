/*var ip;

$(document).ready(function() {
    $.getJSON("https://api.ipify.org/?format=jsonp&callback=getIP", function(data) {
        console.log("data");
        json = data.getIP();
        ip = json.ip;
    });
});

console.log(ip);//*/


function generate_seed_from_string(string) {
    let seed = "";
    for (let i of string) {
        seed += i.charCodeAt(0);
    }
    return parseInt(seed);
}

console.log(generate_seed_from_string("test123"))
var canvasWidth =  100;
var canvasHeight = 100;
var cellWidth = 500 / canvasWidth;
var cellHeight = 500 / canvasHeight;
var seed = generate_seed_from_string(document.getElementById("seed").value)
console.log(seed)
noise.seed(seed);
var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");
var threshold = document.getElementById("threshold").value;
var current_stage = 0;

ctx.fillStyle = "#000000"
ctx.fillRect(0, 0, 500, 500);
var noiseArr = [];

function update_everything() {
    //console.log("updating")
    seed = generate_seed_from_string(document.getElementById("seed").value)
    noise.seed(seed);
    threshold = document.getElementById("threshold").value;
    if (current_stage > 0) {
        generate_noise(false);
    }
    if (current_stage > 1) {
        make_noise_bw(false);
    }
}

function make_noise_bw(change_stage=true) {
    if (change_stage) {current_stage = 2;}
    for (var x = 0; x < canvasWidth; x++) {
        for (var y = 0; y < canvasHeight; y++) {
            var val = noiseArr[x][y];
            if (val > threshold) {
                noiseArr[x][y] = 255;
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
            }
            else {
                noiseArr[x][y] = 0;
                ctx.fillStyle = "#000000";
                ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
            }
        }
    }
}



function generate_noise(change_stage=true) {
    if (change_stage) {current_stage = 1;}
    for (let i = 0; i < canvasWidth; i++) {
        noiseArr.push(new Array(cellHeight));
    }
    for (var x = 0; x < canvasWidth; x++) {
        for (var y = 0; y < canvasHeight; y++) {
            var val = Math.floor(Math.abs(noise.perlin2(x / canvasWidth * 3, y / canvasHeight * 3)) * 255);
            noiseArr[x][y] = val;
            //console.log(val);
            //if (val > 255) {console.log(val)}
            ctx.fillStyle = "rgb("+val+","+val+","+val+")";
            //console.log("rgb("+val+","+val+","+val+")");

            ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
        }
    }
}

