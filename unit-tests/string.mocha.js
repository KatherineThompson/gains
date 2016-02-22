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
            });

            it('returns false when the string does not start with the search pattern', () => {
                // TODO make an assertion
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

        // endsWith()

        // toUpperCase()

        // toLowerCase()

        // substring()

        // concat()
    });
})

