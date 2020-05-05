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
                                    <b>${book.title}</b> by ${book.author}`;
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
    }).then(function (response) {
        response.json().then((resp) => {
            console.log("Received from postBook:", resp);
            document.getElementById("wrapper").innerHTML += `<class="card">
                                    <b>${resp.title}</b> by ${resp.author}`;
            resetForm();
        });
    });
}

function resetForm() {
    formTitle.value = '';
    formAuthor.value = '';
}

addButton.addEventListener('click', postBook);