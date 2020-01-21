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
// const mongoose = require("mongoose");
// const url = "mongodb+srv://admin:admin@cluster0-u7zcd.mongodb.net/test?retryWrites=true&w=majority";
// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
// 	console.log('connected', err);
// });

// var Message = mongoose.model('Message',{ name : String, message : String});
// var bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

router.get('/', (req, res) => {
	if (req.session.user == undefined)
	{
		res.redirect('/user/login');
		return ;
	}
	let sql = "SELECT * FROM likes WHERE liked = ?"
	let inserts = [req.session.user];
	sql = mysql.format(sql, format);
	res.render('chat', {
		title:'Chat Messages',
		user: (req.session.user === undefined ? "Username" : req.session.user),
		userLogged: (req.session.user === undefined ? false : true)
	});
});

module.exports = router;
