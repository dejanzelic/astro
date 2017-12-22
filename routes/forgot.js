var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var db = require('../bin/db');
var crypto = require('crypto');
var challenges = require('../flags.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('forgot', { 
  	welcome: 'Password Reset',
  	message: 'Username for Reset'
  });
});

router.post('/', function(req, res, next){
	if (req.body.code === "1001"){
		res.render('forgot', { 
			welcome: challenges.forgot_password.flag,
		  	message: 'We cannot let you change the password</br>of admin, but here is your flag!'
		});
		return;
	}
	db.query("SELECT reset FROM users WHERE reset = ?;", req.body.code,
			function(err, result){
				if (result.length != 0){
					db.query("UPDATE users SET password = ? WHERE reset = ?",
						[crypto.createHash('sha256').update(req.body.password).digest("hex"),
						req.body.code],
						function(err, result){
							res.render('index', { 
					  		welcome: 'Password Reset!'
					  	});
					})

				}else{
					res.render('forgot', { 
						welcome: 'Password Reset',
					  	message: 'Invalid Secret Code!'
					});
				}
		});
});

module.exports = router;
