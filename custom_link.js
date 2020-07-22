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
    link = "8dion8.github.io/?" + query
    document.getElementById('code-output').innerHTML = link
}