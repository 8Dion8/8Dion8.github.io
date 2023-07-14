const animationEnd = () => {
    let elem = document.getElementById("covering-div");
    elem.remove();
    let date = document.createElement("div");
    date.id="date"
    date.innerHTML = "16 АВГУСТА"
    document.body.appendChild(date);
    let punch = document.createElement("div");
    punch.id = "punch"
    punch.innerHTML = "ПЕРВОМУ ИГРОКУ ПРИГОТОВИТЬСЯ"
    document.body.appendChild(punch);
    let title = document.createElement("div");
    title.id="title"
    title.innerHTML = "А ВЫ ГОТОВЫ?"
    document.body.appendChild(title);
    
};

// Create the animation end event
let animationEndEvent = new Event('animation_end');

// Cross browser implementation of adding the event listener
if (document.addEventListener) {
    document.addEventListener('animation_end', animationEnd, false);
} else {
    document.attachEvent('animation_end', animationEnd);
}

// Set the timeout with the same duration as the animation. 
setTimeout(() => {
        // Broadcast the animation end event
        document.dispatchEvent(animationEndEvent);
}, 4000);