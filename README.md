# numbergen
Write a number of numbers (or the string 'pickle') to the specified output file

## usage
`script.js --count [num] --low [num] --high [num] --format [type] --output [file name]`

`script.js -c [num] -l [num] -h [num] -f [type] -o [file name]`

`npm start -- --count=[num] --low=[num] --high=[num] --format [type] --output [file name]`
(note double --)

## options:
--help        Show help                     [boolean]

--version     Show version number           [boolean]

-f, --format  format of the output numbers  [choices: "integer", "decimal", "random", "pickle"] [default: "integer"]

-c, --count                                 [required]

-h, --high                                  [required]

-l, --low                                   [default: 0]

-o, --output                                [default: "./output.txt"]
