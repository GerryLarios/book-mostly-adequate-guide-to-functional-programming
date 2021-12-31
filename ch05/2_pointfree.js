const { compose } = require('../appendix/appendix_a');
const {
  replace,
  toLowerCase,
  toUpperCase,
  intercalate,
  split,
  head,
  map
} = require('../appendix/appendix_c');

// Pointfree style means never having to say your data.
// It means functions that never mention the data upon which they operate.
// First class functions, currying, and composition all play well together to create this style.

// not pointfree because we mention the data: word
const _snakecase = word => word.toLowerCase().replace(/\s+/ig, '_');
console.log(_snakecase('HELLO WORLD'));

// pointfree
const snakecase = compose(replace(/\s+/ig, '_'), toLowerCase);
console.log(snakecase('HELLO WORLD'));

// not pointfree because we mention the data: name
const _initials = name => name.split(' ').map(compose(toUpperCase, head)).join('. ');
console.log(_initials('hunter stockton thompson'));

// pointfree
const initials = compose(intercalate('. '), map(compose(toUpperCase, head)), split(' '));
console.log(initials('hunter stockton thompson'));
