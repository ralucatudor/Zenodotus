console.log('May Node be with you');

function getDateAsString() {
  let currentDate = new Date();
  let day = ("0" + currentDate.getDate()).slice(-2);
  let month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
  let year = currentDate.getFullYear();
  let hours = ("0" + currentDate.getHours()).slice(-2);
  let minutes = ("0" + currentDate.getMinutes()).slice(-2);
  let seconds = ("0" + currentDate.getSeconds()).slice(-2);
  // YYYY-MM-DD HH:MM:SS format
  return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
}

const express = require('express');
const morgan = require("morgan");
const bodyParser= require('body-parser');
const cors = require("cors");
const uuid = require('uuid');

const fs = require("fs");

// App
const app = express();
// app.set('trust proxy', true)

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

// Handling scripts / HTML requests
app.use(express.static('public'));

// Create
app.post("/books", (req, res) => {
  const booksList = readJSONFile();
  const newBook = req.body;
  newBook.id = uuid.v4();
  console.log("Post", newBook);
  
  booksList.push(newBook); 
  writeJSONFile(booksList);

  fs.writeFile('logger.txt', 
    `[${getDateAsString()}] Utilizatorul cu ip-ul ${req.ip} a adaugat cartea cu id-ul ${newBook.id}.\n`, 
    {flag: 'a+'}, (err) => {
    if (err) throw err;

    console.log("A corresponding message has been written to the logger file successfully.");
  });

  res.status(200);
  res.send(newBook);  // or res.json
})

// Read all
app.get("/books", (req, res) => { // req.query
  const booksList = readJSONFile();
  fs.writeFile('logger.txt', 
    `[${getDateAsString()}] Utilizatorul cu ip-ul ${req.ip} a vizualizat toate cartile din baza de date.\n`, 
    {flag: 'a+'}, (err) => {
    if (err) throw err;

    console.log("A corresponding message has been written to the logger file successfully.");
  });

  res.send(booksList);  // or res.json(booksList)
})

// Read one
app.get("/books/:id", (req, res) => {
  const booksList = readJSONFile();
  res.json(booksList.filter(elem => elem.id == req.params.id));
});

// Update
app.put("/books/:id", (req, res) => {
  const booksList = readJSONFile();
  const id = req.params.id;
  const newBook = req.body;
  newBook.id = id;
  idFound = false;

  const newBooksList = booksList.map((book) => {
    if (book.id === id) {
       idFound = true;
       return newBook;
     }
    return book;
  })
  
  writeJSONFile(newBooksList);
  fs.writeFile('logger.txt', 
    `[${getDateAsString()}] Utilizatorul cu ip-ul ${req.ip} a modificat cartea cu id-ul ${newBook.id}.\n`, 
    {flag: 'a+'}, (err) => {
    if (err) throw err;

    console.log("A corresponding message has been written to the logger file successfully.");
  });

  if (idFound) {
    res.json(newBook);
  } else {
    res.status(404).send(`Book ${id} was not found`);
  }
});

// Delete
app.delete("/books/:id", (req, res) => {
  const booksList = readJSONFile();
  writeJSONFile(booksList.filter(elem => elem.id != req.params.id));
  fs.writeFile('logger.txt', 
    `[${getDateAsString()}] Utilizatorul cu ip-ul ${req.ip} a sters cartea cu id-ul ${req.params.id}.\n`, 
    {flag: 'a+'}, (err) => {
    if (err) throw err;

    console.log("A corresponding message has been written to the logger file successfully.");
  });
  res.send("Deleted");
});

// input/ output functions
function readJSONFile() {
  return JSON.parse(fs.readFileSync("data/database.json"))["books"];
}

function writeJSONFile(content) {
  fs.writeFileSync(
    "data/database.json",
    JSON.stringify({ books : content }),
    "utf8",
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
}

app.listen(3000, function() {
    console.log('Listening on port 3000')
})

app.get("*", (req, res) => {
  res.sendFile('public/game.html' , { root : __dirname});
});
