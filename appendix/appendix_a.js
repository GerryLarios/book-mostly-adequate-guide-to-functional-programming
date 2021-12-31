const { Left, Maybe, Task } = require('./appendix_b');

// Currying is a process in functional programming in which
// we can transform a function with multiple arguments into a sequence of nesting functions.
// It returns a new function that expects the next argument inline.
// Currying break down a function that takes multiple arguments into a series of functions that each take only one argument.
// It is a technique in functional programming, transformation of the function of multiple arguments
// into several functions of a single argument in sequence. 
// Note: An American mathematician named Haskell Curry developed this technique, that’s why it is called as currying.

// curry :: ((a, b, ...) -> c) -> a -> b -> ... -> c
function curry(fn) {
  const arity = fn.length; // The number of arguments a function takes is also called arity.
  // function that takes two arguments is called 2-arity function.

  // Currying and Partial Application are related (because of closure), but they are of different concepts.
  // Partial application transforms a function into another function with smaller `arity`.
  // Currying generates nested functions based on the number of arguments passed into the function.
  // Each function is given a parameter. There is no currying if there is no argument.
  return function $curry(...args) { // `Closure ` makes currying possible in JavaScript.
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }

    return fn.call(null, ...args);
  };
}

// always :: a -> b -> a
const always = curry((a, _) => a);

// Function composition is a mechanism of combining multiple simple functions to build a more complicated one.
// So the main difference between compose and pipe is the order of the composition.
// Compose performs a right-to-left function composition since Pipe performs a left-to-right composition.

// compose :: ((y -> z), (x -> y),  ..., (a -> b)) -> a -> z
const compose = (...fns) => (...args) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];

// either :: (a -> c) -> (b -> c) -> Either a b -> c
const either = curry((f, g, e) => e.isLeft ? f(e.$value) : g(e.$value));

// identity :: x -> x
const identity = x => x;

// inspect :: a -> String
const inspect = (x) => {
  if (x && typeof x.inspect === 'function') {
    return x.inspect();
  }

  function inspectFn(f) {
    return f.name ? f.name : f.toString();
  }

  function inspectTerm(t) {
    switch (typeof t) {
      case 'string': {
        return `'${t}'`;
      }
      case 'object': {
        const ts = Object.keys(t).map(k => [k, inspect( t[k] )]);
        return `{${ ts.map(kv => kv.join(': ')).join(', ') }}`
      }
      default: {
        return String(t);
      }
    }
  }

  function inspectArgs(args) {
    return Array.isArray(args) ?  `[${args.map(inspect).join(', ')}]` : inspectTerm(args);
  }

  return (typeof x === 'function') ? inspectFn(x) : inspectArgs(x);
};

// left :: a -> Either a b
const left = a => new Left(a);

// liftA2 :: (Applicative f) => (a1 -> a2 -> b) -> f a1 -> f a2 -> f b
const liftA2 = curry((fn, a1, a2) => a1.map(fn).ap(a2));

// liftA3 :: (Applicative f) => (a1 -> a2 -> a3 -> b) -> f a1 -> f a2 -> f a3 -> f b
const liftA3 = curry((fn, a1, a2, a3) => a1.map(fn).ap(a2).ap(a3));

// maybe :: b -> (a -> b) -> Maybe a -> b
const maybe = curry((v, f, m) => m.isNothing ? v : f(m.$value));

// nothing :: Maybe a
const nothing = Maybe.of(null);

// reject :: a -> Task a b
const reject = a => Task.rejected(a);

module.exports = {
  always,
  compose,
  curry,
  either,
  identity,
  inspect,
  left,
  liftA2,
  liftA3,
  maybe,
  nothing,
  reject
}
