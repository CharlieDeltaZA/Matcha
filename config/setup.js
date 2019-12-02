// const db = require('./database');
var mysql = require('mysql');

var setup = function setup()
{
	var conn = mysql.createConnection( {
		host: 'localhost',
		user: 'root',
		password: 'some_pass'
	});

	conn.connect(function(err) {
		if (err) throw err;
			// console.log('Connection rejected');
		console.log("successfully connected to DB");
	});
}

module.exports.setup = setup;