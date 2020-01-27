$(document).ready(function(){
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
			success: function(data) {
				notifications.likes = data.likes;
				notifications.messages = data.messages;
				notifications.views = data.views;
					
				if (notifications.likes > oldNotifications.likes)
				{
					$('#Toasty').html(`<div class="toast-header"><img class="rounded mr-2" src="/logo.png" alt="Logo" style="width:25px;"/><strong class="mr-auto">Matcha</strong><small class="text-muted">Now</small><button class="ml-2 mb-1 close" type="button" data-dismiss="toast" aria-label="Close"><span aria-hidden="true">×</span></button></div>
					<div
						class="toast-body">Someone liked your profile. Go to the <a href='/notifications/likes'>likes</a> page to dismiss this popup.</div>
				</div>`);
					$('#Toasty').toast('show');
				}
				if (notifications.views > oldNotifications.views)
				{
					$('#Toasty').html(`<div class="toast-header"><img class="rounded mr-2" src="/logo.png" alt="Logo" style="width:25px;"/><strong class="mr-auto">Matcha</strong><small class="text-muted">Now</small><button class="ml-2 mb-1 close" type="button" data-dismiss="toast" aria-label="Close"><span aria-hidden="true">×</span></button></div>
					<div
						class="toast-body">Someone viewed your profile. Go to the <a href='/notifications/views'>views</a> page to dismiss this popup.</div>
				</div>`);
					$('#Toasty').toast('show');
				}
				if (notifications.messages > oldNotifications.messages)
				{
					$('#Toasty').html(`<div class="toast-header"><img class="rounded mr-2" src="/logo.png" alt="Logo" style="width:25px;"/><strong class="mr-auto">Matcha</strong><small class="text-muted">Now</small><button class="ml-2 mb-1 close" type="button" data-dismiss="toast" aria-label="Close"><span aria-hidden="true">×</span></button></div>
					<div
						class="toast-body">Someone sent you a message. Go to the <a href='/chat'>chat</a> page to dismiss this popup.</div>
				</div>`);
					$('#Toasty').toast('show');
				}

				document.getElementById("Notif").innerHTML = data.messages + data.likes + data.views;
				document.getElementById("NotifL").innerHTML = data.likes;
				document.getElementById("NotifM").innerHTML = data.messages;
				document.getElementById("NotifV").innerHTML = data.views;
			},
			complete: function() {
				setTimeout(worker, 5000);
			}
		});
	})();
});