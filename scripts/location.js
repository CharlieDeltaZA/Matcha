var map, infoWindow;
var xhr = new XMLHttpRequest();
var position;

function createMap () {
	var options = {
		center: { lat: 33.907, lng: 18.414 },
		zoom: 15
  };

	map = new google.maps.Map(document.getElementById('map'), options);
	infoWindow = new google.maps.InfoWindow;

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (p) {
			position = {
				lat: p.coords.latitude,
				lng: p.coords.longitude
			};

			infoWindow.setPosition(position);
			infoWindow.setContent('Your location!');
			infoWindow.open(map);
			map.setCenter(position);
			//
			xhr.open("POST", '/location', true);
			xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			xhr.send(JSON.stringify(position));
			//
		}, function () {
			handleLocationError('Geolocation service failed', map.getCenter());
		});
	} else {
	handleLocationError('No geolocation available.', map.getCenter());
	}
}

function handleLocationError (content, position) {
	infoWindow.setPosition(position);
	infoWindow.setContent(content);
	infoWindow.open(map);
}