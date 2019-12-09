const express = require('express');
const router = express.Router();
const app = express();

app.set('view engine', 'pug');
app.use(express.static('/../../styles'));
app.use(express.static('/../../images'));
app.use(express.static('/../../scripts'));

router.get('/login', (req, res, next) => {
	res.render('login', {
		title:'Login',
	});
});

router.post('/login', (req, res, next) => {

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
	console.log("Userlogin = "+req.body.userLogin);
	console.log("password = "+req.body.password);

	// Placeholder
	req.session.user = req.body.userLogin;
	res.redirect('http://localhost:8080?action=yes');
});

router.get('/register', (req, res, next) => {
	res.render('register', {
		title:'Register',
	});
});

router.post('/register', (req, res, next) => {
	console.log("---------- REGISTER ----------");
	console.log("Userlogin = "+req.body.userLogin);
	console.log("Name = "+req.body.userName+", Surname = "+req.body.userSurname);
	console.log("Email = "+req.body.userEmail);
	console.log("Pass = "+req.body.userPass+", ConfPass = "+req.body.userConfPass);
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