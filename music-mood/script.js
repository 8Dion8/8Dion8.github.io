var effects_data = {
    "jazz": "Jazz is the healing powers of music. It lowers your heartrate and relaxes your body, helping with stress and other mental issues. It also boosts your attention span and memory up to an incredible 60% after just an hour a day listening.<br><br>",
    "pop": "Pop's rhythm affects the brain in a predictable way because it has a predictable beat. You can think of it like this: with 4/4 music, you are experiencing a sense of “having heard”, “hearing”, and “about to hear” all at once. The predictable structure of this kind of music is also responsible for getting the blood pumping and increasing the heart rate, meaning it hepls with exercise and boosts energy.<br><br>",
    "classical": "Classical music has a way of playing with both higher, major key melodies with lower, minor key melodies at the same time, only to merge and create altogether new melodies and rhythms that transcend both. This form of composition thus activates more areas of the brain than most other music styles, which helps with memory recall and, in some cases, even deters crime!<br><br>",
    "heavy": "Despite the fact that metal has the same consistent rhythm as rock has, metal is a separate genre due to its heavy distortion, which has a tendency to cause the brain to “boom” with messages in a way the other genres don’t. This phenomenon may be the reason for some people claiming heavy metal relaxes them. Fans of heavy genres have a strong feeling of identity and self-confidence.<br><br>",
    "rap": "Since most rap music has a fast tempo, when you listen to rap music, the auditory cortex sends messages to the cerebellum, the part of the brain that makes you want to dance, sing, or tap you feet along to the beat. Then, your nucleus accumbens direct your emotions toward the music. Overall, this fast beat music has the same reaction in your brain as you would to other genres. Also, most rap fans have high self-esteem and are outgoing on one hand, but often fight depressioon and sadness on the other.<br><br>",
    "rock": "Rock music has tons of benefits for the listener. For example, it often boosts creativity, which is why so many rock bands are collaborative. Another major effect of rock musci is how it helps with social skills, helping outgrow anxiety and social awkwardness.<br><br>"
}

var moods_data = {
    "relaxation": ["jazz", "classical"],
    "sadness": ["heavy", "rap"],
    "happiness": ["pop", "rock"],
    "confidence": ["heavy", "rock"],
    "development": ["classical", "rock"],
    "energy": ["pop", "heavy"]
}

var playlist_data = {
    "jazz":      '<iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DXbITWG1ZJKYt" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>',
    "pop":       '<iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1EQncLwOalG3K7" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>',
    "classical": '<iframe src="https://open.spotify.com/embed/playlist/4QmEU6NadjuCqD6u70x2nR" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>',
    "heavy":     '<iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DX3OnbIGFmkJA" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>',
    "rap":       '<iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DX76t638V6CA8" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>',
    "rock":      '<iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DWXRqgorJj26U" width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>'
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

function get_moods() {
    var options = $("#moods").val();
    var out = $("#out");
    var outText = "";
    for (var goal of options) {
        for (var genre of moods_data[goal]) {
            outText += playlist_data[genre]
        }
    }
    out.html(outText);
}