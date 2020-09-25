function buildbracemap(code, char1, char2) {
    temp_bracestack = []
    bracemap = {}
    code = code.split("")
    for (const [position, command] of code.entries()) {
        if (command === char1) { temp_bracestack.push(position) }
        if (command === char2) {
            start = temp_bracestack.pop()
            bracemap[start] = position
            bracemap[position] = start
        }
    }
    return bracemap
}

function replace_all_funcs(code) {
    var custom_funcs = {}
    var i = 0;
    while (true) {
        char = code[i]
        if ('qwertyuiopasdfghjklzxcvbnm'.includes(char)) {
            var temp_char = ''
            var custom_func = ''
            if (Object.keys(custom_funcs).includes(char)) {
                console.log("replaced func " + char)
                console.log(custom_funcs)
                code = code.replaceToFunc(i, custom_funcs[char])
                i--
                console.log(code)
            } else {
                console.log("added func " + char)
                for (let j = i + 1; j < code.length; j++) {
                    temp_char = code[j]
                    if (temp_char == '#') {
                        custom_funcs[char] = custom_func
                        break
                    } else {
                        custom_func += temp_char
                    }
                }
            }
        }
        i++
        if (i < code.length) {
            break
        }
    }
    return code
}

String.prototype.replaceToFunc = function(index, replacement) {
    console.log("AAAAAAAAAA", this)
    let x = this.split('')
    console.log("AAAAAAAAAA", x)
    x[index] = replacement
    console.log(x)
    return x.join('')
}

function debug_stack(stack, char, pos) {
    var current = document.getElementById('stack-debug').innerHTML
    document.getElementById('stack-debug').innerHTML = current.toString() + "<br>" + char.toString() + " : " + pos.toString() + " : [" + stack.toString() + "]"
}

function debug_code() {
    var code = document.getElementById('MAWP').value
    console.log(code)
    code = replace_all_funcs(code)
    console.log(code)
    if (code == "") { return }
    const input_string = document.getElementById('input').value
    var input = input_string.split("\n")
    console.log("str: " + input_string)
    console.log("input: " + input)
    input = input.reverse()
    console.log(input)
    document.getElementById('code-output').innerHTML = ''
    document.getElementById('stack-debug').innerHTML = 'chr:pos:stack'
    var max_o = document.getElementById('max-output').value
    var max_e = document.getElementById('max-execs').value
    var char = ''
    var pos = 0
    var stack = [1]
    var top
    var sec
    var executed = 0
    var output = ''
    var pushed_int = false
    var t0 = performance.now()

    var pushingString = false;
    var pushedFirstNum = false;
    var pushingInputNum = false;


    var m;
    var a;
    var w;
    var p;

    var custom_funcs = {}

    const squarebracemap = buildbracemap(code, "[", "]")
    const roundbracemap = buildbracemap(code, "(", ")")
    const longcondbracemap = buildbracemap(code, "<", ">")
    const invlongcondbracemap = buildbracemap(code, "{", "}")
    while (true) {
        var pushingFirstNum = false
        char = code.charAt(pos)
        if (!pushingString) {
            if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(char)) {
                if (!pushedFirstNum) {
                    stack.push(parseInt(char))
                    pushedFirstNum = true
                } else {
                    stack.push(parseInt(stack.pop().toString() + char))
                }
            } else {
                pushedFirstNum = false
            }
            switch (char) {
                case ' ':
                    pushedFirstNum = true
                    stack.push(0)
                    break;
                case '+':
                    top = stack.pop()
                    sec = stack.pop()
                    if (typeof top == "string" || typeof sec == "string") {
                        stack.push(sec.toString() + top.toString())
                    } else {
                        stack.push(top + sec)
                    }

                    break;
                case '-':
                    top = stack.pop()
                    sec = stack.pop()
                    if (typeof top != "string" && typeof sec != "string") {
                        stack.push(sec - top)
                    } else {
                        stack.push.apply(stack, [sec, top, 0])
                    }
                    break;
                case '*':
                    top = stack.pop()
                    sec = stack.pop()
                    if (typeof top == "string" && typeof sec == "string") {
                        stack.push.apply(stack, [sec, top, 0])
                    } else {
                        if (typeof top == "string") {
                            stack.push(top.repeat(sec))
                        } else if (typeof sec == "string") {
                            stack.push(sec.repeat(top))
                        } else {
                            stack.push(top * sec)
                        }
                    }
                    break;
                case '$':
                    top = stack.pop()
                    sec = stack.pop()
                    if (typeof top != "string" && typeof sec != "string") {
                        stack.push(sec / top)
                    } else {
                        stack.push.apply(stack, [sec, top, 0])
                    }
                    break;
                case '%':
                    top = stack.pop()
                    sec = stack.pop()
                    if (typeof top != "string" && typeof sec != "string") {
                        stack.push(sec % top)
                    } else {
                        stack.push.apply(stack, [sec, top, 0])
                    }
                    break;
                case '^':
                    top = stack.pop()
                    sec = stack.pop()
                    if (typeof top != "string" && typeof sec != "string") {
                        stack.push(Math.pow(sec, top))
                    } else {
                        stack.push.apply(stack, [sec, top, 0])
                    }
                    break;
                case 'M':
                    if (code[pos - 1] == '=' && code[pos - 2] != '=') {
                        m = stack.pop()
                    } else {
                        stack.push(m)
                    }
                    break
                case 'A':
                    if (code[pos - 1] == '=' && code[pos - 2] != '=') {
                        a = stack.pop()
                    } else {
                        stack.push(a)
                    }
                    break
                case 'W':
                    if (code[pos - 1] == '=' && code[pos - 2] != '=') {
                        w = stack.pop()
                    } else {
                        stack.push(w)
                    }
                    break
                case 'P':
                    if (code[pos - 1] == '=' && code[pos - 2] != '=') {
                        p = stack.pop()
                    } else {
                        stack.push(p)
                    }
                    break
                case '"':
                    stack.push('')
                    pushingString = true
                    break
                case '`':
                    stack.pop()
                    break;
                case '.':
                    document.getElementById('code-output').innerHTML = output
                    var t1 = performance.now()
                    document.getElementById('code-time').innerHTML = ((t1 - t0) / 1000).toFixed(3) + " seconds elapsed";
                    return 0
                case '!':
                    var temp = stack.pop()
                    stack.push(temp, temp)
                    break;
                case ':':
                    output += stack.pop()
                    break;
                case ';':
                    var top = stack.pop()
                    if (typeof top != "string") {
                        output += String.fromCharCode(top)
                    } else {
                        for (let i = 0; i < top.length; ++i) {
                            output += i.charCodeAt(0).toString() + ' '
                        }
                    }
                    break;
                case '?':
                    if (stack[stack.length - 1] != 0) {
                        ++pos
                    }
                    break;
                case '[':
                    if (stack[stack.length - 1] == 0) {
                        pos = squarebracemap[pos]
                    }
                    break;
                case ']':
                    if (stack[stack.length - 1] != 0) {
                        pos = squarebracemap[pos]
                    }
                    break;
                case '(':
                    if (stack[stack.length - 1] != 0) {
                        pos = roundbracemap[pos]
                    }
                    break;
                case ')':
                    if (stack[stack.length - 1] == 0) {
                        pos = roundbracemap[pos]
                    }
                    break;
                case '<':
                    if (stack[stack.length - 1] != 0) {
                        pos = longcondbracemap[pos]
                    }
                    break;
                case '|':
                    top = input.pop()
                    if (top == undefined) {
                        stack.push(0)
                    } else {
                        for (let i = 0; i < top.length; ++i) {
                            stack.push(top[i].charCodeAt(0))
                        }
                    }
                    break;
                case '~':
                    stack = stack.reverse()
                    break;
                case '{':
                    if (stack[stack.length - 1] == 0) {
                        pos = invlongcondbracemap[pos]
                    }
                    break;
                case '@':
                    sec = input.pop()
                    for (let i = 0; i < sec.length; ++i) {
                        if (!isNaN(sec[i]) && sec[i] != ' ') {
                            if (!pushed_int) {
                                stack.push(parseInt(sec[i]))
                                pushed_int = true
                            } else {
                                stack.push(stack.pop() * 10 + parseInt(sec[i]))
                            }
                        } else {
                            pushed_int = false
                        }
                    }

                    pushed_int = false
                    break;
                case '_':
                    stack.push(stack.length)
                    break;
                case '/':
                    top = stack.pop()
                    stack.unshift(top)
                    break;
                case '\\':
                    sec = stack.shift()
                    stack.push(sec)
                    break;
            }
        } else {
            if (char == '"') {
                pushingString = false
            } else {
                stack.push(stack.pop() + char)
            }
        }
        console.log("pos:", pos)
        pos += 1
        executed += 1

        if (output.length > max_o) {
            document.getElementById('code-output').innerHTML = output
            document.getElementById('code-output').innerHTML = output + "\nOutput reached limit of 1kb and was truncated."
            var t1 = performance.now()
            document.getElementById('code-time').innerHTML = ((t1 - t0) / 1000).toFixed(3) + " seconds elapsed";
            return 0
        }

        debug_stack(stack, char, pos)
        console.log('char: ', char);
        console.log('char type: ', typeof char);
        console.log('stack: ', stack);
        console.log("executed:", executed)
        if (pos == code.length) {
            document.getElementById('code-output').innerHTML = output
            var t1 = performance.now()
            document.getElementById('code-time').innerHTML = ((t1 - t0) / 1000).toFixed(3) + " seconds elapsed";
            return 1
        }
        if (executed > max_e) {
            document.getElementById('code-output').innerHTML = output
            var t1 = performance.now()
            document.getElementById('code-time').innerHTML = ((t1 - t0) / 1000).toFixed(3) + " seconds elapsed";
            return 1
        }
    }
}