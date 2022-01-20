const { compose } = require("../appendix/appendix_a");

const g = (x) => x.length;
const f = (x) => x === 4;

// From string to int to boolean with composition
const isFourLetterWord = compose(f, g);
console("IS_FOUR_LETTER_WORD", isFourLetterWord("word"));

// identity
const id = (x) => x;
console.log((compose(id, f) === compose(f, id)) === f);
// it's a function that acts as a stand in for a given value.
// This is quite useful when writing pointfree code
