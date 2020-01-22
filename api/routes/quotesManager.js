let path = require('path');
let appRoot = path.resolve(__dirname);
let dbPath = path.join(appRoot, 'SpiritualQuotes.db');
const Database = require('better-sqlite3');
const db = new Database(dbPath, { fileMustExist: true });

let getQuotes = function (authors, sources, searchQueries, nbrQuotes = 15, indexBegin = 0) {
  const query = `SELECT * FROM SpiritualQuotesSearch 
                ${formatWhereClause(searchQueries, { 'author': authors, 'source': sources })}
                LIMIT ${nbrQuotes} OFFSET ${indexBegin}`;
  const stmt = db.prepare(query);
  const spiritualQuotes = stmt.all();
  return spiritualQuotes;
}

let getAuthors = function (searchQueries) {
  const query = `SELECT DISTINCT author FROM SpiritualQuotesSearch 
                 WHERE SpiritualQuotesSearch MATCH '${formatFilter('quote', [searchQueries])}'`;
  const stmt = db.prepare(query);
  const spiritualQuotes = stmt.all();
  return spiritualQuotes;
}

let getSources = function (searchQueries) {
  const query = `SELECT DISTINCT source FROM SpiritualQuotesSearch 
                 WHERE SpiritualQuotesSearch MATCH '${formatFilter('quote', [searchQueries])}'`;
  const stmt = db.prepare(query);
  const spiritualQuotes = stmt.all();
  return spiritualQuotes;
}

function formatWhereClause(searchQueries, filtersDict) {
  filtersDict = removeEmptyFilters(filtersDict);
  if (Object.keys(filtersDict).length === 0) {
    return `WHERE SpiritualQuotesSearch MATCH '${formatFilter('quote', [searchQueries])}'`;
  }
  else {
    let whereClause = `WHERE SpiritualQuotesSearch MATCH '${formatFilter('quote', [searchQueries])} AND `;
    let lastFilterName = Object.keys(filtersDict)[Object.keys(filtersDict).length-1];
    for (var filterName in filtersDict) {
      whereClause += '(' + formatFilter(filterName, filtersDict[filterName]) + ')';
      if(filterName != lastFilterName) whereClause += ' AND ';
    }
    return whereClause + "'";
  }
}

function removeEmptyFilters(filtersDict) {
  return Object.keys(filtersDict)
    .filter(key => filtersDict[key].length > 0)
    .reduce((obj, key) => {
      obj[key] = filtersDict[key];
      return obj;
    }, {});
}

function formatFilter(filterName, filterValues) {
  let format = "";
  for (i = 0; i < filterValues.length; i++) {
    format += filterName + ':' + filterValues[i].split(" ").join("+");
    if (i < filterValues.length - 1) {
      format += ' OR ';
    }
  }
  return format;
}

exports.getQuotes = getQuotes;
exports.getAuthors = getAuthors;
exports.getSources = getSources;