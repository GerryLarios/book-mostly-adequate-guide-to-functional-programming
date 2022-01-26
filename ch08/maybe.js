const { compose, curry, maybe } = require('../appendix/appendix_a');
const { Maybe } = require('../appendix/appendix_b');
const { match, prop, add, safeHead, map } = require('../appendix/appendix_c');

console.log(
  Maybe.of(null).map(match(/a/ig)).inspect(),
  Maybe.of('Malkovich Malkovich').map(match(/a/ig)).inspect(),
  Maybe.of({ name: 'GERRY'}).map(prop('age')).map(add(10)).inspect(),
  Maybe.of({ name: 'GERRY', age: '24' }).map(prop('age')).map(add(10)).inspect(),
);

const streetName = compose(map(prop('street')), safeHead, prop('addresses'));

console.log(
  streetName({ addresses: [] }).inspect(),
  streetName({ addresses: [{ street: 'New Orleans', number: 666 }] }).inspect(),
);

const withdraw = curry((amount, { balance }) =>
  Maybe.of(balance >= amount ? { balance: balance - amount } : null)
);
const updateLedger = account => account;
const remainingBalance = ({ balance }) => `Your balance is ${balance}`;
const finishTransaction = compose(remainingBalance, updateLedger);
const getTwenty = compose(map(finishTransaction), withdraw(20));

console.log(
  getTwenty({ balance: 200 }).inspect(),
  getTwenty({ balance: 0 }).inspect(),
);

const _getTwenty = compose(maybe('You\'re broke!', finishTransaction), withdraw(20));

console.log(
  _getTwenty({ balance: 200 }),
  _getTwenty({ balance: 0 }),
);