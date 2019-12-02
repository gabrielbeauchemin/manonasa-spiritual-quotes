let path = require('path');
let appRoot = path.resolve(__dirname);
let dbPath = path.join(appRoot, 'SpiritualQuotes.db');
const Database = require('better-sqlite3');
const db = new Database(dbPath, { fileMustExist: true, verbose: console.log });

let getQuote = function(author, searchQueries, indexBegin, nbrQuotes)
{
  const stmt = db.prepare("SELECT * FROM SpiritualQuotes"); //WHERE $author
  const spiritualQuotes = stmt.all(
  // {
  //   // author: 'Ramana',
  // }
);
  return spiritualQuotes;
}

exports.getQuote = getQuote;