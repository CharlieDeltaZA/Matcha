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
			// console.log(data);
			document.getElementById('NotifDiv').innerHTML = data;
		},
		complete: function() {
			setTimeout(worker, 500);
			// console.log('Complete');
		}
	});
})();

(function worker2() {
	$.ajax({
		type: "POST",
		url: '/messages',
		// data: JSON.stringify(send),
		// contentType: "application/json; charset=utf-8",
		// dataType: "json",
		success: function(data) {
			// console.log(data);
			document.getElementById('NotifDiv').innerHTML = data;
		},
		complete: function() {
			setTimeout(worker, 500);
			// console.log('Complete');
		}
	});
})();
  