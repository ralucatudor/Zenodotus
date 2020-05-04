console.log('May Node be with you');

const express = require('express');
const morgan = require("morgan");
const bodyParser= require('body-parser');
const cors = require("cors");

const fs = require("fs");

// App
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

// Handling scripts / HTML requests
app.use(express.static('public'));

// Create
app.post("/books", (req, res) => {
  const booksList = readJSONFile();
  // req.body.id = 4;
  console.log(":(", req.body);
  
  booksList.push(req.body); 
  writeJSONFile(booksList);
  res.status(200);
  res.send(req.body);
})

// Read all
app.get("/books", (req, res) => { // req.query
  const booksList = readJSONFile();
  res.send(booksList);  // or res.json(booksList)
})

// Read one
// see result at http://localhost:3000/books/2
app.get("/books/:id", (req, res) => {
  const booksList = readJSONFile();
  res.json(booksList.filter(elem => elem.id == req.params.id));
});

// Update

// Delete


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