function printCurrentDay() {
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
  
    return weekday[d.getDay()];
}

MENU_html_code =
`<header id="header" class='header'>
    <h1>Hello there!</h1>
    <p>
    It is a beautiful ${printCurrentDay()}! Why don't you start reading a book? 
    With Zenodotus, your home library management single-page web application, you can keep track of your books!
    As you can see, the book list is alphabetically ordered.
    You can distinguish between the books you have finished, the ones you are currently reading and the ones you have not yet started by looking at the background color.
    </p>
    <ul class="icons ul">
        <li class='li'><a class='a' href="javascript:MENU_Book(-1)"><span class="label a">Add New Book</span></a></li>
    </ul>
</header>
<section class="books-container" id="books-container">        
</section>`;

var bookList = [];

function deleteBook(id) {
    // delete dog
    fetch(`http://localhost:3000/books/${id}`, {
        method: 'DELETE',
    }).then(function () {
        // Get the new dogs list
        getBooks();
    });
}

var MENU_Book = (id) => {
    if (id == -1) {
        /// I must create a new book
        
        bookList.push({
            title: "",
            author: "",
            desc: ""
        })
        id = bookList.length - 1;
        bookList[id].id = id;
    }
    BOOK_Book(bookList[id], function() {
        if (bookList[id].title.length == 0) { /// must delete the book
            // if (notes[id].hasOwnProperty('note_id')) {
            //     SYNC_DeleteNote({
            //         token: MENU_object.info.token,
            //         note_id: notes[id].note_id
            //     }, () => { });
            //     MENU_object.notes = MENU_object.notes.filter(note => {
            //         return note !== notes[id].note_id;
            //     });
            // }
            deleteBook(bookList[id].id);
            // getBooks();
        }
        else {
            //console.log(JSON.stringify(bookList[id]));
            const postObject = bookList[id];
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
                    // document.getElementById("wrapper").innerHTML += `<class="card">
                    //                         <b>${resp.title}</b> by ${resp.author}`;
                    getBooks();
                });
            });
        }
    });
}

function renderBooks() {
    bookList.sort((a, b) => {
        if (a.title < b.title)
            return -1;
        return 1;
    });

    const booksContainer = document.getElementById('books-container');

    var index = 0;
    bookList.forEach((book) => {
        var a = document.createElement('a');
        a.setAttribute('href', 'javascript:MENU_Book(' + index + ')');
        a.setAttribute('class', 'a');

        var title = document.createElement('h3');
        title.setAttribute('class', 'h3');
        title.innerHTML = `“${book.title}”`;
        a.appendChild(title);

        var author = document.createElement('p');
        author.innerHTML = `by ${book.author}`

        a.appendChild(author);

        var bookDescription = document.createElement('p');
        bookDescription.textContent = book.desc;

        a.appendChild(bookDescription);

        if (book.state == "finished") {
            // if (!a.classList.contains('finished')) {
                a.classList.add('finished');
            // }
        }
        if (book.state == "reading") {
            // if (!a.classList.contains('reading')) {
                a.classList.add('currently-reading');
            // }
        }

        booksContainer.appendChild(a);
        index += 1;
        // document.getElementById("wrapper").innerHTML += `<section id="${book.id}" class="card">
        //                             <b>${book.title}</b> by ${book.author}`;
    })
}

function getBooks() {
    document.getElementById("wrapper").innerHTML += "Here are your books:";
    const res = fetch("/books")     // no need to specify the method
        .then((res) => res.json())  // Trasform server response to get the books
        .then((books) => {
            console.log(books);
            bookList = books;

            var wrapper = document.getElementById('wrapper');
            wrapper.innerHTML = MENU_html_code;

            renderBooks();
        })
}

// get books
getBooks();