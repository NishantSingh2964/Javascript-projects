const api_url = 'https://api.realinspire.tech/v1/quotes/random?maxLength=100';

const quote = document.getElementById('quote');
const author = document.getElementById('author');
const newBtn = document.getElementById('newBtn');
const newTweet = document.getElementById('tweet');

async function getQuote(url){
    const response = await fetch(url);
    const data = await response.json();
    const result = data[0].content;
    quote.innerHTML = result;  
    author.innerHTML = data[0].author;
}

function tweet(){
    window.open("https://twitter.com/intent/tweet?text=" + quote.innerHTML + "----by" + author.innerHTML,"Tweet window", "width=600, height=300")
}

getQuote(api_url);

newBtn.addEventListener('click', function(){
    getQuote(api_url);
})

newTweet.addEventListener('click', function(){
    tweet();
})
