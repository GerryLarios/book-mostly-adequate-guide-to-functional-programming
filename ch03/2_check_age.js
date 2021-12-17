// impure
let min = 21; // it is impure because it depends on the mutable variable min to depermine the result.
const checkAge = (age) => (age) => {
  return age >= min; // It depends on system state and increase the cognitive load.
};

const checkPureAge = (age) => {
  const minimun = 21;
  return age >= minimun;
};

// Side effects disqualify a function from being pure.
// A side effect is a change of system state with the outside world that occurs during the calculation of a result.
// There's nothing intrinsically bad about effects and we'll be using them all over the place in the chapters to come.
// It's that side part that bears the negative connotation.
// The philosophy of functional programming postulates that side effects are a primary cause of incorrect behavior.
