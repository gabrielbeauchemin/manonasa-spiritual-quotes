let path = require('path');
let appRoot = path.resolve(__dirname);
let dbPath = path.join(appRoot, 'SpiritualQuotes.db');
const Database = require('better-sqlite3');
const db = new Database(dbPath, { fileMustExist: true});

let getQuote = function(author, searchQueries, nbrQuotes=15, indexBegin=0)
{
  const query = `SELECT * FROM SpiritualQuotesSearch WHERE quote MATCH "${searchQueries}" LIMIT ${nbrQuotes} OFFSET ${indexBegin}`;
  const stmt = db.prepare(query); 
  const spiritualQuotes = stmt.all();
  return spiritualQuotes;
}

exports.getQuote = getQuote;