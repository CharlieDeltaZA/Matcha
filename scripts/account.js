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
				url : '/user/account',
				data: JSON.stringify(form),
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function(data) {
					registrationHandler(data);
				}
			});
		}
	}
}