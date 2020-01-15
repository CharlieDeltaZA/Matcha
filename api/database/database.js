const db = require('./config');
const mysql = require('mysql');
var encrypt = require('../encrypt');
const crypto = require('crypto');
const email_handler = require('../../api/email');

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
					return reject(err);
                return resolve(rows);
            });
        });
	}

	email_user(username) {
		var a = this;
		let valid_user = this.validate_user(username);
		valid_user.then(function (data) {
			let user = a.get_user(username);
			user.then(function (data) {
				let confirmation = email_handler.confirm_email(data[0].userEmail, data[0].userCode);
				confirmation.then( function (ret){
					// console.log(`Email sent.`);
				}, function (err) {
					// reject (err);
				})
			}, function(err){
				// reject (err);
			}) 
		}, function (err) {
			// reject (err);
		})
	}

	validate_user(username) {
		return new Promise ( (resolve, reject) => {
			let sql = "SELECT * FROM users WHERE username = ?";
			let inserts = [username];
			sql = mysql.format(sql, inserts);
			
			let userExists = this.query(sql);
			userExists.then(function(ret) {
				if (ret[0])
					resolve(1);
				reject(0);
				}),
			function (err) {
				reject ("Failed to validate query.");
			};
		})
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

	register(username, name, surname, email, userPass, userConfPass) {
		return new Promise ( (resolve, reject) => {
			var a = this;
			let userExists = this.validate_user(username);
			userExists.then( function(ret) {
				reject("User already exists");
			},
			function (err) {
				let hash = encrypt.cryptPassword(userPass);
				hash.then(function(ret){
					let current_date = new Date();
					let sql = `INSERT INTO users (username, userEmail, userPassword, userFirstName, userLastName, userCode) VALUES(?, ?, ?, ?, ?, ?)`
					let hash = crypto.createHash('md5').update(current_date + username).digest('hex');
					let inserts = [username, email, ret, name, surname, hash];
					sql = mysql.format(sql, inserts);
					let registered = a.query(sql);
					registered.then(function(data) {
						a.email_user(username);
					}, function(err) {
						console.log(err);
					})

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
					return reject("User does not exist.");
				resolve(ret);
			}, function (err) {
				reject(err);
			});
		});
	}

	update_username(username, newUsername) {
		return new Promise ( (resolve, reject) => {
			var sql = "UPDATE users SET username=? WHERE username=?";
			var inserts =[newUsername, username];
			var a = this;

			sql = mysql.format(sql, inserts);
			let update = a.query(sql);
			update.then(function(ret) {
				sql = `UPDATE images SET imageOwner=? WHERE imageOwner='${username}'`
				inserts = [newUsername];
				sql = mysql.format(sql, inserts);
				let imagesTable = a.query(sql);
				imagesTable.then (function(data) {
					imagesTable.then(function(data) {
						let sql = `UPDATE messages SET sender=? WHERE sender='${username}'`
						inserts = [newUsername];
						sql = mysql.format(sql, inserts);
						let messageSender = a.query(sql);
						messageSender.then( function(data) {
							let sql = `UPDATE messages SET receiver=? WHERE receiver='${username}'`
							inserts = [newUsername];
							sql = mysql.format(sql, inserts);
							let messageReceiver = a.query(sql);
							messageReceiver.then (function(data) {
								let sql = `UPDATE likes SET liked=? WHERE liked='${username}'`
								inserts = [newUsername];
								sql = mysql.format(sql, inserts);
								let likedUser = a.query(sql);
								likedUser.then (function(data) {
									let sql = `UPDATE views SET viewed=? WHERE viewed='${username}'`
									inserts = [newUsername];
									sql = mysql.format(sql, inserts);
									let likedUser = a.query(sql);
									likedUser.then( function(data) {
										let sql = `UPDATE views SET viewer=? WHERE viewer='${username}'`
										inserts = [newUsername];
										sql = mysql.format(sql, inserts);
										let likedUser = a.query(sql);
										likedUser.then( function(data) {
											let sql = `UPDATE interests SET user=? WHERE user='${username}'`
											inserts = [newUsername];
											sql = mysql.format(sql, inserts);
											let interests = a.query(sql);
											interests.then( function(data) {
												resolve();
											}, function(err) {
												reject(err);
											})
										}, function (err) {
											reject(err);
										})
									})
								}, function(err) {
									reject (err);
								})
							}, function(err) {
								reject (err);
							})
						}, function (err) {
							reject (err);
						})
					}, function (err) {
					reject(err)
				})
				}, function (err) {
					reject(err);
				})
			}, function (err) {
				reject ("Failed to update username.");
			})
		})
	}

	change_username(username, newUsername) {
		return new Promise ( (resolve, reject) => {
			if (!username || !newUsername)
			{
				console.log(`Username: ${username}, newUsername: ${newUsername}`);
				reject ("Blank input passed to function.");
			}
			
			let userTaken = this.get_user(newUsername);
			var a = this;
			userTaken.then(function (ret) {
				if (!ret[0]) {
					reject (`Error: "Username already taken"`);
				}
			}, function (err) {
				let update = a.update_username(username,newUsername);
				update.then(function(data){
					resolve();
				}, function (err) {
					reject(err);
				})
			})
		})
	}

	change_email(username, change_email) {
		return new Promise ( (resolve, reject) => {
			var a = this;
			if (!username || !change_email)
				reject ("Blank input passed to function.");

			let sql = "UPDATE users SET userEmail=? WHERE username=?";
			let inserts = [change_email, username];
			sql = mysql.format(sql, inserts);
			let update = a.query(sql);
			update.then(function(ret) {
				resolve ("Email updated.");
			}, function (err) {
				reject ("Failed to update email.");
			})
		})
	}

	getImages(username) {
		return new Promise ( (resolve, reject) => {
			let db = new Database();
			let sql = `SELECT * FROM images WHERE imageOwner='${username}'`;
			let result = db.query(sql);
			result.then(function (data) {
				resolve(data);
			}, function (err){
				reject (err);
			})
		})
	}

	uploadImage(username, imageURL, imageID) {
		return new Promise ( (resolve, reject) => {
			var a = this;
			if (!username)
				reject ("There is no logged in session.");
			else if (!imageURL)
				reject ("Failed to generate URL");
			else {
				let sql = `SELECT COUNT(*) AS imageCount FROM images WHERE imageOwner='${username}'`;
				let rowCount = a.query(sql);
				rowCount.then( function(data) {
					if((data[0].imageCount) < 5)
					{
						let sql = `INSERT INTO images (imageOwner, image, active) VALUES ('${username}', '${imageURL}', 0)`
						let upload = a.query(sql);
						upload.then (function (data) {
							resolve ("Successfully uploaded image");
						}, function (err) {
							reject (err);
						})
					} else {
						reject ("Maximum uploaded images reached.");
					}
				}, function (err) {
					reject(err);
				})
			}
		})
	}

	activate_account = function(code) {
		var a = this;
		return new Promise ( (resolve, reject) => {
			let sql = `SELECT COUNT(*) AS codeExists FROM users WHERE userCode=?`;
			let inserts = [code];
			sql = mysql.format(sql, inserts);
			let rowCount = a.query(sql);
			rowCount.then( function(data) {
				if (data[0].codeExists == 1)
				{
					let sql = `UPDATE users SET userVerified=1 WHERE userCode='${code}'`
					a.query(sql);
					resolve();
				}
				else
					reject();
			}, function (err) {
				reject (err);
			})
		})
	}

	add_interest(username, interest) {
		var a = this;
		let sql = `SELECT COUNT(*) AS duplicates FROM interests WHERE user='${username}' AND interest=?`;
		let inserts = [interest];
		sql = mysql.format(sql, inserts);
		let duplicate_check = this.query(sql);
		duplicate_check.then( function(data) {
			if (data[0].duplicates < 1)
			{
				let sql = `INSERT INTO interests (user, interest) VALUES ('${username}', ?);`
				let inserts = [interest];
				sql = mysql.format(sql, inserts);
				a.query(sql);
			}
		}, function(err) {
		});
	}

	remove_interest(username, interest) {
		let sql = `DELETE FROM interests WHERE user='${username}' AND interest=?`;
		let inserts = [interest];
		sql = mysql.format(sql, inserts);
		this.query(sql);
	}

	view_profile(viewed, viewer) {
		let sql = `INSERT into views (viewed, viewer, unread) VALUES (?, ?, 1)`
		let inserts = [viewed, viewer];
		sql = mysql.format(sql, inserts);
		this.query(sql);
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