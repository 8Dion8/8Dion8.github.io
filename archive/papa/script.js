function magic() {
    var img = document.createElement("img");
    img.src = "630i-gt.png";
    var src = document.getElementsByClassName("center")[0];
    src.appendChild(img);
    var button = document.getElementById("button");
    button.remove();
    var txt1 = document.createElement("h2");
    txt1.innerHTML = "Может понадобится ;)";
    var txt2 = document.createElement("h2");
    txt2.innerHTML = "🥳С днем рождения!!🥳";
    src.appendChild(txt1);
    src.appendChild(txt2);
}