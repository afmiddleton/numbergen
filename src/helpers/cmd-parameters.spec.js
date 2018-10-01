'use strict';

/**
 * @Test   : cmd-parameters.js
 * @Date   : 9/27/2018, 8:52:58 AM
 */

const sinon = require('sinon');
const rewire = require('rewire');
let chai = require('chai');

const expect = chai.expect;

let target = rewire('./cmd-parameters.js');
let processExitMock;
let originalProcessArgs;
let consoleMock = {};

describe('command line parameters', function(){
  beforeEach(function(){
    originalProcessArgs = process.argv.slice(0);
    processExitMock = sinon.spy();
    consoleMock = {
      info: sinon.spy(),
      warn: sinon.spy(),
      log: sinon.spy(),
      error: sinon.spy(),
    };
    target.__set__('process.exit', processExitMock);
    target.__set__('console', consoleMock);
  });

  afterEach(function(){
    process.argv = originalProcessArgs;
  });

  it.only('should parse count and high', function(){
    const expectedCount = 20;
    const expectedHigh = 10;
    process.argv.push('--count=' + expectedCount);
    process.argv.push('--high=' + expectedHigh);
    let result = target.getCommandLineParams();
    expect(result.count).to.equal(expectedCount);
    expect(result.high).to.equal(expectedHigh);
  });

  it('should require count', function(){
    const expectedHigh = 10;
    process.argv.push('--high=' + expectedHigh);
    target.getCommandLineParams();
    expect(processExitMock.called).to.equal(true);
  });

  it('should require high', function(){
    const expectedCount = 20;
    process.argv.push('--count=' + expectedCount);
    target.getCommandLineParams();
    expect(processExitMock.called).to.equal(true);
  });

  describe('additional validation for count', function(){
    it('should require count to be positive integer and exit if it is not', function(){
      const expectedCount = -1;
      const expectedHigh = 10;
      process.argv.push('--count=' + expectedCount);
      process.argv.push('--high=' + expectedHigh);
      target.getCommandLineParams();
      expect(processExitMock.called).to.equal(true);
      expect(consoleMock.error.called).to.equal(true);
    });

    it('should require count to not be 0 and exit if it is not', function(){
    // need to almost duplicate this test because yargs caches the process.argv
      const expectedCount = 0;
      const expectedHigh = 10;
      process.argv.push('--count=' + expectedCount);
      process.argv.push('--high=' + expectedHigh);
      target.getCommandLineParams();
      expect(processExitMock.called).to.equal(true);
      expect(consoleMock.error.called).to.equal(true);
    });
  });
});
