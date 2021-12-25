const add = (x) => (y) => {
  return x + y;
};

const increment = add(1);
const addTen = add(10);

console.log(increment(2));
console.log(addTen(2));

// The function `add` takes one argument and returns a function.
// By calling it, the returned function remembers the first argument from then on via the closure.
// This special helper function is called curry to make definin and calling functions like this easier.
