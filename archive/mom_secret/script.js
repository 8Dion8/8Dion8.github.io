function magic() {
    var first_image = document.getElementsByClassName("fst")[0];
    first_image.classList.add("fadeout");
    setTimeout(function () {
        magic2();
    }, 1000);

    /*var img = document.createElement("img");
    img.src = "overlayed_small.png";
    var src = document.getElementsByClassName("center")[0];
    src.appendChild(img);
    var button = document.getElementById("button");
    button.remove();
    var txt1 = document.createElement("h2");
    txt1.innerHTML = "Магия свершилась! Небольшой апгрейд)";
    var txt2 = document.createElement("h2");
    txt2.innerHTML = "🥳С днем рождения!!!🥳";
    src.appendChild(txt1);
    src.appendChild(txt2);*/
}

function magic2() {
    var first_image = document.getElementsByClassName("fst")[0];
    first_image.remove();
    var second_image = document.createElement("img");
    second_image.src = "overlayed_small.png";
    second_image.classList.add("fst");
    var cont = document.getElementsByClassName("center")[0];
    cont.insertBefore(second_image, cont.firstChild);
    setTimeout(function() {
        waitabit();
    }, 1000);
    
}

function waitabit() {
    console.log("hello");
    var second_image = document.getElementsByClassName("fst")[0];
    second_image.classList.add("fadeout");
    setTimeout(function() {
        magic3();
    }, 1000);
}

function magic3() {
    var second_image = document.getElementsByClassName("fst")[0];
    second_image.remove();
    var final_image = document.createElement("img");
    final_image.src = "mainn_small.png";
    var cont = document.getElementsByClassName("center")[0];
    cont.insertBefore(final_image, cont.firstChild);
    var button = document.getElementById("button");
    button.remove();
    var txt1 = document.createElement("h2");
    txt1.innerHTML = "Дарю тебе твои новые обои)";
    var txt2 = document.createElement("h2");
    txt2.innerHTML = "🥳С днем рождения!!!🥳";
    cont.appendChild(txt1);
    cont.appendChild(txt2);
}