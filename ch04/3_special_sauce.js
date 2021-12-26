const { curry } = require('../appendix/appendix_a');

// Giving a function fewer arguments than it expects is typically called partial application.
// Partially applying a function can remove a lot of boiler plate code.

const map = curry((f, xs) => xs.map(f));
const datenow = Date.now();

const elements = [{
  id: datenow,
  name: `TEST ${datenow}`,
  childNodes: [{
    id: datenow + 1,
    name: `TEST ${datenow + 1}`,
  }],
}]

const getChildren = x => x.childNodes;
const allChildren = map(getChildren);

console.log('ALL_CHILDREN', allChildren(elements));
