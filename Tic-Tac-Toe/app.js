const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector('#reset-btn');
const newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", function(){
        console.log("box was clicked");

        if(turnO){
            box.innerHTML = "<span class='o-mark'>O</span>";
            turnO = false;
        }
        else{
            box.innerHTML = "X";
            turnO = true;
        }
        box.disabled = true;
        
        checkWinner();
    });
});


function enableBoxes(){
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

function disableBoxes(){
    for(let box of boxes){
        box.disabled = true;
    }
}

function showWinner(winner){
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = function(){
    for (let pattern of winPatterns){
        //console.log(pattern);
        // console.log(pattern[0],pattern[1],pattern[2])
        // console.log(
        //     boxes[pattern[0]],
        //     boxes[pattern[1]],
        //     boxes[pattern[2]],
        // )

        const pos1Val = boxes[pattern[0]].innerText;
        const pos2Val = boxes[pattern[1]].innerText;
        const pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
               showWinner(pos1Val);
            }
        }
    }
}

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
