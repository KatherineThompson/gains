# Regular Expressions

![xkcd #208](https://imgs.xkcd.com/comics/regular_expressions.png)

In this section, we will be learning about regular expressions (often abbreviated RegEx). Regular Expressions are a way of determining if strings match a given pattern. This is useful for things like validation (eg "did the user really enter a valid phone number?") or destructing a string (eg "extract the area code from this phone number").

There's nothing that a RegEx can do that you can't do yourself with 10x or 100x more lines of JS. But it's worth it to learn!

> There are two ways of constructing a software design: One way is to make it so simple that there are obviously no deficiencies, and the other way is to make it so complicated that there are no obvious deficiencies.

-C.A.R. Hoare, 1980 ACM Turing Award Lecture

Start by reading through the resources listed below. (Read at least the begining of the Eloquent JS chapter.) Then, complete the exercises in `index.js`. Write unit tests for each problem in `test.js`. The testing framework has already been set up. Additionally, [`jshint`](http://npmjs.com/package/jshint) has been added to the test step. It will check your code for common errors. You can learn more about jshint on its [official website](http://jshint.com/about/) or the [docs](http://jshint.com/docs/).

## Getting started

Install dependencies:
```
$ npm install
```

Run the tests:
```
$ npm test
```

## Helpful resources
* [Eloquent JS on RegExp](http://eloquentjavascript.net/09_regexp.html)
* Chapter 7 of "Secrets of the JavaScript Ninja"
* [Regular Expressions on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
* [JS RegExp object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
* [Debuggex](https://www.debuggex.com/)
* [Rubular](http://rubular.com/) – This is what I used in college. It's based on Ruby regular expressions, which are similar but not precisely the same as JS regular expressions. (Every language has its own flavor.)

![xkcd](https://imgs.xkcd.com/comics/perl_problems.png)