const express = require('express');
var session = require('express-session');
const app = express();
const database = require('./api/database/database');

// URL handling
const userRoutes = require('./api/routes/users');
const searchRoutes = require('./api/routes/search');
const chatRoutes = require('./api/routes/chat');
const recommendRoutes = require('./api/routes/recommend');
const locationRoutes = require('./api/routes/location');
const apiRoutes = require('./api/routes/api');

// Session and DB setup
app.use(session({
	key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
		expires: 600000
    }
}));

// TEMPORARY CODE. gets all information on a given user.

// let DB = new database;
// let user = DB.get_user('Test_User');
// user.then(function (ret) {
// 	console.log(ret[0]);
// }, function (err) {
// 	console.log(`Failed to retrieve user.\nReason: ${err}`);
// })

// TEMPOARY CODE. Emails any email given. 

// const email_handler = require('./api/email');
// let confirmation = email_handler.confirm_email('cameronstaljaard@gmail.com');
// confirmation.then( function (ret){
// 	console.log(`Email sent.`);
// }, function (err) {
// 	console.log(`Failed to send email.\nReason: ${err}`);
// })

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
app.use('/location', locationRoutes);
app.use('/api', apiRoutes);

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