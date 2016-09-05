'use strict';

require("regenerator-runtime/runtime");

const bunyan = require('bunyan'),
    bunyanFormat = require('bunyan-format'),
    logger = bunyan({name: 'async-exercises', stream: bunyanFormat()}),
    _ = require('lodash'),
    async = require("async"),
    
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

// async function invokeAsync(step, retVal, timeoutMs) {
//     await invokePromise(step, retVal, timeoutMs); 
// }

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

// demo();

// Perform three actions sequentially using callbacks.
function threeSequentialStepsCallbacks() {
    invokeCb("one", () => {
        invokeCb("two", () => {
            invokeCb("three");
        });
    });
}
// threeSequentialStepsCallbacks();
// Perform three actions sequentially using promises.
function threeSequentialStepsPromises() {
    invokePromise("one")
        .then(() => invokePromise("two"))
        .then(() => invokePromise("three"));
}
// threeSequentialStepsPromises();

// Perform three actions sequentially using async / await.
async function threeSequentialStepsAwait() {
    await invokePromise("one");
    await invokePromise("two");
    await invokePromise("three");
}

// threeSequentialStepsAwait();

// Perform three async operations with callbacks, and then log out a message when they are all done.
function callbacksInParallel() {
    function isAllDone() {
        if (allDoneOne && allDoneTwo && allDoneThree) {
            logger.warn("all callbacks completed");
        }
    }
    let allDoneOne = false
    let allDoneTwo = false
    let allDoneThree = false

    invokeCb("one", () => {
        allDoneOne = true;
        isAllDone();
    });
    invokeCb("two", () => {
        allDoneTwo = true;
        isAllDone();
    });
    invokeCb("three", () => {
        allDoneThree = true;
        isAllDone();
    });
}
// callbacksInParallel();

// Now that you've created that abomination, try again using require('async').parallel: 
// http://caolan.github.io/async/docs.html#.parallel 
function callbacksInParallelAsyncHelper() {
    async.parallel([(cb) => invokeCb("one", cb), (cb) => invokeCb("two", cb), (cb) => invokeCb("three", cb)], () => logger.warn("all done"));
}

// callbacksInParallelAsyncHelper();

// Perform three async operations with promises, and then log out a message when they are all done.
function promisesInParallel() {
    invokePromise("one")
        .then(invokePromise("two"))
        .then(invokePromise("three"))
        .then(() => logger.warn("all done"));
}
// promisesInParallel();

// Do that again, but with a helper:
// Hint: see Promise.all – https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
function promisesInParallelNicer() {
    Promise.all([invokePromise("one"), invokePromise("two"), invokePromise("three")])
        .then(() => logger.warn("all done"));
}
// promisesInParallelNicer();

// Perform three async operations with async/await, and then log out a message when they are all done.
// Hint: still use Promise.all
async function asyncInParallel() {
    await Promise.all([invokePromise("one"), invokePromise("two"), invokePromise("three")]);
    logger.warn("all done");
}
// asyncInParallel();

// "Race" three callbacks – log out a message indicating which one returned first.
// Do not log messages for operations that return later.
function callbacksRace() {
    function isAllDone(stepNum) {
        if (!hasRun) {
            hasRun = true;
            logger.warn(`${stepNum} all done`);
        }
    }

    let hasRun = false;

    invokeCb("one", () => {
        isAllDone("one");
    });
    invokeCb("two", () => {
        isAllDone("two");
    });
    invokeCb("three", () => {
        isAllDone("three");
    });
}
// callbacksRace();
// Race three promises.
// Do not log messages for operations that return later.
function promisesRace() {
    function allDone(stepNum) {
        if (!hasRun) {
            logger.warn(`${stepNum} all done`);
            hasRun = true;
        }
    }

    let hasRun = false;

    invokePromise("one")
        .then(() => allDone("one"));
    invokePromise("two")
        .then(() => allDone("two"));
    invokePromise("three")
        .then(() => allDone("three"));
}

// promisesRace();

// Do that again, but with Promise.race:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race
function promisesRaceNicer() {
    Promise.race([invokePromise("one", "one"), invokePromise("two", "two"), invokePromise("three", "three")])
        .then(retVal => logger.warn(`${retVal} all done`));
}

// promisesRaceNicer();

// Race three async functions.
// Do not log messages for operations that return later.
async function asyncAwaitRace() {
    const firstDone = await Promise.race([invokePromise("one", "one"), invokePromise("two", "two"), invokePromise("three", "three")]);
    logger.warn(`${firstDone} all done`);
} 

// asyncAwaitRace();

// Execute three steps with callbacks. If any step returns an error, do not execute subsequent steps. Log out the error.
function callbacksErrors() {
    invokeCb("one", err => {
        if(err) {
            logger.error(err, "got an error");
        } else {
            invokeCb("two", err => {
                if (err) {
                    logger.error(err, "got an error");
                } else {
                    invokeCb("three", err => {
                        if (err) {
                            logger.error(err, "got an error");
                        }
                    });
                }
            });
        }
    });
}

// callbacksErrors();

// Execute three steps with promises. If any step returns an error, do not execute subsequent steps. Log out the error.
function promisesErrors() {
    invokePromise("one")
        .then(() => invokePromise("two"))
        .then(() => invokePromise("three"))
        .catch(err => logger.error(err, "got an error"));
}

// promisesErrors();

// Execute three steps with async/await. If any step returns an error, do not execute subsequent steps. Log out the error.
async function asyncErrors() {
    try {
        await invokePromise("one");
        await invokePromise("two");
        await invokePromise("three");
    } catch(err) {
        logger.error(err, "got an error");
    }
}

// asyncErrors();

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

// syncSum()

// Execute three async operations that return numbers, and sum all the resulting values.
function callbackSum() {
    let oneVal = null;
    let twoVal = null;
    let threeVal = null;

    function logSum() {
        if (oneVal !== null && twoVal !== null && threeVal !== null) {
            logger.info({sum: oneVal + twoVal + threeVal}, "summed three values")
        }
    }

    invokeCb("one", 32, (err, retVal) => {
        oneVal = retVal;
        logSum();
    });
    invokeCb("two", 2, (err, retVal) => {
        twoVal = retVal;
        logSum();
    });
    invokeCb("three", 6, (err, retVal) => {
        threeVal = retVal;
        logSum();
    });
}

// callbackSum();

// Execute three async operations that return numbers, and sum all the resulting values.
function promisesSum() {
    Promise.all([invokePromise("one", 13), invokePromise("two", 87), invokePromise("three", 1)])
        .then(retVals => logger.info({sum: retVals[0] + retVals[1] + retVals[2]}, "summed three values"))
        .catch(err => logger.error(err, "alarm, alarm, alarm"));
}

// promisesSum();

// Execute three async operations that return numbers, and sum all the resulting values.
async function asyncAwaitSum() {
    const sums = await Promise.all([invokePromise("one", 13), invokePromise("two", 87), invokePromise("three", 1)]);
    logger.info({sum: sums[0] + sums[1] + sums[2]}, "summed three values");
}

// asyncAwaitSum();

// Implement Promise.all. Take in a list of promises, and return a single promise that 
// resolves with a list of values corresponding to the input promises. If any input promise
// rejects, reject the return promise as well.
function all(promises) {
    return new Promise((resolve, reject) => {
        let promisesCompleted = 0;
        const retVals = [];
        promises.forEach((promise, index) => 
            promise
                .then(retVal => {
                    retVals[index] = retVal;
                    promisesCompleted++;
                    if (promisesCompleted === promises.length) {
                        resolve(retVals);
                    }
                })
                .catch(reject)
        );
    });
}

// Example usage:
function exampleAllUsage() {
    all([
        invokePromise('first parallel step', 'first return value', 2000),
        invokePromise('second parallel step', 'second return value'),
        invokePromise('third parallel step', 'third return value'),
    ]).then(results => {
        // results is ['first return value', 'second return value', 'third return value']
        logger.info({results}, 'done');
    }).catch(err => {
        logger.error(err, "got an error")
        // err is the error for whatever step failed
    });
}

// exampleAllUsage();
// Implement Promise.race. Take in a list of promises, and return a promise when the first input promise returns.
// The returned promise should resolve with the return value of the input promise that returned first.
// If an input promise errors out before any input promise has finished, reject the return promise with that error. 
function race(promises) {
    return new Promise((resolve, reject) => {
        promises.forEach(promise => {
            promise
                .then(resolve)
                .catch(reject);
        });
    });
}

// Sample usage:
function raceExample() {
    race([
        invokePromise('slow', 'slow', 1000),
        invokePromise('fast', 'fast', 0)
    ]).then(result => {
        // result is the result of the promise that finished first
        logger.info({result}, 'done');
    })
    .catch(err => {
        // err is the error of whatever promise failed
        logger.error(err, "got an error")
    });
}

raceExample();
