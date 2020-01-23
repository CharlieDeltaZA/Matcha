const express = require('express');
const router = express.Router();
const app = express();
const database = require('../../api/database/database');
const mysql = require('mysql');
const validation = require('../../scripts/formValidation.js');

app.set('view engine', 'pug');
app.use(express.static('/../../styles'));
app.use(express.static('/../../images'));
app.use(express.static('/../../scripts'));

var DB = new database;

router.get('/login/:error?', (req, res, next) => {
	if (req.session.user)
	{
		res.redirect('/');
		return ;
	}
	res.render('login', {
		title:'Login',
		error: req.params.error,
		user: (req.session.user === undefined ? "Username" : req.session.user),
		userLogged: (req.session.user === undefined ? false : true)
	});
});

router.post('/login', (req, res, next) => {
	var res2 = res;
	var req2 = req;

	if (validation.loginFormValid(req.body.userLogin, req.body.userPass))
		{
		let db = new database;

		let loginAttempt = db.login(req.body.userLogin, req.body.userPass);
		loginAttempt.then(function(res){
			req2.session.user = req.body.userLogin;
			db.query(`UPDATE users SET isOnline = 1 WHERE username = '${req2.session.user}'`);
			res2.json('success');
		},
		function(err){
			console.log(`Failed log in attempt.\nReason: ${err}`);
			res.json(err);
			db.close();
		})
	} else
	{
		res.redirect('/user/login');
	}
});

router.get('/register/:error?', (req, res, next) => {
	if (req.session.user)
	{
		res.redirect('/');
		return ;
	}
	res.render('register', {
		title:'Register',
		error: req.params.error,
		user: (req.session.user === undefined ? "Username" : req.session.user),
		userLogged: (req.session.user === undefined ? false : true)
	});
});

router.post('/register', (req, res, next) => {
	let db = new database;
	if (validation.registrationFormValid(req.body.userLogin, req.body.userName, req.body.userSurname, req.body.userEmail, req.body.userPass, req.body.userConfPass) != true) {
		// console.log(validation.registrationFormValid(req.body.userLogin, req.body.userName, req.body.userSurname, req.body.userEmail, req.body.userPass, req.body.userConfPass));
	} else
	{
		var registerAttempt = db.register(req.body.userLogin, req.body.userName, req.body.userSurname, req.body.userEmail, req.body.userPass, req.body.userConfPass);

		registerAttempt.then(function(ret){
			res.json("success");
			// db.close();
		},
		function (err) {
			res.json('error');
			console.log(`Failed registration.\nReason: ${err}`);
			// db.close();
		})
	}
});

router.get('/profile/:user?', (req, res, next) => {
	if (req.session.user === undefined)
	{
		res.redirect('/user/login');
		return ;
	}
	if (req.params.user)
	{
		let complete = DB.verified(req.session.user);
		complete.then( function(data) {
			var imagearray = new Array();
	
			user = DB.get_user(req.params.user);
			user.then( function(data) {
				let userImages = DB.getImages(req.params.user);
				userImages.then( function(newData) {
					newData.forEach(element => {
						imagearray.push(element.image);
					});
					if (req.params.user !== req.session.user)
						DB.view_profile(req.params.user, req.session.user);
						let interests = DB.query(`SELECT * FROM interests WHERE user='${req.params.user}'`)
						interests.then(function (data1) {
							res.render('profile', {
								title:'Profile',
								user: (req.session.user === undefined ? "Username" : req.session.user),
								username: data[0].username,
								userFirstName: data[0].userFirstName,
								userLastName: data[0].userLastName,
								userGender: data[0].userGender,
								userFame: data[0].userFame,
								userImage: data[0].userImage,
								imageArray: imagearray,
								imageExists: data[0].userImage ? 1 : 0,
								userOrientation: data[0].userOrientation,
								userBio: data[0].userBiography,
								userLikes: data[0].userLikes,
								userInterests: data1,
								userLat: data[0].userLat,
								userLng: data[0].userLng,
								userAge: data[0].userAge,
								userIsOnline: data[0].isOnline,
								userLastOnline: data[0].lastOnline,
								userLogged: (req.session.user === undefined ? false : true),
								sameUser: 0
							})
						}, function(err) {
						})
				});
			}, function(err) {
				res.redirect('/user/error');
				return;	
			});
		}, function (err) {
			res.redirect('/incomplete');
			return ;
		})
	}
	else
	{
		current_user = DB.get_user(req.session.user);
		current_user.then( function(data) {
			console.log(data[0].userImage);
			res.render('profile', {
				title:'Profile',
				user: (req.session.user === undefined ? "Username" : req.session.user),
				username: data[0].username,
				userFirstName: data[0].userFirstName,
				userLastName: data[0].userLastName,
				userGender: data[0].userGender,
				userFame: data[0].userFame,
				userImage: data[0].userImage,
				imageExists: data[0].userImage ? 1 : 0,
				userOrientation: data[0].userOrientation,
				userInterests: 0,
				userBio: data[0].userBiography,
				userLikes: data[0].userLikes,
				userLat: data[0].userLat,
				userLng: data[0].userLng,
				userAge: data[0].userAge,
				userLogged: (req.session.user === undefined ? false : true),
				sameUser: 1
			});
		}, function(err) {
			res.redirect('/user/error');
			return;	
		});
	}
});

router.get('/images', (req, res, next) => {
	if (req.session.user === undefined)
	{
		res.redirect('/user/login');
		return ;
	}
	var imageArray = new Array();
	let images = DB.getImages(req.session.user);
	images.then(function (data) {
		data.forEach(element => {
			imageArray.push(element.image);
		});
		res.render('images', {
			title:'Images',
			imageArray: imageArray,
			user: (req.session.user === undefined ? "Username" : req.session.user),
			userLogged: (req.session.user === undefined ? false : true)
		});
	}, function (err) {
		res.redirect('/');
	})
});

router.get('/pass_reset', (req, res, next) => {
	if (req.session.user !== undefined)
	{
		res.redirect('/');
		return ;
	}
	res.render('pass_reset', {
		title:'Reset Password',
		user: (req.session.user === undefined ? "Username" : req.session.user),
		userLogged: (req.session.user === undefined ? false : true)
	});
});

router.post('/notifications', (req, res, next) => {
	if (!req.session.user)
		return ;

	let response = {
		messages: 0,
		likes: 0,
		views: 0
	}

	let sql = `SELECT COUNT(*) AS messageCount FROM messages WHERE receiver='${req.session.user}' AND unread=1`;
	let result = DB.query(sql);
	result.then( function(data) {
		response.messages = data[0].messageCount;
		let sql = `SELECT COUNT(*) AS viewCount FROM views WHERE viewed='${req.session.user}' AND unread=1`;
		let result = DB.query(sql);
		result.then( function(data) {
			response.views = data[0].viewCount;
			let sql = `SELECT COUNT(*) AS likeCount FROM likes WHERE liked='${req.session.user}' AND unread=1`;
			let result = DB.query(sql);
			result.then(function(data) {
				response.likes = data[0].likeCount;
				res.json(response);
			}, function(err) {
				res.json(err);
			})
		}, function(err) {
			res.json(err);
		})
	}, function(err) {
		res.json(err);
	})
})

router.post('/logout', (req, res, next) => {
	let db = new database;
	let d = new Date();
	let date_ob = new Date();
	let date = ("0" + date_ob.getDate()).slice(-2);
	let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
	let year = date_ob.getFullYear();
	let hours = ((date_ob.getHours() < 10) ? '0' : '') + date_ob.getHours();
	let minutes = ((date_ob.getMinutes() < 10) ? '0' : '') + date_ob.getMinutes();
	let seconds = ((date_ob.getSeconds() < 10) ? '0' : '') + date_ob.getSeconds();
	let datestr = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
	db.query(`UPDATE users SET isOnline = 0, lastOnline = '${datestr}' WHERE username = '${req.session.user}'`);
	req.session.destroy();
	res.json('Received');
})

router.post('/forgot_pass', (req, res, next) => {
	//I HAVE BEEN SUMMONED TO DO SOMETHING HERE
})

router.post('/like', (req, res, next) => {
	if (!DB.verified(req.session.user)) {
		return ;
	}
	else {
		let sql = "SELECT * FROM likes WHERE liker = ? AND liked = ?"
		let inserts = [req.session.user, req.body.liked];
		sql = mysql.format(sql, inserts);

		let check = DB.query(sql);
		check.then( function(data) {
			if (!data[0]) {
				let sql = `INSERT INTO likes (type, liker, liked)
				VALUES (1, ?, ?)`;
				let inserts = [req.session.user, req.body.liked];
				sql = mysql.format(sql, inserts);
				let like = DB.query(sql);
				like.then( function(data) {
					let sql = "UPDATE users SET userLikes = userLikes + 1, userFame = userFame + 1 WHERE username=?";
					let inserts = [req.body.liked];
					sql = mysql.format(sql, inserts);
					let finalization = DB.query(sql);
					finalization.then( function(data) {
						res.json('liked');
					})
				})
			}
			else
			{
				let sql = `DELETE FROM likes WHERE liker = ? AND liked = ?`;
				let inserts = [req.session.user, req.body.liked];
				sql = mysql.format(sql, inserts);
				let like = DB.query(sql);
				like.then( function(data) {
					let sql = `INSERT INTO likes (type, liker, liked) VALUES (2, ?, ?)`;
					let inserts = [req.session.user, req.body.liked];
					sql = mysql.format(sql, inserts);
					DB.query(sql);
					res.json('unliked');
				})
			}
		})
	}
})
router.post('/dislike', (req, res, next) => {
	if (!DB.verified(req.session.user)) {
		return ;
	}
	else {
		let sql = "SELECT * FROM dislikes WHERE disliker = ? AND disliked = ?"
		let inserts = [req.session.user, req.body.disliked];
		sql = mysql.format(sql, inserts);

		let check = DB.query(sql);
		check.then( function(data) {
			if (!data[0]) {
				let sql = `INSERT INTO dislikes (disliker, disliked)
				VALUES (?, ?)`;
				let inserts = [req.session.user, req.body.disliked];
				sql = mysql.format(sql, inserts);
				let like = DB.query(sql);
				like.then( function(data) {
					let sql = "UPDATE users SET userLikes = userLikes - 1, userFame = userFame - 1 WHERE username = ?";
					let inserts = [req.body.disliked];
					sql = mysql.format(sql, inserts);
					let finalization = DB.query(sql);
					finalization.then( function(data) {
						res.json('disliked');
					})
				})
			}
			else
			{
				let sql = `DELETE FROM dislikes WHERE disliker = ? AND disliked = ?`;
				let inserts = [req.session.user, req.body.disliked];
				sql = mysql.format(sql, inserts);
				let like = DB.query(sql);
				like.then( function(data) {
					let sql = "UPDATE users SET userLikes = userLikes + 1, userFame = userFame + 1 WHERE username = ?";
					let inserts = [req.body.disliked];
					sql = mysql.format(sql, inserts);
					let finalization = DB.query(sql);
					finalization.then( function(data) {
						res.json('undisliked');
					})
				})
			}
		})
	}
})

module.exports = router;
