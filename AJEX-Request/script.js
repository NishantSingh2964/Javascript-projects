const requestUrl = 'https://api.github.com/users/hiteshchoudhary';
const xhr = new XMLHttpRequest();

xhr.open('GET', requestUrl);
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const data = JSON.parse(this.responseText);
    console.log(data);

    let avatar = document.querySelector('.avatar');
    let heading = document.querySelector('#heading');
    let para = document.querySelector('#para');
    let card = document.querySelector('.card');

    avatar.innerHTML = `<img src="${data.avatar_url}" id="image">`;
    heading.innerHTML = `${data.name}`
    para.innerHTML = `${data.bio}`
    const div = document.createElement('div');
    div.innerHTML = `<h2>Followers: ${data.followers}`
    card.insertBefore(div, card.children[4])

  }
};
xhr.send();