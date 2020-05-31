var express = require('express');
let quotesManager = require('./quotesManager');

var router = express.Router();

router.get('/', function (req, res, next) {
  //There is no quotes that has no author or no source
  if (req.query.authors === "" || req.query.sources === "")
  {
    return res.send("[]");
  }
    
  let query = req.query.q == null || req.query.q == "" ? null : req.query.q.split(' ');
  let authors = req.query.authors == null ? null : req.query.authors.split(',');
  let sources = req.query.sources == null ? null : req.query.sources.split(',');
  let count = req.query.count == null || req.query.count == "" ? 15 : req.query.count;
  let offset = req.query.offset == null || req.query.offset == "" ? 0 : req.query.offset;
  let isRandom = req.query.random == null || req.query.random == "" ? false : req.query.random;
  let lang = req.query.lang == null || req.query.lang == "" ? "en" : req.query.lang;

  let quotes = [];
  if (isRandom == "true") {
    quotes = quotesManager.getQuotesRandom(authors, sources, query, count, offset, lang);
  }
  else {
    quotes = quotesManager.getQuotes(authors, sources, query, count, offset, lang);
  }

  res.send(quotes);
});

router.get('/daily', function (req, res, next) {
  res.send(quotesManager.getRandomQuoteByDay());
});

module.exports = router;
