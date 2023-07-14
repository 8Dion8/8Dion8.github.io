function transpile() {
    transpiled = "var stack=[1];var m;var a;var w;var p;var top;var sec;";
    var code = document.getElementById('MAWP').value;
    for (var i = 0; i < code.length; i++) {
        op = code[i];
        switch (op) {
            case '+':
                transpiled += "top = stack.pop();sec = stack.pop();if (typeof top == 'string' || typeof sec == 'string') {stack.push(sec.toString() + top.toString())} else {stack.push(top + sec)}";
                break;
            case '-':
                transpiled += "top = stack.pop();sec = stack.pop();if (typeof top != 'string' && typeof sec != 'string') {stack.push(sec - top)} else {stack.push.apply(stack, [sec, top, 0])}";
                break;
            case '*':
                transpiled += "top = stack.pop();sec = stack.pop();if (typeof top == 'string' && typeof sec == 'string') {stack.push.apply(stack, [sec, top, 0])} else {if (typeof top == 'string') {stack.push(top.repeat(sec))} else if (typeof sec == 'string') {stack.push(sec.repeat(top))} else {stack.push(top * sec)}}";
                break;
            case '$':
                transpiled += "top = stack.pop();sec = stack.pop();if (typeof top != 'string' && typeof sec != 'string') {stack.push(sec / top)} else {stack.push.apply(stack, [sec, top, 0])";
                break;
            case '%':
                transpiled += "top = stack.pop();sec = stack.pop();if (typeof top != 'string' && typeof sec != 'string') {stack.push(sec % top)} else {stack.push.apply(stack, [sec, top, 0])}";
                break;
            case 'M':
                transpiled += "if (code[pos - 1] == '=' && code[pos - 2] != '=') {m = stack.pop()} else {stack.push(m)}";
                break;
            case 'A':
                transpiled += "if (code[pos - 1] == '=' && code[pos - 2] != '=') {a = stack.pop()} else {stack.push(a)}";
                break;
            case 'W':
                transpiled += "if (code[pos - 1] == '=' && code[pos - 2] != '=') {w = stack.pop()} else {stack.push(w)}";
                break;
            case 'P':
                transpiled += "if (code[pos - 1] == '=' && code[pos - 2] != '=') {p = stack.pop()} else {stack.push(p)}";
                break;
            
        }
    }
}