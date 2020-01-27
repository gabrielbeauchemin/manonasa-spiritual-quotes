var express = require('express');
let quotesManager = require('./quotesManager');

var router = express.Router();

router.get('/', function(req, res, next) {
  let query = req.query.q == null || req.query.q == "" ? null : req.query.q.split(' ');
  let authors = quotesManager.getAuthors(query);
  res.send(authors);
});

module.exports = router;
