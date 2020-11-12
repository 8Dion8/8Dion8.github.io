var x = window.location.href;
console.log(x.slice(30));
window.location.href = window.location.href + x;