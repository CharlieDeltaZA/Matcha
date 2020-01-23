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
	if (!(DB.verified(req.session.user) == 1)) {
		console.log(DB.verified(req.session.user));
		res.redirect('/incomplete');
		return ;
	}
	DB.query(`UPDATE messages SET unread = 0 WHERE unread = 1 AND receiver = '${req.session.user}'`);
	let sql = "SELECT * FROM likes WHERE liked = ?"
	console.log('1');
	let inserts = [req.session.user];
	sql = mysql.format(sql, inserts);
	let potentialFriends = DB.query(sql);
	console.log('2');
	potentialFriends.then( function(data){
		data.forEach(function(item, index) {
			console.log('3');
			let sql = `SELECT * FROM likes WHERE liker = '${req.session.user}' AND liked = ?`;
			let inserts = [item.liker];
			sql = mysql.format(sql, inserts);
			let result = DB.query(sql);
			console.log('4');
			result.then( function(data1) {
				console.log('5');
				if (!data1[0]) {
					console.log('Help');
					data.splice(index, 1);
					console.log('Help2');
				}
				console.log('Monka');
				console.log(index);
				console.log(data.length - 1);
				if (index === data.length - 1)
				{
					console.log('6');
					if (req.session.chatter)
					{	
						if (!data[0])
							console.log('Empty2');
						console.log('7');
						let sql = `
						SELECT * FROM messages WHERE receiver = '${req.session.user}' AND sender = '${req.session.chatter}'
						OR 
						sender = '${req.session.user}' AND receiver = '${req.session.chatter}'`;
						let attempt = DB.query(sql);
						attempt.then( function(messageLog) {
							console.log('8');
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
						if (!data[0])
							console.log('Empty');
						console.log('9');						
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
				console.log('Giga');
			});
		});
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
			result += ((element.sender != req.session.user) ? 
				`<div class=\"d-flex justify-content-start mb-4\"><div class=\"msg_container\">${element.message}</div></div>` :
				`<div class=\"d-flex justify-content-end mb-4\"><div class=\"msg_container_send\">${element.message}</div></div>`);
		});
		res.json(result);
	})
});

module.exports = router;
