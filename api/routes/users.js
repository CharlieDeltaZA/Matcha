const express = require('express');
const router = express.Router();
const app = express();
const database = require('../../api/database/database');

app.set('view engine', 'pug');
app.use(express.static('/../../styles'));
app.use(express.static('/../../images'));
app.use(express.static('/../../scripts'));

router.get('/login', (req, res, next) => {
	res.render('login', {
		title:'Login',
		user: (req.session.user === undefined ? "Username" : req.session.user)
	});
});
router.post('/login', (req, res, next) => {
	let db = new database;

	if (req.body.userLogin.length == 0 || req.body.userLogin == undefined)
	{
		if (req.body.userLogin == undefined)
			console.log("userLogin is undefined");
		else
			console.log("userLogin is blank");
		return;
	}
	else if (req.body.password.length == 0 || req.body.password == undefined)
	{
		if (req.body.password == undefined)
			console.log("password is undefined");
		else
			console.log("password is blank");
		return;
	}

	let loginAttempt = db.login(req.body.userLogin, req.body.password);
	var res2 = res;
	var req2 = req;
	loginAttempt.then(function(res){
		req2.session.user = req.body.userLogin;
		res2.redirect('http://localhost:8080');
	},
	function(err){
		console.log(`Failed log in attempt.\nReason: ${err}`);
		res.status(204).end();
	})
});

router.get('/register', (req, res, next) => {
	res.render('register', {
		title:'Register',
		user: (req.session.user === undefined ? "Username" : req.session.user)
	});
});

router.post('/register', (req, res, next) => {
	let db = new database;
	var res2 = res;
	var registerAttempt = db.register(req.body.userLogin, req.body.userName, req.body.userSurname, req.body.userEmail, req.body.userPass, req.body.userConfPass);
	registerAttempt.then(function(ret){
		res2.redirect('http://localhost:8080');
	},
	function (err) {
		console.log(`Failed registration.\nReason: ${err}`);
		res.status(204).end();
	})
});

router.get('/profile', (req, res, next) => {
	res.render('profile', {
		title:'Profile',
		user: (req.session.user === undefined ? "Username" : req.session.user)
	});
});

router.get('/account', (req, res, next) => {
	res.render('account', {
		title:'Account',
		user: (req.session.user === undefined ? "Username" : req.session.user)
	});
});

router.get('/preferences', (req, res, next) => {
	res.render('preferences', {
		title:'Preferences',
	});
});

module.exports = router;