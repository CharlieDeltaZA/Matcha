const express = require('express');
const router = express.Router();
const app = express();
const database = require('../../api/database/database');

app.use(express.static('/../../styles'));
app.use(express.static('/../../images'));
app.use(express.static('/../../scripts'));

var DB = new database;

router.get('/', (req, res, next) => {
	if (req.session.user === undefined)
	{
		res.redirect('/user/login');
		return ;
	}
	if (!userOrientation || !userGender)
		res.redirect('/user/account');
	var current_user = DB.get_user(req.session.user);
	current_user.then( function(data) {
		var userOrientation = data[0].userOrientation;
		var userGender = data[0].userGender;
		var arrayExists = 1;
		var userArray = DB.get_matches(userOrientation, userGender, req.session.user);
		userArray.then( function(data) {
			// console.log(data);
			if (!data[0])
				arrayExists = 0;
			res.render('recommendations', {
				title:'Recommendations',
				user: (req.session.user === undefined ? "Username" : req.session.user),
				userArray: data,
				userLogged: (req.session.user === undefined ? false : true),
				arrayExists: arrayExists
			});
		})
	})
});

router.post('/notifications', (req, res, next) => {
	
});

module.exports = router;
