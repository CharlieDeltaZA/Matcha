const express = require('express');
const router = express.Router();
const app = express();

app.use(express.static('/../../styles'));
app.use(express.static('/../../images'));
app.use(express.static('/../../scripts'));

router.get('/views', (req, res, next) => {
	if (req.session.user === undefined)
		res.redirect('/user/login');
	res.render('views', {
		title:'Profile Views',
		user: (req.session.user === undefined ? "Username" : req.session.user),
		userLogged: (req.session.user === undefined ? false : true)
	});
});

router.get('/likes', (req, res, next) => {
	if (req.session.user === undefined)
		res.redirect('/user/login');
	res.render('likes', {
		title:'Profile Likes',
		user: (req.session.user === undefined ? "Username" : req.session.user),
		userLogged: (req.session.user === undefined ? false : true)
	});
});

module.exports = router;
