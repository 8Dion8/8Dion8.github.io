function hash(str) {
    return str.split('').reduce((prevHash, currVal) =>
        (((prevHash << 5) - prevHash) + currVal.charCodeAt(0)) | 0, 0);
}

function checkPassword() {
    var inputted = document.getElementById("secret").value + '';
    if (hash(inputted) == 589796796 || hash(inputted) == -140961478) {
        //document.getElementById("audiotag").play();
        document.open();
        document.write(
            `
            <!DOCTYPE html>
            <html lang="en">

            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="stylesheet" href="style.css">
                </link>
                <title>С днём рождения!</title>
            </head>

            <body>
                <audio id="audiotag" src="happybirthday.mp3" preload="true"></audio>
                <div id="main_cont">
                    <h2>У тебя получилось :)</h2>
                    <h3>(нифига ты умный)</h3>
                    <h1>С днём рождения!</h1>
                    <p>Мы тут решили тебе написать пару теплых слов. <br>
                        Ну так, чтобы день рождения хоть как то отметить, <br>
                        а то что значит ничо делать не будешь!<br>
                        P.S. нажми на картинку</p>
                        <a href="Письмо.pdf" download="Письмо.pdf">
                            <img src="birth2.jpg" width="100%" height="50%">
                        </a>
                        <p>Ну а я просто пожелаю чтобы жить было в кайф - в этом собственно и смысл, так же? <br>
                            Когда мы умрем ничего же с собой взять не получится, так что самое важное - то, как мы прожили)) <br>
                            С днём рождения)</p>
                </div>
                
            </body>

            </html>
            `
        );
        document.close();
        document.getElementById("audiotag").play();
    } else {
        document.open();
        document.write(
            `
            <!DOCTYPE html>
            <html lang="en">

            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="style.css">
                </link>
                <title>:(</title>
            </head>

            <body>
                <h1>У тя не получилось( как так то(</h1>
                <div class="container">
                    <div class="center">
                        <a href="./">Тыкни сюда чтобы перезагрузить</a>
                    </div>
                </div>
            </body>

            </html>
            `
        );
        document.close();
    }
}