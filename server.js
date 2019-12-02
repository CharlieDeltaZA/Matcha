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