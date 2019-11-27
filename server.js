const express = require("express");
const PORT = 8080;
const app = express();

app.set('view engine', 'pug');
app.use(express.static('styles'));
app.use(express.static('images'));

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