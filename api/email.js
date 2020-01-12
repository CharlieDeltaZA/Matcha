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

var confirm_email = function confirm_email(email, code) {
	return new Promise ( (resolve, reject) => {
		if (!email || email == undefined)
			reject ("No valid email given.");

		var mailOptions = {
			from: 'noreply.matchaWTC@gmail.com',
			to: `${email}`,
			subject: 'Please verify your email',
			text: `Please verify your email using this link: http://localhost:8080/user/account/${code}`
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