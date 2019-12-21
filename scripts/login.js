function LogInCheck() {
    'use strict';
    printError("");
    
    var xhr = new XMLHttpRequest();
    var userDetails;
    const uname = document.getElementById("userLogin").value;
    const pw = document.getElementById("userPass").value;

    if (checkContent(uname, pw) == 0)
        return;

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

    xhr.open("POST", '/user/login', true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(userDetails));
};

function printError(msg) {
    const err = document.getElementById('error');
    err.innerHTML = msg;
}

function checkContent(uname, pw) {
    if ((uname.length == 0 || uname == undefined) && (pw.length == 0 || pw == undefined)) {
        printError("Please enter your details!");
        return 0;
    }
    if (uname.length == 0 || uname == undefined) {
        printError("Please enter a username!");
        return 0;
    }
    if (pw.length == 0 || pw == undefined) {
        printError("Please enter your password!");
        return 0;
    }
}