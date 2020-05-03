function getBooks() {
    document.getElementById("wrapper").innerHTML="Here are your books:";
    const res = fetch("/books")
        .then((res) => res.json())
        .then((books) => {
            books.forEach((book) => {
                document.getElementById("wrapper").innerHTML += ` <section id="${book.id}" class="card">
                                    <h4><b>${book.title}</b></h4>`;
            })
        })
}

getBooks();