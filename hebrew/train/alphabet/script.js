function random_choice(array) {
    random_num = Math.floor(Math.random() * array.length);
    random_element = array[random_num];
    return random_element;
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

letters_unicode = {
    alef: "\u05d0",
    bet: "\u05d1",
    gimel: "\u05d2",
    dalet: "\u05d3",
    he: "\u05d4",
    vav: "\u05d5",
    zayin: "\u05d6",
    het: "\u05d7",
    tet: "\u05d8",
    yod: "\u05d9",
    kaf: "\u05db",
    lamed: "\u05dc",
    mem: "\u05de",
    nun: "\u05e0",
    samekh: "\u05e1",
    ayin: "\u05e2",
    pe: "\u05e4",
    tsadi: "\u05e6",
    qof: "\u05e7",
    resh: "\u05e8",
    shin: "\u05e9",
    tav: "\u05ea",
};

letters = [
    "alef",
    "bet",
    "gimel",
    "dalet",
    "he",
    "vav",
    "zayin",
    "het",
    "tet",
    "yod",
    "kaf",
    "lamed",
    "mem",
    "nun",
    "samekh",
    "ayin",
    "pe",
    "tsadi",
    "qof",
    "resh",
    "shin",
    "tav",
];

score = 0;
shown_letters = 0;

letter_choice = [];
correct_answer = "";

function generate_question() {
    letter_choice = [];
    chosen_letter_name = random_choice(letters);
    chosen_letter_unicode = letters_unicode[chosen_letter_name];

    correct_answer = chosen_letter_name;

    letter_display = document.getElementById("letter");
    letter_display.innerHTML = chosen_letter_unicode;

    letter_choice.push(chosen_letter_name);

    for (var i = 0; i < 3; i++) {
        letter_chosen = false;
        while (!letter_chosen) {
            chosen_to_add_letter = random_choice(letters);
            if (!letter_choice.includes(chosen_to_add_letter)) {
                letter_choice.push(chosen_to_add_letter);
                letter_chosen = true;
            }
        }
    }

    console.log(letter_choice)

    letter_choice = shuffle(letter_choice);


    document.getElementById("button0").textContent = letter_choice[0];
    document.getElementById("button1").textContent = letter_choice[1];
    document.getElementById("button2").textContent = letter_choice[2];
    document.getElementById("button3").textContent = letter_choice[3];
    
}

window.onload = generate_question;


function check_answer(button_index) {
    chosen_answer = letter_choice[button_index]

    if (chosen_answer == correct_answer) {
        score++
        document.getElementById("previous").innerHTML = ""
    } else {
        document.getElementById("previous").innerHTML = "Previous answer: " + correct_answer
    }
    shown_letters++
    generate_question();

    console.log(score, shown_letters)

    score_message = "Score: " + score.toString() + " out of " + shown_letters.toString();

    document.getElementById("score").innerHTML = score_message;
}