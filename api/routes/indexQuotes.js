var express = require('express');
let quotesManager = require('./quotesManager');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let query = req.query.q == undefined ? "" : req.query.q;
  let quotes = quotesManager.getQuote("Ramana", query, 0, 10, () => {});
  res.send(quotes);
});

module.exports = router;
