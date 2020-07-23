function load_custom() {
    const queryString = window.location.search;
    //console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code')
    const input = urlParams.get('input')
        //console.log(code, input);
    document.getElementById('MAWP').value = code
    document.getElementById('input').value = input
}

serialize = function(obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

function generate_link() {
    const code_ = document.getElementById('MAWP').value
    const input_ = document.getElementById('input').value
    obj = { code: code_, input: input_ }
    query = serialize(obj)
    link = "https://8dion8.github.io/?" + query
    document.getElementById('code-output').innerHTML = link
    return link
}

function codegolf() {
    const link = generate_link()
    const code = document.getElementById('MAWP').value
    const byte_count = code.length
    let formatted = "# [MAWP], " + byte_count + " bytes<br>```<br>" + code + "<br>```<br>[Try it!][mawp_interp]<br><br>[MAWP]: https://esolangs.org/wiki/MAWP<br>[mawp_interp]: " + link
    document.getElementById('code-output').innerHTML = formatted
}

function copy_text() {
    const copyText = document.getElementById('code-output').innerHTML
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("Copied!");
}