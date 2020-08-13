function generate_reference() {
    const val = document.getElementById('reference-input').value
    var output = ""
    for (let i = 0; i < val.length; ++i) {
        char = val.charAt(i)
        output += char.charCodeAt(0) + " "
    }
    document.getElementById('reference').innerHTML = output
}