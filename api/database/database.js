const db = require('./config');
const mysql = require('mysql');
var encrypt = require('../encrypt');

//Example of promise catching. Need to implement this everywhere later..
	// hash.then(function(res){
	// 	let match = encrypt.comparePassword(password, res);
	// 	match.then(function(ret){
	// 		console.log(ret);
	// 	}, function(err) {
	// 		console.log(err);
	// 	})
	// })

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
			let sql = "SELECT * FROM ?? WHERE ?? = ?";
			let inserts = ['users', 'username', username];
			sql = mysql.format(sql, inserts);
			
			let userExists = this.query(sql);
			userExists.then(function(ret) {
				if (!ret[0])
					return reject(`User ${username} does not exist`);
				return resolve("User exists");
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
						console.log("Password mismatch");
					})
				})
			},function(err){
				reject("Invalid user");
			})
		});
	}

	// All field validation will be done in front-end js. This exclusively handles the SQL.
	register(username, name, surname, gender, email, password) {
		return new Promise ( (resolve, reject) => {
			let sql = "SELECT * FROM users WHERE username = ?";
			let inserts = [username];
			sql = mysql.format(sql, inserts);
			let userExists = this.query(sql);

			userExists.then(function(ret) {
				if (ret[0])
					return reject(`User ${username} already exists`);
			})
			let hash = encrypt.cryptPassword(password);
			var a = this;
			hash.then(function(ret){
				sql = `INSERT INTO users (username, userEmail, userPassword, userFirstName, userLastName, userGender) VALUES(?, ?, ?, ?, ?, 'Male')`
				let inserts = [username, email, ret, name, surname];
				sql = mysql.format(sql, inserts);
				a.query(sql);
				return resolve();
			})
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