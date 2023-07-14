| Symbol | Normal                     | #                                    |
|--------|----------------------------|--------------------------------------|
| 0-9    | Push a number              | The same but in string form          |
| !      | Duplicate the top of stack | Quadruplicate top of stack           |
| \|     | Input as ASCII codes       | Input as strings of ASCII codes      |
| @      | Input as number            | Input as strings                     |
| ~      | Reverse stack              | Apply function to all of stack (map) |
| _      | Push length of stack       | Push length of top of stack          |
| .      | Break loop                 | Terminate program                    |


| Symbol | Normal/Number                         | Normal/String                                       | #/Number                                 | #/String                                               |
|--------|---------------------------------------|-----------------------------------------------------|------------------------------------------|--------------------------------------------------------|
| :      | Output as Number                      | Output as string                                    | Convert to binary representation         | Convert from binary to base 10                         |
| ;      | Output as ASCII char                  | Output as sequence of ASCII codes                   | Convert to hexadecimal                   | Convert from hexadecimal to base 10                    |
| ?      | If top of stack is 0 skip next symbol | If top of stack is an empty string skip next symbol | If top of stack isn't 0 skip next symbol | If top of stack isn't an empty string skip next symbol |
| []     | Loop, skip if top is 0                | Loop, skip if top is an empty string                | Loop, skip if top isn't 0                | Loop, skip if top isn't an empty string                |
| {}     | Long conditional, skip if top is 0    | Long conditional, skip if top is an empty string    | Long conditional, skip if top isn't 0    | Long conditional, skip if top isn't an empty string    |

| Symbol | Normal/number-number | Normal/number-string                     | Normal/String-String | #/number-number      | #/number-string                                       | #/String-String                                              |
|--------|----------------------|------------------------------------------|----------------------|----------------------|-------------------------------------------------------|--------------------------------------------------------------|
| +      | Addition             | Convert number to string and concatenate | Concatenate          | [a, b]               | a[b]                                                  | Contents of regex match.                                     |
| -      | Subtraction          | remove last n characters                 | a.remove(b)          | [a, b)               | a[b:]                                                 | Split on regex.                                              |
| *      | Multiplication       | Repeat string n times                    | Interleave           | Exponentiation       | a[:b]                                                 | Join a on b                                                  |
| $      | Division             | Divide into chunks of length n           | Split                | Integer division     | `a` from base ten to base `b` (using `b` as alphabet) | Contains                                                     |
| %      | Modulo               | Last chunk of length n                   | String formatting    | a to base b from ten | Each character repeated `n` times                     | Bijective base conversion (`a` with alphabet `b` to base 10) |
| =      | Equals               | Equals                                   | Equals               | a from base b to ten | a[::b]                                                | a.startswith(b)                                              |
