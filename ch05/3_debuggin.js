const { compose } = require('../appendix/appendix_a');
const {
  intercalate,
  toLowerCase,
  toUpperCase,
  replace,
  reverse,
  split,
  trace,
  map
} = require('../appendix/appendix_c');

// A common mistake is to compose something like map, a function of two arguments,
// without first partially applying it.

const latin = compose(map(toUpperCase), reverse);
console.log(latin(['frog', 'eyes']))

// If you are having trouble debugging a composition,
// we can use this helpful, but impure trace function to see what's going on.
// The `trace` function allows us to view the data at a certain point for debugging purposes.

const dasherize = compose(
  intercalate('-'),
  map(toLowerCase),
  trace('after split'),
  split(' '),
  replace(/\s{2,}/ig, ' '),
);

console.log(dasherize('The world is a vampire'));
