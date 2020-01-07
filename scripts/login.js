function LogInCheck() {
    'use strict';
    printError("");
    
    var xhr = new XMLHttpRequest();
    var userDetails;
    const uname = document.getElementById("userLogin").value;
    const pw = document.getElementById("userPass").value;

    // let response = fetch(url);
    // if (response.ok) {
    //     console.log("Good Response");
    // } else {
    //     console.log("Bad Response");
    //     return;
    // }

    userDetails = {
        userLogin: uname,
        userPass: pw,
    };

    xhr.open("POST", '/', true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhr.send(JSON.stringify(userDetails));
	window.location.replace("http://localhost:8080");
};