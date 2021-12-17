// impure
const signUpImpure = (attrs) => {
  const user = saveUser(attrs);
  return wellcomeUser(user);
};

// pure
const signUpPure = (DB, EmailService, attrs) => () => { // The example here demonstrates that the pure function must be honest about its dependencies.
  const user = saveUser(DB, attrs);
  return wellcomeUser(EmailService, user);
}; // Something else to notice is that we're forced to "inject" dependencies, or pass them in as arguments,
// which makes our app much more flexible because we've parameterized
