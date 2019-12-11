const express = require('express');
var session = require('express-session');
const app = express();

// URL handling
const userRoutes = require('./api/routes/users');
const searchRoutes = require('./api/routes/search');
const chatRoutes = require('./api/routes/chat');
const recommendRoutes = require('./api/routes/recommend');

// Session
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

// Body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Pug
app.set('view engine', 'pug');
app.use(express.static('styles'));
app.use(express.static('images'));
app.use(express.static('scripts'));

// URL handling routers
app.use('/user', userRoutes);
app.use('/search', searchRoutes);
app.use('/recommendations', recommendRoutes);
app.use('/chat', chatRoutes);

app.get("/", (req, res) => {
    res.render('index', {
		title:'Home',
		user: (req.session.user === undefined ? "Username" : req.session.user)
    });
});

app.get('*', function(req, res) {
	res.render('error', {
		title:'Error',
		user: (req.session.user === undefined ? "Username" : req.session.user)
	});
});

module.exports = app;