const { curry, compose } = require('../appendix/appendix_a');
// `fn1` and `fn2` are functions and `x` is the value being "piped" through them.
const friendlyCompose = (fn1, fn2) => args => fn1( fn2( args ) );

const toUpperCase = str => str.toUpperCase()
const exclaim = str => `${str}!`

const shout = friendlyCompose(exclaim, toUpperCase);
console.log(shout('hello, world'));

// The `fn2` will run before the `fn1`, first `toUpperCase`, then `exlaim` because fn1( fn2( args ) );
// creating a right to left flow of data.
// This is much more readable than nesting a bunch of function calls. Without compose, the above would read:

const _shout = str => exclaim(toUpperCase(str));
console.log(_shout('hello, world'));

const reduce = curry((fn, init, xs) => xs.reduce(fn, init));
const reverse = reduce((acc, x) => [x, ...acc], []);
const head = x => x[0];
const last = friendlyCompose(head, reverse);
const array = ['jumpkick', 'roundhouse', 'uppercut']
// The sequence of functions in the composition should be apparent here.
console.log(last(array));

// We could define a left to right version, however,
// we mirror the mathematical version much more closely as it stands. Composition is straight from the math books.

// Composition is associative, meaning it doesn't matter how you group two of them.
console.log(
  friendlyCompose(toUpperCase, friendlyCompose(head, reverse))(array),
  friendlyCompose(friendlyCompose(toUpperCase, head), reverse)(array)
);

// Since it doesn't matter how we group our calls to compose, the result will be the same.
const lastUpper = compose(toUpperCase, head, reverse);
const loudLastUpper = compose(exclaim, toUpperCase, head, reverse);

console.log(lastUpper(array));
console.log(loudLastUpper(array));

// Any group of functions can be extracted and bundled together in their very own composition.
const _loudLastUpper = compose(exclaim, toUpperCase, head, reverse);
console.log(_loudLastUpper(array));
// -- or ---------------------------------------------------------------

const _last = compose(head, reverse);
const __loudLastUpper = compose(exclaim, toUpperCase, _last);
console.log(__loudLastUpper(array));

// -- or ---------------------------------------------------------------

const __last = compose(head, reverse);
const angry = compose(exclaim, toUpperCase);
const ___loudLastUpper = compose(angry, __last);
console.log(___loudLastUpper(array));

// more variations...
