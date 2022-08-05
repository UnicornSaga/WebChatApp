var express = require('express');
const { checkJwt } = require('../auth/auth');

var router = express.Router();

/* GET users listing. */

router.get('/', checkJwt, function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
