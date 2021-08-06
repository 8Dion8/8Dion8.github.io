function get_friends() {
    var img = document.createElement("img");
    img.src = "lol.png";
    img.height = 480;
    var src = document.getElementsByClassName("center")[0];
    src.appendChild(img);
    var button = document.getElementById("button");
    button.remove();
    var txt0 = document.createElement("h4");
    txt0.innerHTML = "О нет! Это же Стив Джобс и Дарт Вейдер пришли завлекать тебя в мир Эпла!"
    src = document.body
    src.appendChild(txt0);
    var txt1 = document.createElement("h4");
    txt1.innerHTML = "А вообще, поздравляю лучшего Папу ever с днём рождения :)";
    src.appendChild(txt1);
    var txt2 = document.createElement("h4");
    txt2.innerHTML = "Желаю чтобы никто и ничто вокруг не разочаровывало, чтобы ты был доволен всем вокруг и вообще всего только хорошего :))";
    src.appendChild(txt2);
    var final = document.createElement("h1");
    final.id = "final";
    final.innerHTML = "С ДНЁМ РОЖДЕНИЯ!";
    src.appendChild(final);
}