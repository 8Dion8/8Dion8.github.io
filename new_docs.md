<table>
<tr><td>Symbol</td><td>Normal</td><td>#</td></tr>
<tr><td>0-9</td><td>Push a number</td><td>The same but in string form</td></tr>
<tr><td>!</td><td>Duplicate the top of stack</td><td>Quadruplicate top of stack</td></tr>
<tr><td>|</td><td>Input as ASCII codes</td><td>Input as strings of ASCII codes</td></tr>
<tr><td>@</td><td>Input as number</td><td>Input as strings</td></tr>
<tr><td>~</td><td>Reverse stack</td><td></td></tr>
<tr><td>_</td><td>Push length of stack</td><td></td></tr>
<tr><td>.</td><td>Break loop</td><td>Terminate program</td></tr>
</table>
<table>
<tr><td>Symbol</td><td>Normal/Number</td><td>Normal/String</td><td>#/Number</td><td>#/String</td></tr>
<tr><td>:</td><td>Output as Number</td><td>Output as string</td><td></td><td></td></tr>
<tr><td>;</td><td>Output as ASCII char</td><td>Output as sequence of ASCII codes</td><td></td><td></td></tr>
<tr><td>?</td><td>If top of stack is 0 skip next symbol</td><td>If top of stack is an empty string skip next symbol</td><td>If top of stack isn't 0 skip next symbol</td><td>If top of stack isn't an empty string skip next symbol</td></tr>
<tr><td>[]</td><td>Loop, skip if top is 0</td><td>Loop, skip if top is an empty string</td><td>Loop, skip if top isn't 0</td><td>Loop, skip if top isn't an empty string</td></tr>
<tr><td>{}</td><td>Long conditional, skip if top is 0</td><td>Long conditional, skip if top is an empty string</td><td>Long conditional, skip if top isn't 0</td><td>Long conditional, skip if top isn't an empty string</td></tr>
</table>
