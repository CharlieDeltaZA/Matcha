// function PrefCheck() {
//     'use strict';
//     printError("");
    
//     var xhr = new XMLHttpRequest();
//     var userDetails;
//     const g = document.getElementById('userGender');
//     const gender = g.options[g.selectedIndex].value;
//     const s = document.getElementById('userSexPref');
//     const sexpref = s.options[s.selectedIndex].value;
//     const dob = document.getElementById('userDOB').value; //dob YYYY-MM-DD
//     const bio = document.getElementById('userBio').value;
//     const interests = document.getElementById('userInterests').value;
//     // const propic = ???;
    
    
//     const age = calcAge(dob);
    
//     userPrefs = {
//         userGender: gender,
//         userOrientation: sexpref,
//         userAge: age,
//         userBio: bio,
//         userInterests: interests
//         // userProPic: propic
//     };
    
//     xhr.open("POST", '/user/preferences', true);
//     xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//     xhr.send(JSON.stringify(userPrefs));
//     console.log(userPrefs);
//     console.log("Posted");
// 	// window.location.replace("http://localhost:8080?action=prefs");
// }

// function calcAge(dob) {
    
//     var date = new Date(dob);
//     var today = new Date();

//     var timeDiff = Math.abs(today.getTime() - date.getTime());
//     var age1 = Math.ceil(timeDiff / (1000 * 3600 * 24)) / 365;

//     return age1.toFixed(1);
// }

// function printError(msg) {
//     const err = document.getElementById('error');
//     err.innerHTML = msg;
// }