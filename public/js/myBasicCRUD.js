const formTitle = document.getElementById('formTitle');
const formAuthor = document.getElementById('formAuthor');
const addButton = document.getElementById('addButton');

function getBooks() {
    document.getElementById("wrapper").innerHTML += "Here are your books:";
    const res = fetch("/books")     // no need to specify the method
        .then((res) => res.json())
        .then((books) => {
            books.forEach((book) => {
                document.getElementById("wrapper").innerHTML += `<section id="${book.id}" class="card">
                                    <h4><b>${book.title}</b></h4>by ${book.author}`;
            })
        })
}

getBooks();

function postBook() {
    // create post object
    const postObject = {
        title: formTitle.value,
        author: formAuthor.value
    }
    // post book
    console.log(JSON.stringify(postObject));

    fetch("/books", {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(postObject)
    }).then(function (resp) {
        console.log("Received from postBook:");
        console.log(resp);
    });
    
    
    // .then(function (response) {
    //     response.json().then((resp) => {
    //         console.log("Received from createnote:");
    //         console.log(resp);
    //         // callback(resp);
    //     });
    // });
    
    
    // .then(function(response) {
    //     return response.text();
    // })
    // .then(function(muutuja){
    //     console.log(muutuja);
    // });


    // .then(function (res) {
    //     // Get the new books list
    //     getBooks();
    //     // Reset Form
    //     resetForm();
    // });


// .then(function(res){ return res.json(); })
// .then(function(data){ alert( JSON.stringify( data ) ) })
}

function resetForm() {
    formTitle.value = '';
    formAuthor.value = '';
}

addButton.addEventListener('click', postBook);