var funcs = {
    "+":`
    top = stack.pop();
    sec = stack.pop();
    if (typeof top == "string" || typeof sec == "string") {
        stack.push(sec.toString() + top.toString());
    } else {
        stack.push(top + sec);
    }
    `,
    "-":`
    top = stack.pop();
    sec = stack.pop();
    if (typeof top != "string" && typeof sec != "string") {
        stack.push(sec - top);
    } else {
        stack.push.apply(stack, [sec, top, 0]);
    }
    `,
    "*":`
    top = stack.pop();
    sec = stack.pop();
    if (typeof top == "string" && typeof sec == "string") {
        stack.push.apply(stack, [sec, top, 0]);
    } else {
        if (typeof top == "string") {
            stack.push(top.repeat(sec));
        } else if (typeof sec == "string") {
            stack.push(sec.repeat(top));
        } else {
            stack.push(top * sec);
        }
    }
    `,
    "$":`
    top = stack.pop();
    sec = stack.pop();
    if (typeof top != "string" && typeof sec != "string") {
        stack.push(sec / top);
    } else {
        stack.push.apply(stack, [sec, top, 0]);
    }
    `,
    "%":`
    top = stack.pop();
    sec = stack.pop();
    if (typeof top != "string" && typeof sec != "string") {
        stack.push(sec % top);
    } else {
        stack.push.apply(stack, [sec, top, 0]);
    }
    `,
    "^":`
    top = stack.pop();
    sec = stack.pop();
    if (typeof top != "string" && typeof sec != "string") {
        stack.push(Math.pow(sec, top));
    } else {
        stack.push.apply(stack, [sec, top, 0]);
    }
    `,
    "`":`
    stack.pop();
    `,
    "!":`
    temp = stack.pop();
    stack.push(temp, temp);
    `,
    ":":`
    output += stack.pop();
    `,
    ";":`
    top = stack.pop();
    if (typeof top != "string") {
        output += String.fromCharCode(top);
    } else {
        for (let i = 0; i < top.length; ++i) {
            output += i.charCodeAt(0).toString() + ' '
        }
    }
    `,
    "[":`
    if (stack[stack.length - 1] != 0 && stack[stack.length - 1] != "" && stack[stack.length - 1] != undefined) {
        while (1) {
    `,
    "]":`
    if (stack[stack.length - 1] == 0 || stack[stack.length - 1] == "" || stack[stack.length - 1] == undefined) {break;}}}
    `,
    "(":`
    if (!stack[stack.length - 1] == 0 || !stack[stack.length - 1] == "" || !stack[stack.length - 1] == undefined) {
        while (1) {
    `,
    ")":`
    if (!stack[stack.length - 1] != 0 && !stack[stack.length - 1] != "" && !stack[stack.length - 1] != undefined) {break;}}}
    `,
    "{":`
    if (stack[stack.length - 1] != 0 || stack[stack.length - 1] != "" || stack[stack.length - 1] != undefined) {
    `,
    "}":`
    }
    `,
    "<":`
    if (!stack[stack.length - 1] != 0 && !stack[stack.length - 1] != "" && !stack[stack.length - 1] != undefined) {
    `,
    ">":`
    }
    `,
    "|":`
    top = input.pop();
    if (top == undefined) {
        stack.push(0);
    } else {
        for (let i = 0; i < top.length; ++i) {
            stack.push(top[i].charCodeAt(0));
        }
    }
    `,
    "~":`
    stack = stack.reverse();
    `,
    "@":`
    inp = input.pop();
    nums = inp.split(/[-+]?[0-9]*\.?[0-9]+/g);
    for (var num of nums.reverse()) {
        stack.push(parseFloat(num));
    }
    `,
    "_":`
    stack.push(stack.length);
    `,
    "/":`
    top = stack.pop();
    stack.unshift(top);
    `,
    "\\":`
    sec = stack.shift();
    stack.push(sec);
    `,
}

function transpile() {
    // @ts-ignore
    var code = document.getElementById('MAWP').value;
    // @ts-ignore
    const input_string = document.getElementById('input').value;
    var input = input_string.split("\n");
    var output = "";
    let stack = [1];
    var prog = `
    let stack = [1];
    let top, sec, temp;
    `
    let raw_split_code = code.split(/("(.*?)"|-?\d*\.?\d+|.)/g);
    let nice_split_code = [];
    for (let codeblock of raw_split_code) {
        if (
            codeblock != undefined && 
            codeblock != "" && (
                (
                    codeblock.toString().length > 1 && 
                    (
                        codeblock.toString()[0] == "\"" || 
                        !isNaN(codeblock)
                    )
                ) || 
                codeblock.toString().length == 1
            )
        ) {
            nice_split_code.push(codeblock);
        }
    }
    console.log(nice_split_code);
    let toadd = "";
    for (let op of nice_split_code) {
        toadd = "";
        if (op in funcs) {
            toadd = funcs[op]
        } else if (!isNaN(op) || op[0] == "\"") {
            toadd = "stack.push(" + op + "); ";
        }
        prog += toadd;
    }
    //document.getElementById("transpiled").innerHTML = prog;
    eval(prog);
    document.getElementById('code-output').innerHTML = output;
}