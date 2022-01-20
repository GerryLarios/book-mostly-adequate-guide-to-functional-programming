const https = require('https');
const { map } = require('../appendix/appendix_c');
const { curry, compose, either } = require('../appendix/appendix_a');

const host = 'https://pokeapi.co/api/v2';
const path = 'pokemon';
const query = (id = '') => `${id}`;
const url = (id) => `${host}/${path}/${query(id)}`;

const tap = (x) => {
  console.log(x);
  return x;
};

const getJSON = curry((callback, url) => {
  https.get(url, res => {
    let data = '';
    res.on('error', console.error);
    res.on('data', chunk => data += chunk);
    res.on('end', () => callback(JSON.parse(data)));
  });
});

const prop = curry((prop, obj) => obj[prop]);
const getPropResults = prop('results');
const getPropName = prop('name');

const printNames = compose(console.log, map(getPropName), getPropResults);
const printName = compose(console.log, getPropName);

const checkPokemonResponse = (res) =>
  getPropResults(res) ? printNames(res) : printName(res);

const app = compose(getJSON(checkPokemonResponse), url);
app();