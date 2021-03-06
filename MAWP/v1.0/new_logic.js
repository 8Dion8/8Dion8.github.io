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

function debug_stack(stack, char, pos) {
    if ("1234567890MAWP%.!:;?[]()<>|~{}@_/\\".includes(char)) {
        var current = document.getElementById('stack-debug').innerHTML
        document.getElementById('stack-debug').innerHTML = current.toString() + "<br>" + char.toString() + " : " + pos.toString() + " : [" + stack.toString() + "]"
    }
}

function debug_code() {
    var t0 = performance.now()
    var code = document.getElementById('MAWP').value
    code = code.replace("<br>", "")
    code = code.replace('&lt;', '<')
    code = code.replace('&gt;', '>')
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
    var output = ''
    var executed = 0;
    const squarebracemap = buildbracemap(code, "[", "]")
    const roundbracemap = buildbracemap(code, "(", ")")
    const longcondbracemap = buildbracemap(code, "<", ">")
    const invlongcondbracemap = buildbracemap(code, "{", "}")
    while (true) {
        char = code.charAt(pos)
        switch (code.charAt(pos)) {
            case '1':
                stack.push(1)
                break;
            case '2':
                stack.push(2)
                break;
            case '3':
                stack.push(3)
                break;
            case '4':
                stack.push(4)
                break;
            case '5':
                stack.push(5)
                break;
            case '6':
                stack.push(6)
                break;
            case '7':
                stack.push(7)
                break;
            case '8':
                stack.push(8)
                break;
            case '9':
                stack.push(9)
                break;
            case '0':
                stack.push(0)
                break;
            case 'M':
                top = stack.pop()
                sec = stack.pop()
                stack.push(top + sec)
                break;
            case 'A':
                top = stack.pop()
                sec = stack.pop()
                stack.push(Math.abs(top - sec))
                break;
            case 'W':
                top = stack.pop()
                sec = stack.pop()
                stack.push(top * sec)
                break;
            case 'P':
                top = stack.pop()
                sec = stack.pop()
                stack.push(Math.floor(sec / top))
                break;
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
                if (sec == undefined) { stack.push(0) } else {
                    for (let i = 0; i < sec.length; ++i) {
                        if (sec[i] == ' ') {
                            stack.push(0)
                        } else if (!isNaN(sec[i])) {
                            stack.push(parseInt(sec[i]))
                        } else {
                            stack.push(0)
                        }
                    }
                }
                break;
            case '_':
                stack.push(stack.length)
                break;
        }
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