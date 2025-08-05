const url = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=";

let imgBox = document.getElementById('imgBox'); // 
let qrImage = document.getElementById("qrImage");
let qrText = document.getElementById("qrText");
let generate = document.querySelector('button');

function generateQR() {
    qrImage.src = url + encodeURIComponent(qrText.value); 
    imgBox.classList.add("show-img");
}

generate.addEventListener('click', generateQR);
