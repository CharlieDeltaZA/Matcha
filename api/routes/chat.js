const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.render('chat', {
		title:'Chat',
	});
});

router.post('/', (req, res, next) => {
	console.log("POST sent to chat page");
});

module.exports = router;