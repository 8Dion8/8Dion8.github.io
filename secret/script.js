function magic() {
    var img = document.createElement("img");
    img.src = "acura.png";
    var src = document.getElementsByClassName("center")[0];
    src.appendChild(img);
    var button = document.getElementById("button");
    button.remove();
    var txt1 = document.createElement("h2");
    txt1.innerHTML = "Now you can have your car everywhere you go :))";
    var txt2 = document.createElement("h2");
    txt2.innerHTML = "🥳Happy Birthday!🥳";
    src.appendChild(txt1);
    src.appendChild(txt2);
}