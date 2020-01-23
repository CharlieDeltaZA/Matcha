const express = require('express');
const router = express.Router();
const app = express();
const database = require('../database/database');
const mysql = require('mysql');
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
var encrypt = require('../encrypt');

cloudinary.config({
	cloud_name: 'matchawtc',
	api_key: '939787686612891',
	api_secret: '3pbLbXEAT4CgZ20R5DMUeo5jTvQ'
	});
	const storage = cloudinaryStorage({
	cloudinary: cloudinary,
	folder: "userImages",
	allowedFormats: ["jpg", "png"],
	transformation: [{ width: 750, height: 750, crop: "limit" }]
});

const parser = multer({ storage: storage });

app.set('view engine', 'pug');
app.use(express.static('/../../styles'));
app.use(express.static('/../../images'));
app.use(express.static('/../../scripts'));

var DB = new database;

router.get('/', (req, res) => {
	if (req.session.user === undefined)
	{
		res.redirect('/user/login');
		return ;
	}
	var current_user = DB.get_user(req.session.user);
	current_user.then(function (data) {
		var imagearray = new Array();
		var getImages = DB.getImages(req.session.user);
		getImages.then(function(newData) {
			newData.forEach(element => {
				imagearray.push(element.image);
			});
			let interests = DB.query(`SELECT * FROM interests WHERE user='${req.session.user}'`)
			interests.then( function(data1) {
				res.render('account', {
					title:'Account',
					user: (req.session.user === undefined ? "Username" : req.session.user),
					username: req.session.user,
					userFirstName: data[0].userFirstName,
					userLastName: data[0].userLastName,
					userGender: data[0].userGender,
					userImage: data[0].userImage,
					imageArray: imagearray,
					imageExists: data[0].userImage ? 1 : 0,
					userOrientation: data[0].userOrientation,
					userEmail: data[0].userEmail,
					userBio: data[0].userBiography,
					userLat: data[0].userLat,
					userInterests: data1,
					userLng: data[0].userLng,
					age: data[0].userAge,
					userLogged: (req.session.user === undefined ? false : true)
				});
			})
		})
	});
});

router.post('/public', (req, res) => {
	let db = new database;

	let sql = 'UPDATE users SET userFirstName=?, userLastName=?, userGender=?, userOrientation=?, userBiography=? WHERE username=?'
	let inserts = [req.body.userName, req.body.userSurname, req.body.userGender, req.body.userSexPref, req.body.userBio, req.session.user];
	sql = mysql.format(sql, inserts);
	let accountUpdate = db.query(sql);
	accountUpdate.then( function (data) {
		db.userComplete(req.session.user);
		res.json('Success');
	}, function (err) {
		res.json('Failure');
	})
});

router.post('/email', (req, res) => {
	let db = new database;

	let emailUpdate = db.change_email(req.session.user, req.body.userEmail);
	emailUpdate.then( function (data) {
		db.userComplete(req.session.user);
		res.json(data);
	}, function (err) {
		res.json(err);
	})
});

router.post('/images', parser.array("image", 5), (req, res) => {
	var db = new database();
	var file = req.files;
	Object.keys(file).forEach( function(key) {
		const image = {};
		image.url = file[key].url;
		image.id = file[key].id;
		let upload = db.uploadImage(req.session.user, image.url);
		upload.then( function (data) {
			db.userComplete(req.session.user);
			res.redirect('/user/images');
		},function (err) {
			console.log(err);
			res.sendStatus(204).end();
		})
	});
});

router.post('/removeImage', (req, res) => {
	var db = new database();
	
	let sql = "DELETE FROM images WHERE image = ?"
	let inserts = [req.body.imageurl];
	sql = mysql.format(sql, inserts);
	let result = db.query(sql);
	result.then(function (data) {
		let sql = `UPDATE users SET userImage=NULL WHERE userImage=?`
		let inserts = [req.body.imageurl];
		sql = mysql.format(sql, inserts);
		let result = db.query(sql);
		result.then(function (data) {
			db.userComplete(req.session.user);
			res.json("Success");
		}), function (err) {
			res.json("Failure");
		}
	}, function (err) {
		res.json("Failure");
	})
});

router.post('/setImage', (req, res) => {
	var db = new database();

	let sql = "UPDATE images SET active = 1 WHERE image = ?"
	let inserts = [req.body.imageurl];
	sql = mysql.format(sql, inserts);
	let result = db.query(sql);
	result.then(function (data) {
		let sql = `UPDATE users SET userImage = ? WHERE username='${req.session.user}'`
		let inserts = [req.body.imageurl];
		sql = mysql.format(sql, inserts);
		let result = db.query(sql);
		result.then( function(data) {
			db.userComplete(req.session.user);
			res.json("Success");
		}, function(err) {
			res.json("Failure");
		})
	}, function (err) {
		res.json("Failure");
	})
});

router.post('/username', (req, res) => {
	let db = new database;
	let usernameUpdate = db.change_username(req.session.user, req.body.userLogin);

	usernameUpdate.then( function (data) {
		req.session.user = req.body.userLogin;
		res.json("Success");
	}, function (err) {
		res.json(err);
		console.log("Error");
	})
});

router.post('/age', (req, res) => {
	let db = new database;
	let sql = `UPDATE users SET userAge = ?, userBirthday=? WHERE username = '${req.session.user}'`;
	let inserts = [req.body.age, req.body.birthDate];
	sql = mysql.format(sql, inserts);
	let ageUpdate = db.query(sql);
	ageUpdate.then( function(data) {
		db.userComplete(req.session.user);
		res.json("Success");
	}, function (err) {
	})
});

router.post('/addinterest', (req, res) => {
	let db = new database;
	db.add_interest(req.session.user, req.body.interest);
	res.json("Success");
});

router.post('/removeinterest', (req, res) => {
	let db = new database;
	db.remove_interest(req.session.user, req.body.interest);
	res.json("Success");
});

router.post('/password', (req, res) => {
	if (req.body.password && req.session.user)
	{
		let db = new database;

		console.log(req.body.password);
		let hash = encrypt.cryptPassword(req.body.password);
		hash.then( function(data) {
			let sql = `UPDATE users SET userPassword='${data}' WHERE username='${req.session.user}'`
			db.query(sql);
			res.json("Success");
		}, function(err) {
			res.json("Failure");
		})
	}
});

module.exports = router;