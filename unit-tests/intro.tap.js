'use strict';

// To start with Tape, write this line.
// It imports the tape object.
// Don't worry about how this works yet;
// that will be covered later.
const tape = require('tape');

// To learn more about Tape, see https://www.npmjs.com/package/tape.

// Start by calling .test() with the name
// of the test suite, and a function that takes
// a single argument, t, and performs tests.
// We are using fat arrow syntax here, but that's
// just for convenience; the full `function(t) {}`
// syntax would be the same.
tape('intro', t => {

    // The t object is what we use to perform the actual testing.
    // We can keep nesting t.test() calls indefinitely to provide
    // organization to our code. Let's do that now.
    t.test('sample-tests', t => {
        // We call t.plan() to tell tape how many assertions we
        // expect to make. This means that if we have a bug where
        // a callback doesn't fire, then tape will be able to fail
        // the test, because we won't make the proper amount of
        // assertions. Here, we're saying that we'll make one assertion.
        // Note that this plan() only applies to the scope of the
        // t variable that we're calling it on. So in this case, that's
        // this function that we're currently in, but not the outer function.
        t.plan(1);

        t.equal(1 + 1, 2, '1 and 1 is 2.');
        // The format is t.equal(actualValue, expectedValue, message);
        // Unit testing is all about comparing actual and expected values.
        // This tests above is basically the least interesting one imaginable.
        // By convention, the message should be formatted as in "x is y", and not "x should be y".
        // Bonus points if you can tell me the grammatical name for what I'm trying to say here.
        //
        // Try breaking this test and seeing how the output changes when you run `npm test`.
    });

    // The general form of a unit test is the following three steps:
    //
    //  1. Prepare to do something
    //  2. Do that thing
    //  3. Assert on the result
    //
    // Let's see that in action.
    t.test('timing', t => {

        // In this test, we're testing the setTimeout functionality. setTimeout
        // invokes a function at some point in the future, and we want to make
        // sure that 1) the function is actually called and 2) it is called
        // after the correct amount of time.

        // First, we'll prepare. We'll do this by telling tape how many assertions
        // we want to run, and remembering what time we started the test. This will
        // be used later to ensure that setTimeout waited long enough before invoking
        // our callback.
        t.plan(1);
        const start = Date.now(),
            timeoutLength = 200;

        // Next, we'll take the action, which in this case is calling setTimeout.
        setTimeout(
            () =>
                // Finally, we assert on the result of that action.
                // If this t.equal() gets called at all, then we know that setTimeout
                // successfully called the function. If it does not get called,
                // then tape will throw an error, because we told it to expect one assertion
                // to occur.
                t.equal(
                    // And within the assertion itself, we check that the current time
                    // is far enough after the start time that we can conclude that setTimeout
                    // waited long enough before calling this function.
                    Date.now() - start >= timeoutLength,
                    true,
                    'The setTimeout callback was called sufficiently far in the future.'
                ),
            timeoutLength
        );
    });

    // Let's see one more example.
    t.test('string.join', t => {
        t.plan(1);

        // Setup
        const expected = 'a,b,c';

        // Action
        const actual = ['a', 'b', 'c'].join(',');

        // Verification
        t.equal(expected, actual, 'string.join combines a list into a single string.');
    });

    // A few more things about the specifics of the tape api:
    t.test('string.split', t => {
        t.plan(1);

        // Setup
        const expected = ['a', 'b', 'c'];

        // Action
        const actual = 'a,b,c'.split(',');

        // Verification
        t.deepEqual(expected, actual, 'string.split splits a list by a delimiter');
        // In this case, we needed to use t.deepEqual() instead of t.equal().
        // That's because we were comparing arrays. t.equal() does a comparison
        // using ===. t.deepEqual() actually looks at what's in the properties of
        // the items being compared. In the examples above, we've been comparing
        // numbers and strings. Those we can use === for:
        //
        //      1 === 1 // ==> true
        //
        // But of course, this does not work for arrays or objects:
        //
        //      [1] === [1] // ==> false
        //
        // So if we do want to consider [1] and [1] to be the same, then we use deepEqual.
    });

    t.test('not equal', t => {
        // We also have notEqual and notDeepEqual:
        t.plan(2);

        t.notEqual(1, 2, '1 and 2 are not the same');

        t.notDeepEqual([], [1], 'empty list and a list with a member are not the same');
    });

    // Your turn!
    t.test('string.trim', t => {
        // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim

        t.plan(1);
        t.equal(true, true, 'remove this assertion when you fill out this section');

        // Test that calling ''.trim returns the empty string

        // Test that calling .trim() on a string composed entirely of whitespace returns the empty string.

        // Test that calling .trim() on a string with whitespace at the beginning and end but not the middle
        // removes that whitespace.

        // Test that calling '   a   b    '.trim() removes the whitespace at the beginning and end
        // but preserves the whitespace between a and b.
    });
});