//about me

var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for (var tablink of tablinks) {
        tablink.classList.remove("active-link");
    }

    for (var tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }

    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

//for side menu(hamburger button)

var sidemenu = document.getElementById("sidemenu");

function openmenu(){
    sidemenu.style.right = "0";
}

function closemenu(){
    sidemenu.style.right = "-200px";
}

//contect me(form)

const scriptURL = 'https://script.google.com/macros/s/AKfycbyJy2HuXD_ZWtbVP42RgyhdJE3Q2Xv9nQP_JhApvSxo9N1YVemEHzDqWzc9FrFeCB6R/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg");

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            msg.innerHTML = "Message sent successfully"
            setTimeout(function () {
                msg.innerHTML = "";
            }, 5000)
            form.reset();
        })
        .catch(error => console.error('Error!', error.message))
})

var icon = document.getElementById("icon");

icon.onclick = function() {
    document.body.classList.toggle("light-theme");
    if (document.body.classList.contains("light-theme")) {
        icon.src = "images/moon.png";
    } else {
        icon.src = "images/sun.png";
    }
}
