SETTINGS_html_code = `
    <p class='settings-greeting'>Welcome, ${localName}, to the Setting Menu!</p>
    <label class="label-text" for="greeting">Choose your Greeting</label>
    <input class="input input-short-text" type="text" placeholder="Enter Greeting Here" name="greeting" id="greeting-input">
    <br>
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