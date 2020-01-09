(function worker() {
	send = {
		1: 'yes',
		2: 'no'
	}
	$.ajax({
		// type: "POST",
		url: '/user/notifications',
		// data: JSON.stringify(send),
		// contentType: "application/json; charset=utf-8",
		// dataType: "json",
		success: function(data) {
			console.log(data);
		},
		complete: function() {
			setTimeout(worker, 500);
			console.log('Complete');
		}
	});
})();
  