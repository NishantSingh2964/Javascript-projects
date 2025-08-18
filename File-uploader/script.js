const dropArea = document.getElementById("drop-area"); // Corrected ID reference
const inputFile = document.getElementById("input-file");
const imageView = document.getElementById("img-view");

inputFile.addEventListener("change", uploadImage);

function uploadImage() {
    if (inputFile.files.length > 0) {
        let imgLink = URL.createObjectURL(inputFile.files[0]);
        imageView.style.backgroundImage = `url(${imgLink})`;
        imageView.textContent = "";
        imageView.style.border = "none";
    }
}

// Handle Drag Over Event
dropArea.addEventListener("dragover", function (e) {
    e.preventDefault();
    dropArea.style.border = "2px dashed #000"; 
});

// Handle Drop Event
dropArea.addEventListener("drop", function (e) {
    e.preventDefault(); 
    dropArea.style.border = "none";

    if (e.dataTransfer.files.length > 0) {
        inputFile.files = e.dataTransfer.files;
        uploadImage();
    }
});