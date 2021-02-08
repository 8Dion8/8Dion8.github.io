| Symbol | Normal                     | #                               |
|--------|----------------------------|---------------------------------|
| 0-9    | Push a number              | The same but in string form     |
| !      | Duplicate the top of stack | Quadruplicate top of stack      |
| \|     | Input as ASCII codes       | Input as strings of ASCII codes |
| @      | Input as number            | Input as strings                |
| ~      | Reverse stack              |                                 |
| _      | Push length of stack       |                                 |
| .      | Break loop                 | Terminate program               |


| Symbol | Normal/Number                         | Normal/String                                       | #/Number                                 | #/String                                               |
|--------|---------------------------------------|-----------------------------------------------------|------------------------------------------|--------------------------------------------------------|
| :      | Output as Number                      | Output as string                                    |                                          |                                                        |
| ;      | Output as ASCII char                  | Output as sequence of ASCII codes                   |                                          |                                                        |
| ?      | If top of stack is 0 skip next symbol | If top of stack is an empty string skip next symbol | If top of stack isn't 0 skip next symbol | If top of stack isn't an empty string skip next symbol |
| []     | Loop, skip if top is 0                | Loop, skip if top is an empty string                | Loop, skip if top isn't 0                | Loop, skip if top isn't an empty string                |
| {}     | Long conditional, skip if top is 0    | Long conditional, skip if top is an empty string    | Long conditional, skip if top isn't 0    | Long conditional, skip if top isn't an empty string    |

| Symbol | Normal/number-number | Normal/number-string                     | Normal/String-String | #/number-number | #/number-string | #/String-String |
|--------|----------------------|------------------------------------------|----------------------|-----------------|-----------------|-----------------|
| +      | Addition             | Convert number to string and concatenate |                      |                 |                 |                 |
| -      | Subtraction          |                                          |                      |                 |                 |                 |
| *      | Multiplication       |                                          |                      |                 |                 |                 |
| $      | Division             |                                          |                      |                 |                 |                 |
| %      | Modulo               |                                          |                      |                 |                 |                 |
| =      | Equals               |                                          |                      |                 |                 |                 |
