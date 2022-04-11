var express = require('express');
const { checkJwt } = require('../auth/auth');
var router = express.Router();

/* GET home page. */
router.get('/', checkJwt,  function(req, res, next) {
  res.status(200).send("Success")
});

module.exports = router;
