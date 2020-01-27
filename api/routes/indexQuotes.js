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

  let quotes = [];
  if (isRandom == "true") {
    quotes = quotesManager.getQuotesRandom(authors, sources, query, count, offset);
  }
  else {
    quotes = quotesManager.getQuotes(authors, sources, query, count, offset);
  }

  res.send(quotes);
});

module.exports = router;
