# unit-tests

In this section, we will learn about how to write small, focused tests that verify specific pieces of functionality of our code. To see more about unit tests, see [this video which could very well be good](https://www.youtube.com/watch?v=wEhu57pih5w). This [WordPress page](http://code.tutsplus.com/articles/the-beginners-guide-to-unit-testing-what-is-unit-testing--wp-25728) has a good intro to what unit tests are, but ignore all the stuff about WordPress itself haha.

We will be using [`tap`](http://www.node-tap.org/) and [`mocha`](https://mochajs.org/). Our tests will be running in Nodejs, since that's a lot easier than running in the browser. Tap is a family of different testing tools bound together by a single way of talking to each other (the "Test Anything Protocol"). We will be using [`tape`](http://npmjs.com/package/tape) as our test harness and [`tap-difflet`](https://www.npmjs.com/package/tap-difflet) to render the output in a semi-readable way.

To get started, run `npm install`. To run the tests, run `npm test`.

Work through the files in the following order:

1. `intro.tap.js`
1. `array.tap.js`
1. `string.mocha.js`

When you're done, update this file with a couple of paragraphs explaining the pros and cons of tape v. mocha. Which do you prefer? Why? If you had to give feedback to the people who developed those projects, what would you tell them?