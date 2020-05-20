// default greeting
if (localStorage.getItem('myGreeting') == null) {
    localStorage.setItem('myGreeting', 'Hello there');
}

var sayHello = true;

var start = new Date();

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

var bookList = [];

function deleteBook(id) {
    fetch(`http://localhost:3000/books/${id}`, {
        method: 'DELETE',
    }).then(function () {
        // Get the new books list
        getBooks();
    });
}

function MENU_addBook() {
    start = new Date();
    // I must create a new book
    bookList.push({
        title: "",
        author: "",
        desc: "",
        nr_pages_read: "",
        nr_pages: ""
    })
    bookIndex = bookList.length - 1;
    BOOK_Book(bookList[bookIndex], function() {
        const postObject = bookList[bookIndex];
        if (postObject.title.length) { 
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
                    getBooks();
                });
            });
        }
        else {
             // If "Discard Changes" was selected, 
             // then title still has 0 length and I do not need to post anything
            getBooks();
        }
    });
}

var MENU_Book = (bookIndex) => {
    start = new Date();
    BOOK_Book(bookList[bookIndex], function() {
        if (bookList[bookIndex].title.length == 0) { /// must delete the book
            deleteBook(bookList[bookIndex].id);
        }
        else {  // update (or discard - nothing happens)
            const putObject = bookList[bookIndex];
            var book_id = bookList[bookIndex].id;
            fetch(`http://localhost:3000/books/${book_id}`, {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(putObject)
            }).then(function () {
                // Get the new books list
                getBooks();
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
        author.innerHTML = `by ${book.author}`;

        a.appendChild(author);

        var bookDescription = document.createElement('p');
        bookDescription.textContent = book.desc;

        a.appendChild(bookDescription);

        if (book.state == "finished") {
            a.classList.add('finished');
        }
        if (book.state == "reading") {
            a.classList.add('currently-reading');

            var percentage_read_pages = document.createElement('p');
            percentage_read_pages.innerHTML = 
                `You have read ${(book.nr_pages_read / book.nr_pages * 100).toFixed(2)}% of this book so far!`;
            a.appendChild(percentage_read_pages);
        }

        a.addEventListener("mouseover", () => {
            a.style.border = "thick dotted darkgreen";
        }, false);
        a.addEventListener("mouseout", () => {
            a.style.border = "";
        }, false);

        booksContainer.appendChild(a);
        index += 1;
    })
}

function printElapsedTime(start) {
    var end = new Date();

    var p = document.getElementById('elapsed-time');
    var time = parseInt((end.getTime() - start.getTime())/ 1000);

    p.innerHTML = `Elapsed time: ${time} seconds`
}

function getBooks() {    
    let timerId = setInterval(() => printElapsedTime(start), 1000);

    document.getElementById("wrapper").innerHTML += "Here are your books:";
    const res = fetch("/books")     // no need to specify the method, Fetch automatically sets the method to get if you leave it out
        .then((res) => res.json())  // Trasform server response to get the books
        .then((books) => {
            console.log(books);
            bookList = books;

            localStorage.setItem('myName', 'Raluca');
            var localName = localStorage.getItem('myName');

            var wrapper = document.getElementById('wrapper');

            MENU_html_code =
                `<header id="header" class='header'>
                    <h1 id="greeting" class="menu-greeting"></h1>
                    <p>
                    It is a beautiful ${printCurrentDay()}! Why don't you start reading a book? 
                    With Zenodotus, your home library management single-page web application, you can keep track of your books!
                    As you can see, the book list is alphabetically ordered.
                    You can distinguish between the books you have finished, the ones you are currently reading and the ones you have not yet started by looking at the background color.
                    <br>
                    Out of all the books you have introduced, ${countReadBooks()} of them you have read, while ${countStartedBooks()} of them you have started to read.    
                    </p>
                    <p id="quote" class="quote"></p>
                    <a class='button animated-button' href="javascript:MENU_addBook()">Add New Book</a>
                </header>
                <section class="books-container" id="books-container"></section>
                <a class='animated-button button' href="javascript:SETTINGS_Update()">Settings</a>`;

            wrapper.innerHTML = MENU_html_code;

            // Level 2, Task 2
            if (sayHello) { 
                var localGreeting = localStorage.getItem('myGreeting');
                var greetingString = `${localGreeting}, ${localName}!`;
                var greetingContainer = document.getElementById('greeting');
                printLetterByLetterAnimation(greetingString ,greetingContainer);

                setTimeout(function() {
                    greetingContainer.remove();
                }, 10*1000);
                sayHello = false;
            }
            // --------------
            
            // Level 1, Task 7
            addRandomQuote();

            renderBooks();
        })
}

// get books
getBooks();

function countReadBooks() {
    var count = 0;
    bookList.forEach(book => {
        if (book.state == "finished") {
            count += 1;
        }
    });
    return count;
}

function countStartedBooks() {
    var count = 0;
    bookList.forEach(book => {
        if (book.state == "reading") {
            count += 1;
        }
    });
    console.log(bookList);
    return count;
}