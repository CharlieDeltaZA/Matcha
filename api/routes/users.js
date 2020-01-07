const express = require('express');
const router = express.Router();
const app = express();
const database = require('../../api/database/database');
const validation = require('../../scripts/formValidation.js');
//
const Swal = require('sweetalert2');

app.set('view engine', 'pug');
app.use(express.static('/../../styles'));
app.use(express.static('/../../images'));
app.use(express.static('/../../scripts'));

router.get('/login', (req, res, next) => {
	if (req.session.user)
		res.redirect('/');
	res.render('login', {
		title:'Login',
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
			res2.redirect('http://localhost:8080');
		},
		function(err){
			console.log(`Failed log in attempt.\nReason: ${err}`);
			db.close();
			res.status(204).end();
		})
	} else
	{
		res.redirect('/user/login');
	}
});

router.get('/register/:error?', (req, res, next) => {
	if (req.session.user)
		res.redirect('/');
	res.render('register', {
		title:'Register',
		error: req.params.error ? 1 : 0,
		user: (req.session.user === undefined ? "Username" : req.session.user),
		userLogged: (req.session.user === undefined ? false : true)
	});
});

router.post('/register', (req, res, next) => {
	let db = new database;
	var res2 = res;
	if (!validation.registrationFormValid(req.body.userLogin, req.body.userName, req.body.userSurname, req.body.userEmail, req.body.userPass, req.body.userConfPass)) {
		res.redirect('/user/register/failed');
	} else
	{
		var registerAttempt = db.register(req.body.userLogin, req.body.userName, req.body.userSurname, req.body.userEmail, req.body.userPass, req.body.userConfPass);

		registerAttempt.then(function(ret){
			// Remove this if you get weird errors. \
			db.close();
			res2.redirect('/');
		},
		function (err) {
			console.log(`Failed registration.\nReason: ${err}`);
			// Remove this if you get weird errors. 
			db.close();
			res.status(204).end();
		})
	}
});

router.get('/profile', (req, res, next) => {
	if (req.session.user === undefined)
		res.redirect('/login');
	res.render('profile', {
		title:'Profile',
		user: (req.session.user === undefined ? "Username" : req.session.user),
		userLogged: (req.session.user === undefined ? false : true)
	});
});

router.get('/account', (req, res, next) => {
	if (req.session.user === undefined)
		res.redirect('/login');
	res.render('account', {
		title:'Account',
		user: (req.session.user === undefined ? "Username" : req.session.user),
		userLogged: (req.session.user === undefined ? false : true)
	});
});

router.get('/preferences', (req, res, next) => {
	if (req.session.user === undefined)
		res.redirect('/login');
	res.render('preferences', {
		title:'Preferences',
	});
});

router.post('/logout', (req, res, next) => {
	req.session.destroy();
	res.json('Received');
})

module.exports = router;
