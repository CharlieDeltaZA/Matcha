const nodemailer = require('nodemailer');
// noreply.matchaWTC@gmail.com
// CaVJdFLYePnA9GLdrMsJ
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'noreply.matchaWTC@gmail.com',
        pass: 'CaVJdFLYePnA9GLdrMsJ'
    }
});

var confirm_email = function confirm_email(email) {
	return new Promise ( (resolve, reject) => {
		if (!email || email == undefined)
			reject ("No valid email given.");

		var mailOptions = {
			from: 'noreply.matchaWTC@gmail.com',
			to: `${email}`,
			subject: 'Sending Email using Node.js',
			text: 'That was easy!'
		};
		
		transporter.sendMail(mailOptions, function(error, info) {
			if (error)
				reject(error);
			else
				resolve(info.response);
		})
	});
}

module.exports.confirm_email = confirm_email;