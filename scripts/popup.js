function fuckMe() {
    // const Swal = require('sweetalert2/*/sweetalert2.all.js')
    
    const { value: formValues } = await Swal.fire({
        title: 'Multiple inputs',
        html:
            '<input id="swal-input1" class="swal2-input">' +
            '<input id="swal-input2" class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {
            return [
            document.getElementById('swal-input1').value,
            document.getElementById('swal-input2').value
            ]
        }
    })
        
    if (formValues) {
        Swal.fire(JSON.stringify(formValues))
    }
}

// function PopTest() {

//     const Swal = require('sweetalert2')
//         .card.my-5.mx-auto(style='max-width:400px')
// 						.card-body
// 							block content
// 								h1 Register
// 								hr
// 								form#addUser(name='adduser',action='api/register', method='POST')
// 									label(for='userName') Username
// 									input#users.userName(type='text' placeholder='userName' name='userName')

// 									label(for='firstName') First Name
// 									input#users.firstName(type='text' placeholder='firstName' name='firstName')

// 									label(for='lastName') Last Name
// 									input#users.lastName(type='text' placeholder='lastName' name='lastName')

// 									label(for='email') Email
// 									input#users.email(type='text' placeholder='email' name='email')

// 									label(for='password') Password
// 									input#users.password(type='password' placeholder='password' name='password')

// 									label(for='confirmPassword') Confirm Password
// 									input#users.confirmPassword(type='password' placeholder='confirmPassword' name='confirmPassword')

// 									p.text-right
// 										| Already have an account? 
// 										a(href='/login') Login.
									
// 									button.btn.btn-success.btn-block.btn-lg(type='submit', value='register') Register'

// }
