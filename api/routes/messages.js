const express = require('express');
const router = express.Router();
const app = express();
const database = require('../../api/database/database');
const mysql = require('mysql');

app.set('view engine', 'pug');
app.use(express.static('/../../styles'));
app.use(express.static('/../../images'));
app.use(express.static('/../../scripts'));

router.post('/', (req, res, next) => {
	let current_user = req.session.user;
	let db = new database();

	let notifications = 
});