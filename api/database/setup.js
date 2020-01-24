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

					// USERS

					DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame, userBiography, userLocationlat, userLocationlng, lastOnline)
	
	VALUES
	("17","OneSeven@Gmail.com", "http://res.cloudinary.com/matchawtc/image/upload/v1579359558/userImages/fju5dlijo6t3pr99tzjm.jpg", "$2b$10$bMG3yMTNIzvWzNC8zgiwkOOjGYjB0hVbBW5ec0F00z.mtR.r/Up8m", "Bob", "Musk", 'hetero', 'Male', 44, 1, 1, 23, 3, 41, "Lorem Ipsum", -33.9513, 18.3831, 2019-05-12 21:04)`);

	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame, userBiography, userLocationlat, userLocationlng, lastOnline)
	
	VALUES
	("02","ZeroTwo@Gmail.com", "http://res.cloudinary.com/matchawtc/image/upload/v1579356468/userImages/tnb86gx1e8gnqkaurl0v.jpg", "$2b$10$bMG3yMTNIzvWzNC8zgiwkOOjGYjB0hVbBW5ec0F00z.mtR.r/Up8m", "Emma", "Perkins", 'bi', 'Female', 16, 1, 1, 32, 1, 15, "Lorem Ipsum", -33.917, 18.3875, 2020-01-03 04:20)`);

	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame, userBiography, userLocationlat, userLocationlng, lastOnline)
	
	VALUES
	("03","ZeroThree@Gmail.com", "http://res.cloudinary.com/matchawtc/image/upload/v1579357677/userImages/fzkxlcjthxhfk6bcmgue.jpg", "$2b$10$bMG3yMTNIzvWzNC8zgiwkOOjGYjB0hVbBW5ec0F00z.mtR.r/Up8m", "Anne", "Norris", 'homo', 'Female', 4, 1, 1, 42, 0, 4, "Lorem Ipsum", -33.9411, 18.4232, 2020-01-22 12:22)`);
	
	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame, userBiography, userLocationlat, userLocationlng, lastOnline)
	
	VALUES
	("04","ZeroFour@Gmail.com", "http://res.cloudinary.com/matchawtc/image/upload/v1579357827/userImages/wgnzajozsj1t9ulwasci.jpg", "$2b$10$bMG3yMTNIzvWzNC8zgiwkOOjGYjB0hVbBW5ec0F00z.mtR.r/Up8m", "Carolina", "Sainz", 'hetero', 'Female', 42, 1, 1, 30, 9, 31, "Lorem Ipsum", -33.8275, 18.6527, 2019-12-30 15:39)`);

	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame, userBiography, userLocationlat, userLocationlng, lastOnline)
	
	VALUES
	("05","ZeroFive@Gmail.com", "http://res.cloudinary.com/matchawtc/image/upload/v1579358508/userImages/mubt2gu7xoldsue4jmnd.jpg", "$2b$10$bMG3yMTNIzvWzNC8zgiwkOOjGYjB0hVbBW5ec0F00z.mtR.r/Up8m", "Natalie", "Dormer", 'bi', 'Female', 1, 1, 1, 18, 0, 1, "Lorem Ipsum", -33.9249, 18.4241, 2019-12-25 18:44)`);

	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame, userBiography, userLocationlat, userLocationlng, lastOnline)
	
	VALUES
	("06","ZeroSix@Gmail.com", "http://res.cloudinary.com/matchawtc/image/upload/v1579358645/userImages/ysaqncvrewbvsqgwlhuj.jpg", "$2b$10$bMG3yMTNIzvWzNC8zgiwkOOjGYjB0hVbBW5ec0F00z.mtR.r/Up8m", "Samantha", "Russell", 'homo', 'Female', 69, 1, 1, 27, 12, 57, "Lorem Ipsum", -33.866, 18.5344, 2020-01-11 13:59)`);

	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame, userBiography, userLocationlat, userLocationlng, lastOnline)
	
	VALUES
	("07","ZeroSeven@Gmail.com", "http://res.cloudinary.com/matchawtc/image/upload/v1579358780/userImages/njs4dtmunec0dtg7dghf.jpg", "$2b$10$bMG3yMTNIzvWzNC8zgiwkOOjGYjB0hVbBW5ec0F00z.mtR.r/Up8m", "Abigail", "Smith", 'hetero', 'Female', 9, 1, 1, 35, 2, 7, "Lorem Ipsum", -34.0257, 20.4381, 2020-01-07 23:04)`);
	
	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame, userBiography, userLocationlat, userLocationlng, lastOnline)
	
	VALUES
	("12","OneTwo@Gmail.com", "http://res.cloudinary.com/matchawtc/image/upload/v1579359392/userImages/mu9w6dd6is0lvdncqka7.jpg", "$2b$10$bMG3yMTNIzvWzNC8zgiwkOOjGYjB0hVbBW5ec0F00z.mtR.r/Up8m", "John", "Wolf", 'bi', 'Male', 20, 1, 1, 30, 1, 19, "Lorem Ipsum", -33.8975, 19.1523, 2019-11-14 19:27)`);
	
	DB.query(`
	INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame, userBiography, userLocationlat, userLocationlng, lastOnline)
	
	VALUES
	("13","OneThree@Gmail.com", "http://res.cloudinary.com/matchawtc/image/upload/v1579359425/userImages/qhhixzr3zgefmlsjquqs.jpg", "$2b$10$bMG3yMTNIzvWzNC8zgiwkOOjGYjB0hVbBW5ec0F00z.mtR.r/Up8m", "Max", "Lopez", 'bi', 'Male', 3, 1, 1, 25, 0, 3, "Lorem Ipsum", -34.0258, 18.4231, 2020-01-04 18:45)`);
	
	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame, userBiography, userLocationlat, userLocationlng, lastOnline)
	
	VALUES
	("14","OneFour@Gmail.com", "http://res.cloudinary.com/matchawtc/image/upload/v1579359462/userImages/grc6bwgqy67nvh3fcnpa.jpg", "$2b$10$bMG3yMTNIzvWzNC8zgiwkOOjGYjB0hVbBW5ec0F00z.mtR.r/Up8m", "Mark", "Franks", 'homo', 'Male', 25, 1, 1, 32, 5, 20, "Lorem Ipsum", -34.0209, 18.3683, 2020-01-20 13:37)`);
	
	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame, userBiography, userLocationlat, userLocationlng, lastOnline)
	
	VALUES
	("15","OneFive@Gmail.com", "http://res.cloudinary.com/matchawtc/image/upload/v1579359493/userImages/jrkblgsuhlisoyyu9xlv.jpg", "$2b$10$bMG3yMTNIzvWzNC8zgiwkOOjGYjB0hVbBW5ec0F00z.mtR.r/Up8m", "Peter", "Carson", 'homo', 'Male', 30, 1, 1, 27, 12, 18, "Lorem Ipsum", -33.9321, 18.8602, 2020-01-24 14:43)`);

	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame, userBiography, userLocationlat, userLocationlng, lastOnline)
	
	VALUES
	("16","OneSix@Gmail.com", "http://res.cloudinary.com/matchawtc/image/upload/v1579359528/userImages/x2vhqw4pswu7zrkiorup.jpg", "$2b$10$bMG3yMTNIzvWzNC8zgiwkOOjGYjB0hVbBW5ec0F00z.mtR.r/Up8m", "Fred", "Miller", 'hetero', 'Male', 0, 1, 1, 40, 0, 0, "Lorem Ipsum", -33.9036, 18.4205, 2020-01-18 01:39)`);

	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame, userBiography, userLocationlat, userLocationlng, lastOnline)
	
	VALUES
	("charlie","cdiogo@student.wethinkcode.co.za", "", "$2b$10$m1rtnpvWg.WSXjj3.Z./1uVvcV6rMyRzvtDiOaTrAuBBjvb5Y3XFu", "Calvin", "Diogo", 'hetero', 'Male', 5, 1, 1, 22, 0, 5, "I like planes", -33.9353, 18.4083, 2020-03-05 13:37)`);

	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame, userBiography, userLocationlat, userLocationlng, lastOnline)
	
	VALUES
	("jeff","jlimbada@student.wethinkcode.co.za", "", "$2b$10$m1rtnpvWg.WSXjj3.Z./1uVvcV6rMyRzvtDiOaTrAuBBjvb5Y3XFu", "Jeff", "Limbless", 'bi', 'Male', 69, 1, 1, 20, 42, 27, "We live in a society", -33.8943, 18.6294, 2020-01-29 04:20)`);

	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame, userBiography, userLocationlat, userLocationlng, lastOnline)
	
	VALUES
	("yuuki","ctaljaar@student.wethinkcode.co.za", "", "$2b$10$m1rtnpvWg.WSXjj3.Z./1uVvcV6rMyRzvtDiOaTrAuBBjvb5Y3XFu", "Cameron", "Taljaard", 'hetero', 'Male', 42, 1, 1, 24, 21, 21, "Sleep is for the weak.", -33.8333, 18.649, 2020-06-12 00:07)`);

	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame, userBiography, userLocationlat, userLocationlng, lastOnline)
	
	VALUES
	("bwebb","bwebb@student.wethinkcode.co.za", "", "$2b$10$m1rtnpvWg.WSXjj3.Z./1uVvcV6rMyRzvtDiOaTrAuBBjvb5Y3XFu", "Ben", "Webb", 'hetero', 'Male', 17, 1, 1, 21, 3, 14, "Manga is life!", -33.9413, 18.4128, 2020-09-13 23:40)`);


	// IMAGES - Profile Images

	// DB.query(`INSERT INTO images
	// (imageOwner, image, active)

	// VALUES
	// ("charlie","",1)`);

	// DB.query(`INSERT INTO images
	// (imageOwner, image, active)

	// VALUES
	// ("bwebb","",1)`);

	// DB.query(`INSERT INTO images
	// (imageOwner, image, active)

	// VALUES
	// ("yuuki","",1)`);

	// DB.query(`INSERT INTO images
	// (imageOwner, image, active)

	// VALUES
	// ("jeff","",1)`);

	// DB.query(`INSERT INTO images
	// (imageOwner, image, active)

	// VALUES
	// ("02","",1)`);

	// DB.query(`INSERT INTO images
	// (imageOwner, image, active)

	// VALUES
	// ("03","",1)`);

	// DB.query(`INSERT INTO images
	// (imageOwner, image, active)

	// VALUES
	// ("04","",1)`);

	// DB.query(`INSERT INTO images
	// (imageOwner, image, active)

	// VALUES
	// ("05","",1)`);

	// DB.query(`INSERT INTO images
	// (imageOwner, image, active)

	// VALUES
	// ("06","",1)`);

	// DB.query(`INSERT INTO images
	// (imageOwner, image, active)

	// VALUES
	// ("07","",1)`);

	// DB.query(`INSERT INTO images
	// (imageOwner, image, active)

	// VALUES
	// ("12","",1)`);

	// DB.query(`INSERT INTO images
	// (imageOwner, image, active)

	// VALUES
	// ("13","",1)`);

	// DB.query(`INSERT INTO images
	// (imageOwner, image, active)

	// VALUES
	// ("14","",1)`);

	// DB.query(`INSERT INTO images
	// (imageOwner, image, active)

	// VALUES
	// ("15","",1)`);

	// DB.query(`INSERT INTO images
	// (imageOwner, image, active)

	// VALUES
	// ("16","",1)`);

	// DB.query(`INSERT INTO images
	// (imageOwner, image, active)

	// VALUES
	// ("17","",1)`);

	// IMAGES - random 2nd test image

	DB.query(`INSERT INTO images
	(imageOwner, image, active)

	VALUES
	("charlie","https://res.cloudinary.com/matchawtc/image/upload/v1579871481/userImages/olr3fym3d8vclzjpcdeu.jpg",0)`);

	DB.query(`INSERT INTO images
	(imageOwner, image, active)

	VALUES
	("bwebb","https://res.cloudinary.com/matchawtc/image/upload/v1579871481/userImages/olr3fym3d8vclzjpcdeu.jpg",0)`);

	DB.query(`INSERT INTO images
	(imageOwner, image, active)

	VALUES
	("yuuki","https://res.cloudinary.com/matchawtc/image/upload/v1579871481/userImages/olr3fym3d8vclzjpcdeu.jpg",0)`);

	DB.query(`INSERT INTO images
	(imageOwner, image, active)

	VALUES
	("jeff","https://res.cloudinary.com/matchawtc/image/upload/v1579871481/userImages/olr3fym3d8vclzjpcdeu.jpg",0)`);

	DB.query(`INSERT INTO images
	(imageOwner, image, active)

	VALUES
	("02","https://res.cloudinary.com/matchawtc/image/upload/v1579871481/userImages/olr3fym3d8vclzjpcdeu.jpg",0)`);

	DB.query(`INSERT INTO images
	(imageOwner, image, active)

	VALUES
	("03","https://res.cloudinary.com/matchawtc/image/upload/v1579871481/userImages/olr3fym3d8vclzjpcdeu.jpg",0)`);

	DB.query(`INSERT INTO images
	(imageOwner, image, active)

	VALUES
	("04","https://res.cloudinary.com/matchawtc/image/upload/v1579871481/userImages/olr3fym3d8vclzjpcdeu.jpg",0)`);

	DB.query(`INSERT INTO images
	(imageOwner, image, active)

	VALUES
	("05","https://res.cloudinary.com/matchawtc/image/upload/v1579871481/userImages/olr3fym3d8vclzjpcdeu.jpg",0)`);

	DB.query(`INSERT INTO images
	(imageOwner, image, active)

	VALUES
	("06","https://res.cloudinary.com/matchawtc/image/upload/v1579871481/userImages/olr3fym3d8vclzjpcdeu.jpg",0)`);

	DB.query(`INSERT INTO images
	(imageOwner, image, active)

	VALUES
	("07","https://res.cloudinary.com/matchawtc/image/upload/v1579871481/userImages/olr3fym3d8vclzjpcdeu.jpg",0)`);

	DB.query(`INSERT INTO images
	(imageOwner, image, active)

	VALUES
	("12","https://res.cloudinary.com/matchawtc/image/upload/v1579871481/userImages/olr3fym3d8vclzjpcdeu.jpg",0)`);

	DB.query(`INSERT INTO images
	(imageOwner, image, active)

	VALUES
	("13","https://res.cloudinary.com/matchawtc/image/upload/v1579871481/userImages/olr3fym3d8vclzjpcdeu.jpg",0)`);

	DB.query(`INSERT INTO images
	(imageOwner, image, active)

	VALUES
	("14","https://res.cloudinary.com/matchawtc/image/upload/v1579871481/userImages/olr3fym3d8vclzjpcdeu.jpg",0)`);

	DB.query(`INSERT INTO images
	(imageOwner, image, active)

	VALUES
	("15","https://res.cloudinary.com/matchawtc/image/upload/v1579871481/userImages/olr3fym3d8vclzjpcdeu.jpg",0)`);

	DB.query(`INSERT INTO images
	(imageOwner, image, active)

	VALUES
	("16","https://res.cloudinary.com/matchawtc/image/upload/v1579871481/userImages/olr3fym3d8vclzjpcdeu.jpg",0)`);

	DB.query(`INSERT INTO images
	(imageOwner, image, active)

	VALUES
	("17","https://res.cloudinary.com/matchawtc/image/upload/v1579871481/userImages/olr3fym3d8vclzjpcdeu.jpg",0)`);

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
					type INT(1) NOT NULL,
					liked LONGTEXT NOT NULL,
					liker LONGTEXT NOT NULL,
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
					AND table_name = 'blocks'`,
		function (err, result) {
			if (err) throw err;
			if (result.length > 0) {
				// console.log('images table already exists');
			}
			else
			{
				console.log('blocks table not found.');
				var sql = `CREATE TABLE IF NOT EXISTS blocks (
					blocker LONGTEXT,
					blocked LONGTEXT
					);`
				conn.query(sql, function (err, result) {
					if (err) throw err;
					console.log("blocks table created");
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
					AND table_name = 'reports'`,
		function (err, result) {
			if (err) throw err;
			if (result.length > 0) {
				// console.log('images table already exists');
			}
			else
			{
				console.log('reports table not found.');
				var sql = `CREATE TABLE IF NOT EXISTS reports (
					reported LONGTEXT,
					reporter LONGTEXT
					);`
				conn.query(sql, function (err, result) {
					if (err) throw err;
					console.log("reports table created");
				});
			}
		});
	});
}

// Fake Users











module.exports.setupDB = setupDB;