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
			setTimeout(() => {
				swal.close();
			}, 3000);
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
	if (form.userLogin < 4)
	{
		swal(
			'Error!',
			`Username must contain at least 4 characters.`,
			'error'
		)
		setTimeout(() => {
			swal.close();
		}, 3000);
	}
	else if (!form.userLogin) {
		swal(
			'Error!',
			`Username can't be blank.`,
			'error'
		)
		setTimeout(() => {
			swal.close();
		}, 3000);
	} else {
		$.ajax({
			type: "POST", 
			url : '/user/account/username',
			data: JSON.stringify(form),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(data) {
				// console.log(data);
				if (data === 'Success')
				{
					location.reload();
				} else
				{
					swal(
						'Error!',
						`${data}`,
						'error'
					)
					setTimeout(() => {
						swal.close();
					}, 3000);
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
	if (!(re.test(String(form.userEmail).toLowerCase()))) {
		swal(
			'Error!',
			`Invalid email.`,
			'error'
		);
		setTimeout(() => {
			swal.close();
		}, 3000);
	}
	else if (!form.userEmail) {
		swal(
			'Error!',
			`Email can't be blank.`,
			'error'
		)
		setTimeout(() => {
			swal.close();
		}, 3000);
	} else {
		$.ajax({
			type: "POST", 
			url : '/user/account/email',
			data: JSON.stringify(form),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(data) {
				document.getElementById('emailPara').innerHTML = data;
				setTimeout(() => {
					$('#emailPara').text('');
				}, 2000);
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
		setTimeout(() => {
			swal.close();
		}, 3000);
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
		setTimeout(() => {
			swal.close();
		}, 3000);
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
				location.reload();
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
			// console.log('Image uploaded');
		}
	});
}

function changePassword() {
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
				setTimeout(() => {
					swal.close();
				}, 3000);
			}
		});
	} else
	console.log("No password?");
}

function	validInterest(interest)  {
	var re = /^#[A-Za-z0-9-_.]+$/;
	if (re.test(interest))
		return true;
	return false;
}

function	add_interest() {
	var interests = document.getElementById('userInterests').value;
	
	interests = interests.split(" ");
	interests.forEach(function (data) {
		if (!validInterest(data))
		{
			swal(
				'Error!',
				`${data} is not a correctly formatted interest`,
				'error'
			)
			setTimeout(() => {
				swal.close();
			}, 3000);
			return ;
		}
	});
	interests.forEach(function (data) {
		if (validInterest(data))
		{
			let form = 
			{
				interest: data
			}
			$.ajax({
				type: "POST", 
				url : '/user/account/addinterest',
				data: JSON.stringify(form),
				contentType: "application/json; charset=utf-8",
				dataType: "json",
			});
		}
	});
	document.getElementById("interestsPara").innerHTML = "Updated your interests";
	setTimeout(() => {
		$('#interestsPara').text('');
	}, 2000);
	$('#userInterests').val('');
}

function	remove_interest() {
	var interests = document.getElementById('removedInterests').value;
	
	interests = interests.split(" ");
	interests.forEach(function (data) {
		if (!validInterest(data))
		{
			swal(
				'Error!',
				`${data} is not a correctly formatted interest`,
				'error'
			)
			setTimeout(() => {
				swal.close();
			}, 3000);
			return ;
		}
	});
	interests.forEach(function (data) {
		if (validInterest(data))
		{
			let form = 
			{
				interest: data
			}
			$.ajax({
				type: "POST", 
				url : '/user/account/removeinterest',
				data: JSON.stringify(form),
				contentType: "application/json; charset=utf-8",
				dataType: "json",
			});
		}
	});
	document.getElementById("interestsRemovedPara").innerHTML = "Removed any matching interests";
	setTimeout(() => {
		$('#interestsRemovedPara').text('');
	}, 2000);
	$('#removedInterests').val('');
}

$("#userInterests").keyup(function(event) {
	if (event.keyCode === 13) {
		add_interest();
	}
});

$("#removedInterests").keyup(function(event) {
    if (event.keyCode === 13) {
        remove_interest();
    }
});

$("#userLogin").keyup(function(event) {
    if (event.keyCode === 13) {
        changeUsername();
    }
});

$("#userEmail").keyup(function(event) {
    if (event.keyCode === 13) {
        changeEmail();
    }
});

$("#userNewPass").keyup(function(event) {
    if (event.keyCode === 13) {
        changePassword();
    }
});