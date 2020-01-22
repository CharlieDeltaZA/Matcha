(function worker() {
	var notifications = {
		likes:  0,
		messages: 0,
		views: 0
	}
	var oldNotifications = {
		likes: 0,
		messages: 0,
		views: 0
	}
	$.ajax({
		type: "POST",
		url: '/user/notifications',
		// data: JSON.stringify(send),
		// contentType: "application/json; charset=utf-8",
		// dataType: "json",
		success: function(data) {
			notifications.likes = data.likes;
			notifications.messages = data.messages;
			notifications.views = data.views;

			if (notifications.likes > oldNotifications.likes)
			{
				$('.toast').html(`<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="10000" style="position: fixed; bottom: 15px; right: 15px;">
				<div class="toast-header"><img class="rounded mr-2" src="..." alt="..." /><strong class="mr-auto">Bootstrap</strong><small class="text-muted">11 mins ago</small><button class="ml-2 mb-1 close" type="button" data-dismiss="toast" aria-label="Close"><span aria-hidden="true">×</span></button></div>
				<div
					class="toast-body">Someone liked your profile, go to the likes page to dismiss this popup</div>
			</div>`);
				$('.toast').toast('show');
			}
			if (notifications.views > oldNotifications.views)
			{
				$('.toast').html(`<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="10000" style="position: fixed; bottom: 15px; right: 15px;">
				<div class="toast-header"><img class="rounded mr-2" src="..." alt="..." /><strong class="mr-auto">Bootstrap</strong><small class="text-muted">11 mins ago</small><button class="ml-2 mb-1 close" type="button" data-dismiss="toast" aria-label="Close"><span aria-hidden="true">×</span></button></div>
				<div
					class="toast-body">Someone viewed your profile. Go to views page to dismiss this popup</div>
			</div>`);
				$('.toast').toast('show');
			}
			if (notifications.messages > oldNotifications.messages)
			{
				$('.toast').html(`<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="10000" style="position: fixed; bottom: 15px; right: 15px;">
				<div class="toast-header"><img class="rounded mr-2" src="..." alt="..." /><strong class="mr-auto">Bootstrap</strong><small class="text-muted">11 mins ago</small><button class="ml-2 mb-1 close" type="button" data-dismiss="toast" aria-label="Close"><span aria-hidden="true">×</span></button></div>
				<div
					class="toast-body">Someone sent you a message. Go to the chat page to dismiss this popup.</div>
			</div>`);
				$('.toast').toast('show');
			}

			console.log(data);
			document.getElementById("Notif").innerHTML = data.messages + data.likes + data.views;
			document.getElementById("NotifL").innerHTML = data.likes;
			document.getElementById("NotifM").innerHTML = data.messages;
			document.getElementById("NotifV").innerHTML = data.views;
			// document.getElementById('NotifDiv').innerHTML = data;
		},
		complete: function() {
			setTimeout(worker, 5000);
			// console.log('Complete');
		}
	});
})();