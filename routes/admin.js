var express = require('express');
var router = express.Router();
var challenges = require('../flags.json');

/* GET home page. */
router.get('/8ee2027983915ec78acc45027d874316', function(req, res, next) {
  res.render('index', { 
  	welcome: challenges.hidden_route.flag
  });
});

module.exports = router;
