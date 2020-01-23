const db = require('./config');
const mysql = require('mysql');
var encrypt = require('../encrypt');
const crypto = require('crypto');
const email_handler = require('../../api/email');

class Database {

	constructor() {
		this.connection = mysql.createConnection({
			host: `${db.servername}`,
			user: `${db.dbusername}`,
			password: `${db.dbpassword}`,
			database: `${db.dbname}`
		});
	}

	query(sql, args) {
		return new Promise((resolve, reject) => {
			this.connection.query(sql, args, (err, rows) => {
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
				confirmation.then(function (ret) {
					// console.log(`Email sent.`);
				}, function (err) {
					// reject (err);
				})
			}, function (err) {
				// reject (err);
			})
		}, function (err) {
			// reject (err);
		})
	}

	validate_user(username) {
		return new Promise((resolve, reject) => {
			let sql = "SELECT * FROM users WHERE username = ?";
			let inserts = [username];
			sql = mysql.format(sql, inserts);

			let userExists = this.query(sql);
			userExists.then(function (ret) {
				if (ret[0])
					resolve(1);
				reject(0);
			}),
				function (err) {
					reject("Failed to validate query.");
				};
		})
	}

	login(username, password) {
		return new Promise((resolve, reject) => {
			let result = this.validate_user(username);
			var a = this;
			result.then(function (res) {
				let sql = "SELECT userPassword FROM users WHERE username = ?";
				let inserts = [username];
				sql = mysql.format(sql, inserts);
				let result = a.query(sql);
				result.then(function (res) {
					let pass = res[0];
					let password_check = encrypt.comparePassword(password, pass.userPassword);
					password_check.then(function (res) {
						resolve(`Logged in user '${username}'`);
					},
						function (err) {
							reject(`Incorrect password for '${username}'`);
						})
				})
			}, function (err) {
				reject(`'${username}' does not exist.`);
			})
		});
	}

	register(username, name, surname, email, userPass, userConfPass) {
		return new Promise((resolve, reject) => {
			var a = this;
			let userExists = this.validate_user(username);
			userExists.then(function (ret) {
				reject("User already exists");
			},
				function (err) {
					let hash = encrypt.cryptPassword(userPass);
					hash.then(function (ret) {
						let current_date = new Date();
						let sql = `INSERT INTO users (username, userEmail, userPassword, userFirstName, userLastName, userCode) VALUES(?, ?, ?, ?, ?, ?)`
						let hash = crypto.createHash('md5').update(current_date + username).digest('hex');
						let inserts = [username, email, ret, name, surname, hash];
						sql = mysql.format(sql, inserts);
						let registered = a.query(sql);
						registered.then(function (data) {
							a.email_user(username);
						}, function (err) {
							console.log(err);
						})

						return resolve();
					})
				})
		});
	}



	get_matches(userOrientation, userGender, username, userAge, ageDiff, minFame) {
		return new Promise((resolve, reject) => {
			var ageMin = 0;
			var ageMax = 100;
			if (ageDiff && userAge) {
				ageMin = userAge - +ageDiff;
				ageMax = userAge + +ageDiff;
			}
			if (!minFame)
				minFame = 0;
			var sql;
			if (userOrientation == 'bi') {
				if (userGender == "Female")
					sql = `
					SELECT * FROM users
					WHERE
					userOrientation = 'bi' AND accountComplete = 1 AND username != '${username}' AND userAge BETWEEN ${ageMin} AND ${ageMax} AND userFame >= ${minFame}
					OR
					userOrientation = 'hetero' AND userGender = 'Male' AND accountComplete = 1 AND username != '${username}' AND userAge BETWEEN ${ageMin} AND ${ageMax} AND userFame >= ${minFame}
					OR
					userOrientation = 'homo' AND userGender = 'Female' AND accountComplete = 1 AND username != '${username}' AND userAge BETWEEN ${ageMin} AND ${ageMax} AND userFame >= ${minFame}`;
				else
					sql = `
					SELECT * FROM users
					WHERE
					userOrientation = 'bi' AND accountComplete = 1 AND username != '${username}' AND userAge BETWEEN ${ageMin} AND ${ageMax} AND userFame > ${minFame}
					OR
					userOrientation = 'hetero' AND userGender = 'Female' AND accountComplete = 1 AND username != '${username}' AND userAge BETWEEN ${ageMin} AND ${ageMax} AND userFame >= ${minFame}
					OR
					userOrientation = 'homo' AND userGender = 'Male' AND accountComplete = 1 AND username != '${username}' AND userAge BETWEEN ${ageMin} AND ${ageMax} AND userFame >= ${minFame}`;
			} else if (userOrientation == 'hetero') {
				if (userGender == 'Female')
					sql = `
					SELECT * FROM users
					WHERE
					userOrientation = 'bi' AND userGender = 'Male' AND accountComplete = 1 AND username != '${username}' AND userAge BETWEEN ${ageMin} AND ${ageMax} AND userFame >= ${minFame}
					OR
					userOrientation = 'hetero' AND userGender = 'Male' AND accountComplete = 1 AND username != '${username}' AND userAge BETWEEN ${ageMin} AND ${ageMax} AND userFame >= ${minFame}`
				else
					sql = `
					SELECT * FROM users
					WHERE
					userOrientation = 'bi' AND userGender = 'Female' AND accountComplete = 1 AND username != '${username}' AND userAge BETWEEN ${ageMin} AND ${ageMax} AND userFame >= ${minFame}
					OR
					userOrientation = 'hetero' AND userGender = 'Female' AND accountComplete = 1 AND username != '${username}' AND userAge BETWEEN ${ageMin} AND ${ageMax} AND userFame >= ${minFame}`
			}
			else if (userOrientation == 'homo') {
				if (userGender == 'Female')
					sql = `
					SELECT * FROM users
					WHERE
					userOrientation = 'bi' AND userGender = 'Female' AND username != '${username}' AND userAge BETWEEN ${ageMin} AND ${ageMax} AND userFame >= ${minFame}
					OR
					userOrientation = 'homo' AND userGender = 'Female' AND username != '${username}' AND userAge BETWEEN ${ageMin} AND ${ageMax} AND userFame >= ${minFame}`
				else
					sql = `
					SELECT * FROM users
					WHERE
					userOrientation = 'bi' AND userGender = 'Male' AND username != '${username}' AND userAge BETWEEN ${ageMin} AND ${ageMax} AND userFame >= ${minFame}
					OR
					userOrientation = 'homo' AND userGender = 'Male' AND username != '${username}' AND userAge BETWEEN ${ageMin} AND ${ageMax} AND userFame >= ${minFame}`
			}
			let result = this.query(sql);
			result.then(function (data) {
				resolve(data);
			}, function (err) {
				reject(err);
			})
		});
	}

	userComplete(username) {
		var a = this;
		let sql = "SELECT * FROM users WHERE username = ?"
		let inserts = [username];
		sql = mysql.format(sql, inserts);
		let completionCheck = this.query(sql);
		completionCheck.then(function (data) {
			if (data[0].userFirstName && data[0].userLastName && data[0].userImage && data[0].userGender && data[0].userAge && data[0].userLocationlat
				&& data[0].userLocationlng && data[0].userOrientation && data[0].userBiography && data[0].userVerified) {
				let sql = "UPDATE users SET accountComplete = 1 WHERE username = ?";
				let inserts = [username];
				sql = mysql.format(sql, inserts);
				a.query(sql);
			} else {
				let sql = "UPDATE users SET accountComplete = 0 WHERE username = ?";
				let inserts = [username];
				sql = mysql.format(sql, inserts);
				a.query(sql);
			}
		});
	}

	verified(username) {
		return new Promise((resolve, reject) => {
			let sql = "SELECT * FROM users WHERE username = ?"
			let inserts = [username];
			sql = mysql.format(sql, inserts);
			let verified = this.query(sql);
			verified.then(function (data) {
				if (data[0].accountComplete == 1)
					resolve();
				else
					reject(0);
			}, function (err) {
				reject(0);
			})
		})
	}

	get_user(username) {
		return new Promise((resolve, reject) => {
			let sql = "SELECT * FROM users WHERE username = ?";
			let inserts = [username];
			sql = mysql.format(sql, inserts);
			let userExists = this.query(sql);
			userExists.then(function (ret) {
				if (!ret[0])
					return reject("User does not exist.");
				resolve(ret);
			}, function (err) {
				reject(err);
			});
		});
	}

	update_username(username, newUsername) {
		return new Promise((resolve, reject) => {
			var sql = "UPDATE users SET username=? WHERE username=?";
			var inserts = [newUsername, username];
			var a = this;
			sql = mysql.format(sql, inserts);
			let update = a.query(sql);
			update.then(function (ret) {
				sql = `UPDATE images SET imageOwner=? WHERE imageOwner='${username}'`
				inserts = [newUsername];
				sql = mysql.format(sql, inserts);
				let imagesTable = a.query(sql);
				imagesTable.then(function (data) {
					imagesTable.then(function (data) {
						let sql = `UPDATE messages SET sender=? WHERE sender='${username}'`
						inserts = [newUsername];
						sql = mysql.format(sql, inserts);
						let messageSender = a.query(sql);
						messageSender.then(function (data) {
							let sql = `UPDATE messages SET receiver=? WHERE receiver='${username}'`
							inserts = [newUsername];
							sql = mysql.format(sql, inserts);
							let messageReceiver = a.query(sql);
							messageReceiver.then(function (data) {
								let sql = `UPDATE likes SET liked=? WHERE liked='${username}'`
								inserts = [newUsername];
								sql = mysql.format(sql, inserts);
								let likedUser = a.query(sql);
								likedUser.then(function (data) {
									let sql = `UPDATE views SET viewed=? WHERE viewed='${username}'`
									inserts = [newUsername];
									sql = mysql.format(sql, inserts);
									let likedUser = a.query(sql);
									likedUser.then(function (data) {
										let sql = `UPDATE views SET viewer=? WHERE viewer='${username}'`
										inserts = [newUsername];
										sql = mysql.format(sql, inserts);
										let likedUser = a.query(sql);
										likedUser.then(function (data) {
											let sql = `UPDATE interests SET user=? WHERE user='${username}'`
											inserts = [newUsername];
											sql = mysql.format(sql, inserts);
											let interests = a.query(sql);
											interests.then(function (data) {
												let sql = `UPDATE friends SET user1=? WHERE user1='${username}'`;
												inserts = [newUsername];
												sql = mysql.format(sql, inserts);
												let friends1 = a.query(sql);
												friends1.then(function (data) {
													let sql = `UPDATE friends SET user2=? WHERE user2='${username}'`;
													inserts = [newUsername];
													sql = mysql.format(sql, inserts);
													let friends2 = a.query(sql);
													friends2.then(function (data) {
														let sql = `UPDATE dislikes SET disliked=? WHERE disliked='${username}'`;
														inserts = [newUsername];
														sql = mysql.format(sql, inserts);
														let disliked1 = a.query(sql);
														disliked1.then(function (data) {
															let sql = `UPDATE dislikes SET disliker=? WHERE disliker='${username}'`;
															inserts = [newUsername];
															sql = mysql.format(sql, inserts);
															let disliked2 = a.query(sql);
															disliked2.then(function (data) {
																resolve();
															})
														})
													}, function (err) {
														reject(err);
													})
												}, function (err) {
													reject(err);
												})
											}, function (err) {
												reject(err);
											})
										}, function (err) {
											reject(err);
										})
									})
								}, function (err) {
									reject(err);
								})
							}, function (err) {
								reject(err);
							})
						}, function (err) {
							reject(err);
						})
					}, function (err) {
						reject(err)
					})
				}, function (err) {
					reject(err);
				})
			}, function (err) {
				reject("Failed to update username.");
			})
		})
	}

	change_username(username, newUsername) {
		return new Promise((resolve, reject) => {
			if (!username || !newUsername) {
				reject("Blank input passed to function.");
			}

			let userTaken = this.get_user(newUsername);
			var a = this;
			userTaken.then(function (ret) {
				if (!ret[0]) {
					reject(`Error: "Username already taken"`);
				}
			}, function (err) {
				let update = a.update_username(username, newUsername);
				update.then(function (data) {
					resolve();
				}, function (err) {
					reject(err);
				})
			})
		})
	}

	change_email(username, change_email) {
		return new Promise((resolve, reject) => {
			var a = this;
			if (!username || !change_email)
				reject("Blank input passed to function.");

			let sql = "UPDATE users SET userEmail=? WHERE username=?";
			let inserts = [change_email, username];
			sql = mysql.format(sql, inserts);
			let update = a.query(sql);
			update.then(function (ret) {
				resolve("Email updated.");
			}, function (err) {
				reject("Failed to update email.");
			})
		})
	}

	getImages(username) {
		return new Promise((resolve, reject) => {
			let db = new Database();
			let sql = `SELECT * FROM images WHERE imageOwner='${username}'`;
			let result = db.query(sql);
			result.then(function (data) {
				resolve(data);
			}, function (err) {
				reject(err);
			})
		})
	}

	uploadImage(username, imageURL, imageID) {
		return new Promise((resolve, reject) => {
			var a = this;
			if (!username)
				reject("There is no logged in session.");
			else if (!imageURL)
				reject("Failed to generate URL");
			else {
				let sql = `SELECT COUNT(*) AS imageCount FROM images WHERE imageOwner='${username}'`;
				let rowCount = a.query(sql);
				rowCount.then(function (data) {
					if ((data[0].imageCount) < 5) {
						let sql = `INSERT INTO images (imageOwner, image, active) VALUES ('${username}', '${imageURL}', 0)`
						let upload = a.query(sql);
						upload.then(function (data) {
							resolve("Successfully uploaded image");
						}, function (err) {
							reject(err);
						})
					} else {
						reject("Maximum uploaded images reached.");
					}
				}, function (err) {
					reject(err);
				})
			}
		})
	}

	activate_account = function (code) {
		var a = this;
		return new Promise((resolve, reject) => {
			let sql = `SELECT COUNT(*) AS codeExists FROM users WHERE userCode=?`;
			let inserts = [code];
			sql = mysql.format(sql, inserts);
			let rowCount = a.query(sql);
			rowCount.then(function (data) {
				if (data[0].codeExists == 1) {
					let sql = `UPDATE users SET userVerified=1 WHERE userCode='${code}'`
					a.query(sql);
					resolve();
				}
				else
					reject();
			}, function (err) {
				reject(err);
			})
		})
	}

	view_profile(viewed, viewer) {
		var a = this;

		let sql = "SELECT * FROM blocks WHERE blocked = ? AND blocker = ?";
		let inserts = [viewer, viewed];
		sql = mysql.format(sql, inserts);
		let blocked = this.query(sql);
		blocked.then(function (data) {
			if (data[0])
				return ;
			else {
				sql = 'SELECT * FROM views WHERE viewer = ? AND viewed = ?'
				inserts = [viewer, viewed];
				sql = mysql.format(sql, inserts);
				let checked = a.query(sql);
				checked.then(function (data) {
					if (!data[0]) {
						let sql = `INSERT into views (viewed, viewer, unread) VALUES (?, ?, 1)`
						let inserts = [viewed, viewer];
						sql = mysql.format(sql, inserts);
						a.query(sql);
					}
				})
			}
		})
	}

	add_interest(username, interest) {
		var a = this;
		let sql = `SELECT COUNT(*) AS duplicates FROM interests WHERE user='${username}' AND interest=?`;
		let inserts = [interest];
		sql = mysql.format(sql, inserts);
		let duplicate_check = this.query(sql);
		duplicate_check.then(function (data) {
			if (data[0].duplicates < 1) {
				let sql = `INSERT INTO interests (user, interest) VALUES ('${username}', ?);`
				let inserts = [interest];
				sql = mysql.format(sql, inserts);
				a.query(sql);
			}
		}, function (err) {
		});
	}

	remove_interest(username, interest) {
		let sql = `DELETE FROM interests WHERE user='${username}' AND interest=?`;
		let inserts = [interest];
		sql = mysql.format(sql, inserts);
		this.query(sql);
	}

	blockUser(blocker, blocked) {
		return new Promise((resolve, reject) => {
			var a = this;
			let sql = `SELECT * FROM blocks WHERE blocker = ? AND blocked = ?`;
			let inserts = [blocker, blocked];
			sql = mysql.format(sql, inserts);
			let blockCheck = this.query(sql);
			blockCheck.then(function (data) {
				if (!data[0]) {
					let sql = `INSERT INTO blocks (blocker, blocked) VALUES (?, ?)`;
					let inserts = [blocker, blocked];
					sql = mysql.format(sql, inserts);
					let blockUser = a.query(sql);
					blockUser.then(function (data) {
						let sql = "DELETE FROM likes WHERE liker = ? AND liked = ?"
						let inserts = [blocked, blocker];
						sql = mysql.format(sql, inserts);
						let removeLike = a.query(sql);
						removeLike.then( function(data) {
							resolve('blocked');
						}, function(err) {
						})
					}, function (err) {
					});
				} else {
					let sql = `DELETE FROM blocks WHERE blocker = ? AND blocked = ?`;
					let inserts = [blocker, blocked];
					sql = mysql.format(sql, inserts);
					let blockUser = a.query(sql);
					blockUser.then(function (data) {
						resolve('unblocked');
					}, function (err) {
					});
				}
			});
		});
	}

	close() {
		return new Promise((resolve, reject) => {
			this.connection.end(err => {
				if (err)
					return reject(err);
				resolve();
			});
		});
	}
}

module.exports = Database;