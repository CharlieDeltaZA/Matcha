function RegisterCheck() {
    'use strict';
    printError("");
    
    const uname = document.getElementById("userLogin").value;
    const name = document.getElementById("userName").value;
    const sname = document.getElementById("userSurname").value;
    const email = document.getElementById("userEmail").value;
    const pw = document.getElementById("userPass").value;
    const confpw = document.getElementById("userConfPass").value;
    
    const url = `http://localhost:8080/api/users/${uname}`;

    if (checkContent(uname, name, sname, email, pw, confpw) == 0)
        return;
    if (checkPass(pw, confpw) == 0)
        return;
    if (checkEmail(email) == 0)
        return;
    if (checkName(name, sname) == 0)
        return;
        
    let response = fetch(url);
    if (response.ok) {
        console.log("Good Response");
    } else {
        console.log("Bad Response");
        return;
    }
};

// Prints any error out to the hidden div, pass a custom message
function printError(msg) {
    const err = document.getElementById('error');
    err.innerHTML = msg;
}

function checkLogin(uname) {
    //check for username already existing
}

function checkName(name, sname) {
    const name_format = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    const fullName = name + ' ' + sname;
    if (!name_format.test(fullName)) {
        printError("Illegal characters in name or surname!");
        return 0;
    }
}

function checkEmail(email) {
    const email_format = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email_format.test(email)) {
        printError("Invalid Email!");
        return 0;
    }
}

function checkPass(pw, confpw) {
    const pw_format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (pw == confpw) {
        //more checks
        if (pw.length < 8) {
            printError("Password must be longer than 8 characters!");
            return 0;
        }
        if (pw.length > 20) {
            printError("Password must not be longer than 20 characters!");
            return 0;
        }
        if (pw_format.test(pw)) {
            printError("Password cannot contain special characters!");
            return 0;
        }
    } else {
        printError("Passwords don't match!");
        return 0;
    }
}

function checkContent(uname, name, sname, email, pw, confpw) {
    if ((uname.length == 0 || uname == undefined) && (name.length == 0 || name == undefined) &&
    (sname.length == 0 || sname == undefined) && (email.length == 0 || email == undefined) &&
    (pw.length == 0 || pw == undefined) && (confpw.length == 0 || confpw == undefined)) {
        printError("Please enter your details!");
        return 0;
    }
    if (uname.length == 0 || uname == undefined) {
        printError("Please enter a username!");
        return 0;
    }
    if (name.length == 0 || name == undefined) {
        printError("Please enter a name!");
        return 0;
    }
    if (sname.length == 0 || sname == undefined) {
        printError("Please enter a surname!");
        return 0;
    }
    if (email.length == 0 || email == undefined) {
        printError("Please enter an email!");
        return 0;
    }
    if (pw.length == 0 || pw == undefined) {
        printError("Please enter your password!");
        return 0;
    }
    if (confpw.length == 0 || confpw == undefined) {
        printError("Please confirm your password!");
        return 0;
    }
}