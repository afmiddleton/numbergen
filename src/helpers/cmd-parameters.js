'use strict';

const yargs = require('yargs');

/**
 * Description
 *
 * Parse the command line paramerers for the dependent parameters
 * Asserting that the required ones are supplied and in the expected range.
 * Provides command line help on usage if expected parameters are not supplied.
 *
 * @return {Object}  Command line parameters
 */

function getCommandLineParams(){
  const argv = require('yargs')
    .usage('Usage: $0 --count [num] --low [num] --high [num] --format [type] --output [file name]')
    .usage(' or $0 -c=[num] -l=[num] -h=[num] -f=[type] -o=[file name]')
    .usage(' or npm start -- --count [num] --low [num] --high [num] --format [type] --output [file name]')
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

  let parameters = {
    count: argv.c,
    low: argv.l,
    high: argv.h,
    format: argv.f,
    output: argv.o,
  };
  return parameters;
}

module.exports = {
  getCommandLineParams,
};
