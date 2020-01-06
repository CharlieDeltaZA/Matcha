const express = require('express');
const router = express.Router();
const app = express();

app.use(express.static('/../../styles'));
app.use(express.static('/../../images'));
app.use(express.static('/../../scripts'));

router.get('/', (req, res, next) => {
	if (req.session.user === undefined)
		res.redirect('/login');
	res.render('recommendations', {
		title:'Recommendations',
		user: (req.session.user === undefined ? "Username" : req.session.user),
		userLogged: (req.session.user === undefined ? false : true)
	});
});

module.exports = router;
