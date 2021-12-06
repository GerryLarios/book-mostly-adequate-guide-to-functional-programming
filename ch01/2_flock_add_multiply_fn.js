const add = (x, y) => x + y;
const multiply = (x, y) => x * y;

const flockA = 4
const flockB = 2
const flockC = 0

result = add(
  multiply(flockB, add(flockA, flockC)),
  multiply(flockA, flockB)
);

console.log('RESULT', result);

// Apply the identity property to remove the extra add
const identity = add(
  multiply(flockB, flockA),
  multiply(flockA, flockB)
);
console.log('identity', identity);

// Apply distributive property to achieve our result
const distributive = multiply(
  flockB,
  add(flockA, flockA)
);
console.log('distributive', distributive);
