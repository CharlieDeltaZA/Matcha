// (function worker() {
// 	$.ajax({
// 		// type: "POST",
// 		url: '/user/notifications',
// 		// data: JSON.stringify(send),
// 		// contentType: "application/json; charset=utf-8",
// 		// dataType: "json",
// 		success: function(data) {
// 			// console.log('data');
// 			// document.getElementById('NotifDiv').innerHTML = data;
// 		},
// 		complete: function() {
// 			setTimeout(worker, 5000);
// 			// console.log('Complete');
// 		}
// 	});
// })();

// (function worker() {
// 	$.ajax({
// 		type: "POST",
// 		url: '/user/notifications',
// 		// data: JSON.stringify(send),
// 		// contentType: "application/json; charset=utf-8",
// 		// dataType: "json",
// 		success: function(data) {
// 			console.log(data);
// 			document.getElementById("Notif").innerHTML = data.messages + data.likes + data.views;
// 			document.getElementById("NotifL").innerHTML = data.likes;
// 			document.getElementById("NotifM").innerHTML = data.messages;
// 			document.getElementById("NotifV").innerHTML = data.views;
// 			// document.getElementById('NotifDiv').innerHTML = data;
// 		},
// 		complete: function() {
// 			setTimeout(worker, 5000);
// 			// console.log('Complete');
// 		}
// 	});
// })();