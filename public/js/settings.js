SETTINGS_html_code = `
    <label class='' for="greeting"><b class='b'>Choose your Greeting</b></label>
    <input class='input' type="text" placeholder="Enter Greeting Here" name="greeting" id="greeting-input">
    <a class='animated-button button' href="javascript:SETTINGS_Save()">Save</a>
`;

var SETTINGS_Update = function() {
    var wrapper = document.getElementById('wrapper');
    wrapper.innerHTML = SETTINGS_html_code;
}

// after clicking Save
var SETTINGS_Save = function() {
    sayHello = true;
    
    var newGreeting = document.getElementById("greeting-input").value;
    localStorage.setItem('myGreeting', newGreeting);
    
    setTimeout(getBooks, 500);
}