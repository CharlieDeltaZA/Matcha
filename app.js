const express = require('express');
const app = express();

// URL handling
const userRoutes = require('./api/routes/users');
const searchRoutes = require('./api/routes/search');
const chatRoutes = require('./api/routes/chat');

// Rendering
app.set('view engine', 'pug');
app.use(express.static('styles'));
app.use(express.static('images'));
app.use(express.static('scripts'));

// URL handling routers
app.use('/user', userRoutes);
app.use('/search', searchRoutes);
app.use('/chat', chatRoutes);

app.get("/", (req, res) => {
    res.render('index', {
        title:'Homepage',
    });
});

app.get('*', function(req, res) {
	res.render('error', {
		title:'error',
	});
});

module.exports = app;