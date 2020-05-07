BOOK_html_code =
`
<h1 class='h1' style='text-align:center;border:10px 10px;'>Welcome to the Book editor!</h1>
<form class='form' action='#' onsubmit="return false">
    <label class='label' for="title"><b class='b'>Title of the Book</b></label>
    <input class='input' type="text" placeholder="Enter Title Here" name="title" id="title">
    
    <label class='label' for="author"><b class='b'>Author</b></label>
    <input class='input' type="text" placeholder="Enter Author Here" name="author" id="author">

    <label class="label" for="reading_state"><b class='b'>Current state with regard to reading the book</b></label>
    <select class="reading_state" name="reading_state" id="reading_state">
        <option value="finished" class="dropdown-menu">Finished</option>
        <option value="reading" class="dropdown-menu">Currently reading</option>
        <option value="not_read" class="dropdown-menu">Haven't started</option>
    </select> 

    <label class="label" for="description"><b class='b'>Description</b></label>       
    <textarea class="description" name="description" cols="40" rows="10" id="description"></textarea>
    
    <div id="warning" class="warning"></div>

    <div id="positive-warning" class="positive-warning"></div>
    
    <button class="button" onclick="BOOK_ProcessChanges()">Save</button>
    <button class="button" onclick="NOTE_Discard()">Discard Changes</button>
    <button class="button" onclick="BOOK_Delete()">Delete Note</button>
</form>`;

var BOOK_callback = null;
var BOOK_object = null;

 
var BOOK_ProcessChanges = function() {
    var title = document.getElementById("title").value;
    if (title.length > 20) {
        document.getElementById("warning").innerHTML = "<p>The title is too long!</p>";
        return;
    }
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

    BOOK_object.title = title;
    BOOK_object.author = author;
    BOOK_object.desc = desc;
    BOOK_object.state = reading_state; 
    console.log(BOOK_object);

    document.getElementById("warning").innerHTML = "";
    document.getElementById("positive-warning").innerHTML = "<p>Saved Changes! Going back to main menu...</p>";

    // window.removeEventListener('beforeunload', (event) => {
    //     // Cancel the event as stated by the standard.
    //     event.preventDefault();
    //     // Chrome requires returnValue to be set.
    //     event.returnValue = '';
    // });


    setTimeout(BOOK_callback, 1000);
}


var BOOK_Delete = function() {
    BOOK_object.title = "";
    /// it should self-distruct without a title
    // window.onbeforeunload = function() { }
    document.getElementById("warning").innerHTML = "";
    document.getElementById("positive-warning").innerHTML = "<p>Note Deleted! Going back to main menu...</p>";

    // window.onbeforeunload = function() { }
    setTimeout(BOOK_callback, 1000);
}

var BOOK_Book = function(obj, callback) {
    // window.addEventListener('beforeunload', (event) => {
    //     // Cancel the event as stated by the standard.
    //     event.preventDefault();
    //     // Chrome requires returnValue to be set.
    //     event.returnValue = '';
    // });

    BOOK_callback = callback;
    BOOK_object = obj;
 
    var wrapper = document.getElementById('wrapper');
    wrapper.innerHTML = BOOK_html_code;

    document.getElementById("title").value = obj.title;
    document.getElementById("author").value = obj.author;
    document.getElementById("reading_state").value = obj.state;
    document.getElementById("description").value = obj.desc;
}
