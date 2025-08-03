const passwordBox = document.getElementById("Password");
const startBtn = document.getElementById("btn"); 
const copyBtn = document.getElementById("cpy");
const passLength = document.getElementById("length");
passwordBox.disabled = true;

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const number = "0123456789";
const symbol = "@#$%^&*()_=~|}{[]></-=";

const allChar = upperCase + lowerCase + number + symbol;

function createPassword() {
    const length = passLength.value;
    
    if (!Number.isInteger(Number(length)) || length <= 0) {
        alert("Please, Enter a valid input");
        return;
    }
    
    let password = "";
    password += upperCase[Math.floor(Math.random() * upperCase.length)];
    password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    password += number[Math.floor(Math.random() * number.length)];
    password += symbol[Math.floor(Math.random() * symbol.length)];

    while (length > password.length) {
        password += allChar[Math.floor(Math.random() * allChar.length)];
    }
    
    passwordBox.disabled = false;  
    passwordBox.value = password;   
}

startBtn.addEventListener("click", function() {
    createPassword();
});

function copyPassword() {
    passwordBox.select();
    document.execCommand("copy");
}

copyBtn.addEventListener("click", function() {
    copyPassword();
});
