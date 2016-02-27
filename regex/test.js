'use strict';

// Add your tests here
const test = require('tape'),

    // The regex object has your functions from index.js.
    regex = require('./');

test('regex', t => {
    t.plan(7);
    t.equal(regex.hasAChars('bbb'), false, 'there are no a chars in a string full of bs');
    t.equal(regex.hasAChars(''), false, 'there are no a chars in the empty string');
    t.equal(regex.hasAChars('a'), true, 'detects the a char when it is the entire string');
    t.equal(regex.hasAChars('aaa'), true, 'detects multiple a chars');
    t.equal(regex.hasAChars('ababa'), true, 'detects multiple a chars with other chars');

    t.equal(regex.getLastFourDigits('123-45-6789'), '6789', 'extracts the last four digits of a SS number');
    t.equal(regex.getLastFourDigits('not an ss number'), null, 'determines when the input is not an SS number');
});