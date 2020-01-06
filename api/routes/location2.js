const express = require('express');
const router = express.Router();
const app = express();

app.use(express.static('/../../styles'));
app.use(express.static('/../../images'));
app.use(express.static('/../../scripts'));

router.get('/', (req, res, next) => {
	res.render('location2', {
		title:'Location',
		user: (req.session.user === undefined ? "Username" : req.session.user)
	});
});

router.post('/', (req, res, next) => {
	// var lat = req.body.lat;
	// lat = lat.toFixed(3);
	// var lng = req.body.lng;
	// lng = lng.toFixed(3);
	console.log(`Received location!\nLocation: lat: ${req.body.lat}, lng: ${req.body.lng}`);
	res.json('Received');
});

module.exports = router;