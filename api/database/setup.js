const db = require('./config');
var mysql = require('mysql');

// Create needed database and tables.
var setupDB = function setupDB() 
{
	var conn = mysql.createConnection( {
		host: `${db.servername}`,
		user: `${db.dbusername}`,
		password: `${db.dbpassword}`
	});

	conn.connect(function(err) {
		if (err)
			throw(err);
		conn.query("CREATE DATABASE IF NOT EXISTS matcha", function (err, result) {
		if (err)
			throw(err);
		else
		{
			setupTables();
		}		
		});
	});
}
var setupTables = function setupTables() {
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
				// console.log('user table already exists');
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
					userGender LONGTEXT,
					userImage LONGTEXT,
					userAge int(11),
					userBirthday DATE,
					userLikes int(11) default 0,
					userDislikes int(11) default 0,
					userOrientation LONGTEXT,
					userBiography LONGTEXT,
					userLocationlat FLOAT,
					userLocationlng FLOAT,
					userFame int(11),
					userCode LONGTEXT,
					userVerified BOOLEAN default 0,
					accountComplete BOOLEAN default 0
					);`
				conn.query(sql, function (err, result) {
					if (err) throw err;
					// console.log("user table created");
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
					AND table_name = 'messages'`,
		function (err, result) {
			if (err) throw err;
			if (result.length > 0) {
				// console.log('messages table already exists');
			}
			else
			{
				console.log('message table not found.');
				var sql = `CREATE TABLE IF NOT EXISTS messages (
					receiver LONGTEXT NOT NULL,
					sender LONGTEXT NOT NULL,
					message LONGTEXT NOT NULL,
					date TIMESTAMP default CURRENT_TIMESTAMP
					);`
				conn.query(sql, function (err, result) {
					if (err) throw err;
					// console.log("messages table created");
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
					AND table_name = 'images'`,
		function (err, result) {
			if (err) throw err;
			if (result.length > 0) {
				// console.log('images table already exists');
			}
			else
			{
				console.log('images table not found.');
				var sql = `CREATE TABLE IF NOT EXISTS images (
					imageOwner LONGTEXT,
					image VARCHAR(2083),
					active BOOLEAN
					);`
				conn.query(sql, function (err, result) {
					if (err) throw err;
					console.log("images table created");
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
					AND table_name = 'notifications'`,
		function (err, result) {
			if (err) throw err;
			if (result.length > 0) {
				// console.log('images table already exists');
			}
			else
			{
				console.log('notifications table not found.');
				var sql = `CREATE TABLE IF NOT EXISTS notifications (
					user TINYTEXT,
					subject TINYTEXT,
					content LONGTEXT
					);`
				conn.query(sql, function (err, result) {
					if (err) throw err;
					console.log("notifications table created");
				});
			}
		});
	});
}
module.exports.setupDB = setupDB;