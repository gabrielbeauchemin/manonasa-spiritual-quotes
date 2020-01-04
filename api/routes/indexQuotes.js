var express = require('express');
let quotesManager = require('./quotesManager');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let query = req.query.q == undefined ? "" : req.query.q;
  let count = req.query.count == undefined ? 15 : req.query.count;
  let offset = req.query.offset == undefined ? 0 : req.query.offset;
  let quotes = quotesManager.getQuote("Ramana", query, count, offset);
  res.send(quotes);
});

module.exports = router;
