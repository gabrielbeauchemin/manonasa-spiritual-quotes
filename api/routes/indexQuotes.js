var express = require('express');
let quotesManager = require('./quotesManager');

var router = express.Router();

router.get('/', function (req, res, next) {
  //There is no quotes that has no author or no source
  if(req.query.authors === "" || req.query.sources === "")
    res.send("[]");

  let query = req.query.q == null ? "" : req.query.q;
  let authors = req.query.authors == null ? null : req.query.authors.split(',');
  let sources = req.query.sources == null ? null : req.query.sources.split(',');
  let count = req.query.count == null ? 15 : req.query.count;
  let offset = req.query.offset == null ? 0 : req.query.offset;
  let quotes = quotesManager.getQuotes(authors, sources, query, count, offset);
  res.send(quotes);
});

module.exports = router;
