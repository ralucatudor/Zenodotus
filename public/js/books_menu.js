MENU_html_code =
`<header id="header" class='header'>
    <h1>Hi!</h1>
    <ul class="icons ul">
        <li class='li'><a class='a' href="javascript:MENU_Book(-1)"><span class="label a">Add New Book</span></a></li>
    </ul>
</header>
<section class="books-container" id="books-container">        
</section>`;

const formTitle = document.getElementById('formTitle');
const formAuthor = document.getElementById('formAuthor');
const addButton = document.getElementById('addButton');

var bookList = [];


var MENU_Book = (id) => {
    // WooHoo BOOK EDITOR
    if (id == -1) {
        /// I must create a new book
        bookList.push({
            title: "",
            author: ""
        })
        id = bookList.length - 1;
    }
    BOOK_Book(bookList[id], function() {
    });
}

function renderBooks() {
    // aici pot face o sortare in functie de numarul de pagini ramase de citit
    const booksContainer = document.getElementById('books-container');

    var index = 0;
    bookList.forEach((book) => {
        var a = document.createElement('a');
        a.setAttribute('href', 'javascript:MENU_Book(' + index + ')');
        a.setAttribute('class', 'image a');

        var title = document.createElement('h3');
        title.setAttribute('class', 'h3');
        title.textContent = book.title;

        a.appendChild(title);

        booksContainer.appendChild(a);
        index += 1;
        // document.getElementById("wrapper").innerHTML += `<section id="${book.id}" class="card">
        //                             <b>${book.title}</b> by ${book.author}`;
    })
}

function getBooks() {
    document.getElementById("wrapper").innerHTML += "Here are your books:";
    const res = fetch("/books")     // no need to specify the method
        .then((res) => res.json())
        .then((books) => {
            console.log(books);
            bookList = books;

            var wrapper = document.getElementById('wrapper');
            wrapper.innerHTML = MENU_html_code;

            renderBooks();
        })
}

getBooks();     // APELEZ----------------------------------

function postBook() {
    // create post object
    const postObject = {
        title: formTitle.value,
        author: formAuthor.value
    }
    console.log(JSON.stringify(postObject));
    // post book
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

// addButton.addEventListener('click', postBook);
addButton.addEventListener('click', function() {
    const object = {
        title: "ceva"
    }
    NOTE_Note(object, function() {});
});