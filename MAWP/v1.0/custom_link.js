function load_custom() {
    const queryString = window.location.search;
    //console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code')
    const input = urlParams.get('input')
        //console.log(code, input);
    document.getElementById('MAWP').value = code
    document.getElementById('input').innerHTML = input
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
    var code_ = document.getElementById('MAWP').value;
    code_ = code_.replace(/<br>/g, '')
    code_ = code_.replace('&lt;', '<')
    code_ = code_.replace('&gt;', '>')
    const input_ = document.getElementById('input').innerHTML
    obj = { code: code_, input: input_ }
    query = serialize(obj)
    link = "https://8dion8.github.io/MAWP/v1.0?" + query
    document.getElementById('code-output').innerHTML = link
    return link
}

function codegolf() {
    const link = generate_link()
    var code = document.getElementById('MAWP').value
    code = code.replace(/<br>/g, '')
    console.log(code)
    const byte_count = code.length
    let formatted = "# [MAWP], " + byte_count + " bytes<br>```<br>" + code + "<br>```<br>[Try it!][mawp_interp]<br><br>[MAWP]: https://esolangs.org/wiki/MAWP<br>[mawp_interp]: " + link
    document.getElementById('code-output').innerHTML = formatted
}

function copy_text() {
    var range = document.createRange();
    range.selectNode(document.getElementById("code-output"));
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    alert("Copied!");
}

function remove_whitespace() {
    var code = document.getElementById('MAWP').value
    document.getElementById('MAWP').value = code.replace(/\s/g, '')
}

function update_bytecount() {
    var code = document.getElementById('MAWP').value
    console.log("Code before formatting:" + code)
    code = code.replace(/<br>/g, '')
    code = code.replace('&lt;', '<')
    code = code.replace('&gt;', '>')
    console.log("Code after formatting:" + code)
    const code_length = code.length
    console.log('code_length: ', code_length);
    document.getElementById("bytecount").innerHTML = "Code: " + code_length + " chars"
}