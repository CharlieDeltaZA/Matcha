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
	var current_user = DB.get_user(req.session.user);
	current_user.then( function(data) {
		var userOrientation = data[0].userOrientation;
		var userGender = data[0].userGender;
		var userArray = DB.get_matches(userOrientation, userGender, req.session.user);
		var arrayExists = 1;
		if (!userOrientation || !userGender)
			res.redirect('/user/account');
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
	// var profileArray = DB.getProfiles(current_user);
});

module.exports = router;
