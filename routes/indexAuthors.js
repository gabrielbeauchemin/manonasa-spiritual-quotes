var express = require("express");
let quotesManager = require("./quotesManager");

var router = express.Router();

router.get("/", function (req, res, next) {
  let query =
    req.query.q == null || req.query.q == "" ? null : req.query.q.split(" ");
  let lang =
    req.query.lang == null || req.query.lang == "" ? "en" : req.query.lang;
  try {
    let authors = quotesManager.getAuthors(query, lang);
    res.send(authors);
  } catch {
    return [];
  }
});

module.exports = router;
