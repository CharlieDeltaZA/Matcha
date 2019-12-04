const express = require("express");
const PORT = 8080;
const app = express();
const sql = require('./config/setup');


// var express        =         require("express");
var bodyParser     =         require("body-parser");

sql.setupDB();
// sql.setupDB();
// sql.setupTables();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'pug');
app.use(express.static('styles'));
app.use(express.static('images'));
app.use(express.static('scripts'));

app.post('/login',function(req,res){
    var userLogin=req.body.userLogin;
    var password=req.body.password;
    console.log("Username = "+userLogin+", password is "+password);
    // if (GET == 'login')
    res.redirect('http://localhost:8080?action=login');
});

app.post('/register',function(req,res){
    var userLogin=req.body.userLogin;
    var password=req.body.password;
    console.log("Username = "+userLogin+", password is "+password);
    // if (GET == 'login')
    res.redirect('http://localhost:8080?action=register');
});

app.get("/", (req, res) => {
    var GET = req.query.action;
    if (GET == 'login')
        console.log('cool story');
    res.render('index', {
        title:'Homepage',
    });
});

app.get("/register", (req, res) => {
    res.render('register', {
        title:'Register',
    });
});

app.get("/chat", (req, res) => {
    res.render('chat', {
        title:'Chat',
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