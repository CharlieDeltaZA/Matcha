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
	let complete = DB.verified(req.session.user);
	complete.then( function(data) {
		DB.query(`UPDATE messages SET unread = 0 WHERE unread = 1 AND receiver = '${req.session.user}'`);
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
						if (req.session.chatter)
						{
							let sql = `
							SELECT * FROM messages WHERE receiver = '${req.session.user}' AND sender = '${req.session.chatter}'
							OR 
							sender = '${req.session.user}' AND receiver = '${req.session.chatter}'`;
							let attempt = DB.query(sql);
							attempt.then( function(messageLog) {
								res.render('chat', {
									title:'Chat Messages',
									user: (req.session.user === undefined ? "Username" : req.session.user),
									friendList: data,
									activeChat: req.session.chatter,
									messages: messageLog,
									userLogged: (req.session.user === undefined ? false : true)
								});
							})
						}
						else {
							res.render('chat', {
								title:'Chat Messages',
								user: (req.session.user === undefined ? "Username" : req.session.user),
								friendList: data,
								activeChat: req.session.chatter,
								messages: 0,
								userLogged: (req.session.user === undefined ? false : true)
							});
						}
					}
				});
			});
		})
	}, function (err){
		res.redirect('/incomplete');
		return ;
	})
});

router.post('/', (req, res) => {
	if (req.body.chatter)
		req.session.chatter = req.body.chatter;
	res.json('sure');
});

router.post('/message', (req, res) => {
	// console.log(req.body.to);
	if (!req.body.message || req.body.to == 'undefined' || !req.session.user)
	{
		res.json("No");
		return ;
	}
	else
	{
		let sql = `INSERT INTO messages VALUES (?, ?, ?, ?, CURDATE())`;
		
		let inserts = [req.body.to, req.session.user, req.body.message, 1]
		sql = mysql.format(sql, inserts);
		let test = DB.query(sql);
		test.then( function(test) {
		})
		res.json('sure');
	}
});

router.post('/message/refresh', (req, res) => {
	let sql = `
		SELECT * FROM messages WHERE receiver = '${req.session.user}' AND sender = '${req.session.chatter}'
		OR 
		sender = '${req.session.user}' AND receiver = '${req.session.chatter}'`;
	if (!req.session.chatter)
		return ;
	let messages = DB.query(sql);
	messages.then( function (data) {
		var result = new Array;
		data.forEach(element => {
			let temp = element.message;
			let mess = temp.replace(/(.{120})/g, "$1<br>");
			result += ((element.sender != req.session.user) ? 
				`<div class=\"d-flex justify-content-start mb-4\"><div class=\"msg_container\">${mess}</div></div>` :
				`<div class=\"d-flex justify-content-end mb-4\"><div class=\"msg_container_send\">${mess}</div></div>`);
		});
		res.json(result);
	})
});

module.exports = router;
