function hasSpecial(string) {
	var regex = /^[A-Za-z0-9-_. ]+$/
	var isValid = regex.test(string);

	return (isValid);
}

function emailValid(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function loginFormValid(username, password) {
	if (!username || !password)
		return (false);
	return (true);
}

function registrationFormValid(username, name, surname, email, password, confpassword) {
	if (!username || !name || !surname || !email || !password || !confpassword)
		return (false);
	if (password !== confpassword)
		return (false);
	if (!emailValid(email))
		return (false);
	if (username.length < 4)
		return (false);
	if (!hasSpecial(username))
		return (false);
	return (true);
}

module.exports.registrationFormValid = registrationFormValid;
module.exports.loginFormValid = loginFormValid;