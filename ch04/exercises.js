const { curry } = require('../appendix/appendix_a');

// Refactor to remove all arguments by partially applying the function.
// const words = str => split(' ', str);
const split = curry(
  (separator, str) => str.split(separator)
);
const words = split(' ');
console.log(words('HELLO WORLD'));

// Refactor to remove all arguments by partially applying the functions.
// const filterQs = xs => filter(x => match(/q/i, x), xs);
const match = curry(
  (regex, str) => regex.test(str)
);
const filter = curry(
  (predicate, xs) => xs.filter(predicate)
);

const filterQs = filter(match(/q/i));

console.log(filterQs(['quick', 'camels', 'quarry', 'over', 'quails']));

// Refactor `max` to not reference any arguments using the helper function `keepHighest`.
// const max = xs => reduce((acc, x) => (x >= acc ? x : acc), -Infinity, xs);
const reduce = curry(
  (callbackfn, init, xs) => xs.reduce(callbackfn, init)
);
const keepHighest = (acc, x) => (x >= acc ? x : acc);
const max = reduce(keepHighest, -Infinity);

console.log(max([323, 523, 554, 123, 5234]))
