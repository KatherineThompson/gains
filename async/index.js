'use strict';

require("regenerator-runtime/runtime");

const bunyan = require('bunyan'),
    bunyanFormat = require('bunyan-format'),
    logger = bunyan({name: 'async-exercises', stream: bunyanFormat()}),
    _ = require('lodash'),
    
    timeoutMs = 700,
    errorSteps = [];

function getErr(step) {
    return _.includes(errorSteps, step) ? new Error(`Step ${step} failed.`) : undefined;
}

function invokeCb(step, retVal, cb) {
    if (!cb) {
        cb = retVal;
        retVal = undefined;
    }

    logger.info({step}, 'Starting');
    setTimeout(() => {
        logger.info({step}, 'Ending');
        if (cb) {
            cb(getErr(step), retVal);
        }
    }, timeoutMs * (Math.random() + .5));
}

function invokePromise(step, retVal, rawTimeoutMs) {
    logger.info({step}, 'Starting');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            logger.info({step}, 'Ending');
            const err = getErr(step);
            if (err) {
                return reject(err);
            }
            return resolve(retVal);
        }, rawTimeoutMs || timeoutMs);
    })
}

async function invokeAsync(step, retVal, timeoutMs) {
    await invokePromise(step, retVal, timeoutMs); 
}

async function demo() {
    // Sample 1: Chaining async operations with callbacks.
    invokeCb('sample', err => {
        if (err) {
            logger.error({errMessage: err.message}, 'Got error');
        } else {
            invokeCb('second sample');
        }
    });

    // Sample 2: Chaining async operations with promises.
    invokePromise('first promise')
        .then(() => invokePromise('second promise'))
        .catch(err => logger.error({errMessage: err.message}, 'Got error'));

    // Sample 3: Chaining async operations with async / await
    try {
        await invokeAsync('first await');
        await invokeAsync('second await');
    } catch (e) {
        logger.error({errMessage: e.message}, 'Got error');
    }
}

demo();

// Perform three actions sequentially using callbacks.
function threeSequentialStepsCallbacks() {

}

// Perform three actions sequentially using promises.
function threeSequentialStepsPromises() {

}

// Perform three actions sequentially using async / await.
async function threeSequentialStepsAwait() {

}

// Perform three async operations with callbacks, and then log out a message when they are all done.
function callbacksInParallel() {

}

// Now that you've created that abomination, try again using require('async').parallel: 
// http://caolan.github.io/async/docs.html#.parallel 
function callbacksInParallelAsyncHelper() {

}

// Perform three async operations with promises, and then log out a message when they are all done.
function promisesInParallel() {

}

// Do that again, but with a helper:
// Hint: see Promise.all – https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
function promisesInParallelNicer() {

}

// Perform three async operations with async/await, and then log out a message when they are all done.
// Hint: still use Promise.all
function asyncInParallel() {

}

// "Race" three callbacks – log out a message indicating which one returned first.
// Do not log messages for operations that return later.
function callbacksRace() {

}

// Race three promises.
// Do not log messages for operations that return later.
function promisesRace() {

}

// Do that again, but with Promise.race:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race
function promisesRaceNicer() {

}

// Race three async functions.
// Do not log messages for operations that return later.
function asyncAwaitRace() {

} 

// Execute three steps with callbacks. If any step returns an error, do not execute subsequent steps. Log out the error.
function callbacksErrors() {

}

// Execute three steps with promises. If any step returns an error, do not execute subsequent steps. Log out the error.
function promisesErrors() {

}

// Execute three steps with async/await. If any step returns an error, do not execute subsequent steps. Log out the error.
function asyncErrors() {

}

// Execute three async operations that return numbers, and sum all the resulting values.
// Here's a sync example:
function syncSum() {
    function syncOperation(retVal) {
        return retVal + 10;
    }

    const firstResult = syncOperation(1),
        secondResult = syncOperation(2),
        thirdResult = syncOperation(3);

    logger.info({sum: firstResult + secondResult + thirdResult}, 'Summed three values');
}

// Execute three async operations that return numbers, and sum all the resulting values.
function callbackSum() {
    
}

// Execute three async operations that return numbers, and sum all the resulting values.
function promisesSum() {
    
}

// Execute three async operations that return numbers, and sum all the resulting values.
function asyncAwaitSum() {
    
}

// Implement Promise.all. Take in a list of promises, and return a single promises that 
// resolves with a list of values corresponding to the input promises. If any input promise
// rejects, reject the return promise as well.
function all(promises) {

}

// Example usage:
function exampleAllUsage() {
    all([
        invokePromise('first parallel step', 'first return value'),
        invokePromise('second parallel step', 'second return value'),
        invokePromise('third parallel step', 'third return value'),
    ]).then(results => {
        // results is ['first return value', 'second return value', 'third return value']
        logger.info({results}, 'done');
    }).catch(err => {
        // err is the error for whatever step failed
    });
}

// Implement Promise.race. Take in a list of promises, and return a promise when the first input promise returns.
// The returned promise should resolve with the return value of the input promise that returned first.
// If an input promise errors out before any input promise has finished, reject the return promise with that error. 
function race(promises) {

}

// Sample usage:
function raceExample() {
    race([
        invokePromise('slow', 'slow', 1000),
        invokePromise('fast', 'fast', 0)
    ]).then(result => {
        // result is the result of the promise that finished first
    })
    .catch(err => {
        // err is the error of whatever promise failed
    });
}
