const express = require("express");
const PORT = 8080;
const app = express();
const sql = require('./config/setup');

// sql.setupDB();
sql.setupDB();
// sql.setupTables();

app.set('view engine', 'pug');
app.use(express.static('styles'));
app.use(express.static('images'));
app.use(express.static('scripts'));

app.get("/", (req, res) => {
	res.render('index', {
		title:'Homepage',
	});
});

app.get("/register", (req, res) => {
	res.render('register', {
		title:'Register',
	});
});

app.get("/login", (req, res) => {
	res.render('login', {
		title:'Login',
	});
});

app.get("/profile", (req, res) => {
	res.render('profile', {
		title:'Profile',
	});
});

app.get("/edit_profile", (req, res) => {
	res.render('edit_profile', {
		title:'Edit Profile',
	});
});

app.get("/set_prefs", (req, res) => {
	res.render('set_prefs', {
		title:'Set Preferences',
	});
});

app.get("/goodbye", (req, res) => {
	res.send("Goodbye world");
});

app.get('*', function(req, res) {
	res.render('error', {
		title:'error',
	});
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});

//mongo connection
const Chat = require("./models/Chat");
const connect = require ("./config/dbconnect");

//chat stuff start
const http = require("http").Server(app);
const io = require("socket.io");

//chat port
const chatPort = 500;

const socket = io(http);

//event listener for users
socket.on("connection", (socket) => {
	console.log("user connected");
	socket.on("disconnect", () => {
		console.lot("disconnected");
	});

	//listen for a mesasge
	socket.on("chat message", (msg) => {
		console.log("message: " + msg);
		socket.broadcast.emit("recieved", { message: msg });
		
		//save chat to db
		connect.then( db => {
			console.log("connected to the db server");
			
			let chatMessage = new Chat({ message: msg, sender: "Anonymous"});
			chatMessage.save();
		});
	});
});

//listen to the port
http.listen(chatPort, () => {
	console.log("connected to port: " + chatPort);
});

//chat stuff end

//api for front end 
const bodyParser = require("body-parser");
const chatRouter = require("./route/chatroute");

//bodyparser middleware
app.unsubscribe(bodyParser.json());

//routes
app.use("./scripts/chat");

