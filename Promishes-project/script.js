// const promishOne = new Promise(function(resolve, reject){
//     setTimeout(function(){
//         console.log("Async task complete");
//         resolve();
//     }, 1000)
// })

// promishOne.then(function(){
//     console.log("promishe consumed");
// })


// new Promise(function(resolve, reject){
//     setTimeout(()=>{
//         console.log("Async task 2 completed")
//         resolve();
//     },1000)
// }).then(function(){
//     console.log("Promise consumed");
// })

// const promise3 = new Promise(function(resolve, reject){
//     setTimeout(function(){
//         console.log("promise Completed");
//         resolve({username: "Nishant", email: "nishant7859@gmail.com"})
//     },1000)
// })

// promise3.then(function(user){
//     console.log(user);
// })

// const promise4 = new Promise(function(resolve, reject){
//     setTimeout(function(){
//         let error = false;

//         if(!error){
//             resolve({name: "nishant", password: "12345"})
//         }
//         else{
//             reject('Error: something went wrong');
//         }
//     }, 1000)
// })

// promise4.then(function(user){
//     console.log(user);
//     return user.name;
// })
// .then(function(name){
//     console.log(name);
// })
// .catch(function(error){
//     console.log(error);
// })
// .finally(function(){
//     console.log("The promise is either resolved or rejectrd");
// })

// const promise5 = new Promise(function(resolve, reject){
//     let error = false;

//     if(!error){
//         resolve({userName: "Java Script", Password: "12345"})
//     }
//     else{
//         reject('Error: Something went wrong');
//     }
// })

// async function consumePromise5(){
//     try{
//         const response = await promise5;
//         console.log(response);
//         console.log(response.userName);
//     }
//     catch(error){
//         console.log('Error: something went wrong');
//     }
// }

// consumePromise5();

// async function getAllUser(){
//     try{
//        const response = await fetch('https://jsonplaceholder.typicode.com/users')
//        const data = await response.json();
//        console.log(data);
//     }
//     catch(error){
//         console.log('Error:', error);
//     }
// }

// getAllUser();

// fetch('https://jsonplaceholder.typicode.com/users')
// .then(function(response){
//     return response.json();
// })
// .then(function(data){
//     console.log(data);
// })


async function fetchUsers() {
  const response = await fetch('https://randomuser.me/api/?results=20');
  const data = await response.json();
  console.log(data);
  return data.results;
}

function renderUserCards(users) {
  const container = document.getElementById('user-container');
  //container.innerHTML = ''; 

  users.forEach(user => {
    const card = document.createElement('div');
    card.className = 'user-card';

    card.innerHTML = `
      <img src="${user.picture.medium}" alt="${user.name.first}">
      <h2>${user.name.first} ${user.name.last}</h2>
      <p>${user.email}</p>
      <p>${user.location.city}, ${user.location.country}</p>
      <p> Age: ${user.dob.age}</p>
      <p>Phone: ${user.phone}</p>
      <p>Gender: ${user.gender}</p>
      
    `;

    container.appendChild(card);
  });
}

fetchUsers().then(renderUserCards).catch(error => {
  console.error('Error fetching users:', error);
});

const more = document.querySelector('.more');

more.addEventListener('click', function () {
  fetchUsers()
    .then(renderUserCards)
    .catch(error => {
      console.error('Error fetching users:', error);
    });
});