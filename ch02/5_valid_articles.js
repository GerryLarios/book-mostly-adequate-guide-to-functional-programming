// specific to our current situation
const validArticles = (articles = []) =>
  articles.filter(article => article !== null && article !== undefined);

// vastly more relevant for future projects
const compact = (xs = []) => xs.filter(x => x !== null && x !== undefined);

// By using specific naming, we've tied ourselves to specific data.
