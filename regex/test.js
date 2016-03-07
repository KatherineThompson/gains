'use strict';

// Add your tests here
const test = require('tape'),

    // The regex object has your functions from index.js.
    regex = require('./');

test('regex', t => {
    t.test("stringIsCarOrCat", t => {
        t.plan(6);
        t.equal(regex.stringIsCarOrCat("my car"), true, "car is present when part of a larger string");
        t.equal(regex.stringIsCarOrCat("bad cats"), true, "cat is present when part of a larger string");
        t.equal(regex.stringIsCarOrCat("camper"), false, "cat or car is not present though all the letters are");
        t.equal(regex.stringIsCarOrCat("high art"), false, "cat or car is not present in 'high art'");
        t.equal(regex.stringIsCarOrCat(""), false, "cat or car is not present in the empty string");
        t.equal(regex.stringIsCarOrCat("car"), true, "car is present when it's the whole string");
    });
    
    t.test("examples", t => {
        t.plan(7);
        t.equal(regex.hasAChars('bbb'), false, 'there are no a chars in a string full of bs');
        t.equal(regex.hasAChars(''), false, 'there are no a chars in the empty string');
        t.equal(regex.hasAChars('a'), true, 'detects the a char when it is the entire string');
        t.equal(regex.hasAChars('aaa'), true, 'detects multiple a chars');
        t.equal(regex.hasAChars('ababa'), true, 'detects multiple a chars with other chars');

        t.equal(regex.getLastFourDigits('123-45-6789'), '6789', 'extracts the last four digits of a SS number');
        t.equal(regex.getLastFourDigits('not an ss number'), null, 'determines when the input is not an SS number');
    })

});