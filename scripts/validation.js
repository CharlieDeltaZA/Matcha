function registrationValid(username, name, surname, email, password, confpassword) {
	if (username === undefined || username == "")
		return (2);
	if (name === undefined || name == "")
		return (3);
	if (surname === undefined || surname == "")
		return (4);
	if (email === undefined || email == "")
		return (5);
	// if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))
	// 	return (9);
	if (password === undefined || password == "")
		return (6);
	// if (password.length < 8)
	// 	return (10);
	// if (password.length > 20)
	// 	return (11);
	// if (!(/.*[a-zA-Z].*/.test(password)))
	// 	return (12);
	// if (!(/.*[1-9].*/.test(password)))
	// 	return (13);
	// if (!(/^[a-zA-Z0-9]*$/.test(password)))
	// 	return (14);
	if (confpassword === undefined || confpassword == "")
		return (7);
	if (password != confpassword)
		return (8);
	return (1);
}

var userLogin, userName, userSurname, userEmail, userPass, userConfPass;

$("input[type='text'], input[type='password'], input[type='email']").on("keyup", function(){
	userLogin=document.getElementById("userLogin").value;
	userName=document.getElementById("userName").value;
	userSurname=document.getElementById("userSurname").value;
	userEmail=document.getElementById("userEmail").value;
	userPass=document.getElementById("userPass").value;
	userConfPass=document.getElementById("userConfPass").value;

	
	$(".errorMsg").text("");
	$("#submit").prop("disabled", true);
	switch (registrationValid(userLogin, userName, userSurname, userEmail, userPass, userConfPass)) {
		case 1:
			$("#submit").prop("disabled", false);
			break;
		case 2:
			$("#userNameError").text("Username is Blank");
			break;
		case 3:
			$("#firstNameError").text("First Name is Blank");
			break;
		case 4:
			$("#lastNameError").text("Surname is Blank");
			break;
		case 5:
			$("#emailError").text("Email is Blank");
			break;
		case 6:
			$("#passError").text("Password is Blank");
			break;
		case 7:
			$("#confPassError").text("Confirm Password is blank");
			break;
		case 8:
			$("#confPassError").text("Passwords Do Not Match");
			break;
		case 9:
			$("#emailError").text("Email is Invalid");
			break;
		case 10:
			$("#passError").text("Password is too short");
			break;
		case 11:
			$("#passError").text("Password is too long");
			break;
		case 12:
			$("#passError").text("Password does not contain letters");
			break;
		case 13:
			$("#passError").text("Password does not contain numbers");
			break;
		case 14:
			$("#passError").text("Password contains symbols or emojis");
			break;
		default :
			console.log(registrationValid(userLogin, userName, userSurname, userEmail, userPass, userConfPass))
};});