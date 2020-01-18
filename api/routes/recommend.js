const express = require('express');
const router = express.Router();
const app = express();
const database = require('../../api/database/database');

app.use(express.static('/../../styles'));
app.use(express.static('/../../images'));
app.use(express.static('/../../scripts'));

var DB = new database;

function toRad(Value) 
{
	return Value * Math.PI / 180;
}
function deg2rad(deg) {
	return deg * (Math.PI/180)
}

function sortByDistance(lat1, lon1, lat2, lon2) {
	var R = 6371; // Radius of the earth in km
	var dLat = deg2rad(lat2-lat1);  // deg2rad below
	var dLon = deg2rad(lon2-lon1); 
	var a = 
	Math.sin(dLat/2) * Math.sin(dLat/2) +
	Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
	Math.sin(dLon/2) * Math.sin(dLon/2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c; // Distance in km
	return (d);
}

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
		var arrayExists = 1;
		var userAge = data[0].userAge;
		if (!userOrientation || !userGender)
			res.redirect('/user/account');
		var userArray = DB.get_matches(userOrientation, userGender, req.session.user, userAge, req.body.ageDiff);
		userArray.then( function(data1) {
			// console.log(data);
			if (!data1[0])
				arrayExists = 0;
			sortByDistance(data[0].userLocationlat, data[0].userLocationlng, data1[0].userLocationlat, data1[0].userLocationlng);
			res.render('recommendations', {
				title:'Recommendations',
				user: (req.session.user === undefined ? "Username" : req.session.user),
				userArray: data1,
				userLogged: (req.session.user === undefined ? false : true),
				arrayExists: arrayExists
			});
		})
	})
});

router.post('/notifications', (req, res, next) => {

});

module.exports = router;
