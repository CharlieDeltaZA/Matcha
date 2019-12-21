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
	var res2 = res;
	var req2 = req;
	let db = new database;

	let loginAttempt = db.login(req.body.userLogin, req.body.userPass);
	loginAttempt.then(function(res){
		// req2.session.user = req.body.userLogin;
		// Remove this if you get weird errors. 
		// db.close();
		res2.redirect('http://localhost:8080');
	},
	function(err){
		console.log(`Failed log in attempt.\nReason: ${err}`);
		// Remove this if you get weird errors. 
		db.close();
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
		// Remove this if you get weird errors. 
		db.close();
	},
	function (err) {
		console.log(`Failed registration.\nReason: ${err}`);
		// Remove this if you get weird errors. 
		db.close();
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