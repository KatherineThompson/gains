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
    
    t.test("stringIsPopOrProp", t => {
        t.plan(5);
        t.equal(regex.stringIsPopOrProp(""), false, "the empty string is not pop or prop");
        t.equal(regex.stringIsPopOrProp("pop culture"), true, "pop is present as part of a longer string");
        t.equal(regex.stringIsPopOrProp("mad props"), true, "prop is present as part of a longer string");
        t.equal(regex.stringIsPopOrProp("plop"), false, "pop and prop are not present though the letters are");
        t.equal(regex.stringIsPopOrProp("pop"), true, "pop is present when it's the entire string");
    });
    
    t.test("stringIsFerretFerryorFerrari", t => {
        t.plan(6);
        t.equal(regex.stringIsFerretFerryOrFerrari(""), false, "the empty string is not ferret, ferry, or ferrari");
        t.equal(regex.stringIsFerretFerryOrFerrari("ferret"), true, "ferret is present as the whole string");
        t.equal(regex.stringIsFerretFerryOrFerrari("ferry"), true, "ferry is present as the whole string");
        t.equal(regex.stringIsFerretFerryOrFerrari("ferrari"), true, "ferrari is present as the whole string");
        t.equal(regex.stringIsFerretFerryOrFerrari("ferrum"), false, "ferret, ferry, and ferrari are not present though 'ferr' is");
        t.equal(regex.stringIsFerretFerryOrFerrari("transfer A"), false, "ferret, ferry, and ferrari are not present in a string not containing them");
    });
    
    t.test("wordEndsInIous", t => {
       t.plan(5);
       t.equal(regex.wordEndsInIous(""), false, "the empty string does not end in -ious");
       t.equal(regex.wordEndsInIous("how delicious"), true, "the word ends in -ious at the end of the string");
       t.equal(regex.wordEndsInIous("spacious room"), true, "the word ends in -ious in the middle of the string");
       t.equal(regex.wordEndsInIous("ruinous"), false, "the word does not end in -ious but has all the letters");
       t.equal(regex.wordEndsInIous("consciousness"), false, "a word with -ious- in the middle does not end in -ious"); 
    });
    
    t.test("wordIsLongerThanSixLetters", t => {
        t.plan(4);
        t.equal(regex.wordIsLongerThanSixLetters(""), false, "the empty string is not longer than six characters");
        t.equal(regex.wordIsLongerThanSixLetters("hottentottententen"), true, "the word is longer than six characters");
        t.equal(regex.wordIsLongerThanSixLetters("no"), false, "the word is shorter than six characters");
        t.equal(regex.wordIsLongerThanSixLetters("hotten totten tenten"), false, "words that are six characters long do not have more than six charcters");
    })
    
    t.test("stringIsWhitespaceFollowedByPunctuation", t => {
       t.plan(5);
       t.equal(regex.stringIsWhitespaceFollowedByPunctuation(""), false, "the empty string is not whitespace followed by punctuation");
       t.equal(regex.stringIsWhitespaceFollowedByPunctuation("bad punctuation ."), true, "the string contains whitespace followed by punctuation at the end");
       t.equal(regex.stringIsWhitespaceFollowedByPunctuation("escape the dot"), false, "the string does not contain whitespace followed by punctuation, only whitespace");
       t.equal(regex.stringIsWhitespaceFollowedByPunctuation("cat : plump"), true, "the string contains whitespace followed by punctuation in the middle");
       t.equal(regex.stringIsWhitespaceFollowedByPunctuation("punctuation."), false, "the string does not contain whitespace followed byt punctuation, only punctuation"); 
    });
    
    t.test("wordLacksLetterE", t => {
        t.plan(6);
        t.equal(regex.wordLacksLetterE(""), false, "the empty string is not a word");
        t.equal(regex.wordLacksLetterE("red platypus"), true, "out of two, at least one word does not have the letter e");
        t.equal(regex.wordLacksLetterE("wobbling nest"), true, "out of two, at least one word does not have the letter e");
        t.equal(regex.wordLacksLetterE("earth bed"), false, "two words do contain the letter e (one begins with e)");
        t.equal(regex.wordLacksLetterE("learning ape"), false, "two words do not contain the letter e (one ends with e)");
        t.equal(regex.wordLacksLetterE("2384729387"), false, "digits are not a word");
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
    });
    
    t.test("isPhoneNumber", t => {
       t.plan(5);
       t.equal(regex.isPhoneNumber(""), false, "the empty string is not a phone number");
       t.equal(regex.isPhoneNumber("405-234-5893"), true, "10 digits separated by dashes is a phone number");
       t.equal(regex.isPhoneNumber("4052345893"), false, "10 digits are not a phone number");
       t.equal(regex.isPhoneNumber("cat is plump"), false, "words are not a phone number");
       t.equal(regex.isPhoneNumber("cat 405-234-5893 is plump"), false, "the string contains a phone number but is not one as a whole"); 
    });

});