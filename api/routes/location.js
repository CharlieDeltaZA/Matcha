const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const app = express();
const database = require('../../api/database/database');

app.use(express.static('/../../styles'));
app.use(express.static('/../../images'));
app.use(express.static('/../../scripts'));

router.get('/', (req, res, next) => {
	// if (req.session.user === undefined)
	// {
	// 	res.redirect('/user/login');
	// 	return ;
	// }
	res.render('location', {
		title:'Location',
		user: (req.session.user === undefined ? "Username" : req.session.user)
	});
});

router.post('/', (req, res, next) => {
	// console.log(`Received location!\nLocation: lat: ${req.body.lat}, lng: ${req.body.lng}`);
	// console.log(req.session.user);
	let db = new database();
	let sql = `UPDATE users SET userLocationlat=?, userLocationlng=? WHERE username=?`
	let inserts = [req.body.lat, req.body.lng, req.session.user];
	sql = mysql.format(sql, inserts);
	let query = db.query(sql);
	var a = res;
	query.then( function (res) {
		db.userComplete(req.session.user);
		a.json('Received');
	})
});

module.exports = router;