const { curry } = require('../appendix/appendix_a');

// The concept is simple: You can call a function with fewer arguments than it expects.
// It returns a function that takes the remaining arguments.

const match = curry((what, s) => s.match(what));
const replace = curry((what, replacement, s) => s.replace(what, replacement));
const filter = curry((f, xs) => xs.filter(f));

const hasLetterR = match(/r/g);
console.log('CHECKING HAS LETTER R');
console.log(match(/r/g)('rOCK AND ROLL'));
console.log(hasLetterR('ROCK AND rOLL'));


console.log(
  filter(hasLetterR, ['rock and roll', 'smooth jazz'])
);

const removeStringsWithoutRs = filter(hasLetterR);
console.log(
  removeStringsWithoutRs(['rock and roll', 'smooth jazz', 'drum circle'])
);

const noVowels = replace(/[aeiou]/ig);
const censored = noVowels('*');
console.log(
  censored('Chocolate Rain')
);

// What's demonstrated here is the ability to "pre-load" a function with an argument or two
// in order to receive a new function that remembers those arguments.
