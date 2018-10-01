'use strict';

const fs = require('fs');
const randomNumberGenerator = require('random-number');

const parameterParser = require('./src/helpers/cmd-parameters.js');

let parameters = parameterParser.getCommandLineParams();

var generateRandomNumber = randomNumberGenerator.generator({
  min:  parameters.low,
  max:  parameters.high,
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
var logStream = fs.createWriteStream(parameters.output, { flags: 'w' });
for (var i = 0; i < parameters.count; i++) {
  if(i%10000 === 0){
    // this is a big processing job, yield to free up resources
    logStream.end();
    console.log( i + ' of ' + parameters.count + ' (' + ((i/parameters.count)*100).toFixed(0) + '%)'); // eslint-disable-line no-console
    logStream = fs.createWriteStream(parameters.output, { flags: 'a' });
  }
  var format = desiredFormat(parameters.format)(); // evaluate this function for every loop
  if(format === 'pickle'){
    logStream.write('pickle\n');
  } else {
    logStream.write(generateRandomNumber(null, null, format).toString() + '\n');
  }
}
console.log( 'Wrote ' + parameters.count + ' numbers to ' + parameters.output ); // eslint-disable-line no-console
logStream.end();
