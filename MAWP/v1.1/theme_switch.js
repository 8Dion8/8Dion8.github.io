function switch_theme(sheet) {
    document.getElementById("theme").setAttribute("href", sheet)
}

function control_theme() {
    var current_sheet = document.getElementById("theme").getAttribute("href")
    if (current_sheet == "light.css") {
        switch_theme("dark.css")
    } else {
        switch_theme("light.css")
    }
}