const express = require('express');
const router = express.Router();
const app = express();
const database = require('../database/database');
const mysql = require('mysql');
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
	cloud_name: 'matchawtc',
	api_key: '939787686612891',
	api_secret: '3pbLbXEAT4CgZ20R5DMUeo5jTvQ'
	});
	const storage = cloudinaryStorage({
	cloudinary: cloudinary,
	folder: "userImages",
	allowedFormats: ["jpg", "png"],
	transformation: [{ width: 500, height: 500, crop: "limit" }]
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
		res.render('account', {
			title:'Account',
			user: (req.session.user === undefined ? "Username" : req.session.user),
			username: req.session.user,
			userFirstName: data[0].userFirstName,
			userLastName: data[0].userLastName,
			userGender: data[0].userGender,
			userImage: data[0].userImage,
			userOrientation: data[0].userOrientation,
			userEmail: data[0].userEmail,
			userBio: data[0].userBiography,
			userLat: data[0].userLat,
			userLng: data[0].userLng,
			DOB: data[0].userBirthday,
			userLogged: (req.session.user === undefined ? false : true)
		});
	});
});

router.post('/public', (req, res) => {
	let db = new database;

	let sql = 'UPDATE users SET userFirstName=?, userLastName=?, userGender=?, userOrientation=?, userBiography=? WHERE username=?'
	let inserts = [req.body.userName, req.body.userSurname, req.body.userGender, req.body.userSexPref, req.body.userBio, req.session.user];
	sql = mysql.format(sql, inserts);
	let accountUpdate = db.query(sql);
	accountUpdate.then( function (data) {
		res.json('Success');
	}, function (err) {
		res.json('Failure');
	})
});

router.post('/email', (req, res) => {
	let db = new database;

	let emailUpdate = db.change_email(req.session.user, req.body.userEmail);
	emailUpdate.then( function (data) {
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
		res.json("Success");
	}, function (err) {
		res.json("Failure");
	})
});

router.post('/setImage', (req, res) => {
	var db = new database();

	let sql = "UPDATE images SET active=1 WHERE image = ?"
	let inserts = [req.body.imageurl];
	sql = mysql.format(sql, inserts);
	let result = db.query(sql);
	result.then(function (data) {
		let sql = `UPDATE users SET userImage=? WHERE username='${req.session.user}'`
		let inserts = [req.body.imageurl];
		sql = mysql.format(sql, inserts);
		let result = db.query(sql);
		result.then( function(data) {
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

module.exports = router;