var mysql = require('mysql');

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MySuperPassword",
  database: "astro"
});

module.exports = db;