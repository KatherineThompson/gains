'use strict'

let ref = {};
let ref2 = ref;

ref2.foo = 'bar';
ref.odp = 'phil';

console.log(ref);
console.log({});

let val = 3;
let val2 = val;

val2 = 4;

console.log(val);
console.log(val2);

console.log([] === []);
console.log(ref === {foo: 'bar', odp: 'phil'});