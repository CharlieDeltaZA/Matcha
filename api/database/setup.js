const db = require('./config');
var mysql = require('mysql');
const database = require('../database/database');

//
// INSERT INTO users (username, userEmail, userImage, userPassword, userFirstName, userLastName, userLikes, userVerified, accountComplete)
// VALUES ("02","ZeroTwo@Gmail.com", "http://res.cloudinary.com/matchawtc/image/upload/v1579350438/userImages", "$2b$10$bMG3yMTNIzvWzNC8zgiwkOOjGYjB0hVbBW5ec0F00z.mtR.r/Up8m", "Zero", "Two", 16, 1, 1)
//
// Create needed database and tables.
var DB = new database();

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
					username TINYTEXT NOT NULL,
					userEmail LONGTEXT NOT NULL,
					userPassword LONGTEXT NOT NULL,
					userFirstName LONGTEXT,
					userLastName LONGTEXT,
					userGender LONGTEXT,
					userImage LONGTEXT,
					userAge int(11),
					userBirthday DATETIME,
					userLikes int(11) default 1,
					userDislikes int(11) default 0,
					userOrientation LONGTEXT,
					userBiography LONGTEXT,
					userLocationlat FLOAT,
					userLocationlng FLOAT,
					userFame int(11) default 0,
					userCode LONGTEXT,
					userVerified BOOLEAN default 0,
					accountComplete BOOLEAN default 0,
					isOnline BOOLEAN default 0,
					lastOnline LONGTEXT
					);`
				conn.query(sql, function (err, result) {
					if (err) throw err;
					DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame)
	
	VALUES
	("17","OneSeven@Gmail.com", "http://res.cloudinary.com/matchawtc/image/upload/v1579359558/userImages/fju5dlijo6t3pr99tzjm.jpg", "$2b$10$bMG3yMTNIzvWzNC8zgiwkOOjGYjB0hVbBW5ec0F00z.mtR.r/Up8m", "Bob", "Musk", 'hetero', 'Male', 44, 1, 1, 23, 3, 41)`);

	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame)
	
	VALUES
	("02","ZeroTwo@Gmail.com", "http://res.cloudinary.com/matchawtc/image/upload/v1579356468/userImages/tnb86gx1e8gnqkaurl0v.jpg", "$2b$10$bMG3yMTNIzvWzNC8zgiwkOOjGYjB0hVbBW5ec0F00z.mtR.r/Up8m", "Emma", "Perkins", 'bi', 'Female', 16, 1, 1, 32, 1, 15)	`);

	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame)
	
	VALUES
	("03","ZeroThree@Gmail.com", "http://res.cloudinary.com/matchawtc/image/upload/v1579357677/userImages/fzkxlcjthxhfk6bcmgue.jpg", "$2b$10$bMG3yMTNIzvWzNC8zgiwkOOjGYjB0hVbBW5ec0F00z.mtR.r/Up8m", "Anne", "Norris", 'homo', 'Female', 4, 1, 1, 42, 0, 4)`);
	
	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame)
	
	VALUES
	("04","ZeroFour@Gmail.com", "http://res.cloudinary.com/matchawtc/image/upload/v1579357827/userImages/wgnzajozsj1t9ulwasci.jpg", "$2b$10$bMG3yMTNIzvWzNC8zgiwkOOjGYjB0hVbBW5ec0F00z.mtR.r/Up8m", "Carolina", "Sainz", 'hetero', 'Female', 42, 1, 1, 30, 9, 31)`);

	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame)
	
	VALUES
	("05","ZeroFive@Gmail.com", "http://res.cloudinary.com/matchawtc/image/upload/v1579358508/userImages/mubt2gu7xoldsue4jmnd.jpg", "$2b$10$bMG3yMTNIzvWzNC8zgiwkOOjGYjB0hVbBW5ec0F00z.mtR.r/Up8m", "Natalie", "Dormer", 'bi', 'Female', 1, 1, 1, 18, 0, 1)`);

	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame)
	
	VALUES
	("06","ZeroSix@Gmail.com", "http://res.cloudinary.com/matchawtc/image/upload/v1579358645/userImages/ysaqncvrewbvsqgwlhuj.jpg", "$2b$10$bMG3yMTNIzvWzNC8zgiwkOOjGYjB0hVbBW5ec0F00z.mtR.r/Up8m", "Samantha", "Russell", 'homo', 'Female', 69, 1, 1, 27, 12, 57)`);

	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame)
	
	VALUES
	("07","ZeroSeven@Gmail.com", "http://res.cloudinary.com/matchawtc/image/upload/v1579358780/userImages/njs4dtmunec0dtg7dghf.jpg", "$2b$10$bMG3yMTNIzvWzNC8zgiwkOOjGYjB0hVbBW5ec0F00z.mtR.r/Up8m", "Abigail", "Smith", 'hetero', 'Female', 9, 1, 1, 35, 2, 7)`);
	
	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame)
	
	VALUES
	("12","OneTwo@Gmail.com", "http://res.cloudinary.com/matchawtc/image/upload/v1579359392/userImages/mu9w6dd6is0lvdncqka7.jpg", "$2b$10$bMG3yMTNIzvWzNC8zgiwkOOjGYjB0hVbBW5ec0F00z.mtR.r/Up8m", "John", "Wolf", 'bi', 'Male', 20, 1, 1, 30, 1, 19)`);
	
	DB.query(`
	INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame)
	
	VALUES
	("13","OneThree@Gmail.com", "http://res.cloudinary.com/matchawtc/image/upload/v1579359425/userImages/qhhixzr3zgefmlsjquqs.jpg", "$2b$10$bMG3yMTNIzvWzNC8zgiwkOOjGYjB0hVbBW5ec0F00z.mtR.r/Up8m", "Max", "Lopez", 'bi', 'Male', 3, 1, 1, 25, 0, 3)`);
	
	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame)
	
	VALUES
	("14","OneFour@Gmail.com", "http://res.cloudinary.com/matchawtc/image/upload/v1579359462/userImages/grc6bwgqy67nvh3fcnpa.jpg", "$2b$10$bMG3yMTNIzvWzNC8zgiwkOOjGYjB0hVbBW5ec0F00z.mtR.r/Up8m", "Mark", "Franks", 'homo', 'Male', 25, 1, 1, 32, 5, 20)`);
	
	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame)
	
	VALUES
	("15","OneFive@Gmail.com", "http://res.cloudinary.com/matchawtc/image/upload/v1579359493/userImages/jrkblgsuhlisoyyu9xlv.jpg", "$2b$10$bMG3yMTNIzvWzNC8zgiwkOOjGYjB0hVbBW5ec0F00z.mtR.r/Up8m", "Peter", "Carson", 'homo', 'Male', 30, 1, 1, 27, 12, 18)`);

	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame)
	
	VALUES
	("16","OneSix@Gmail.com", "http://res.cloudinary.com/matchawtc/image/upload/v1579359528/userImages/x2vhqw4pswu7zrkiorup.jpg", "$2b$10$bMG3yMTNIzvWzNC8zgiwkOOjGYjB0hVbBW5ec0F00z.mtR.r/Up8m", "Fred", "Miller", 'hetero', 'Male', 0, 1, 1, 40, 0, 0)`);

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
					unread BOOLEAN DEFAULT 1,
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
					AND table_name = 'likes'`,
		function (err, result) {
			if (err) throw err;
			if (result.length > 0) {
				// console.log('images table already exists');
			}
			else
			{
				console.log('likes table not found.');
				var sql = `CREATE TABLE IF NOT EXISTS likes (
					liked LONGTEXT,
					liker LONGTEXT,
					unread BOOLEAN default 1
					);`
				conn.query(sql, function (err, result) {
					if (err) throw err;
					console.log("likes table created");
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
					AND table_name = 'views'`,
		function (err, result) {
			if (err) throw err;
			if (result.length > 0) {
				// console.log('images table already exists');
			}
			else
			{
				console.log('views table not found.');
				var sql = `CREATE TABLE IF NOT EXISTS views (
					viewed LONGTEXT,
					viewer LONGTEXT,
					unread BOOLEAN default 1
					);`
				conn.query(sql, function (err, result) {
					if (err) throw err;
					console.log("views table created");
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
					AND table_name = 'interests'`,
		function (err, result) {
			if (err) throw err;
			if (result.length > 0) {
				// console.log('images table already exists');
			}
			else
			{
				console.log('interests table not found.');
				var sql = `CREATE TABLE IF NOT EXISTS interests (
					interest varchar(32),
					user TINYTEXT
					);`
				conn.query(sql, function (err, result) {
					if (err) throw err;
					console.log("interests table created");
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
					AND table_name = 'friends'`,
		function (err, result) {
			if (err) throw err;
			if (result.length > 0) {
				// console.log('images table already exists');
			}
			else
			{
				console.log('friends table not found.');
				var sql = `CREATE TABLE IF NOT EXISTS friends (
					user1 LONGTEXT,
					user2 LONGTEXT
					);`
				conn.query(sql, function (err, result) {
					if (err) throw err;
					console.log("friends table created");
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
					AND table_name = 'dislikes'`,
		function (err, result) {
			if (err) throw err;
			if (result.length > 0) {
				// console.log('images table already exists');
			}
			else
			{
				console.log('dislikes table not found.');
				var sql = `CREATE TABLE IF NOT EXISTS dislikes (
					disliked LONGTEXT,
					disliker LONGTEXT,
					unread BOOLEAN default 1
					);`
				conn.query(sql, function (err, result) {
					if (err) throw err;
					console.log("dislikes table created");
				});
			}
		});
	});
}

// Fake Users











module.exports.setupDB = setupDB;