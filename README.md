# Zenodotus :books:
Home library management single-page web application :book:

![GitHub last commit](https://img.shields.io/github/last-commit/ralucatudor/Zenodotus.svg)
![GitHub top language](https://img.shields.io/github/languages/top/ralucatudor/Zenodotus.svg)
![TLOC](https://tokei.rs/b1/github/ralucatudor/Zenodotus)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/ralucatudor/Zenodotus.svg)

### Web Course Project (max 30 pts)

#### Frontend (max 17 pts)

##### HTML & CSS (max 8 pts)

- [x] Separate files for HTML and CSS (0.5 pts)
- [x] Use at least 4 [HTML5 Semantic Tags](https://www.w3schools.com/html/html5_semantic_elements.asp) (1 pt)

```html
<header>...</header>
<footer>...</footer>
<form>...</form>
<section class="books-container" id="books-container"></section>
```

- [ ] Min 80% CSS **.class** Selectors (0.5 pts)
- [x] Layout: min 2 columns, using [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) and/ or [CSS grid](https://css-tricks.com/snippets/css/complete-guide-grid/) (2 pts)
- [ ] The website has to be [responsive](https://www.w3schools.com/html/html_responsive.asp), respecting the following screen resolutions - use [media queries](https://www.uxpin.com/studio/blog/media-queries-responsive-web-design/): (4 puncte)
  - mobile phone - l < 768px
  - tablet - 768px < l < 1280px
  - desktop - l > 1280px

##### Javascript (max 9 pts)

- [x] Separate JavaScript file (0.5 pts)
- [x] DOM (3 pts)
- [x] JavaScript events (1 pt)
```javascript
    var inputContainers = document.querySelectorAll('.input');
    inputContainers[0].focus();

    inputContainers.forEach( function(item) {
        item.addEventListener("keydown", event => {
            if (event.which === 13)     // ENTER
            {       
                event.preventDefault();
                var currentIndex = parseInt(item.getAttribute("data-index"));
                var nextInput = document.querySelector('[data-index="' + (currentIndex + 1).toString() + '"]');
                nextInput.focus();
            }
        });
    });
```
- [x] [AJAX](https://www.w3schools.com/xml/ajax_intro.asp) ([GET, POST, PUT, DELETE](http://www.restapitutorial.com/lessons/httpmethods.html)) (4 pts)
- [x] localStorage (0.5 pts)
for saving the greeting
+ TODO: time spent in one "page"

#### Backend API (max 8 pts)

- [x] server Backend (2 puncte)
- [x] CRUD API (acronym for Create, Read, Update and Delete) to serve the Frontend (6 pts)

#### Name motivation
The first recorded Librarian was Zenodotus (Ζηνόδοτος) of Ephesus, holding that post from the end of Ptolemy I's reign. He was a Greek grammarian, literary critic, and Homeric scholar. A native of Ephesus and a pupil of Philitas of Cos, he was the first librarian of the Library of Alexandria.

----------

Express is a framework for building web applications on top of Node.js (Node allows you to use JavaScript as your server-side language).

CRUD is an acronym for Create, Read, Update and Delete. It is a set of operations we get servers to execute (POST, GET, PUT and DELETE requests respectively). This is what each operation does:

  - Create (POST) - Make something
  - Read (GET)- Get something
  - Update (PUT) - Change something
  - Delete (DELETE)- Remove something

POST, GET, PUT, and DELETE requests let us construct Rest APIs.

---
Use `npm run dev`

---

[See also documentation](documentation.md)
