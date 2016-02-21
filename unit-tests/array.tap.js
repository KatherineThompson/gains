'use strict';

const tape = require('tape');

// In this file, we will test that the array prototype is working correctly.
// For each function listed in the comments, create a new subtest with t.test().
tape('arrays', t => {

    t.plan(1);
    t.equal(true, true, 'remove these two lines before you start working. They are just so `npm test` does not fail');

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

    // push()
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push

        // Verify that pushing an element onto an empty array adds that element to the array.

        // Verify that pushing an element onto an array that already has elements adds that element to the array.

        // Verify that after pushing `undefined` onto an empty array, that array's length is 1.

    // reverse()
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse

        // Verify that calling reverse() on an empty array does not change that array.

        // Verify that calling reverse() on an array with multiple elements reverses it.
        // Ensure that the array itself is modified – eg if you call arr.reverse(), then arr
        // is now reversed.

    // shift()
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift

        // Verify that calling shift() on an empty array returns undefined

        // Verify that calling shift() on an array with members returns the first member of that array

        // Verify that calling shift() on an array with members removes the first member of that array

    // Hopefully you can see the pattern of the test cases. The general process is to think about
    // the different categories of input. For arrays, that often means empty arrays, big arrays,
    // small arrays, etc. Then we also add in the other ways that we can change the input. For example,
    // the slice() function takes two arguments, and we would want to check different values for
    // those arguments as well. All together, we want to exercise the full range of options for how
    // to use a function, and verify that it always behaves as we expect.

    // Now it's your turn to come up with good test cases. I'll just provide the names of the
    // methods. Look them up in MDN!

    // map()

    // filter()

    // reduce()

    // reduceRight()

    // some()

    // fill()

    // sort()

    // findIndex()

});