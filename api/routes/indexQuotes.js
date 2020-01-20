var express = require('express');
let quotesManager = require('./quotesManager');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let query = req.query.q == null ? "" : req.query.q;
  let authors = req.query.authors == null || req.query.authors === "" ?
                [] : req.query.authors.split(',');
  let sources = req.query.sources == null || req.query.sources === "" ?
                [] : req.query.sources.split(',');
  let count = req.query.count == null ? 15 : req.query.count;
  let offset = req.query.offset == null ? 0 : req.query.offset;
  let quotes = quotesManager.getQuote(authors, sources, query, count, offset);
  res.send(quotes);
});

module.exports = router;
