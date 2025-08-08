let eyeIcon = document.getElementById("eyeicon");
let pass = document.getElementById("password");
let msg = document.getElementById("message");
let str = document.getElementById("strength");
let outer = document.getElementById("outer")


eyeIcon.onclick = function(){
    if(pass.type === "password"){
        pass.type = "text";
        eyeIcon.src = "eye-open.png";
    }
    else{
        pass.type = "password";
        eyeIcon.src = "eye-close.png";
    }
};

pass.addEventListener("input", function(){
    if(pass.value.length > 0){
        msg.style.display = "block";
    }
    else{
        msg.style.display = "none";
    }

    if(pass.value.length < 4){
        str.innerHTML = "Weak";
        outer.style.borderColor = "#ff5925";
        msg.style.color = "#ff5925";
    }
    else if(pass.value.length >= 4 && pass.value.length < 8){
        str.innerHTML = "Medium";
        outer.style.borderColor = "yellow";
        msg.style.color = "yellow";
    }
    else if(pass.value.length >= 8){
        str.innerHTML = "Strong";
        outer.style.borderColor = "#26d730";
        msg.style.color = "#26d730";
    }
});
