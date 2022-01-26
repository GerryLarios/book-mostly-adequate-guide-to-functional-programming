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
        const ts = Object.keys(t).map((k) => [k, inspect(t[k])]);
        return `{${ts.map((kv) => kv.join(': ')).join(', ')}}`;
      }
      default: {
        return String(t);
      }
    }
  }

  function inspectArgs(args) {
    return Array.isArray(args)
      ? `[${args.map(inspect).join(', ')}]`
      : inspectTerm(args);
  }

  return typeof x === 'function' ? inspectFn(x) : inspectArgs(x);
};

// curry :: ((a, b, ...) -> c) -> a -> b -> ... -> c
function curry(fn) {
  const arity = fn.length;

  return function $curry(...args) {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }

    return fn.call(null, ...args);
  };
}

// compose :: ((y -> z), (x -> y),  ..., (a -> b)) -> a -> z
const compose =
  (...fns) =>
  (...args) =>
    fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];

// identity :: x -> x
const identity = (x) => x;

class Either {
  constructor(x) {
    this.$value = x;
  }

  // ----- Pointed (Either a)
  static of(x) {
    return new Right(x);
  }
}

class Right extends Either {
  get isLeft() {
    return false;
  }

  get isRight() {
    return true;
  }

  static of(_) {
    throw new Error(
      '`of` called on class Right (value) instead of Either (type)'
    );
  }

  inspect() {
    return `Right(${inspect(this.$value)})`;
  }

  // ----- Functor (Either a)
  map(fn) {
    return Either.of(fn(this.$value));
  }

  // ----- Applicative (Either a)
  ap(f) {
    return f.map(this.$value);
  }

  // ----- Monad (Either a)
  chain(fn) {
    return fn(this.$value);
  }

  join() {
    return this.$value;
  }

  // ----- Traversable (Either a)
  sequence(of) {
    return this.traverse(of, identity);
  }

  traverse(_, fn) {
    fn(this.$value).map(Either.of);
  }
}

class Left extends Either {
  get isLeft() {
    return true;
  }

  get isRight() {
    return false;
  }

  static of(_) {
    throw new Error(
      '`of` called on class Left (value) instead of Either (type)'
    );
  }

  inspect() {
    return `Left(${inspect(this.$value)})`;
  }

  // ----- Functor (Either a)
  map() {
    return this;
  }

  // ----- Applicative (Either a)
  ap() {
    return this;
  }

  // ----- Monad (Either a)
  chain() {
    return this;
  }

  join() {
    return this;
  }

  // ----- Traversable (Either a)
  sequence(of) {
    return of(this);
  }

  traverse(of, _) {
    return of(this);
  }
}

const createCompose = curry(
  (F, G) =>
    class Compose {
      constructor(x) {
        this.$value = x;
      }

      inspect() {
        return `Compose(${inspect($this.$value)})`;
      }

      // ----- Pointed (Compose F G)
      static of(x) {
        return new Compose(F(G(x)));
      }

      // ----- Functor (Compose F G)
      map(fn) {
        return new Compose(this.$value.map((x) => x.map(fn)));
      }

      // ----- Applicative (Compose F G)
      ap(f) {
        return f.map(this.$value);
      }
    }
);

class Identity {
  constructor(x) {
    this.$value = x;
  }

  inspect() {
    return `Identity(${inspect($this.$value)})`;
  }

  // ----- Pointed Identity
  static of(x) {
    return new Identity(x);
  }

  // ----- Functor Identity
  map(fn) {
    return Identity.of(fn(this.$value));
  }

  // ----- Applicative Identity
  ap(f) {
    return f.map(this.$value);
  }

  // ---- Monad Identity
  chain(fn) {
    return this.map(fn).join();
  }

  join() {
    return this.$value;
  }

  // ----- Traversable Identity
  sequence(of) {
    return this.traverse(of, identity);
  }

  traverse(of, fn) {
    return fn(this.$value).map(Identity, of);
  }
}

class IO {
  constructor(fn) {
    this.unsafePerfomIo = fn;
  }

  inspect() {
    return 'IO(?)';
  }

  // ----- Pointed IO
  static of(x) {
    return new IO(() => x);
  }

  // ----- Functor IO
  map(fn) {
    return new IO(compose(fn, this.unsafePerfomIo));
  }

  // ----- Applicative IO
  ap(f) {
    return this.chain((fn) => f.map(fn));
  }

  // ----- Monad IO
  chain(fn) {
    return this.map(fn).join();
  }

  join() {
    return new IO(() => this.unsafePerfomIo().unsafePerfomIo());
  }
}

class List {
  constructor(xs) {
    this.$value = xs;
  }

  inspect() {
    return `List(${inspect(this.$value)})`;
  }

  concat(x) {
    return new List(this.$value.concat(x));
  }

  // ----- Pointed List
  static of(x) {
    return new List([x]);
  }

  // ---- Functor List
  map(fn) {
    return new List(this.$value.map(fn));
  }

  // ----- Traversable List
  sequence(of) {
    return this.traverse(of, identity);
  }

  traverse(of, fn) {
    return this.$value.reduce(
      (f, a) =>
        fn(a)
          .map((b) => (bs) => bs.concat(b))
          .ap(f),
      of(new List([]))
    );
  }
}

class Map {
  constructor(x) {
    this.$value = x;
  }

  inspect() {
    return `Map(${inspect(this.$value)})`;
  }

  insert(k, v) {
    const singleton = {};
    singleton[k] = v;
    return Map.of(Object.assign({}, this.$value, singleton));
  }

  reduceWithKeys(fn, zero) {
    return Object.keys(this.$value).reduce(
      (acc, k) => fn(acc, this.$value[k], k),
      zero
    );
  }

  // ----- Functor (Map a)
  map(fn) {
    return this.reduceWithKeys((m, v, k) => m.insert(k, fn(v)), new Map({}));
  }

  // ----- Traversable (Map a)
  sequence(of) {
    return this.traverse(of, identity);
  }

  traverse(of, fn) {
    return this.reduceWithKeys(
      (f, a, k) =>
        fn(a)
          .map((b) => (m) => m.insert(k, b))
          .ap(f),
      of(new Map({}))
    );
  }
}

class Maybe {
  get isNothing() {
    return this.$value === null || this.$value === undefined;
  }

  get isJust() {
    return !this.isNothing;
  }

  constructor(x) {
    this.$value = x;
  }

  inspect() {
    return this.isNothing ? 'Nothing' : `Just(${inspect(this.$value)})`;
  }

  // ----- Pointed Maybe
  static of(x) {
    return new Maybe(x);
  }

  // ----- Functor Maybe
  map(fn) {
    return this.isNothing ? this : Maybe.of(fn(this.$value));
  }

  // ----- Applicative Maybe
  ap(f) {
    return this.isNothing ? this : f.map(this.$value);
  }

  // ----- Monad Maybe
  chain(fn) {
    return this.map(fn).join();
  }

  join() {
    return this.isNothing ? this : this.$value;
  }

  // ----- Traversable Maybe
  sequence(of) {
    return this.traverse(of, identity);
  }

  traverse(of, fn) {
    return this.isNothing ? of(this) : fn(this.$value).map(Maybe.of);
  }
}

class Task {
  constructor(fork) {
    this.fork = fork;
  }

  inspect() {
    return 'Task(?)';
  }

  static rejected(x) {
    return new Task((reject, _) => reject(x));
  }

  // ----- Pointed (Task a)
  static of(x) {
    return new Task((_, resolve) => resolve(x));
  }

  // ----- Functor (Task a)
  map(fn) {
    return new Task((reject, resolve) =>
      this.fork(reject, compose(resolve, fn))
    );
  }

  // ----- Applicative (Task a)
  ap(f) {
    return this.chain((fn) => f.map(fn));
  }

  // ----- Monad (Task a)
  chain(fn) {
    return new Task((reject, resolve) =>
      this.fork(reject, (x) => fn(x).fork(reject, resolve))
    );
  }

  join() {
    return this.chain(identity);
  }
}

module.exports = {
  Either,
  Right,
  Left,
  createCompose,
  Identity,
  IO,
  List,
  Map,
  Maybe,
  Task,
};
