// function PrefCheck() {
//     'use strict';
//     printError("");
    
//     var xhr = new XMLHttpRequest();
//     var userDetails;
//     const g = document.getElementById('userGender');
//     const gender = g.options[g.selectedIndex].value;
//     const s = document.getElementById('userSexPref');
//     const sexpref = s.options[s.selectedIndex].value;
//     const dob = document.getElementById('userDOB').value; //dob YYYY-MM-DD
//     const bio = document.getElementById('userBio').value;
//     const interests = document.getElementById('userInterests').value;
//     // const propic = ???;
    
    
//     const age = calcAge(dob);
    
//     userPrefs = {
//         userGender: gender,
//         userOrientation: sexpref,
//         userAge: age,
//         userBio: bio,
//         userInterests: interests
//         // userProPic: propic
//     };
    
//     xhr.open("POST", '/user/preferences', true);
//     xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//     xhr.send(JSON.stringify(userPrefs));
//     console.log(userPrefs);
//     console.log("Posted");
// 	// window.location.replace("http://localhost:8080?action=prefs");
// }

// function calcAge(dob) {
    
//     var date = new Date(dob);
//     var today = new Date();

//     var timeDiff = Math.abs(today.getTime() - date.getTime());
//     var age1 = Math.ceil(timeDiff / (1000 * 3600 * 24)) / 365;

//     return age1.toFixed(1);
// }

// function printError(msg) {
//     const err = document.getElementById('error');
//     err.innerHTML = msg;
// }

function serverEmailValid(email) {
	return new Promise ( (resolve, reject) => {
		let emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (email === undefined || email == "")
			reject ('Email empty.');
		if (!(emailTest.test(String(email).toLowerCase())))
			reject ('Invalid email.');
		resolve ('Valid');
	});
}

function forgotPassHandler(data) {
	if (data !== 'success') {
		swal(
			'Error!',
			`Email does not exist, or something`,
			'error'
		)
	} else {
		window.location.href = "/user/login";
	}
}

function resetPass(code) {

	let form = {
		userCode: code,
		newPassword: document.getElementById('userPassword').value
	}
	checkPass(form.newPassword).then(() => {
		$.ajax({
			type: "POST", 
			url : '/user/pass_change',
			data: JSON.stringify(form),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(ret) {
				document.location.href = ("http://localhost:8080/changed");
			}
		})
	}, (err) => {
		swal(
            'Error!',
            `${err}`,
            'error'
        )
	})
}

function sendEmail() {
	let form = {
		userEmail: document.getElementById('userEmail').value,
	}
	let valid = serverEmailValid(form.userEmail);
	valid.then( function (ret) {
		$.ajax({
			type: "POST", 
			url : '/user/forgot_pass',
			data: JSON.stringify(form),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(ret) {
				swal(
					'Something Happened',
					`${ret}`,
					'info'
				)
			}
		})
	}, function (err) {
		swal(
            'Error!',
            `${err}`,
            'error'
        )
	})
}

$("#userEmail").keyup(function(event) {
    if (event.keyCode === 13) {
        sendEmail();
    }
});

$("#userPassword").keyup(function(event) {
    if (event.keyCode === 13) {
        resetPass($('#userPassword').val());
    }
});

function clientEmailValid(email) {
	let emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (email === undefined || email == "")
		return (5);
	if (!(emailTest.test(String(email).toLowerCase())))
		return (9);
	return (1);
}

$("input[type='email']").on("keyup", function(){
	userEmail = document.getElementById("userEmail").value;

	$(".errorMsg").text("");
	$("#submit").prop("disabled", true);
	switch (clientEmailValid(userEmail)) {
		case 1:
			$("#submit").prop("disabled", false);
			break;
		case 5:
			$("#emailError").text("Email is Blank");
			break;
		case 9:
			$("#emailError").text("Email is Invalid");
			break;
		default :
			console.log('invalid email error');
	};
});

$("input[type='text']").on("keyup", function(){
	$(".errorMsg").text("");
	$("#submit").prop("disabled", true);
	checkPass($("#userPassword").val()).then((ret) => {
		$("#submit").prop("disabled", false);
	}).catch((err) => {
		$('#passError').text(err);
	});
});

function checkPass(password/*, confpassword*/) {
	return new Promise ( (resolve, reject) => {
		if (password === undefined || password == "")
			reject ('Password empty.');
		if (password.length < 8)
			reject ('Password too short');
		if ((/[^A-Za-z0-9]+/.test(password)))
			reject ('Password contains something other than numbers and letters');
		if (!(/.*[1-9].*/.test(password)))
			reject ('Password does not contain numbers');
		if (!(/.*[a-zA-Z].*/.test(password)))
			reject ('Password does not contain letters');
		// if (!(/^[a-zA-Z0-9]*$/.test(password)))
		// 		return ('Password contains symbols or emojis');
		// if (confpassword === undefined || confpassword == "")
		// 	reject ('Confirm Password empty');
		// if (password != confpassword)
		// 	reject ('Password mismatch');
		resolve ('Valid');
	});
}