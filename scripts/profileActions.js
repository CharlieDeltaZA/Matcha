function dislikeUser(user) {
	let form = {
		disliked: user
	}
    $.ajax({
		type: "POST", 
		url : '/user/dislike',
		data: JSON.stringify(form),
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(data) {
			if (data == 'disliked') {
				swal(
					'Disliked!',
					`You disliked this user.`,
					'success'
				)
			}
			else if (data == 'undisliked') {
				swal(
					'Dislike Removed!',
					`You removed your dislike on this user.`,
					'success'
				)
			} else
			swal(
				'Error!',
				`Unknown error`,
				'error'
			)
		}
	})
}

function likeUser(user) {
	let form = {
		type: 1,
		liked: user
	}
    $.ajax({
		type: "POST", 
		url : '/user/like',
		data: JSON.stringify(form),
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(data) {
			if (data == 'liked') {
				swal(
					'Liked!',
					`You liked this user.`,
					'success'
				)
			}
			else if (data == 'unliked') {
				swal(
					'Like Removed!',
					`You unliked this user.`,
					'success'
				)
			} else if (data == 'blocked')
			swal(
				'Error!',
				`This user has blocked you.`,
				'error'
			)
		}
	})
}

function	blockUser(user) {
	let form = {
		blocked: user
	}
	$.ajax({
		type: "POST", 
		url : '/user/block',
		data: JSON.stringify(form),
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(data) {
			if (data == 'blocked') {
				swal(
					'User Blocked!',
					`You have successfully blocked this user.`,
					'success'
				)
			} else {
				swal(
					'User Unblocked!',
					`You removed your block on this user.`,
					'success'
				)
			}
		}
	});
}

function	reportUser(user) {
	let form = {
		reported: user
	}
	$.ajax({
		type: "POST", 
		url : '/user/report',
		data: JSON.stringify(form),
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(data) {
			if (data == 'reported') {
				swal(
					'User Reported!',
					`You have successfully reported this user.`,
					'success'
				)
			} else {
				swal(
					'Already Reported',
					`You have already reported this user.`,
					'success'
				)
			}
		}
	});
}