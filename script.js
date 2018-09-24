'use strict';

const argv = require('yargs')
  .usage('Usage: $0 --count [num] --low [num] --high [num] --format [type] --output [file name]')
  .usage(' or $0 -c [num] -l [num] -h [num] -f [type] -o [file name]')
  .usage(' or npm start -- --count=[num] --low=[num] --high=[num] --format [type] --output [file name]')
  .alias(
    {
      c: 'count',
      l: 'low',
      h: 'high',
      f: 'format',
      o: 'output'
    }
  )
  .describe('f', 'format of the output numbers')
  .choices('f', ['integer', 'decimal', 'random', 'pickle'])
  .default(
    {
      'l': 0,
      'o': './output.txt',
      'f': 'integer'
    }
  )
  .demandOption(['count','high'])
  .argv;

if(argv.count <= 0){
  console.error('Incorrect usage: number (-count='+ argv.count +') must be greater than 0'); // eslint-disable-line no-console
  process.exit(1);
}

if(argv.high < argv.low){
  console.error('Incorrect usage: low (-low='+ argv.low +') must be less then high (-high='+ argv.high +')'); // eslint-disable-line no-console
  process.exit(1);
}

const fs = require('fs');
const randomNumberGenerator = require('random-number');
var generateRandomNumber = randomNumberGenerator.generator({
  min:  argv.l,
  max:  argv.h,
  integer: true
});

function desiredFormat(format){
  var returnFunction;
  switch (format) {
  case 'integer':
    returnFunction = function(){
      return true;
    };
    break;
  case 'decimal':
    returnFunction = function(){
      return false;
    };
    break;
  case 'random':
    returnFunction = function(){
      var generateBoolean = randomNumberGenerator.generator({
        min:  0,
        max:  1,
        integer: true
      });
      return generateBoolean();
    };
    break;
  case 'pickle':
    returnFunction = function(){
      var generateChoice = randomNumberGenerator.generator({
        min:  0,
        max:  9,
        integer: true
      });
      var choice = generateChoice();
      if(choice === 9){
        return 'pickle'; // 1 in 10
      } else {
        return choice%2; // 4/10 false; 5/10 true
      }
    };
    break;
  default:
    returnFunction = function(){
      return true;
    };
    break;
  }
  return returnFunction;
}

// use {'flags': 'a'} to append and {'flags': 'w'} to erase and write a new file
var logStream = fs.createWriteStream(argv.output, { flags: 'w' });
for (var i = 0; i < argv.count; i++) {
  var format = desiredFormat(argv.format)(); // evaluate this function for every loop
  if(format === 'pickle'){
    logStream.write('pickle\n');
  } else {
    logStream.write(generateRandomNumber(null, null, format).toString() + '\n');
  }
}
logStream.end();
