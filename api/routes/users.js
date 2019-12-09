const express = require('express');
const router = express.Router();
const app = express();

app.set('view engine', 'pug');
app.use(express.static('/../../styles'));
app.use(express.static('/../../images'));
app.use(express.static('/../../scripts'));

router.get('/register', (req, res, next) => {
	res.render('register', {
		title:'Register',
	});
});

router.post('/register', (req, res, next) => {
	console.log("---------- REGISTER ----------");
	console.log("Userlogin = "+req.body.userLogin);
	console.log("Name = "+req.body.userName+", Surname = "+req.body.userSurname);
	console.log("Email = "+userEmail);
	console.log("Pass = "+req.body.userPass+", ConfPass = "+req.body.userConfPass);
});

router.get('/login', (req, res, next) => {
	res.render('login', {
		title:'Login',
	});
});

router.post('/login', (req, res, next) => {
	console.log(req.body.userLogin);
	console.log(req.body.password);
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