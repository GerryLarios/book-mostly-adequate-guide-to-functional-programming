const hi = name => `Hi ${name}`;
const greeting = name => hi(name); // redundant

console.log(hi);
console.log(hi('Gerry'));

// we could simply write but, why place another function around it that simply calls 'hi' with the same argument? It doesn't make sense...
const greet = hi; // It is a bad practice to surround a function with another fuction merely to delay evaluation.
console.log(greet('GERARDO'));
