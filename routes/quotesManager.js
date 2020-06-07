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
  indexBegin,
  lang
) {
  const query = `SELECT * FROM SpiritualQuotesSearch 
                ${formatWhereClause({
                  quote: searchQueries,
                  author: authors,
                  source: sources,
                  language: [lang],
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
  indexBegin,
  lang
) {
  const query = `SELECT * FROM SpiritualQuotesSearch 
                ${formatWhereClause({
                  quote: searchQueries,
                  author: authors,
                  source: sources,
                  language: [lang],
                })}
                ORDER BY random()
                LIMIT ${nbrQuotes} OFFSET ${indexBegin}`;
  const stmt = db.prepare(query);
  const spiritualQuotes = stmt.all();
  return spiritualQuotes;
};

let dailyQuoteCachedEn = undefined;
let dailyQuoteCachedFr = undefined;
let dailyQuote = undefined;
let getRandomQuoteByDay = function (language) {
  let today = new Date().toISOString().slice(0, 10);
  if (dailyQuote == undefined || dailyQuote !== today) {
    const queryEn = `SELECT * FROM SpiritualQuotesSearch
    WHERE language='en' 
    ORDER BY random()
    LIMIT 1`;
    const stmtEn = db.prepare(queryEn);
    const spiritualQuoteEn = stmtEn.get();
    dailyQuoteCachedEn = spiritualQuoteEn;
    //match the same quote in fr if possible
    const queryFr = `SELECT * FROM SpiritualQuotesSearch 
    WHERE language='fr' AND author='${spiritualQuoteEn.author}' AND source='${sourceEnToFr(spiritualQuoteEn.source).replace("'","''")}' AND number='${spiritualQuoteEn.number}'
    LIMIT 1`;
    const stmtFr = db.prepare(queryFr);
    const SpiritualQuoteFr = stmtFr.get();
    dailyQuoteCachedFr = SpiritualQuoteFr;

    dailyQuote = today;
    return language === "fr" ? SpiritualQuoteFr : spiritualQuoteEn;
  }
  return language === "fr" ? dailyQuoteCachedFr : dailyQuoteCachedEn;
};

function sourceEnToFr(sourceEn){
  if(sourceEn === "How to practise Self-inquiery"){
    return "Comment pratiquer l'investigation du Soi";
  }
  else if (sourceEn === "The Seven Steps to Awakening"){
    return "Les Sept Étapes Pour S'Éveiller"
  }
  else if (sourceEn === "Who am I?"){
    return "Qui suis-je?"
  }
  else{
    throw "Can't map unknown source";
  }
}

let getAuthors = function (searchQueries, lang) {
  const query = `SELECT DISTINCT author FROM SpiritualQuotesSearch 
                 ${formatWhereClause({
                   quote: searchQueries,
                   language: [lang],
                 })}`;
  const stmt = db.prepare(query);
  const spiritualQuotes = stmt.all();
  return spiritualQuotes;
};

let getSources = function (searchQueries, lang) {
  const query = `SELECT DISTINCT source FROM SpiritualQuotesSearch 
                ${formatWhereClause({
                  quote: searchQueries,
                  language: [lang],
                })}`;
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

  filterName = filterName.split("'").join("''").split("?").join("");

  if (filterName == "source") {
    for (i = 0; i < filterValues.length; i++) {
      filterValues[i] = '"' + filterValues[i].split("'").join("''") + '"';
    }
  } else {
    for (i = 0; i < filterValues.length; i++) {
      filterValues[i] = filterValues[i]
        .split("'")
        .join("''")
        .split(" ")
        .join("+");
    }
  }

  for (i = 0; i < filterValues.length; i++) {
    format += filterName + ":" + filterValues[i];
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
