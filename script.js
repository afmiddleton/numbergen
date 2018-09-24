'use strict';

const argv = require('yargs')
  .usage('Usage: $0 -count [num] -low [num] -high [num] -output [file name]')
  .usage(' or $0 -c [num] -l [num] -h [num] -o [file name]')
  .usage(' or npm start -- --count=[num] --low=[num] --high=[num] --output [file name]')
  .alias(
    {
      c: 'count',
      l: 'low',
      h: 'high',
      o: 'output'
    }
  )
  .default(
    {
      'l': 0,
      'o': './output.txt'
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

// console.log('number=' + argv.n);
// console.log('low=' + argv.l);
// console.log('high=' + argv.h);
// console.log('output=' + argv.o);

const fs = require('fs');
const randomNumberGenerator = require('random-number');
var generateRandomNumber = randomNumberGenerator.generator({
  min:  argv.l,
  max:  argv.h,
  integer: true
});

// use {'flags': 'a'} to append and {'flags': 'w'} to erase and write a new file
var logStream = fs.createWriteStream(argv.output, { flags: 'w' });
for (var i = 0; i < argv.count; i++) {
  logStream.write(generateRandomNumber().toString() + '\n');
}
logStream.end();
