const express = require('express');
const router = express.Router();
const app = express();
const database = require('../database/database');
const mysql = require('mysql');

app.set('view engine', 'pug');
app.use(express.static('/../../styles'));
app.use(express.static('/../../images'));
app.use(express.static('/../../scripts'));

var DB = new database;

router.get('/', (req, res, next) => {
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
			userOrientation: data[0].userOrientation,
			userEmail: data[0].userEmail,
			userBio: data[0].userBiography,
			userLat: data[0].userLat,
			userLng: data[0].userLng,
			userLogged: (req.session.user === undefined ? false : true)
		});
	});
});

router.post('/public', (req, res, next) => {
	let db = new database;

	let sql = 'UPDATE users SET userFirstName=?, userLastName=?, userGender=?, userOrientation=?, userBiography=? WHERE username=?'
	let inserts = [req.body.userName, req.body.userSurname, req.body.userGender, req.body.userSexPref, req.body.userBio, req.session.user];
	sql = mysql.format(sql, inserts);
	let accountUpdate = db.query(sql);
	accountUpdate.then( function (data) {
		console.log(`Success: ${data}`);
	}, function (err) {
		console.log(`ERROR: ${err}`);
	})
});

router.post('/username', (req, res, next) => {
	let db = new database;

	let usernameUpdate = db.change_username(req.session.user, req.body.userLogin);
	usernameUpdate.then( function (data) {
		req.session.user = req.body.userLogin;
		res.json(data);
	}, function (err) {
		res.json(err);
	})
});

router.post('/email', (req, res, next) => {
	let db = new database;

	let emailUpdate = db.change_email(req.session.user, req.body.userEmail);
	emailUpdate.then( function (data) {
		res.json(data);
	}, function (err) {
		res.json(err);
	})
});

module.exports = router;