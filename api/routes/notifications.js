const express = require('express');
const router = express.Router();
const app = express();
const database = require('../../api/database/database');

app.use(express.static('/../../styles'));
app.use(express.static('/../../images'));
app.use(express.static('/../../scripts'));

var DB = new database;

router.get('/views', (req, res, next) => {
	if (req.session.user === undefined)
	{
		res.redirect('/user/login');
		return ;
	}
	var userViews = DB.query(`SELECT * FROM views WHERE viewed = '${req.session.user}'`);
	userViews.then( function (data) {
		DB.query("UPDATE views SET unread = 0 WHERE unread = 1");
		res.render('views', { 
			title:'Profile Views',
			user: (req.session.user === undefined ? "Username" : req.session.user),
			userList: data,
			userLogged: (req.session.user === undefined ? false : true)
		});
	})
});

router.get('/likes', (req, res, next) => {
	if (req.session.user === undefined)
	{
		res.redirect('/user/login');
		return ;
	}
	var userLikes = DB.query(`SELECT * FROM likes WHERE liked = '${req.session.user}'`);
	userLikes.then( function (data) {
		DB.query("UPDATE likes SET unread = 0 WHERE unread = 1");
		res.render('likes', {
			title:'Profile Likes',
			user: (req.session.user === undefined ? "Username" : req.session.user),
			userList: data,
			userLogged: (req.session.user === undefined ? false : true)
		});
	});
});

module.exports = router;
