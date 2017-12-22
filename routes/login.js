var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../bin/db');
var crypto = require('crypto');

/* GET users listing. */
router.post('/', function(req, res, next) {
	db.query("SELECT * FROM users WHERE user = ? AND password = ?;", 
		[req.body.name,
		crypto.createHash('sha256').update(req.body.password).digest("hex")],
		function(err, result){
			if (result.length != 0){
				res.redirect('/users/' + result[0].md5_user)
			}else{
				res.render('index', { 
			  		welcome: 'Incorrect Login!'
			  	});
			}
		});

});

module.exports = router;
