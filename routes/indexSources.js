var express = require('express');
let quotesManager = require('./quotesManager');

var router = express.Router();

router.get('/', function(req, res, next) {
  let query = req.query.q == null || req.query.q == "" ? null : req.query.q.split(' ');
  let lang = req.query.lang == null || req.query.lang == "" ? "en" : req.query.lang;
  let sources = quotesManager.getSources(query, lang);
  res.send(sources);
});

module.exports = router;
