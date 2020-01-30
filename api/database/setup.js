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
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame, userBiography, userLocationlat, userLocationlng, lastOnline, userCode)
	
	VALUES
	("17","OneSeven@Gmail.com", "http://res.cloudinary.com/matchawtc/image/upload/v1579359558/userImages/zuplqlxqvhgnmbmidcoi.jpg", "$2b$10$bMG3yMTNIzvWzNC8zgiwkOOjGYjB0hVbBW5ec0F00z.mtR.r/Up8m", "Bob", "Musk", 'hetero', 'Male', 44, 1, 1, 23, 3, 41, "Lorem Ipsum", -33.9513, 18.3831, '2019-05-12 21:04', '70efdf2ec9b086079795c442636b55fb')`);

	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame, userBiography, userLocationlat, userLocationlng, lastOnline, userCode)
	
	VALUES
	("02","ZeroTwo@Gmail.com", "http://res.cloudinary.com/matchawtc/image/upload/v1580151878/userImages/cjigj5kilzo9ew1f45uw.jpg", "$2b$10$bMG3yMTNIzvWzNC8zgiwkOOjGYjB0hVbBW5ec0F00z.mtR.r/Up8m", "Emma", "Perkins", 'bi', 'Female', 16, 1, 1, 24, 1, 15, "Lorem Ipsum", -33.917, 18.3875, '2020-01-03 04:20', 'a2ef406e2c2351e0b9e80029c909242d')`);

	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame, userBiography, userLocationlat, userLocationlng, lastOnline, userCode)
	
	VALUES
	("03","ZeroThree@Gmail.com", "http://res.cloudinary.com/matchawtc/image/upload/v1579357677/userImages/oqtftxxjmfpjqzxxjmev.jpg", "$2b$10$bMG3yMTNIzvWzNC8zgiwkOOjGYjB0hVbBW5ec0F00z.mtR.r/Up8m", "Anne", "Norris", 'homo', 'Female', 4, 1, 1, 27, 0, 4, "Lorem Ipsum", -33.9411, 18.4232, '2020-01-22 12:22', 'e45ee7ce7e88149af8dd32b27f9512ce')`);
	
	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame, userBiography, userLocationlat, userLocationlng, lastOnline, userCode)
	
	VALUES
	("04","ZeroFour@Gmail.com", "http://res.cloudinary.com/matchawtc/image/upload/v1579357827/userImages/xuaiz8kzjxzbpoeycnqe.jpg", "$2b$10$bMG3yMTNIzvWzNC8zgiwkOOjGYjB0hVbBW5ec0F00z.mtR.r/Up8m", "Carolina", "Sainz", 'hetero', 'Female', 42, 1, 1, 20, 9, 31, "Lorem Ipsum", -33.8275, 18.6527, '2019-12-30 15:39', '7d0665438e81d8eceb98c1e31fca80c1')`);

	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame, userBiography, userLocationlat, userLocationlng, lastOnline, userCode)
	
	VALUES
	("05","ZeroFive@Gmail.com", "http://res.cloudinary.com/matchawtc/image/upload/v1579358508/userImages/cwwilqxqquidhbga2bij.jpg", "$2b$10$bMG3yMTNIzvWzNC8zgiwkOOjGYjB0hVbBW5ec0F00z.mtR.r/Up8m", "Natalie", "Dormer", 'bi', 'Female', 1, 1, 1, 18, 0, 1, "Lorem Ipsum", -33.9249, 18.4241, '2019-12-25 18:44', '751d31dd6b56b26b29dac2c0e1839e34')`);

	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame, userBiography, userLocationlat, userLocationlng, lastOnline, userCode)
	
	VALUES
	("06","ZeroSix@Gmail.com", "http://res.cloudinary.com/matchawtc/image/upload/v1579358645/userImages/nndc2mrxlfdganrctysn.jpg", "$2b$10$bMG3yMTNIzvWzNC8zgiwkOOjGYjB0hVbBW5ec0F00z.mtR.r/Up8m", "Samantha", "Russell", 'homo', 'Female', 69, 1, 1, 25, 12, 57, "Lorem Ipsum", -33.866, 18.5344, '2020-01-11 13:59', 'faeac4e1eef307c2ab7b0a3821e6c667')`);

	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame, userBiography, userLocationlat, userLocationlng, lastOnline, userCode)
	
	VALUES
	("07","ZeroSeven@Gmail.com", "http://res.cloudinary.com/matchawtc/image/upload/v1579358780/userImages/axz7w06vbrkp3cybadd5.jpg", "$2b$10$bMG3yMTNIzvWzNC8zgiwkOOjGYjB0hVbBW5ec0F00z.mtR.r/Up8m", "Abigail", "Smith", 'hetero', 'Female', 9, 1, 1, 23, 2, 7, "Lorem Ipsum", -34.0257, 20.4381, '2020-01-07 23:04', 'd72d187df41e10ea7d9fcdc7f5909205')`);
	
	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame, userBiography, userLocationlat, userLocationlng, lastOnline, userCode)
	
	VALUES
	("12","OneTwo@Gmail.com", "http://res.cloudinary.com/matchawtc/image/upload/v1579359392/userImages/vkokehnnoalmpcvohs5p.jpg", "$2b$10$bMG3yMTNIzvWzNC8zgiwkOOjGYjB0hVbBW5ec0F00z.mtR.r/Up8m", "John", "Wolf", 'bi', 'Male', 20, 1, 1, 30, 1, 19, "Lorem Ipsum", -33.8975, 19.1523, '2019-11-14 19:27', 'c20ad4d76fe97759aa27a0c99bff6710')`);
	
	DB.query(`
	INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame, userBiography, userLocationlat, userLocationlng, lastOnline, userCode)
	
	VALUES
	("13","OneThree@Gmail.com", "http://res.cloudinary.com/matchawtc/image/upload/v1579359425/userImages/l3ryh11wsflhjiqlutdg.jpg", "$2b$10$bMG3yMTNIzvWzNC8zgiwkOOjGYjB0hVbBW5ec0F00z.mtR.r/Up8m", "Max", "Lopez", 'bi', 'Male', 3, 1, 1, 25, 0, 3, "Lorem Ipsum", -34.0258, 18.4231, '2020-01-04 18:45', 'c51ce410c124a10e0db5e4b97fc2af39')`);
	
	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame, userBiography, userLocationlat, userLocationlng, lastOnline, userCode)
	
	VALUES
	("14","OneFour@Gmail.com", "http://res.cloudinary.com/matchawtc/image/upload/v1579359462/userImages/taewpnk3qxte7ubvqeg0.jpg", "$2b$10$bMG3yMTNIzvWzNC8zgiwkOOjGYjB0hVbBW5ec0F00z.mtR.r/Up8m", "Mark", "Franks", 'homo', 'Male', 25, 1, 1, 32, 5, 20, "Lorem Ipsum", -34.0209, 18.3683, '2020-01-20 13:37', 'aab3238922bcc25a6f606eb525ffdc56')`);
	
	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame, userBiography, userLocationlat, userLocationlng, lastOnline, userCode)
	
	VALUES
	("15","OneFive@Gmail.com", "http://res.cloudinary.com/matchawtc/image/upload/v1579359493/userImages/ftowzroujru1nxu21jd4.jpg", "$2b$10$bMG3yMTNIzvWzNC8zgiwkOOjGYjB0hVbBW5ec0F00z.mtR.r/Up8m", "Peter", "Carson", 'homo', 'Male', 30, 1, 1, 27, 12, 18, "Lorem Ipsum", -33.9321, 18.8602, '2020-01-24 14:43', '9bf31c7ff062936a96d3c8bd1f8f2ff3')`);

	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame, userBiography, userLocationlat, userLocationlng, lastOnline, userCode)
	
	VALUES
	("16","OneSix@Gmail.com", "http://res.cloudinary.com/matchawtc/image/upload/v1579359528/userImages/hixuoduufhjcoiot5cyj.jpg", "$2b$10$bMG3yMTNIzvWzNC8zgiwkOOjGYjB0hVbBW5ec0F00z.mtR.r/Up8m", "Fred", "Miller", 'hetero', 'Male', 0, 1, 1, 40, 0, 0, "Lorem Ipsum", -33.9036, 18.4205, '2020-01-18 01:39', 'c74d97b01eae257e44aa9d5bade97baf')`);

	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame, userBiography, userLocationlat, userLocationlng, lastOnline, userCode)
	
	VALUES
	("charlie","cdiogo@student.wethinkcode.co.za", "http://res.cloudinary.com/matchawtc/image/upload/v1580151769/userImages/o7kle5svkya3b4wye6hu.jpg", "$2b$10$m1rtnpvWg.WSXjj3.Z./1uVvcV6rMyRzvtDiOaTrAuBBjvb5Y3XFu", "Calvin", "Diogo", 'hetero', 'Male', 5, 1, 1, 22, 0, 5, "I like planes", -33.9353, 18.4083, '2020-03-05 13:37', 'bf779e0933a882808585d19455cd7937')`);

	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame, userBiography, userLocationlat, userLocationlng, lastOnline, userCode)
	
	VALUES
	("jeff","jlimbada@student.wethinkcode.co.za", "http://res.cloudinary.com/matchawtc/image/upload/v1580153634/userImages/phouboxmblhq28vzi4qd.jpg", "$2b$10$m1rtnpvWg.WSXjj3.Z./1uVvcV6rMyRzvtDiOaTrAuBBjvb5Y3XFu", "Jeff", "Limbless", 'bi', 'Male', 69, 1, 1, 20, 42, 27, "We live in a society", -33.8943, 18.6294, '2020-01-29 04:20', '166ee015c0e0934a8781e0c86a197c6e')`);

	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame, userBiography, userLocationlat, userLocationlng, lastOnline, userCode)
	
	VALUES
	("yuuki","ctaljaar@student.wethinkcode.co.za", "http://res.cloudinary.com/matchawtc/image/upload/v1580153645/userImages/ssgupuk4bo2lj45atsub.jpg", "$2b$10$m1rtnpvWg.WSXjj3.Z./1uVvcV6rMyRzvtDiOaTrAuBBjvb5Y3XFu", "Cameron", "Taljaard", 'hetero', 'Male', 42, 1, 1, 24, 21, 21, "Sleep is for the weak.", -33.8333, 18.649, '2020-06-12 00:07', 'bf8fbb366e7dfe389c6fbb8e39ef532b')`);

	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame, userBiography, userLocationlat, userLocationlng, lastOnline, userCode)
	
	VALUES
	("bwebb","bwebb@student.wethinkcode.co.za", "http://res.cloudinary.com/matchawtc/image/upload/v1580153621/userImages/ogcjliuebcnuwmjlyl0s.jpg", "$2b$10$m1rtnpvWg.WSXjj3.Z./1uVvcV6rMyRzvtDiOaTrAuBBjvb5Y3XFu", "Ben", "Webb", 'hetero', 'Male', 17, 1, 1, 21, 3, 14, "Manga is life!", -33.9413, 18.4128, '2020-09-13 23:40', 'f2ce2daa60191398521de69ad5610409')`);

	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame, userBiography, userLocationlat, userLocationlng, lastOnline, userCode)
	
	VALUES
	("nharris","harrisn@legit-email.co.za", "", "$2b$10$m1rtnpvWg.WSXjj3.Z./1uVvcV6rMyRzvtDiOaTrAuBBjvb5Y3XFu", "Nadia", "Harris", 'bi', 'Female', 23, 1, 1, 29, 3, 20, "Lorem Ipsum", -33.9655, 18.4783, '2019-11-9 21:12', '8eb7fbd816cdf187605bbb3c9a9ae14e')`);

	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame, userBiography, userLocationlat, userLocationlng, lastOnline, userCode)
	
	VALUES
	("vera","veronica@legit-email.co.za", "", "$2b$10$m1rtnpvWg.WSXjj3.Z./1uVvcV6rMyRzvtDiOaTrAuBBjvb5Y3XFu", "Veronica", "Clarke", 'hetero', 'Female', 30, 1, 1, 30, 12, 18, "Lorem Ipsum", -33.9518, 18.3825, '2019-12-17 10:09', '4341dfaa7259082022147afd371b69c3')`);

	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame, userBiography, userLocationlat, userLocationlng, lastOnline, userCode)
	
	VALUES
	("skyzer","skyzer@legit-email.co.za", "", "$2b$10$m1rtnpvWg.WSXjj3.Z./1uVvcV6rMyRzvtDiOaTrAuBBjvb5Y3XFu", "Skye", "Hubbard", 'homo', 'Female', 15, 1, 1, 43, 4, 11, "Lorem Ipsum", -34.0538, 24.923, '2020-01-02 01:12', 'f0dd736148864cbfadf0841c7f1b86ca')`);

	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame, userBiography, userLocationlat, userLocationlng, lastOnline, userCode)
	
	VALUES
	("devon","dev@legit-email.co.za", "", "$2b$10$m1rtnpvWg.WSXjj3.Z./1uVvcV6rMyRzvtDiOaTrAuBBjvb5Y3XFu", "Devon", "Bolton", 'bi', 'Male', 26, 1, 1, 17, 26, 0, "Lorem Ipsum", -34.0502, 18.5036, '2020-01-15 03:40', '6fd72a631eae188cbf8b9b767a6b8a8b')`);
	
	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame, userBiography, userLocationlat, userLocationlng, lastOnline, userCode)
	
	VALUES
	("johnnysilv","samurai@legit-email.co.za", "", "$2b$10$m1rtnpvWg.WSXjj3.Z./1uVvcV6rMyRzvtDiOaTrAuBBjvb5Y3XFu", "Johnny", "Silverhands", 'hetero', 'Male', 50, 1, 1, 26, 23, 37, "Lorem Ipsum", -33.8908, 18.5100, '2020-09-17 00:01', 'eb56c37a7f2efe27652d3ea6c16182e7')`);
					// vvv FAKE USER vvv
	DB.query(`INSERT INTO users
	(username, userEmail, userImage, userPassword, userFirstName, userLastName, userOrientation, userGender, userLikes, userVerified, accountComplete, userAge, userDislikes, userFame, userBiography, userLocationlat, userLocationlng, lastOnline, userCode)
	
	VALUES
	("bigboss","bossman@legit-email.co.za", "", "$2b$10$m1rtnpvWg.WSXjj3.Z./1uVvcV6rMyRzvtDiOaTrAuBBjvb5Y3XFu", "Big", "Boss", 'homo', 'Male', 18, 1, 1, 41, 38, -20, "Lorem Ipsum", 25.1179, 55.1333, '2020-01-29 09:21', '747bda46b83d0f642ccb846d9a8c1cbe')`);

	// IMAGES - Profile Images

	DB.query(`INSERT INTO images VALUES
	("charlie","http://res.cloudinary.com/matchawtc/image/upload/v1580151769/userImages/o7kle5svkya3b4wye6hu.jpg", 1)`);

	DB.query(`INSERT INTO images VALUES
	("bwebb","http://res.cloudinary.com/matchawtc/image/upload/v1580153621/userImages/ogcjliuebcnuwmjlyl0s.jpg", 1)`);

	DB.query(`INSERT INTO images VALUES
	("yuuki","http://res.cloudinary.com/matchawtc/image/upload/v1580153645/userImages/ssgupuk4bo2lj45atsub.jpg", 1)`);

	DB.query(`INSERT INTO images VALUES
	("jeff","http://res.cloudinary.com/matchawtc/image/upload/v1580153634/userImages/phouboxmblhq28vzi4qd.jpg", 1)`);

	DB.query(`INSERT INTO images VALUES
	("02","http://res.cloudinary.com/matchawtc/image/upload/v1580151878/userImages/cjigj5kilzo9ew1f45uw.jpg", 1)`);

	DB.query(`INSERT INTO images VALUES
	("03","http://res.cloudinary.com/matchawtc/image/upload/v1579357677/userImages/oqtftxxjmfpjqzxxjmev.jpg", 1)`);

	DB.query(`INSERT INTO images VALUES
	("04","http://res.cloudinary.com/matchawtc/image/upload/v1579357827/userImages/xuaiz8kzjxzbpoeycnqe.jpg", 1)`);

	DB.query(`INSERT INTO images VALUES
	("05","http://res.cloudinary.com/matchawtc/image/upload/v1579358508/userImages/cwwilqxqquidhbga2bij.jpg", 1)`);

	DB.query(`INSERT INTO images VALUES
	("06","http://res.cloudinary.com/matchawtc/image/upload/v1579358645/userImages/nndc2mrxlfdganrctysn.jpg", 1)`);

	DB.query(`INSERT INTO images VALUES
	("07","http://res.cloudinary.com/matchawtc/image/upload/v1579358780/userImages/axz7w06vbrkp3cybadd5.jpg", 1)`);

	DB.query(`INSERT INTO images VALUES
	("12","http://res.cloudinary.com/matchawtc/image/upload/v1579359392/userImages/vkokehnnoalmpcvohs5p.jpg", 1)`);

	DB.query(`INSERT INTO images VALUES
	("13","http://res.cloudinary.com/matchawtc/image/upload/v1579359425/userImages/l3ryh11wsflhjiqlutdg.jpg", 1)`);

	DB.query(`INSERT INTO images VALUES
	("14","http://res.cloudinary.com/matchawtc/image/upload/v1579359462/userImages/taewpnk3qxte7ubvqeg0.jpg", 1)`);

	DB.query(`INSERT INTO images VALUES
	("15","http://res.cloudinary.com/matchawtc/image/upload/v1579359493/userImages/ftowzroujru1nxu21jd4.jpg", 1)`);

	DB.query(`INSERT INTO images VALUES
	("16","http://res.cloudinary.com/matchawtc/image/upload/v1579359528/userImages/hixuoduufhjcoiot5cyj.jpg", 1)`);

	DB.query(`INSERT INTO images VALUES
	("17","http://res.cloudinary.com/matchawtc/image/upload/v1579359558/userImages/zuplqlxqvhgnmbmidcoi.jpg", 1)`);

	// DB.query(`INSERT INTO images
	// (imageOwner, image, active)

	// VALUES
	// ("nharris","",1)`);

	// DB.query(`INSERT INTO images
	// (imageOwner, image, active)

	// VALUES
	// ("vera","",1)`);

	// DB.query(`INSERT INTO images
	// (imageOwner, image, active)

	// VALUES
	// ("skyzer","",1)`);

	// DB.query(`INSERT INTO images
	// (imageOwner, image, active)

	// VALUES
	// ("johnnysilv","",1)`);

	// DB.query(`INSERT INTO images
	// (imageOwner, image, active)

	// VALUES
	// ("bigboss","",1)`);

	// DB.query(`INSERT INTO images
	// (imageOwner, image, active)

	// VALUES
	// ("devon","",1)`);

	// IMAGES - random 2nd test image

	DB.query(`INSERT INTO images VALUES
	("charlie", "https://res.cloudinary.com/matchawtc/image/upload/v1579871481/userImages/olr3fym3d8vclzjpcdeu.jpg", 0)`);

	DB.query(`INSERT INTO images VALUES
	("bwebb", "https://res.cloudinary.com/matchawtc/image/upload/v1579871481/userImages/olr3fym3d8vclzjpcdeu.jpg", 0)`);

	DB.query(`INSERT INTO images VALUES
	("yuuki", "https://res.cloudinary.com/matchawtc/image/upload/v1579871481/userImages/olr3fym3d8vclzjpcdeu.jpg", 0)`);

	DB.query(`INSERT INTO images VALUES
	("jeff", "https://res.cloudinary.com/matchawtc/image/upload/v1579871481/userImages/olr3fym3d8vclzjpcdeu.jpg", 0)`);

	DB.query(`INSERT INTO images
	(imageOwner, image, active)

	VALUES
	("02", "https://res.cloudinary.com/matchawtc/image/upload/v1579871481/userImages/olr3fym3d8vclzjpcdeu.jpg", 0)`);

	DB.query(`INSERT INTO images VALUES
	("03", "https://res.cloudinary.com/matchawtc/image/upload/v1579871481/userImages/olr3fym3d8vclzjpcdeu.jpg", 0)`);

	DB.query(`INSERT INTO images VALUES
	("04", "https://res.cloudinary.com/matchawtc/image/upload/v1579871481/userImages/olr3fym3d8vclzjpcdeu.jpg", 0)`);

	DB.query(`INSERT INTO images VALUES
	("05", "https://res.cloudinary.com/matchawtc/image/upload/v1579871481/userImages/olr3fym3d8vclzjpcdeu.jpg", 0)`);

	DB.query(`INSERT INTO images VALUES
	("06", "https://res.cloudinary.com/matchawtc/image/upload/v1579871481/userImages/olr3fym3d8vclzjpcdeu.jpg", 0)`);

	DB.query(`INSERT INTO images VALUES
	("07", "https://res.cloudinary.com/matchawtc/image/upload/v1579871481/userImages/olr3fym3d8vclzjpcdeu.jpg", 0)`);

	DB.query(`INSERT INTO images VALUES
	("12", "https://res.cloudinary.com/matchawtc/image/upload/v1579871481/userImages/olr3fym3d8vclzjpcdeu.jpg", 0)`);

	DB.query(`INSERT INTO images VALUES
	("13", "https://res.cloudinary.com/matchawtc/image/upload/v1579871481/userImages/olr3fym3d8vclzjpcdeu.jpg", 0)`);

	DB.query(`INSERT INTO images VALUES
	("14", "https://res.cloudinary.com/matchawtc/image/upload/v1579871481/userImages/olr3fym3d8vclzjpcdeu.jpg", 0)`);

	DB.query(`INSERT INTO images VALUES
	("15", "https://res.cloudinary.com/matchawtc/image/upload/v1579871481/userImages/olr3fym3d8vclzjpcdeu.jpg", 0)`);

	DB.query(`INSERT INTO images VALUES
	("16", "https://res.cloudinary.com/matchawtc/image/upload/v1579871481/userImages/olr3fym3d8vclzjpcdeu.jpg", 0)`);

	DB.query(`INSERT INTO images VALUES
	("17", "https://res.cloudinary.com/matchawtc/image/upload/v1579871481/userImages/olr3fym3d8vclzjpcdeu.jpg", 0)`);

	DB.query(`INSERT INTO images VALUES
	("nharris", "https://res.cloudinary.com/matchawtc/image/upload/v1579871481/userImages/olr3fym3d8vclzjpcdeu.jpg", 0)`);

	DB.query(`INSERT INTO images VALUES
	("vera", "https://res.cloudinary.com/matchawtc/image/upload/v1579871481/userImages/olr3fym3d8vclzjpcdeu.jpg", 0)`);

	DB.query(`INSERT INTO images VALUES
	("skyzer", "https://res.cloudinary.com/matchawtc/image/upload/v1579871481/userImages/olr3fym3d8vclzjpcdeu.jpg", 0)`);

	DB.query(`INSERT INTO images VALUES
	("devon", "https://res.cloudinary.com/matchawtc/image/upload/v1579871481/userImages/olr3fym3d8vclzjpcdeu.jpg", 0)`);

	DB.query(`INSERT INTO images VALUES
	("johnnysilv", "https://res.cloudinary.com/matchawtc/image/upload/v1579871481/userImages/olr3fym3d8vclzjpcdeu.jpg", 0)`);
					// vvv FAKE USER vvv
	// DB.query(`INSERT INTO images VALUES
	// ("bigboss", "", 0)`);


	DB.query(`INSERT INTO interests VALUES ("#music", "01")`);
	DB.query(`INSERT INTO interests VALUES ("#sports", "01")`);

	DB.query(`INSERT INTO interests VALUES ("#books", "02")`);
	DB.query(`INSERT INTO interests VALUES ("#swimming", "02")`);
	DB.query(`INSERT INTO interests VALUES ("#writing", "02")`);

	DB.query(`INSERT INTO interests VALUES ("#hiking", "03")`);
	DB.query(`INSERT INTO interests VALUES ("#outdoors", "03")`);
	DB.query(`INSERT INTO interests VALUES ("#adventure", "03")`);

	DB.query(`INSERT INTO interests VALUES ("#music", "04")`);
	DB.query(`INSERT INTO interests VALUES ("#programming", "04")`);
	DB.query(`INSERT INTO interests VALUES ("#work", "04")`);

	DB.query(`INSERT INTO interests VALUES ("#outdoors", "05")`);
	DB.query(`INSERT INTO interests VALUES ("#programming", "05")`);
	DB.query(`INSERT INTO interests VALUES ("#food", "05")`);

	DB.query(`INSERT INTO interests VALUES ("#outdoors", "06")`);
	DB.query(`INSERT INTO interests VALUES ("#sports", "06")`);
	DB.query(`INSERT INTO interests VALUES ("#movies", "06")`);

	DB.query(`INSERT INTO interests VALUES ("#music", "07")`);
	DB.query(`INSERT INTO interests VALUES ("#cats", "07")`);
	DB.query(`INSERT INTO interests VALUES ("#gaming", "07")`);

	DB.query(`INSERT INTO interests VALUES ("#books", "08")`);
	DB.query(`INSERT INTO interests VALUES ("#movies", "08")`);
	DB.query(`INSERT INTO interests VALUES ("#food", "08")`);

	DB.query(`INSERT INTO interests VALUES ("#hiking", "09")`);
	DB.query(`INSERT INTO interests VALUES ("#fishing", "09")`);
	DB.query(`INSERT INTO interests VALUES ("#work", "09")`);
	
	DB.query(`INSERT INTO interests VALUES ("#programming", "10")`);
	DB.query(`INSERT INTO interests VALUES ("#beer", "10")`);
	DB.query(`INSERT INTO interests VALUES ("#dogs", "10")`);
	DB.query(`INSERT INTO interests VALUES ("#hunting", "10")`);

	DB.query(`INSERT INTO interests VALUES ("#programming", "11")`);
	DB.query(`INSERT INTO interests VALUES ("#work", "11")`);
	DB.query(`INSERT INTO interests VALUES ("#jokes", "11")`);

	DB.query(`INSERT INTO interests VALUES ("#gym", "12")`);
	DB.query(`INSERT INTO interests VALUES ("#programming", "12")`);
	DB.query(`INSERT INTO interests VALUES ("#outdoors", "12")`);
	
	DB.query(`INSERT INTO interests VALUES ("#family", "13")`);
	DB.query(`INSERT INTO interests VALUES ("#pizza", "13")`);
	DB.query(`INSERT INTO interests VALUES ("#gaming", "13")`);
	
	DB.query(`INSERT INTO interests VALUES ("#gaming", "14")`);
	DB.query(`INSERT INTO interests VALUES ("#dogs", "14")`);
	DB.query(`INSERT INTO interests VALUES ("#gaming", "14")`);
	DB.query(`INSERT INTO interests VALUES ("#dancing", "14")`);
	
	DB.query(`INSERT INTO interests VALUES ("#netflix", "15")`);
	DB.query(`INSERT INTO interests VALUES ("#movies", "15")`);
	DB.query(`INSERT INTO interests VALUES ("#dancing", "15")`);
	
	DB.query(`INSERT INTO interests VALUES ("#netflix", "15")`);
	DB.query(`INSERT INTO interests VALUES ("#movies", "15")`);
	DB.query(`INSERT INTO interests VALUES ("#dancing", "15")`);
	DB.query(`INSERT INTO interests VALUES ("#gaming", "15")`);

	DB.query(`INSERT INTO interests VALUES ("#netflix", "16")`);
	DB.query(`INSERT INTO interests VALUES ("#movies", "16")`);
	DB.query(`INSERT INTO interests VALUES ("#gym", "16")`);
	DB.query(`INSERT INTO interests VALUES ("#gaming", "16")`);
	
	DB.query(`INSERT INTO interests VALUES ("#gym", "17")`);
	DB.query(`INSERT INTO interests VALUES ("#programming", "17")`);
	DB.query(`INSERT INTO interests VALUES ("#outdoors", "17")`);

	DB.query(`INSERT INTO interests VALUES ("#programming", "18")`);
	DB.query(`INSERT INTO interests VALUES ("#movies", "18")`);
	DB.query(`INSERT INTO interests VALUES ("#gaming", "18")`);

	DB.query(`INSERT INTO interests VALUES ("#programming", "19")`);
	DB.query(`INSERT INTO interests VALUES ("#beer", "19")`);
	DB.query(`INSERT INTO interests VALUES ("#dogs", "19")`);
	DB.query(`INSERT INTO interests VALUES ("#hunting", "19")`);
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