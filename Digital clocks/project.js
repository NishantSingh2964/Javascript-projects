// const clock = document.getElementById('clock')
// //const clock = document.querySelector('#clock')

// setInterval(function(){
    
//    const date = new Date()
//    clock.innerHTML = date.toLocaleTimeString()

// },1000)

let hrs = document.getElementById("hrs");
let min = document.getElementById("min");
let sec = document.getElementById("sec");

setInterval(function(){
   let currentTime = new Date();

   hrs.innerHTML =(currentTime.getHours()< 10)? "0" +currentTime.getHours(): currentTime.getHours();

   min.innerHTML =(currentTime.getMinutes() < 10) ? "0" +currentTime.getMinutes() : currentTime.getMinutes();

   sec.innerHTML =(currentTime.getSeconds() < 10) ? "0" +currentTime.getSeconds():currentTime.getSeconds(); 
},1000)

