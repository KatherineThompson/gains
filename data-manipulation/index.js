'use strict';

// Everything we do with a map can also be done with a for loop,
// but it's more complicated. It's harder to read, and there are
// more places to make a typo.
function crappierVersionOfAddOneToEachNumber(nums) {
    const numsWithOneAdded = [];
    for (let i = 0; i < nums.length; i++) {
        numsWithOneAdded.push(nums[i] + 1);
    }
    return numsWithOneAdded;
}

// Maps make things cleaner. In the function above,
// the one interesting part is that you're adding 1 to
// each element. With a map function, we can extract that
// out.
function addOneToEachNumber(nums) {
    return nums.map(num => num + 1);
    // C'mon, tell me you don't like that better! :)
}

function fatArrowDemo(nums) {
    // Check out this new fat arrow syntax.
    // You don't even need a return statement!
    // The return value of the function is just the
    // expression on the right hand side of the fat arrow.
    nums.map(num => num + 1);

    // That's exactly the same as:
    nums.map(function(num) {
        return num + 1;
    });

    // If you want to have a fat arrow function with
    // multiple statements, add curly brackets:
    nums.map(num => {
        console.log(`adding 1 to ${num}`);
        return num + 1;
    });

    // And if you want multiple arguments, you wrap them in
    // parens:
    nums.map((num, index) => {
        console.log(`adding 1 to ${num} (at index ${index})`);
        return num + 1;
    });

    // You also use parens when you have no args:
    nums.map(() => console.log('this is a totally useless method call'));
}

// Ok, now it's your turn. You can use a for loop if you need to wrap your
// head around what the code needs to do, but please make everything a map
// before considering it done. forEach gets you partial credit! :)

// In all these functions, modifying the input data is considered an error.

/**
 * Return a new list with each number one less than the input list.
 *
 * @param nums - a list of numbers from which to subtract one from each element.
 * @return a list of numbers where each number is one less than the number at the
 *         corresponding index in the input list.
 */
function subtractOneFromEachNumber(nums) {
    return nums.map(num => num - 1);
}

/**
 * Return a new list with each string wrapped in the wrapper string.
 *
 * @param strs - a list of strings to wrap
 * @param wrapper - a string to wrap around each member of strs
 * @return a list where each string begins and ends with the wrapper.
 * @example
 *
 *      wrapStrings(["hi", "there"], "cat") // ==> ["cathicat", "cattherecat"]
 */
function wrapStrings(strs, wrapper) {
    return strs.map(str => wrapper + str + wrapper);
}

/**
 * Return a list of lengths for a list of strings.
 *
 * @param strs a list of strings
 * @example
 *
 *      getStringLengths(["abc", "da"]) // ==> [2, 3];
 */
function getStringLengths(strs) {
    // return strs.map(str => str.length);
    return pick(strs, "length");
}

/**
 * Return a list of property values from a list of objects given a key.
 *
 * @param objs - objects from which to get property values
 * @param key - the key to look up in each object
 * @return a list of values for the given key
 * @example
 *
 *      pick([{name: "Liam", age: 4}, {name: "Potato", age: 13}], "age") // ==> [4, 13]
 */
function pick(objs, key) {
    return objs.map(obj => obj[key]);
}

// Extra credit: can you go back and rewrite getStringLengths to use pick()?

/**
 * Return a list of key-value pairs from a list of objects given a key.
 *
 * @param objs - objects from which to get key-value pairs
 * @param key - the key to look up in each object
 * @return a list of key-value pairs for the given key from the objects
 * @example
 *
 *      pluck([{name: "Liam", age: 4}, {name: "Potato", age: 13}], "age") // ==> [{age: 4}, {age: 13}]
 */
function pluck(objs, key) {
    // return objs.map(function(obj) {
    //     return {key: obj[key]};
        
    //     const result = {};
    //     result[key] = obj[key];
        
    //     const variable = 'foo';
        
    //     result.constant
    //     result[variable]
        
    //     result.constant = 2
    //     result[variable] = Math.random() * 2 * 2
        
    //     let obj2 = {constant: 2};
    //     let otherObj = {[variable]: 2};
        
        
    //     return result;
    // });
    
    // const f = obj => ({key: obj.value});
    
    // const func = obj => {
    //     console.log("Tupelo");
    //     return obj.val;
    // };
    // const func2 = function(obj) {
    //     console.log('x');
    //     return obj.val;
    // };
    // function func3(obj) {
    //     return obj.val;
    // }
    
    return objs.map(obj => ({[key]: obj[key]}));
    
}

/**
 * Return a list of user data objects for the given list of user names.
 *
 * @param allUsers - a list of user data objects. Each user name will only appear once in the list.
 * @param userNames - a list of names to search for
 * @return a list of user data objects based on userNames
 * @example
 *
 *      const allUsers = [
 *          {name: "Liam", age: 4},
 *          {name: "Potato", age: 13},
 *          {name: "Paul", age: 32},
 *          {name: "Sally Ann Perkins", age: 31},
 *      ];
 *
 *      lookupUsers(allUsers, ["Liam", "Paul"]) // ==> [{name: "Liam", age: 4}, {name: "Paul", age: 32}]
 */
function lookupUsers(allUsers, userNames) {
    const userObjects = userNames.map(name => allUsers.find(user => user.name === name)
        // {let userObj;
        // allUsers.forEach(function(user) {
        //     if (user.name === name) {
        //         userObj = user;
        //     }
        // });
        // return userObj;}
    );
    return userObjects.filter(userObj => userObj !== undefined);
    // userObjects.forEach(function(element, index) {
    //     if (element === undefined) {
    //         userObjects.splice(index, 1);
    //     }
    // });
    // return userObjects;
}

function getFirstCatString(catStrings) {
    return catStrings.find(str => str.includes("cat"))
}

/**
 * Return a list of lists, each of which contains the first elemCount elements of the list at the same
 * index in the input lists.
 *
 * @param lists - a list of lists to pull elements from
 * @param elemCount - the number of elements to take
 * @return a list of lists, where each list has elemCount elements.
 * @example
 *
 *      getFirstElements([[5, 4, 3], [9, 8, 7], 2]) // ==> [[5, 4], [9, 8]]
 */
function getFirstElements(lists, elemCount) {
    if (elemCount > 0) {      
        return lists.map(list => list.filter((elem, index) => index < elemCount));
    } else {
        return [];
    }
    // if (elemCount > 0) {
    //     return lists.map(list => {
    //         const currentCountedList = [];
    //         list.forEach(function(element, index) {
    //             if (index < elemCount) {
    //                 currentCountedList.push(element);
    //             }
    //         })
    //         return currentCountedList;
    //     });
    // } else {
    //     return [];
    // }
}

// You can also filter. Filtering is when you create a new list
// with some of the members removed, based on criteria you provide. For example:
function removeLongStrings(strs) {
    // Return a new list without any strings longer than 10 chars.
    // If the function you pass to filter returns true, then that element
    // makes it in to the result list. If the function you pass returns
    // false, then it's omitted. You will sometimes see this function
    // referred to as a predicate.
    return strs.filter(str => str.length <= 10);
}

// When you do a filter, the order of elements is not changed. It's just
// whether each element appears.

// Just in case it makes you feel better: ^_^
function crappierRemoveLongStrings(strs) {
    const shortStrings = [];
    for (let i = 0; i < strs.length; i++) {
        if (strs[i].length <= 10) {
            shortStrings.push(strs[i]);
        }
    }
    return shortStrings;
}

function completelyPointlessFilter(list) {
    // Return a new list with all the same members as the old list.
    return list.filter(() => true);
}

function returnEmptyList(list) {
    // This one is also kind of silly.
    // Return a new list with nothing in it.
    return list.filter(() => false);
}

function randomList(list) {
    // I'm not sure why you'd ever want this.
    // But it will produce a new list, where each
    // element has a 50% chance of appearing.
    return list.filter(() => Math.random() > .5);
}

// Now it's your turn!

/**
 * Return all numbers in nums that are odd.
 *
 * @param nums - a list of numbers to filter
 * @return a list of numbers in nums that are odd.
 */
function getOddNumbers(nums) {
    return nums.filter(num => num % 2 !== 0);
}

/**
 * Return all strings that contain the substring "cat".
 *
 * @param strings - a list of strings
 * @return a list of strings, all of which contain the substring "cat".
 */
function getStringsWithCat(strings) {
    return strings.filter(str => str.includes("cat"));
}

/**
 * Return all lists of numbers whose members sum to zero.
 *
 * @param numberLists - a list of list of numbers
 * @return a list of list of numbers, all of whose members sum to zero.
 * @example
 *
 *      getNumberListsSummingToZero([[1, 2, 3], [1, -1]]) // ==> [[-1, 1]]
 *
 */
function getNumberListsSummingToZero(numLists) {
    return numLists.filter(list => 
        // let sum = 0;
        list.reduce((sumSoFar, num) => sumSoFar + num, 0) === 0
        // list.forEach(function(num) {
        //     sum += num;
        // });
        // return sum === 0;
    );
}

/**
 * Return all objects that have at least three keys.
 *
 * @param objs - a list of objects
 * @return a list of objects, all of which have at least three keys.
 * @example
 *
 *      getObjectsWithAtLeastThreeKeys([{}, {a: 1, b: 2, c: 3}, {d: 4}]) // ==> [{a: 1, b: 2, c: 3}]
 */
function getObjectsWithAtLeastThreeKeys(objs) {
    return objs.filter(obj => Object.keys(obj).length >= 3);
}

// Now that we're feeling good about filtering and mapping, let's look at a more fundamental
// operation: reducing. The word "reduce" comes from the fact that this operation will
// boil the collection down to a single element.
// Reducing is when you take a function and apply it successively to each
// pair of members of the list.
//
// For example, leaving JS aside for a minute, imagine the following
// list of numbers:
//
//      [2, 3, 4]
//
//
//
// Let's reduce with the + operator. That's equal to:
//
//      2 + 3 + 4
//
// Or we can reduce with the * operator. Then we get:
//
//      2 * 3 * 4
//
// In JS, that looks like:
function sum(nums) {
    return nums.reduce((sumSoFar, num) => sumSoFar + num, 0);
}

function product(nums) {
    return nums.reduce((productSoFar, num) => productSoFar * num, 0);
}

// In JS, we have the following parts of the call:
//
//      list.reduce(reducerFunction, initialValue);
//
// The reducer function takes an accumulator and the next value in the list. For instance, in the sum
// function, the reducer function would be called with the following arguments:
//
//      reducerFunction(0, 2)
//      reducerFunction(2, 3)
//      reducerFunction(5, 4)
//
// You can see that each time, the first argument passed to the reducerFunction is result of calling the
// reducerFunction last time, or the initial value if this is the first step.

// Your turn!

/**
 * Return the exponentiation of all the numbers in the list.
 *
 * @param nums – a list of numbers
 * @return all those numbers exponentiated together
 * @example
 *
 *      powerAll([2, 3, 4]) // ==> (2 ^ 3) ^ 4 ==> 4096
 */
function powerAll(nums) {
    if (nums.length < 1) {
        return 0;
    } else {
        const numsMinusFirst = nums.slice(1);
        return numsMinusFirst.reduce((exponentiationSoFar, num) => Math.pow(exponentiationSoFar, num), nums[0]);
    }
}

/**
 * Concatenate all the strings in a list together into a single string.
 *
 * @param strs - a list of strings to concatenate
 * @return a single string
 * @example
 *
 *      concatAll(['a', 'bbbb', 'cde']) // ==> 'abbbcde'
 */
function concatAll(strs) {
    return strs.reduce((strSoFar, char) => strSoFar + char, "");
}

/**
 * Flatten a list of lists into a single list.
 *
 * @param lists – a list of lists
 * @return a single list
 * @example
 *
 *      flatten([[], [1, 2], [3], [4, 5]]) // ==> [1, 2, 3, 4, 5]
 */
function flatten(lists) {
    return lists.reduce((listSoFar, list) => listSoFar.concat(list), []);
}

/**
 * Get the total length of all strings in a list.
 *
 * @param strs – a list of strings to measure
 * @return the cumulative length of all strings
 * @example
 *
 *      getTotalLength(["ab", "", "cde"]) // ==> 5
 */
function getTotalLength(strs) {
    return strs.reduce((totalSoFar, str) => totalSoFar += str.length, 0);
}

// Now we get meta! :)
// Basically any operation on collections of data can be implemented with a reduce.

/**
 * Return a new list with a function applied to each member of the input list.
 *
 * @param list – a list of elements to apply a function to
 * @param fn – a function to apply to each member of the list
 * @return A new list that is the old list with `fn` applied to each member
 * @example
 *
 *      map([1, 2, 3], x => x + 1) // ==> [2, 3, 4]
 */
function map(list, fn) {
    // Use reduce to implement this.
    return list.reduce((listSoFar, num) => listSoFar.concat(fn(num)), []);
}

/**
 * Return a new list filtered by the predicate.
 *
 * @param list – a list of elements to filter
 * @param predicate – a boolean which will return truthy or falsey
 * @return a list of elements for which the predicate returned truthy
 * @example
 *
 *      filter([1, 2, 3], x => x < 3) // ==> [1, 2]
 */
function filter(list, predicate) {
    // Use reduce to implement this
    return list.reduce((listSoFar, elem) => {
        if (predicate(elem)) {
            return listSoFar.concat(elem);
        } else {
            return listSoFar;
        }
    }, []);
}

// It's turtles all the way down.

/**
 * Return a single value, created by applying fn to each value of the array and an accumulator.
 *
 * @param list – a list of elements to reduce to a single value
 * @param reducerFn – a function that will be called with (accumulator, nextValue) and returns a single value
 * @param initialValue – the accumulator passed to reducerFn on the first iteration
 * @return a single value
 * @example
 *
 *      reduce([1, 2, 3], (sum, num) => sum + num, 0) // ==> 6
 */
function reduce(list, reducerFn, initialValue) {
    // Use forEach to solve this one.
    let reduced = initialValue;
    list.forEach(function(elem) {
        reduced = reducerFn(reduced, elem);
    });
    if (reduced === undefined) {
        return [];
    }
    return reduced;
}

// Now solve it recursively!
function reduceRecursive(list, reducerFn, initialValue) {
    if (!list.length) {
        return initialValue;
    } else {
        const firstElem = list[0];
        const newInitialValue = reducerFn(initialValue, firstElem);
        const newList = list.slice(1);
        return reduceRecursive(newList, reducerFn, newInitialValue);
    }
}

// We will export all these functions so the tests can access them.
// Don't worry about how all this works for now.
module.exports = {
    subtractOneFromEachNumber,
    wrapStrings,
    getStringLengths,
    pick,
    pluck,
    lookupUsers,
    getFirstElements,
    getOddNumbers,
    getStringsWithCat,
    getNumberListsSummingToZero,
    getObjectsWithAtLeastThreeKeys,
    powerAll,
    concatAll,
    flatten,
    getTotalLength,
    map,
    filter,
    reduce,
    reduceRecursive
};