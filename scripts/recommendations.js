function sendParams() {
	let form = {
		sortType: sortType,
		ageDiff: ageDiff,
		minFame: minFame
	}
	var test = document.getElementById('ageDiff').value();
	console.log(`:::: ${test}`);
	// form.ageDiff = document.getElementById("ageDiff").value();
	// form.minFame = document.getElementById("minFame").value();
	console.log(`ageDiff: ${form.ageDiff}`);
	console.log(`sortType: ${form.sortType}`);
	console.log(`minFame: ${form.minFame}`);
	var n = $('#radio input:radio:checked').val();
	console.log(`sort = ${n}`);

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