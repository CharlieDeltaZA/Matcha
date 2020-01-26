function sendParams() {
	let form = {
		// sortType: sortType,
		ageDiff: 100,
		minFame: 0,
		maxDist: 100,
		sortType: 0,
		interest: 0
	}
	form.ageDiff = document.getElementById('ageDiff').value;
	form.minFame = document.getElementById('minFame').value;
	form.maxDist = document.getElementById('DistanceDiff').value;
	form.interest = document.getElementById('userInterests').value;
	form.sortType = $('#radio input:radio:checked').val();

	$.ajax({
		type: "POST", 
		url : '/recommendations',
		data: JSON.stringify(form),
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(ret) {
			document.location.href = ("http://localhost:8080/recommendations");
		}
	})
}