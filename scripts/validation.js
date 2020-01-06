function registrationValid(username, name, surname, email, password, confpassword) {
	if (username === undefined || username == "")
		return (2);
	if (name === undefined || name == "")
		return (3);
	if (surname === undefined || surname == "")
		return (4);
	if (email === undefined || email == "")
		return (5);
	if (password === undefined || password == "")
		return (6);
	if (confpassword === undefined || confpassword == "")
		return (7);
	if (password != confpassword)
		return (8);
	return (1);
}