var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var db = require('../bin/db');
var crypto = require('crypto');


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('create', { 
  	welcome: 'Create your Account!'
  });
});

router.post('/', function(req, res, next) {
	db.query("SELECT * FROM users WHERE user = ?;", req.body.name,
		function(err, result){
			if (result.length != 0){
				res.render('create', { 
			  		welcome: 'User Already Exists!'
			  	});
			}else{
				db.query("INSERT INTO users (user, md5_user, password) VALUES (?, ?, ?);",
			   		[req.body.name,
			   		crypto.createHash('md5').update(req.body.name).digest("hex"),
			   		crypto.createHash('sha256').update(req.body.password).digest("hex")],
					function(err, result){
						console.log('User ' + req.body.name + 
							' password: ' + req.body.password);

				});
				db.query("SELECT reset FROM users WHERE user = ?;"
					,req.body.name,
					function(err, result){
						console.log(result);
						res.render('created', { 
				  			welcome: 'User Created!',
				  			reset_code: result[0].reset
				  		});
					});
			}
	});

});

module.exports = router;
