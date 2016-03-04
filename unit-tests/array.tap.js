'use strict';

const tape = require('tape');

// In this file, we will test that the array prototype is working correctly.
// For each function listed in the comments, create a new subtest with t.test().
tape('arrays', t => {

    // t.plan(1);
    // t.equal(true, true, 'remove these two lines before you start working. They are just so `npm test` does not fail');

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
    t.test("push", t => {
        t.plan(3);
        
        const emptyArray = [];
        const catArray = ["cat"];
        emptyArray.push("cat");
        t.deepEqual(emptyArray, catArray, "pushing an element onto an empty array adds that element to the array");
        
        emptyArray.push("plump");
        t.deepEqual(emptyArray, ["cat", "plump"], "pushing an element onto an array that already has elements adds that element to the array");
        
        const actual = [];
        actual.push(undefined);
        t.equal(actual.length, 1, "after pushing `undefined` onto an empty array, that array's length is 1");
        
    });
    // push()
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push

        // Verify that pushing an element onto an empty array adds that element to the array.

        // Verify that pushing an element onto an array that already has elements adds that element to the array.

        // Verify that after pushing `undefined` onto an empty array, that array's length is 1.
    t.test("reverse", t => {
        t.plan(2);
        
        const actual = [];
        actual.reverse();
        t.deepEqual(actual, [], "calling reverse() on an empty array does not change that array");
        
        const actual2 = ["cat", "plump", "potato", 5, 90];
        actual2.reverse();
        t.deepEqual(actual2, [90, 5, "potato", "plump", "cat"], "calling reverse() on an array with multiple elements reverses it");
    });
    // reverse()
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse

        // Verify that calling reverse() on an empty array does not change that array.

        // Verify that calling reverse() on an array with multiple elements reverses it.
        // Ensure that the array itself is modified – eg if you call arr.reverse(), then arr
        // is now reversed.
    t.test("shift", t => {
        t.plan(3);
        
        const actual = [];
        t.equal(actual.shift(), undefined, "calling shift() on an empty array returns undefined");
        
        const list = [2, "plump", [2, 3, 4]];
        const firstMember = list.shift();
        t.equal(firstMember, 2, "calling shift() on an array with members returns the first member of that array");
    
        t.deepEqual(list, ["plump", [2, 3, 4]], "calling shift() on an array with members removes the first member of that array");
    });
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
    t.test("map", t => {
        t.plan(4);

        const actual = [];
        t.deepEqual(actual.map(Math.floor), [], "returns an empty array when called on an empty array");
        
        const nums = [12.2, 4.78, 0.2834, 78];
        t.deepEqual(nums.map(Math.floor), [12, 4, 0, 78], "applies a function to each element of the array");
        
        function indexChecker(currentValue, index) {
            return index;
        }
        t.deepEqual(nums.map(indexChecker), [0, 1, 2, 3], "index is correctly passed to callback");
        
        function getArray(currentValue, index, array) {
            return array;
        }
        t.deepEqual(nums.map(getArray), [[12.2, 4.78, 0.2834, 78], [12.2, 4.78, 0.2834, 78], [12.2, 4.78, 0.2834, 78], [12.2, 4.78, 0.2834, 78]], "array is correctly passed to callback");
    });
    // map()
    
    t.test("filter", t=> {
        t.plan(2);
        
        const emptyArray = [];
        t.deepEqual(emptyArray.filter(elem => elem.includes("cat")), [], "returns an empty array when called on an empty array");
        
        const actual = ["i love cats", "cat", "evil", "plump"];
        const filtered = actual.filter(elem => elem.includes("cat"));
        t.deepEqual(filtered, ["i love cats", "cat"], "returns a new array with elements that fulfill the condition");
    });
    // filter()

    t.test("reduce", t => {
        t.plan(2);
        
        const emptyArray = [];
        t.deepEqual(emptyArray.reduce((sumSoFar, num) => sumSoFar + num, 0), 0, "returns 0 when called with an empty array");
        
        const actual = [3, 4, 10, 0];
        t.deepEqual(actual.reduce((sumSoFar, num) => sumSoFar + num, 0), 17, "returns the product of a function called on every member of an array");
    });
    // reduce()
    
    
    t.test("reduceRight", t => {
       t.plan(2);
       
       const emptyArray = [];
       t.deepEqual(emptyArray.reduceRight((sumSoFar, num) => sumSoFar + num, 0), 0, "returns 0 when called with an empty array"); 
       
       const nums = [1, 6, 13, 23];
       const actual = reduceSetup(nums);
       function reduceSetup(array) {
           const numsMinusFirst = array.slice(0, -1);
           return numsMinusFirst.reduceRight((subSoFar, num) => subSoFar - num, array[array.length - 1]);
       }
       
       t.deepEqual(actual, 3, "returns the result of a function called on every member of an array");
    });
    // reduceRight()
    
    t.test("some", t => {
        t.plan(2);
        
        const emptyArray = [];
        t.equal(emptyArray.some(elem => elem === 2), false, "returns false when called with the empty array");
        
        const actual = [23, 5, "cat", 893, 2];
        t.equal(actual.some(elem => elem === 2), true, "returns a boolean denoting whether some element meets the specified condition");
    });
    // some()

    t.test("fill", t => {
       t.plan(2);
       
       const emptyArray = [];
       t.deepEquals(emptyArray.fill("cat"), [], "returns empty array when called on empty array");
       
       const actual = [2, 3, 8, 90, "potato", "I'm so random!"];
       t.deepEquals(actual.fill("cat", 0, 2), ["cat", "cat", 8, 90, "potato", "I'm so random!"], "fills an array with the specified value at the specified location"); 
    });
    // fill()
    
    t.test("sort", t => {
        t.plan(2);
        
        const emptyArray = [];
        t.deepEquals(emptyArray.sort(), [], "returns an empty array when called on an empty array");
        
        const actual = [8, 90, 2, 3, 7, 1, 20];
        t.deepEqual(actual.sort(), [1, 2, 20, 3, 7, 8, 90], "sorts an array");
    });
    // sort()

    t.test("findIndex", t => {
        t.plan(2);
        
        const emptyArray = [];
        t.equal(emptyArray.findIndex(elem => elem === 2), -1, "returns -1 when called on an empty array");
        
        const actual = [1, 2, 3, 4, 5, 6];
        t.equal(actual.findIndex(elem => elem % 2 === 0), 1, "returns the index of the first number to match the condition");
    });
    // findIndex()

});