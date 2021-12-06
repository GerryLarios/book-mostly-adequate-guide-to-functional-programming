const fs = require('fs');

const DB = {
  save(text) { console.log('text') }
};

// scary
fs.readFile('text_file.txt', DB.save);

// less so
fs.readFile('text_file.txt', DB.save.bind(DB));
