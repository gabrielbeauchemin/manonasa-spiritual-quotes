let path = require('path');
let appRoot = path.resolve(__dirname);
let dbPath = path.join(appRoot, 'SpiritualQuotes.db');
const Database = require('better-sqlite3');
const db = new Database(dbPath, { fileMustExist: true});

let getQuote = function(authors, sources, searchQueries, nbrQuotes=15, indexBegin=0)
{
  const query = `SELECT * FROM SpiritualQuotesSearch 
                 WHERE author= ${formatOrClauses(authors)} AND source= ${formatOrClauses(sources)} 
                 MATCH "${searchQueries}" 
                 LIMIT ${nbrQuotes} OFFSET ${indexBegin}`;
  const stmt = db.prepare(query); 
  const spiritualQuotes = stmt.all();
  return spiritualQuotes;
}

function formatOrClauses(items)
{
  let format = "";
  for (i = 0; i < items.length; i++) {
    format += items[i];
    if(i < items.length -1)
    {
      format += ' OR ';
    }
  } 
}

exports.getQuote = getQuote;