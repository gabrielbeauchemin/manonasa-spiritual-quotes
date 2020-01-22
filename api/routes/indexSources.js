var express = require('express');
let quotesManager = require('./quotesManager');

var router = express.Router();

router.get('/', function(req, res, next) {
  let query = req.query.q == null ? "" : req.query.q;
  let sources = quotesManager.getSources(query);
  res.send(sources);
});

module.exports = router;
