// Pure functions can always be cached by input. This is typically done using a technique called memoization

const memoize = (f) => {
  const cache = {};
  return (...args) => {
    const argStr = JSON.stringify(args);
    cache[argStr] = cache[argStr] || f(...args);
    console.log('CACHE', cache);
    return cache[argStr];
  }
};

const squareNumber = memoize(x => x * 2);

console.log(squareNumber(4));
console.log(squareNumber(4));
console.log(squareNumber(5));
console.log(squareNumber(5));
