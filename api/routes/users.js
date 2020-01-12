const express = require('express');
const router = express.Router();
const app = express();
const database = require('../../api/database/database');
const validation = require('../../scripts/formValidation.js');

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
	if (validation.registrationFormValid(req.body.userLogin, req.body.userName, req.body.userSurname, req.body.userEmail, req.body.userPass, req.body.userConfPass) != true) {
		// console.log(validation.registrationFormValid(req.body.userLogin, req.body.userName, req.body.userSurname, req.body.userEmail, req.body.userPass, req.body.userConfPass));
	} else
	{
		var registerAttempt = db.register(req.body.userLogin, req.body.userName, req.body.userSurname, req.body.userEmail, req.body.userPass, req.body.userConfPass);

		registerAttempt.then(function(ret){
			res.json("success");
			// db.close();
		},
		function (err) {
			res.json('error');
			console.log(`Failed registration.\nReason: ${err}`);
			// db.close();
		})
	}
});

router.get('/profile', (req, res, next) => {
	if (req.session.user === undefined)
	{
		res.redirect('/user/login');
		return ;
	}
	var current_user = DB.get_user(req.session.user);
	current_user.then(function (data) {
		res.render('profile', {
			title:'Profile',
			user: (req.session.user === undefined ? "Username" : req.session.user),
			username: req.session.user,
			userFirstName: data[0].userFirstName,
			userLastName: data[0].userLastName,
			userGender: data[0].userGender,
			userOrientation: data[0].userOrientation,
			userBio: data[0].userBiography,
			userLat: data[0].userLat,
			userLng: data[0].userLng,
			userLogged: (req.session.user === undefined ? false : true)
		});
	});
});

router.get('/images', (req, res, next) => {
	if (req.session.user === undefined)
	{
		res.redirect('/user/login');
		return ;
	}
	var imageArray = new Array();;
	let images = DB.getImages(req.session.user);
	images.then(function (data) {
		data.forEach(element => {
			imageArray.push(element.image);
		});
		res.render('images', {
			title:'Images',
			imageArray: imageArray,
			user: (req.session.user === undefined ? "Username" : req.session.user),
			userLogged: (req.session.user === undefined ? false : true)
		});
	}, function (err) {
		res.redirect('/');
	})
});

router.get('/notifications', (req, res, next) => {
	res.render('notifications', {
	});
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
