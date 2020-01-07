$(document).on('click', '#JoinUs', function(e) {
	swal(
		'Success',
		'You clicked the <b style="color:green;">Success</b> button!',
		'success'
	)
});

// $(document).on('click', '#JoinUs', function(e) {
	// const { value: formValues } = swal({
	// 	title: 'Multiple inputs',
	// 	html:
	// 		'<label>Nani?</label>' +
	// 		'<input id="swal-input1" class="swal2-input">' +
	// 		'<label>The Fuck</label>' +
	// 		'<input id="swal-input2" class="swal2-input">',
	// 	focusConfirm: false,
	// 	preConfirm: () => {
	// 	  return [
	// 		document.getElementById('swal-input1').value,
	// 		document.getElementById('swal-input2').value
	// 	  ]
	// 	}
	//   })
	  
	//   if (formValues) {
	// 	swal(JSON.stringify(formValues))
	//   }
	// swal (
	// 	{title: "End Event!",
	// 	animation: true,
	// 	customClass: 'bounceInDown',
	// 	showCancelButton: true,
	// 	confirmButtonText: "Confirm",
	// 	html: "<form id = 'formValidate' class = 'formValidate'> Write a resolution to end Event" +
	// 			"<input id = 'resolution' name = 'resolution' type = 'text' class = 'form_input' required minlenght = '2' placeholder = 'Describe why you are finalizing this event' required style = 'width: 80%; padding: 12px 20px; margin: 8px 0; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; '/> "+" </ br> "+
	// 			"<input id = 'date' name = 'date' type = 'text' class = 'form_input' required placeholder = 'Data' required style = 'width: 38%; height = 40%; padding: 12px 20px; margin: 8px 0; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; '/> "+" & nbsp & nbsp & nbsp & nbsp & nbsp "+
	// 			"<input id = 'end_time' name = 'end_time' type = 'text' class = 'form_input' required placeholder = 'Time' required style = 'width: 38%; height = 40%; padding: 12px 20px; margin: 8px 0; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; '/> "+
	// 			"</ form>",
	// 		   preconfirm: () => {
	// 		  resolution = document.getElementById ('resolution'). value;
	// 		  date = document.getElementById ('date'). value;
	// 		  end_time = document.getElementById ('end_time'). value;
	// 			return [resolution, date, end_time]
	// 	   }
	//    })
// });

// https://github.com/sweetalert2/sweetalert2/issues/26