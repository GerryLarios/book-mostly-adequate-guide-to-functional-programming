const add = (x, y) => x + y;
const multiply = (x, y) => x * y;

const x = 4
const y = 2
const z = 0

// associative
const associative = add(add(x, y), z) === add(x, add(y, z));
console.log('associative', associative);

// commutative
const commutative = add(x, y) === add(y, x);
console.log('commutative', commutative);

// identity
const identity = add(x, 0) === x;
console.log('identity', commutative);

// distributive
const distributive = multiply(x, add(y, z)) === add(multiply(x, y), multiply(x, z));
console.log('distributive', distributive);
