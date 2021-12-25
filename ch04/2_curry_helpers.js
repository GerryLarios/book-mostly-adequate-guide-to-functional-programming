const { curry } = require('../appendix/appendix_a');

const match = curry((what, s) => s.match(what));

console.log(match(/r/g, 'hello world'));
