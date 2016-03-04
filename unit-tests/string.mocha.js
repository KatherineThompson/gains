'use strict';

// Learn about mocha: https://mochajs.org/
// Learn about chai: http://chaijs.com/

// In this file, we'll use mocha instead of tape. Mocha has a few differences.
// One of them is that it provides some magic globals that will be available
// to your code, unlike tape, where no globals are needed.

// This next comment makes vscode stop complaining about the magic globals.
/* global describe, it */

// Also unlike tape, mocha does not have a built-in assertion tool. For that,
// we'll use chai. Chai offers a couple of different APIs for its functionality,
// but the one we'll be using is the assert module: http://chaijs.com/api/assert/.
const assert = require('chai').assert;

describe('intro', () => {
    describe('sample assertions', () => {
        it('passes all the samples', () => {
            // You can just call assert() as a function, and pass in whatever you want.
            assert(1 + 1 === 2, '1 and 1 is 2');

            // There are the methods we're familiar with from tap. Also, the messages are optional.
            // This is equivalent to t.equal
            assert.strictEqual(true, true, 'these booleans are equal when compared with ===');
            assert.notStrictEqual(3, '3', 'these values are not the same when compared with ===');
            assert.deepEqual({ tea: 'green' }, { tea: 'green' });
            assert.notDeepEqual({ tea: 'green' }, { tea: 'jasmine' });

            // Then there are some other methods that assert() provides that tape does not.
            assert.isAbove(5, 2, '5 is strictly greater than 2');
            assert.isBelow(3, 6, '3 is strictly less than 6');
            assert.isArray([], 'the empty array is an array');
            assert.include([ 1, 2, 3 ], 3, 'array contains value');
        });
    });

    // Your turn!
    describe('string', () => {

        describe('startsWith', () => {
            it('returns true when the string starts with the search pattern', () => {
                // TODO make an assertion
                assert.strictEqual("plump".startsWith("p"), true);
            });

            it('returns false when the string does not start with the search pattern', () => {
                // TODO make an assertion
                assert.strictEqual("cat".startsWith("k"), false);
            });
        });
        
        describe("includes", () => {
           it("returns false when called on the empty string", () => {
               assert.strictEqual("".includes("cat"), false);
           }); 
           
           it("returns true when the string contains the element", () => {
              assert.strictEqual("cattery".includes("cat"), true); 
           });
           
           it("returns false when the string does not contain the element", () => {
              assert.strictEqual("plump".includes("cat"), false); 
           });
           
           it("returns false when the position of the substring is greater than the position after which the search begins", () => {
              assert.strictEqual("cattery".includes("cat", 1), false); 
           });
        });
        // includes()
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes

            // Verify that calling includes() on an empty string returns false

            // Verify that calling includes() when the string contains the element returns true

            // Verify that calling includes() when the string does not contain the element returns false

            // Verify that calling includes() with a `position` as the second argument affects the
            // result of the function; if position is greater than the location of the substring that is
            // being searched for, then the function should return false.
        describe("endsWith", () => {
            it("returns false when called on the empty string", () => {
               assert.strictEqual("".endsWith("t"), false);
           }); 
           
           it("returns true when the string ends with the element", () => {
              assert.strictEqual("cattery".endsWith("y"), true); 
           });
           
           it("returns false when the string does not end with the element", () => {
              assert.strictEqual("plump".endsWith("c"), false); 
           });
           
           it("returns false when the ending position is less than the position of the search element", () => {
              assert.strictEqual("cattery".endsWith("y", 3), false); 
           });
        });
        // endsWith()
        describe("toUpperCase", () => {
            it("returns the empty string when called on the empty string", () => {
                assert.strictEqual("".toUpperCase(), "");
            });
            
            it("returns a lower case string in upper case", () => {
                assert.strictEqual("cat".toUpperCase(), "CAT");
            });
            
            it("returns an upper case string in upper case", () => {
               assert.strictEqual("CAT".toUpperCase(), "CAT"); 
            });
            
            it("returns a mixed case string in upper case", () => {
               assert.strictEqual("cAt".toUpperCase(), "CAT"); 
            });
        });
        // toUpperCase()
        describe("toLowerCase", () => {
            it("returns the empty string when called on the empty string", () => {
                assert.strictEqual("".toLowerCase(), "");
            });
            
            it("returns an upper case string in lower case", () => {
                assert.strictEqual("CAT".toLowerCase(), "cat");
            });
            
            it("returns a lower case string in lower case", () => {
               assert.strictEqual("cat".toLowerCase(), "cat"); 
            });
            
            it("returns a mixed case string in upper case", () => {
               assert.strictEqual("cAt".toLowerCase(), "cat"); 
            });
        });        
        // toLowerCase()
        describe("substring", () => {
            it("returns the empty string when called on the empty string", () => {
               assert.strictEqual("".substring(0, 3), ""); 
            });
            
            it("returns a substring when called with both a start and end position", () => {
               assert.strictEqual("plumperdeedoodle".substring(0, 5), "plump");
            });
            
            it("returns a substring when called with only a start position", () => {
                assert.strictEqual("plumperdeedoodle".substring(7), "deedoodle");
            });
            
            it("returns a substring when the start position is higher than the end position", () => {
               assert.strictEqual("plumperdeedoodle".substring(5, 0), "plump"); 
            });
            
            it("returns the empty string when the start and end position are the same", () => {
                assert.strictEqual("plump".substring(2, 2), "");
            });
            
            it("returns a substring when either position is greater than the string's length and is set to string length", () => {
                assert.strictEqual("plump".substring(10, 2), "ump");
            });
            
            it("returns a substring when either position is less than 0 or NaN and is set to 0", () => {
                assert.strictEqual("plump".substring("cat"), "plump");
                assert.strictEqual("plump".substring(-4), "plump");
            });
        });
        // substring()
        describe("concat", () => {
           it("returns the empty string when called with two empty strings", () => {
               assert.strictEqual("".concat(""), "");
           });
           
           it("returns a new concatenated string when called with the empty string and another string", () => {
               assert.strictEqual("".concat("cat"), "cat");
           });
           it("returns a new concatenated string when called with two or more strings", () => {
               assert.strictEqual("cat".concat(" is plump!"), "cat is plump!");
               assert.strictEqual("cat".concat(" is ", "plump!"), "cat is plump!");
           });              
        });
        // concat()
    });
})

