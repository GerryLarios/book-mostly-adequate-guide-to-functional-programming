const xs = [1, 2, 3, 4 ,5];

console.log('PURE: '); // slice is pure because always returns the same output with the same input 
console.log(xs.slice(0, 3));
console.log(xs.slice(0, 3));
console.log(xs.slice(0, 3));

console.log('IMPURE: '); // splice is impure because returns different output even if it has the same input
console.log(xs.splice(0, 3));
console.log(xs.splice(0, 3));
console.log(xs.splice(0, 3));


