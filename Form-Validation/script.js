var nameError = document.getElementById('name-error');
var phoneError = document.getElementById('phone-error');
var emailError = document.getElementById('email-error');
var messageError = document.getElementById('message-error');
var submitError = document.getElementById('submit-error');
let popup = document.getElementById('popup');

function validateName() {
    var name = document.getElementById('contect-name').value;

    if (name.length == 0) {
        nameError.innerHTML = 'Name is required';
        return false;
    }
    if (!name.match(/^[A-Za-z]*\s[A-Za-z]*$/)) {
        nameError.innerHTML = 'Name is too short';
        return false;
    }

    nameError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}

function validatePhone() {
    var phone = document.getElementById('contect-phone').value;

    if (phone.length == 0) {
        phoneError.innerHTML = 'Phone number is required';
        return false;
    }
    if (!phone.match(/^[0-9]{10}$/)) {
        phoneError.innerHTML = 'Invalid input';
        return false;
    }

    phoneError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}

function validateEmail() {
    var email = document.getElementById('contect-email').value;

    if (email.length == 0) {
        emailError.innerHTML = 'Email is required';
        return false;
    }
    if (!email.match(/^[A-Za-z._-][A-Za-z0-9._-]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        emailError.innerHTML = 'Invalid email';
        return false;
    }

    emailError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}

function validateMessage() {
    var message = document.getElementById('contect-message').value;
    var required = 30;
    var left = required - message.length;

    if (left > 0) {
        messageError.innerHTML = left + ' more characters required';
        return false;
    }

    messageError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}

function validateForm() {
    if (!validateName() || !validatePhone() || !validateEmail() || !validateMessage()) {
        submitError.style.display = 'block';
        submitError.innerHTML = 'Please fill all the required fields';
        submitError.style.color = "red";
        setTimeout(function() {
            submitError.style.display = 'none';
        }, 3000);
        return false;
    }
    return true;
}

const scriptURL = 'https://script.google.com/macros/s/AKfycbyel7xR2rXUU64rjgSkXoHwX6MUSdSCfYCR1MlExqMIwNATQo---4SudEO7Qtta3L4/exec'
const form = document.forms['submit-to-google-sheet'];

form.addEventListener('submit', e => {
    e.preventDefault();
    if (validateForm()) {
        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            submitError.innerHTML = "Successfully submitted";
            submitError.style.color = "seagreen";
            setTimeout(function() {
                submitError.innerHTML = "";
                messageError.innerHTML = "";
                emailError.innerHTML = "";
                phoneError.innerHTML = "";
                nameError.innerHTML = "";
            }, 5000);
            form.reset();
            openPopup();
        })
        .catch(error => {
            submitError.innerHTML = "Some Error Occurred";
        });
    }
});

function openPopup() {
    popup.classList.add("open-popup");
}

function closePopup() {
    popup.classList.remove("open-popup");
}



