var effects_data = {
    "jazz": "Jazz is the healing powers of music. It lowers your heartrate and relaxes your body, helping with stress and other mental issues. It also boosts your attention span and memory up to an incredible 60% after just an hour a day listening.<br>",
    "pop": "Pop test<br>",
    "rhythmic": "Rhythmic test<br>",
    "classical": "Classical test<br>",
    "heavy": "Heavy tets<br>",
    "rap": "Rap test<br>",
    "rock": "Rock test<br>"
}

function get_effects() {
    var options = $("#genres").val();
    var out = $("#out");
    var outText = "";
    for (var i of options) {
        outText += effects_data[i];
    }
    out.html(outText);
}