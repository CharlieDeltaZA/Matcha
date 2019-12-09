const express = require('express');
const router = express.Router();
const app = express();

app.use(express.static('/../../styles'));
app.use(express.static('/../../images'));
app.use(express.static('/../../scripts'));

router.get('/register', (req, res, next) => {
	res.render('register', {
		title:'Register',
	});
});

router.post('/register', (req, res, next) => {
	var userLogin=req.body.userLogin;
	var userName=req.body.userName;
	var userSurname=req.body.userSurname;
	var userEmail=req.body.userEmail;
	var userPass=req.body.userPass;
	var userConfPass=req.body.userConfPass;
	console.log("---------- REGISTER ----------");
	console.log("Username = "+userLogin);
	console.log("Name = "+userName+", Surname = "+userSurname);
	console.log("Email = "+userEmail);
	console.log("Pass = "+userPass+", ConfPass = "+userConfPass);
});

router.get('/login', (req, res, next) => {
	res.render('login', {
		title:'Login',
	});
});

router.post('/login', (req, res, next) => {
	var userLogin = req.body.userLogin;
	var password=req.body.password;
	console.log("---------- LOGIN ---------");
	console.log("Username = "+userLogin+", Password = "+password);
	res.redirect('http://localhost:8080?action=login');
});

router.get('/profile', (req, res, next) => {
	res.render('profile', {
		title:'Profile',
	});
});

router.get('/account', (req, res, next) => {
	res.render('account', {
		title:'Account',
	});
});

router.get('/preferences', (req, res, next) => {
	res.render('preferences', {
		title:'Preferences',
	});
});

module.exports = router;