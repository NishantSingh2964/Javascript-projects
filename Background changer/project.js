const buttons = document.querySelectorAll('button'); 
const body = document.querySelector('body');

buttons.forEach(button => {
    console.log(button);
    button.addEventListener('click', function(e) {
        console.log(e);
        console.log(e.target);

        if (e.target.id === "orange") { 
            body.style.backgroundColor = e.target.id; 
        }
        else if (e.target.id === "white") {
            body.style.backgroundColor = "white";
        }
        else if (e.target.id === "green") {
            body.style.backgroundColor = "green";
        }
        else if (e.target.id === "blue") {
            body.style.backgroundColor = "blue";
        }
        else if (e.target.id === "gray") {
            body.style.backgroundColor = "gray";
        }
    });
});


