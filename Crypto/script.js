
const bitcoin = document.getElementById("cost1");
const cethereum = document.getElementById("cost2");
const cdogecoin = document.getElementById("cost3");

const url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cdogecoin&vs_currencies=usd";
async function getPrice(){
    const response = await fetch(url);
    const data = await response.json();
    bitcoin.innerHTML = "$"+data.bitcoin.usd;
    cethereum.innerHTML ="$"+data.ethereum.usd;
    cdogecoin.innerHTML ="$"+data.dogecoin.usd;
}
getPrice();
