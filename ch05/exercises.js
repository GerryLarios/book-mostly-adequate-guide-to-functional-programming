const { curry, compose } = require('../appendix/appendix_a');

// In each following exercise, we'll consider Car objects with the following shape:

const car = {
  name: "Aston Martin One-77",
  horsepower: 750,
  dollar_value: 1850000,
  in_stock: true,
};

// Use compose() to rewrite the function below.
// const isLastInStock = (cars) => {
//   const lastCar = last(cars);
//   return prop("in_stock", lastCar);
// };

const cars = new Array(5).fill(car);
const last = (array = []) => array[array.length - 1];
const getPropValue = curry((prop, obj) => obj[prop]);
const isInStock = getPropValue('in_stock');

const isLastInStock = compose(isInStock, last);
console.log(isLastInStock(cars)); // true;

// Considering the following function:
// const average = xs => reduce(add, 0, xs) / xs.length;
// Use the helper function average to refactor averageDollarValue as a composition.
// const averageDollarValue = (cars) => {
//   const dollarValues = map((c) => c.dollar_value, cars);
//   return average(dollarValues);
// };

const propDollarValue = getPropValue('dollar_value');
const add = (x, y) => x + y;
const getDollarValues = (cars) => cars.map(propDollarValue);
const average = (array) => array.reduce(add, 0) / array.length;

const averageDollarValue = compose(average, getDollarValues);
console.log(averageDollarValue(cars));