function postPublicDetails() {
	let form = {
		userName: document.getElementById('userName').value,
		userSurname: document.getElementById('userSurname').value,
		userGender: document.getElementById('userGender').value,
		userSexPref: document.getElementById('userSexPref').value,
		userBio: document.getElementById('userBio').value,
	}
	if (form.userName && form.userSurname && form.userGender && form.userSexPref) {
		if (form.userGender !== 'Male' && form.userGender !== 'Female') {
			swal(
				'Error!',
				`Invalid gender`,
				'error'
			)
		} else {
			$.ajax({
				type: "POST", 
				url : '/user/account/public',
				data: JSON.stringify(form),
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function(data) {
					// registrationHandler(data);
					location.reload();
				}
			});
		}
	}
}

function changeUsername() {
	let form = {
		userLogin: document.getElementById('userLogin').value
	}
	if (form.userLogin < 3)
	{
		swal(
			'Error!',
			`Username must contain at least 3 characters.`,
			'error'
		)
	}
	else if (!form.userLogin) {
		swal(
			'Error!',
			`Username can't be blank.`,
			'error'
		)
	} else {
		$.ajax({
			type: "POST", 
			url : '/user/account/username',
			data: JSON.stringify(form),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(data) {
				console.log(data);
				if (data === 'Success')
				{
					location.reload();
				} else
				{
					swal(
						'Error!',
						`Username already taken.`,
						'error'
					)
				}
			}
		});
	}
}

function changeEmail() {
	let form = {
		userEmail: document.getElementById('userEmail').value
	}
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (re.test(String(form.userEmail).toLowerCase())) {
		swal(
			'Error!',
			`Invalid email.`,
			'error'
		)
	}
	else if (!form.userEmail) {
		swal(
			'Error!',
			`Email can't be blank.`,
			'error'
		)
	} else {
		$.ajax({
			type: "POST", 
			url : '/user/account/email',
			data: JSON.stringify(form),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(data) {
				document.getElementById('emailPara').innerHTML = data;
			}
		});
	}
}

function updateDoB() {
	if (!(document.getElementById('userDOB').value))
	{
		swal(
			'Error!',
			`Date input incomplete`,
			'error'
		)
		return;
	}
	var entered = new Date(document.getElementById('userDOB').value);
	let ageDifMs = Date.now() - entered.getTime();
	let ageDate = new Date(ageDifMs);
	var age = Math.abs(ageDate.getUTCFullYear() - 1970);
	if (age < 18) {
		swal(
			'Error!',
			`You must be over 16 to use this site.`,
			'error'
		)
	} else {
		let form = {
			age: age,
			birthDate: entered.toISOString().slice(0, 19).replace('T', ' ')
		}
		$.ajax({
			type: "POST", 
			url : '/user/account/age',
			data: JSON.stringify(form),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(data) {
				Location.reload();
			}
		});
	}
}

function postProfileImage() {
	$.ajax({
		type: "POST", 
		url : '/user/account',
		data: JSON.stringify(image),
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(data) {
			console.log('Image uploaded');
		}
	});
}

function changePassword() {
	console.log("entered");
	let form = 
	{
		password: document.getElementById("userNewPass").value
	}
	if (document.getElementById("userNewPass").value)
	{
		$.ajax({
			type: "POST", 
			url : '/user/account/password',
			data: JSON.stringify(form),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(data) {
				swal(
					'Updated!',
					`Your password has been updated.`,
					'success'
				)
			}
		});
	} else
	console.log("No password?");
}