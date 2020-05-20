var localName = localStorage.getItem('myName');

BOOK_html_code =
`
<p class='book-editor-greeting'>Welcome, ${localName}, to the Book Editor!</p>
<form class='form' action='#' onsubmit="return false">
    <label class="label-text" for="title">Title of the Book</label>
    <input class="input input-short-text" type="text" placeholder="Enter Title Here" name="title" id="title" data-index="1">
    
    <label class="label-text" for="author">Author</label>
    <input class="input input-short-text" type="text" placeholder="Enter Author Here" name="author" id="author" data-index="2">

    <label class="label-text" for="reading_state">Current state with regard to reading the book</label>
    <select class="input select-reading-state" name="reading_state" id="reading_state" onchange="yesnoCheck(this);" data-index="3">
        <option value="finished" class="dropdown-menu">Finished</option>
        <option value="reading" class="dropdown-menu">Currently reading</option>
        <option value="not_read" class="dropdown-menu">Haven't started</option>
    </select> 

    <label class="label-text" for="description">Description</label>       
    <textarea class="input description" name="description" cols="40" rows="10" id="description" placeholder="Enter a Short Description of the Book Here" data-index="4"></textarea>

    <div id="ifYes" style="display: none;">
        <label class="label-text" for="nr_pages_read">
            How many pages have you read so far?
        </label> 
        <input type="text" class="input input-short-text" id="nr_pages_read" name="nr_pages_read" placeholder="Enter the Number of Pages Read Here" data-index="5">
        
        <label class="label-text" for="nr_pages">
            Total Number of Pages
        </label> 
        <input type="text" class="input input-short-text" id="nr_pages" name="nr_pages" placeholder="Enter the Total Number of Pages Here" data-index="6">
    </div>

    <div id="warning" class="warning"></div>

    <div id="positive-warning" class="positive-warning"></div>
</form>    
<a class='animated-button button' href="javascript:BOOK_ProcessChanges()">Save</a>
<a class='animated-button button' href="javascript:BOOK_Discard()">Discard Changes</a>
`;

var BOOK_callback = null;
var BOOK_object = null;

 
var BOOK_ProcessChanges = function() {
    var title = document.getElementById("title").value;
    if (title.length == 0) {
        document.getElementById("warning").innerHTML = "<p>The book must have a title!</p>";
        return;
    }

    var author = document.getElementById("author").value;
    if (author.length == 0) {
        document.getElementById("warning").innerHTML = "<p>The book must have an author!</p>";
        return;
    }

    var desc = document.getElementById("description").value;

    var reading_state = document.getElementById("reading_state").value;

    if (reading_state.length == 0) {
        document.getElementById("warning").innerHTML = "<p>Select the reading state for your book!</p>";
        return;
    }

    var nr_pages_read = document.getElementById("nr_pages_read").value;
    var nr_pages = document.getElementById("nr_pages").value;

    BOOK_object.title = title;
    BOOK_object.author = author;
    BOOK_object.desc = desc;
    BOOK_object.state = reading_state; 
    BOOK_object.nr_pages_read = nr_pages_read;
    BOOK_object.nr_pages = nr_pages;

    console.log(BOOK_object);

    document.getElementById("warning").innerHTML = "";
    document.getElementById("positive-warning").innerHTML = "<p>Saved Changes! Going back to main menu...</p>";

    window.onbeforeunload = function() {}
    setTimeout(BOOK_callback, 500);
}

var BOOK_Discard = function() {
    window.onbeforeunload = function() {}
    document.getElementById("warning").innerHTML = "";
    document.getElementById("positive-warning").innerHTML = "<p>Changes Discarded! Going back to main menu...</p>";

    window.onbeforeunload = function() {}
    setTimeout(BOOK_callback, 500);
}

var BOOK_Delete = function() {
    BOOK_object.title = "";
    window.onbeforeunload = function() {}
    document.getElementById("warning").innerHTML = "";
    document.getElementById("positive-warning").innerHTML = "<p>Book Deleted! Going back to main menu...</p>";

    window.onbeforeunload = function() {}
    setTimeout(BOOK_callback, 500);
}

var BOOK_Book = function(obj, callback) {
    var start = new Date();

    // window.addEventListener('beforeunload', (event) => {
    //     // Cancel the event as stated by the standard.
    //     event.preventDefault();
    //     // Chrome requires returnValue to be set.
    //     event.returnValue = '';
    // });
    window.onbeforeunload = function() {
        return "";
    };

    BOOK_callback = callback;
    BOOK_object = obj;
 
    var wrapper = document.getElementById('wrapper');
    wrapper.innerHTML = BOOK_html_code;

    // I do not need a "Delete Book" button if my method is Create Book,
    // therefore I only add the delete button if the object is alreafy created.
    if (BOOK_object.title.length > 0) { // NOT create
        // add <button class="button" onclick="BOOK_Delete()">Delete Book</button> to wrapper
        
        console.log("update");
        var button = document.createElement("a");
        button.textContent = "Delete Book";
        button.setAttribute('class', 'button animated-button');
        button.setAttribute('href', "javascript:BOOK_Delete()");

        wrapper.appendChild(button);
    }

    document.getElementById("title").value = obj.title;
    document.getElementById("author").value = obj.author;
    document.getElementById("reading_state").value = obj.state;
    if (obj.state == "reading") {
        document.getElementById("ifYes").style.display = "block";
    }
    document.getElementById("description").value = obj.desc;
    document.getElementById("nr_pages_read").value = obj.nr_pages_read;
    document.getElementById("nr_pages").value = obj.nr_pages;


    var inputContainers = document.querySelectorAll('.input');
    inputContainers[0].focus();

    inputContainers.forEach( function(item) {
        item.addEventListener("keydown", event => {
            // using which because keyCode is deprecated 
            if (event.which === 13)     // ENTER
            {       
                event.preventDefault();
                var currentIndex = parseInt(item.getAttribute("data-index"));
                var nextInput = document.querySelector('[data-index="' + (currentIndex + 1).toString() + '"]');
                nextInput.focus();
            }
        });
    });
}

// Level 2, Task 6
// Show input field only if a specific option is selected
// Hide Form Fields Based Upon User Selection
function yesnoCheck(that) {
    if (that.value == "reading") {
        document.getElementById("ifYes").style.display = "block";
    } else {
        document.getElementById("ifYes").style.display = "none";
    }
}