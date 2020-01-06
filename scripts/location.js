var position;

function createMap () {
	var options = {
		center: { lat: 33.907, lng: 18.414 },
		zoom: 15
  };

	// map = new google.maps.Map(document.getElementById('map'), options);
	// infoWindow = new google.maps.InfoWindow;

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (p) {
			position = {
				lat: p.coords.latitude,
				lng: p.coords.longitude
			};

			// infoWindow.setPosition(position);
			// infoWindow.setContent('Your location!');
			// infoWindow.open(map);
			// map.setCenter(position);

			$.ajax({
				type: "POST", 
				url : '/location',
				data: JSON.stringify(position),
				contentType: "application/json; charset=utf-8",
    			dataType: "json",
				// success: function(){location.href = "/";}
			})
			}, function () {
			handleLocationError('Geolocation service failed', map.getCenter());
		});
	} else {
	handleLocationError('No geolocation available.', map.getCenter());
	}
}

// function handleLocationError (content, position) {
// 	infoWindow.setPosition(position);
// 	infoWindow.setContent(content);
// 	infoWindow.open(map);
// }