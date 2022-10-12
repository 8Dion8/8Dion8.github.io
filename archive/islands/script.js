/*var ip;

$(document).ready(function() {
    $.getJSON("https://api.ipify.org/?format=jsonp&callback=getIP", function(data) {
        console.log("data");
        json = data.getIP();
        ip = json.ip;
    });
});

console.log(ip);//*/


function hashCode(str) {
    return str.split('').reduce((prevHash, currVal) =>
        (((prevHash << 5) - prevHash) + currVal.charCodeAt(0)) | 0, 0);
}


//from https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function componentToHex(c) {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function hex_to_rgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    let r = result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
    return [r.r, r.g, r.b];
}


function get_color_shade(color1, color2, minVal, maxVal, point, minPoint = 0) {
    if (minPoint && point <= minPoint) {point = minPoint}
    let r_step = Math.abs(color1[0] - color2[0]) / (maxVal - minVal);
    let g_step = Math.abs(color1[1] - color2[1]) / (maxVal - minVal);
    let b_step = Math.abs(color1[2] - color2[2]) / (maxVal - minVal);
    let r = Math.floor(r_step * point + color1[0]);
    let g = Math.floor(g_step * point + color1[1]);
    let b = Math.floor(b_step * point + color1[2]);
    return rgbToHex(r, g, b);
}


console.log(hashCode("test123"))
var canvasResolution = document.getElementById("canvasResolution").value;
var cellSize = 840 / canvasResolution
var seed = hashCode(document.getElementById("seed").value)
console.log(seed)
noise.seed(seed);
var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");
var oceanThreshold = document.getElementById("oceanThreshold").value;
var beachThreshold = document.getElementById("beachThreshold").value;
var grassThreshold = document.getElementById("grassThreshold").value;
var current_stage = 0;

ctx.fillStyle = "#000000"
ctx.fillRect(0, 0, 840, 840);
var noiseArr = [];

function update_everything() {
    canvasResolution = document.getElementById("canvasResolution").value;
    cellSize = 840 / canvasResolution
    //console.log("updating")
    seed = hashCode(document.getElementById("seed").value)
    noise.seed(seed);
    oceanThreshold = document.getElementById("oceanThreshold").value;
    beachThreshold = document.getElementById("beachThreshold").value;
    grassThreshold = document.getElementById("grassThreshold").value;
    if (current_stage > 0) {
        generate_noise(false);
    }
    if (current_stage > 1) {
        threshold_noise(false);
    }
}

function threshold_noise(change_stage = true) {
    if (change_stage) { current_stage = 2; }
    for (var x = 0; x < canvasResolution; x++) {
        for (var y = 0; y < canvasResolution; y++) {
            var val = noiseArr[x][y];
            if (val < oceanThreshold) {
                noiseArr[x][y] = val;
                ctx.fillStyle = get_color_shade(
                    hex_to_rgb("#125e8a"),
                    hex_to_rgb("#5adbff"),
                    0,
                    oceanThreshold,
                    val,
                    35,
                    ""
                );
            } else if (val < beachThreshold) {
                noiseArr[x][y] = beachThreshold - 1;
                ctx.fillStyle = "#ffdd4a";
            } else if (val < grassThreshold) {
                noiseArr[x][y] = grassThreshold - 1;
                ctx.fillStyle = "#00cc74";
            } else {
                noiseArr[x][y] = 255;
                ctx.fillStyle = "#99989a";
            }
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
}



function generate_noise(change_stage = true) {
    if (change_stage) { current_stage = 1; }
    for (let i = 0; i < canvasResolution; i++) {
        noiseArr.push(new Array(cellSize));
    }
    for (var x = 0; x < canvasResolution; x++) {
        for (var y = 0; y < canvasResolution; y++) {
            var val = Math.floor(Math.abs(noise.perlin2(x / canvasResolution * 3, y / canvasResolution * 3)) * 255);
            noiseArr[x][y] = val;
            //console.log(val);
            //if (val > 255) {console.log(val)}
            ctx.fillStyle = "rgb(" + val + "," + val + "," + val + ")";
            //console.log("rgb("+val+","+val+","+val+")");

            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
}

