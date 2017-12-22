var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../bin/db');
var challenges = require('../flags.json');

/* GET home page. */
router.get('/:user', function(req, res, next) {
	if(req.params.user === "21232f297a57a5a743894a0e4a801fc3"){
		res.render('users', { 
			welcome: challenges.session_managment.flag
		});
		return;
	}
	db.query("SELECT * FROM users WHERE md5_user = ?;", 
		req.params.user,
		function(err, result){
			if (result.length != 0){
				res.render('users', { 
					welcome: 'Welcome ' + result[0].user
				});
			}else{
				res.render('index', { 
			  		welcome: 'Incorrect Login!'
			  	});
			}
		});
});

module.exports = router;
