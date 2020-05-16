let path = require("path");
let appRoot = path.resolve(__dirname);
let dbPath = path.join(appRoot, "SpiritualQuotes.db");
const Database = require("better-sqlite3");
const db = new Database(dbPath, { fileMustExist: true });

let getQuotes = function (
  authors,
  sources,
  searchQueries,
  nbrQuotes,
  indexBegin
) {
  const query = `SELECT * FROM SpiritualQuotesSearch 
                ${formatWhereClause({
                  quote: searchQueries,
                  author: authors,
                  source: sources,
                })}
                LIMIT ${nbrQuotes} OFFSET ${indexBegin}`;
  const stmt = db.prepare(query);
  const spiritualQuotes = stmt.all();
  return spiritualQuotes;
};

let getQuotesRandom = function (
  authors,
  sources,
  searchQueries,
  nbrQuotes,
  indexBegin
) {
  const query = `SELECT * FROM SpiritualQuotesSearch 
                ${formatWhereClause({
                  quote: searchQueries,
                  author: authors,
                  source: sources,
                })}
                ORDER BY random()
                LIMIT ${nbrQuotes} OFFSET ${indexBegin}`;
  const stmt = db.prepare(query);
  const spiritualQuotes = stmt.all();
  return spiritualQuotes;
};

let dailyQuoteCached = undefined;
let dailyQuote = undefined;
let getRandomQuoteByDay = function () {
  let today = new Date().toISOString().slice(0, 10);
  if (dailyQuote == undefined || dailyQuote !== today) {
    const query = `SELECT * FROM SpiritualQuotesSearch 
    ORDER BY random()
    LIMIT 1`;
    const stmt = db.prepare(query);
    const spiritualQuote = stmt.get();
    dailyQuote = today;
    dailyQuoteCached = spiritualQuote;
    return spiritualQuote;
  }
  return dailyQuoteCached;
};

let getAuthors = function (searchQueries) {
  const query = `SELECT DISTINCT author FROM SpiritualQuotesSearch 
                 ${formatWhereClause({ quote: searchQueries })}`;
  const stmt = db.prepare(query);
  const spiritualQuotes = stmt.all();
  return spiritualQuotes;
};

let getSources = function (searchQueries) {
  const query = `SELECT DISTINCT source FROM SpiritualQuotesSearch 
                ${formatWhereClause({ quote: searchQueries })}`;
  const stmt = db.prepare(query);
  const spiritualQuotes = stmt.all();
  return spiritualQuotes;
};

function formatWhereClause(filtersDict) {
  filtersDict = removeEmptyFilters(filtersDict);
  if (Object.keys(filtersDict).length === 0) {
    return "";
  } else {
    let whereClause = `WHERE SpiritualQuotesSearch MATCH'`;
    let lastFilterName = Object.keys(filtersDict)[
      Object.keys(filtersDict).length - 1
    ];
    for (var filterName in filtersDict) {
      whereClause +=
        "(" + formatFilter(filterName, filtersDict[filterName]) + ")";
      if (filterName != lastFilterName) whereClause += " AND ";
    }
    return whereClause + "'";
  }
}

function removeEmptyFilters(filtersDict) {
  return Object.keys(filtersDict)
    .filter((key) => filtersDict[key] != null && filtersDict[key].length > 0)
    .reduce((obj, key) => {
      obj[key] = filtersDict[key];
      return obj;
    }, {});
}

function formatFilter(filterName, filterValues) {
  let format = "";
  for (i = 0; i < filterValues.length; i++) {
    format += filterName + ":" + filterValues[i].split(" ").join("+");
    if (i < filterValues.length - 1) {
      format += filterName === "quote" ? " AND " : " OR ";
    }
  }
  return format;
}

exports.getQuotes = getQuotes;
exports.getQuotesRandom = getQuotesRandom;
exports.getRandomQuoteByDay = getRandomQuoteByDay;
exports.getAuthors = getAuthors;
exports.getSources = getSources;
