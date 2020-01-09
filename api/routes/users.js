const express = require('express');
const router = express.Router();
const app = express();
const database = require('../../api/database/database');
const validation = require('../../scripts/formValidation.js');
const mysql = require('mysql');

app.set('view engine', 'pug');
app.use(express.static('/../../styles'));
app.use(express.static('/../../images'));
app.use(express.static('/../../scripts'));

var DB = new database;

router.get('/login/:error?', (req, res, next) => {
	if (req.session.user)
	{
		res.redirect('/');
		return ;
	}
	res.render('login', {
		title:'Login',
		error: req.params.error,
		user: (req.session.user === undefined ? "Username" : req.session.user),
		userLogged: (req.session.user === undefined ? false : true)
	});
});
router.post('/login', (req, res, next) => {
	var res2 = res;
	var req2 = req;

	if (validation.loginFormValid(req.body.userLogin, req.body.userPass))
		{
		let db = new database;

		let loginAttempt = db.login(req.body.userLogin, req.body.userPass);
		loginAttempt.then(function(res){
			req2.session.user = req.body.userLogin;
			res2.json('success');
		},
		function(err){
			console.log(`Failed log in attempt.\nReason: ${err}`);
			res.json(err);
			db.close();
		})
	} else
	{
		res.redirect('/user/login');
	}
});

router.get('/register/:error?', (req, res, next) => {
	if (req.session.user)
	{
		res.redirect('/');
		return ;
	}
	res.render('register', {
		title:'Register',
		error: req.params.error,
		user: (req.session.user === undefined ? "Username" : req.session.user),
		userLogged: (req.session.user === undefined ? false : true)
	});
});

router.post('/register', (req, res, next) => {
	let db = new database;
	if (!validation.registrationFormValid(req.body.userLogin, req.body.userName, req.body.userSurname, req.body.userEmail, req.body.userPass, req.body.userConfPass)) {
		res.redirect('/user/register/failed');
	} else
	{
		var registerAttempt = db.register(req.body.userLogin, req.body.userName, req.body.userSurname, req.body.userEmail, req.body.userPass, req.body.userConfPass);

		registerAttempt.then(function(ret){
			res.json("success");
			db.close();
		},
		function (err) {
			res.json('err');
			console.log(`Failed registration.\nReason: ${err}`);
			db.close();
		})
	}
});

router.get('/profile', (req, res, next) => {
	if (req.session.user === undefined)
	{
		res.redirect('/user/login');
		return ;
	}
	res.render('profile', {
		title:'Profile',
		user: (req.session.user === undefined ? "Username" : req.session.user),
		userLogged: (req.session.user === undefined ? false : true)
	});
});

router.get('/images', (req, res, next) => {
	if (req.session.user === undefined)
	{
		res.redirect('/user/login');
		return ;
	}
	res.render('images', {
		title:'Images',
		user: (req.session.user === undefined ? "Username" : req.session.user),
		userLogged: (req.session.user === undefined ? false : true)
	});
});

router.post('/account/public', (req, res, next) => {
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

router.post('/account/images', (req, res, next) => {
	let db = new database;

	let sql = 'UPDATE images SET userImage=?, imageOwner=?, active=1'
	let inserts = [req.body.userImage, req.session.user];
	sql = mysql.format(sql, inserts);
	let accountUpdate = db.query(sql);
	accountUpdate.then( function (data) {
		console.log(`Success: ${data}`);
	}, function (err) {
		console.log(`ERROR: ${err}`);
	})
});

router.get('/preferences', (req, res, next) => {
	if (req.session.user === undefined)
	{
		res.redirect('/user/login');
		return ;
	}
	res.render('preferences', {
		title:'Preferences',
	});
});

router.post('/logout', (req, res, next) => {
	req.session.destroy();
	res.json('Received');
})

module.exports = router;
