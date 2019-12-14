const db = require('./config');
const mysql = require('mysql');
var encrypt = require('../encrypt');

class Database {

    constructor() {
        this.connection = mysql.createConnection( {
			host: `${db.servername}`,
			user: `${db.dbusername}`,
			password: `${db.dbpassword}`,
			database: `${db.dbname}`
		});
	}

    query(sql, args) {
        return new Promise( (resolve, reject) => {
            this.connection.query( sql, args, (err, rows) => {
				if (err)
				{
					return reject(err);
				}
                return resolve(rows);
            });
        });
	}

	validate_user(username) {
		return new Promise ( (resolve, reject) => {
			let sql = "SELECT * FROM users WHERE username = ?";
			let inserts = [username];
			sql = mysql.format(sql, inserts);
			
			let userExists = this.query(sql);
			userExists.then(function(ret) {
				if (!ret[0])
					reject(0);
				resolve(1);
			});
		});
	}

	login(username, password) {
		return new Promise ( (resolve, reject) => {
			let result = this.validate_user(username);
			var a = this;
			result.then(function (res) {
				let sql = "SELECT userPassword FROM users WHERE username = ?";
				let inserts = [username];
				sql = mysql.format(sql, inserts);
				let result = a.query(sql);
				result.then(function(res){
					let pass = res[0];
					let password_check = encrypt.comparePassword(password, pass.userPassword);
					password_check.then(function(res){
						resolve(`Logged in user '${username}'`);
					},
					function(err){
						reject(`Incorrect password for '${username}'`);
					})
				})
			},function(err){
				reject(`'${username}' does not exist.`);
			})
		});
	}

	// All field validation will be done in front-end js. This exclusively handles the SQL.
	register(username, name, surname, gender, email, password) {
		return new Promise ( (resolve, reject) => {
			let userExists = this.validate_user(username);
			userExists.then(function(ret) {
				reject(`User ${username} already exists`);
			},
			function(err) {
				let hash = encrypt.cryptPassword(password);
				var a = this;
				hash.then(function(ret){
					let sql = `INSERT INTO users (username, userEmail, userPassword, userFirstName, userLastName, userGender) VALUES(?, ?, ?, ?, ?, 'Male')`
					let inserts = [username, email, ret, name, surname];
					sql = mysql.format(sql, inserts);
					a.query(sql);
					return resolve();
				})
			})	
		});
	}

	get_user(username) {
		return new Promise ( (resolve, reject) => {
			let sql = "SELECT * FROM users WHERE username = ?";
			let inserts = [username];
			sql = mysql.format(sql, inserts);
			
			let userExists = this.query(sql);
			userExists.then(function(ret) {
				if (!ret[0])
					reject("User does not exist.");
				resolve(ret);
			});
		});
	}

    close() {
        return new Promise( (resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }
}

module.exports = Database;