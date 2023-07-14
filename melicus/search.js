var secret = "UYuvobVy80gsN1RE8w2nob-c6tT1CrsWgNtDiUKX1Gh87EGEzCER6Q2smRHL1uNb"

async function fetch_songs(url) {
    const response = await fetch(url);
    var data = await response.json();
    display_search_results(data);
}
async function fetch_lyrics(url) {
    const response = await fetch(url);
    var data = await response.json();
    display_lyrics(data);
}

function search_songs() {
    document.getElementById("search-container").innerHTML = ""
    search_query = document.getElementById('search-input').value;
    base_url = "http://api.genius.com/search?"
    query_url = base_url + "q=" + search_query + "&access_token=" + secret
    fetch_songs(query_url)
}

function get_lyrics(id) {
    base_url = "http://api.genius.com/songs/"
    query_url = base_url + id.toString()  + "?access_token=" + secret + "&text_format=plain";
    fetch_lyrics(query_url); 
}

function display_search_results(data) {
    songs = data.response.hits
    src = document.getElementById("search-container")
    for (let i = 0; i < 10; i++) {
        song = songs[i.toString()].result;
        id = song.id;
        artists = song.artist_names;
        title = song.title;
        thumbnail = song.header_image_thumbnail_url;

        disp_html = 
        `<div class="song-container">
            <div>${title} - ${artists} - ${id}</div>
            <button onclick="get_lyrics(${id});">Get Lyrics</button>
        </div>`

        src.innerHTML += disp_html;
    }
}

function display_lyrics(data) {
    console.log(data);
}