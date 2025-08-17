const image1 = document.querySelector('#indianTeam3');
const parent = document.querySelector('.parent')

image1.addEventListener('click', function(e){
    alert('image 3 is being clicked');

    console.log("clicked inside list Items");
    console.log(e.target.parentNode);

}, /*false*/ true)

parent.addEventListener('click', function(e){
    console.log("clicked inside the ul");
    console.log(e.target.tagName);

    e.preventDefault();
    //e.stopPropagation();

    if(e.target.tagName === 'IMG'){
        const parentNode = e.target.parentNode;
        parentNode.remove();
    }
}, /*false*/ true)