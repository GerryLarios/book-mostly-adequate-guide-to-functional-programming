// There's no need for implementation details if the input dictates the output.
// You might want to calculate instead of hand writing things out, but this illustrates a different way to think about functions.
const toLowerCase = {
  A: 'a',
  B: 'b',
  C: 'c',
  D: 'd',
  E: 'e',
  F: 'f',
};

console.log(toLowerCase['C']);

const isPrime = {
  1: false,
  2: true,
  3: true,
  4: false,
  5: true,
  6: false,
};
console.log(isPrime[3]);

// Pure functions are mathematical functions and they're what functional programming is all about
