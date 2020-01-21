const express = require('express');
const router = express.Router();
const app = express();
const database = require('../../api/database/database');
const mysql = require('mysql');

app.set('view engine', 'pug');
app.use(express.static('/../../styles'));
app.use(express.static('/../../images'));
app.use(express.static('/../../scripts'));

var DB = new database;

router.get('/', (req, res) => {
	if (req.session.user == undefined)
	{
		res.redirect('/user/login');
		return ;
	}
	let sql = "SELECT * FROM likes WHERE liked = ?"
	let inserts = [req.session.user];
	sql = mysql.format(sql, inserts);
	let potentialFriends = DB.query(sql);
	potentialFriends.then( function(data){
		data.forEach(function(item, index) {
			let sql = `SELECT * FROM likes WHERE liker = '${req.session.user}' AND liked = ?`;
			let inserts = [item.liker];
			sql = mysql.format(sql, inserts);
			let result = DB.query(sql);
			result.then( function(data1) {
				if (!data1[0])
					data.splice(index, 1);
				if (index === data.length - 1)
				{
					res.render('chat', {
						title:'Chat Messages',
						user: (req.session.user === undefined ? "Username" : req.session.user),
						friendList: data,
						userLogged: (req.session.user === undefined ? false : true)
					});
				}
			});
			// result.then( function(data2) {
			// })
		});
	})
});

router.post('/', (req, res) => {
	if (req.body.chatter)
		req.session.chatter = req.body.chatter;
	res.json('sure');
});

module.exports = router;
