const { append, prop } = require('../appendix/appendix_c');

class Container {
  constructor(x) {
    this.$value = x;
  }

  static of(x) {
    return new Container(x);
  }
}

// (a -> b) -> Container a -> Container b
Container.prototype.map = function (f) {
  return Container.of(f(this.$value));
}; // It's just like Array's famous map, except we have Container a instead of [a]. And it works essentially the same way.

console.log(
  Container.of(2).map(x => x * 2),
  Container.of('flamethrowers').map(str => str.toUpperCase()),
  Container.of('bombs').map(append(' away')).map(prop('length'))
); // A Functor is a type that implements map and obeys some laws. Functors come from category theory.