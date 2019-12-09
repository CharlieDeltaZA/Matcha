const express = require('express');
const router = express.Router();
const app = express();

app.use(express.static('/../../styles'));
app.use(express.static('/../../images'));
app.use(express.static('/../../scripts'));

router.get('/', (req, res, next) => {
	res.render('search', {
		title:'Search',
		user: (req.session.user === undefined ? "Username" : req.session.user)
	});
});

router.post('/', (req, res, next) => {
	console.log("Searching");
});

module.exports = router;