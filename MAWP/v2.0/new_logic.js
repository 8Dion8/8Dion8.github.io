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

function debug_stack(stack, char, pos, x) {
    if ('"+-*1234567890MAWP%.!:;?[]()<>|~{}@_/\\'.includes(char) && !x) {
        var current = document.getElementById('stack-debug').innerHTML
        document.getElementById('stack-debug').innerHTML = current.toString() + "<br>" + char.toString() + " : " + pos.toString() + " : [" + stack.toString() + "]"
    }
}

function debug_code() {
    var t0 = performance.now()
    var code = document.getElementById('MAWP').value
    console.log(code)
    if (code == "") { return }
    const input_string = document.getElementById('input').innerHTML
    var input = input_string.split("\n")
    console.log("str: " + input_string)
    console.log("input: " + input)
    input = input.reverse()
    console.log(input)
    document.getElementById('code-output').innerHTML = ''
    document.getElementById('stack-debug').innerHTML = 'chr:pos:stack'
        //
        //
    var char = ''
    var pos = 0
    var stack = [1]
    var top
    var sec
    var pushed_int = false
    var pushingString = false
    var pushedFirstNum
    var output = ''
    var M = 0
    var A = 0
    var W = 0
    var P = 0
    const squarebracemap = buildbracemap(code, "[", "]")
    const roundbracemap = buildbracemap(code, "(", ")")
    const longcondbracemap = buildbracemap(code, "<", ">")
    const invlongcondbracemap = buildbracemap(code, "{", "}")
    while (true) {
        char = code.charAt(pos)
        if (!pushingString) {
            if ('0123456789'.includes(char)) {
                if (!pushedFirstNum) {
                    stack.push(parseInt(char))
                    pushedFirstNum = true
                } else {
                    stack.push(stack.pop() * 10 + parseInt(char))
                }
            } else {
                pushedFirstNum = false
            }
            switch (code.charAt(pos)) {
                case 'M':
                    if (code[pos - 1] == '=') {
                        M = stack.pop()
                    } else {
                        stack.push(M)
                    }
                    break;
                case 'A':
                    if (code[pos - 1] == '=') {
                        A = stack.pop()
                    } else {
                        stack.push(A)
                    }
                    break;
                case 'W':
                    if (code[pos - 1] == '=') {
                        W = stack.pop()
                    } else {
                        stack.push(W)
                    }
                    break;
                case 'P':
                    if (code[pos - 1] == '=') {
                        P = stack.pop()
                    } else {
                        stack.push(P)
                    }
                    break;
                case '+':
                    top = stack.pop()
                    sec = stack.pop()
                    stack.push(sec + top)
                    break;
                case '-':
                    top = stack.pop()
                    sec = stack.pop()
                    if (typeof top != "string" && typeof sec != "string") {
                        stack.push(sec - top)
                    } else {
                        stack.push(sec, top, 0)
                    }
                    break;
                case '*':
                    top = stack.pop()
                    sec = stack.pop()
                    if (typeof top == "string" && typeof sec == "string") {
                        stack.push(sec, top, 0)
                    } else {
                        if (typeof top == "string") {
                            stack.push(top.repeat(sec))
                        } else if (typeof sec == "string") {
                            stack.push(sec.repeat(top))
                        } else {
                            stack.push(top * sec)
                        }
                    }
                    break
                case ' ':
                    stack.push(0)
                    pushedFirstNum = true
                    break
                case '%':
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
                    var temp = stack.pop()
                    output += String.fromCharCode(temp)
                    break;
                case '"':
                    stack.push('')
                    pushingString = true
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
        pos += 1

        if (output.length > 2048) {
            document.getElementById('code-output').innerHTML = output
            document.getElementById('code-output').innerHTML = output + "\nOutput reached limit of 2kb and was truncated."
            var t1 = performance.now()
            document.getElementById('code-time').innerHTML = ((t1 - t0) / 1000).toFixed(3) + " seconds elapsed";
            return 0
        }

        debug_stack(stack, char, pos, pushingString)
        console.log('char: ', char);
        console.log('char type: ', typeof char);
        console.log('stack: ', stack);


        if (pos == code.length) {
            document.getElementById('code-output').innerHTML = output
            var t1 = performance.now()
            document.getElementById('code-time').innerHTML = ((t1 - t0) / 1000).toFixed(3) + " seconds elapsed";
            return 1
        }
    }
}