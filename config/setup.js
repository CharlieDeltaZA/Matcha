const db = require('./database');
var mysql = require('mysql');

// Create needed database and tables.
var setup = function setup()
{
	// Attempt to connect to the DB
	var conn = mysql.createConnection( {
		host: `${db.servername}`,
		user: `${db.dbusername}`,
		password: `${db.dbpassword}`
	});

	// Creates matcha database if it does not exist.
	conn.connect(function(err) {
		if (err) throw err;
		conn.query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'matcha'",
		function (err, result) {
			if (err) throw err;
			if (result.length > 0) {
				console.log('Database already exists');
			}
			else
			{
				console.log('Database not found.');
				conn.query("CREATE DATABASE matcha", function (err, result) {
					if (err) throw err;
					console.log("Database created");
					
				});
			}
		});
	});

	var conn = mysql.createConnection( {
		host: `${db.servername}`,
		user: `${db.dbusername}`,
		password: `${db.dbpassword}`,
		database: `${db.dbname}`
	});

	conn.connect(function(err) {
		if (err) throw err;
		conn.query(`SELECT * FROM information_schema.tables
					WHERE table_schema = 'matcha'
					AND table_name = 'users'`,
		function (err, result) {
			if (err) throw err;
			if (result.length > 0) {
				console.log('user table already exists');
			}
			else
			{
				console.log('user table not found.');
				var sql = `CREATE TABLE IF NOT EXISTS users (
					userID int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
					username LONGTEXT NOT NULL,
					userEmail LONGTEXT NOT NULL,
					userPassword LONGTEXT NOT NULL,
					userFirstName LONGTEXT,
					userLastName LONGTEXT,
					userGender LONGTEXT NOT NULL,
					userAge int(11),
					userOrientation LONGTEXT,
					userBiography LONGTEXT,
					userLocation LONGTEXT,
					userFame int(11)
					);`
				con.query(sql, function (err, result) {
					if (err) throw err;
					console.log("user table created");
				});
			}
		});
	});
}

module.exports.setup = setup;

