fetch('posts.txt')
    .then(response => response.text())
    .then(text => document.getElementById('output') = text)