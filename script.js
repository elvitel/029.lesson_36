const divParent = document.getElementById('parent');
const myId = document.createElement('input');
myId.type = 'text';
myId.placeholder = 'Enter a post id (1-100)';
divParent.appendChild(myId);

myId.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        if (myId.value >=1 && myId.value <= 100) {
            displayPost();
            myId.setAttribute('disabled', 'disabled');
        } else {
            alert('Not a number from 1 to 100');
        }
    }         
});    

function displayPost() {
    fetch(`https://jsonplaceholder.typicode.com/posts?id=${myId.value}`)            
    .then((response) => response.json())
    .then((data) => data.forEach((post) => {
        document.body.insertAdjacentHTML('beforeend', `
        <p>${post.title}</p>
        <p>${post.body}</p>
        <button id="commentsButton">Comments</button>
        `
        );
        }))
        .then(() => {
            const myButton = document.getElementById('commentsButton');
            myButton.addEventListener('click', () => {
                displayComments();
                myButton.setAttribute('disabled', 'disabled');
            });
        }) 
    .catch((error) => console.error(error));
}
   
function displayComments() {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${myId.value}`) 
    .then((response) => response.json())
    .then((data) => data.forEach((comment) => {
        document.body.insertAdjacentHTML('beforeend', `
        <p>${comment.body}</p>
        `
        );
    }))                          
    .catch((error) => console.error(error));
}







