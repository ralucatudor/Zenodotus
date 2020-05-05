NOTE_html_code =
`<h1 class='h1' style='text-align:center;border:10px 10px;'>Welcome to the Book editor!</h1>
<form class='form' action='#' onsubmit="return false">
    <label class='label' for="note_name"><b class='b'>Title of the Book</b></label>
    <input class='input' type="text" placeholder="Enter Title Here" name="note_name" id="note_name">
    <label class='label' for="author"><b class='b'>Author</b></label>
    <input class='input' type="text" placeholder="Enter Author Here" name="author" id="author">

    <label class='label' for="book_pages_count"><b class='b'>Total number of pages</b></label>
    <input class='input' type="text" placeholder="Enter total no. of pages Here" name="book_pages_count" id="book_pages_count">


    <label class="label" for="deadline"><b class='b'>Deadline</b></label>
    <input class="input" type="date" id="deadline" name="deadline">
    <label class="label" for="content"><b class='b'>Description</b></label>       
    <textarea class="textarea content-textbox" name="content" cols="40" rows="10" id="description"></textarea>
    <div id="warning" class="warning">
    </div>
    <div id="positive-warning" class="positive-warning">
    </div>
    <button class="button" onclick="NOTE_ProcessChanges()">Save</button>
    <button class="button" onclick="NOTE_Discard()">Discard Changes</button>
    <button class="button" onclick="NOTE_Delete()">Delete Note</button>
</form>`;
 


var BOOK_Book = function(obj, callback) {
    window.onbeforeunload = function() {
        return 'Are you sure you want to leave?';
    };

    NOTE_object = obj;
 
    var wrapper = document.getElementById('wrapper');
    wrapper.innerHTML = NOTE_html_code;

    document.getElementById("note_name").value = obj.title;
    document.getElementById("author").value = obj.author;
    document.getElementById("description").value = obj.desc;
}
