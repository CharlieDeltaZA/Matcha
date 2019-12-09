const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.render('search', {
		title:'Search',
	});
});

router.post('/', (req, res, next) => {
	console.log("Searching");
});

module.exports = router;