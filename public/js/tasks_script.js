// Level 2, Task 2
// getRandomInteger(min, max) returns a random number between min and max (both included):
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

function addRandomQuote() {
    var quoteList = 
       ['“A room without books is like a body without a soul.” ― Marcus Tullius Cicero', 
        '“So many books, so little time.” ― Frank Zappa',
        '“Fairy tales are more than true: not because they tell us that dragons exist, but because they tell us that dragons can be beaten.” ― Neil Gaiman',
        '“I have always imagined that Paradise will be a kind of library.” ― Jorge Luis Borges',
        '“There is no friend as loyal as a book.” ― Ernest Hemingway',
        '“Books are a uniquely portable magic.” ― Stephen King',
        '“Books are the perfect entertainment: no commercials, no batteries, hours of enjoyment for each dollar spent. What I wonder is why everybody doesn\'t carry a book around for those inevitable dead spots in life.” ― Stephen King',
        '“I cannot live without books.” ― Thomas Jefferson',
        '“That\'s the thing about books. They let you travel without moving your feet.” ― Jhumpa Lahiri',
        '“If you have a garden and a library, you have everything you need.” ― Cicero',
        '“If you don’t like to read, you haven’t found the right book.” – J.K. Rowling',
        '“A book is a garden, an orchard, a storehouse, a party, a company by the way, a counselor, a multitude of counselors.” – Charles Baudelaire'];

    var quote = quoteList[getRandomInteger(0, quoteList.length - 1)];
    var quoteP = document.getElementById('quote');
    // printLetterByLetterAnimation(quote, quoteP);
    printWordByWordAnimation(quote, quoteP);
}

function printLetterByLetterAnimation(string, container) {
    var str = string.split("");
    (function animate() {
        if (str.length)
            container.innerHTML += str.shift();
        else
            clearTimeout(running); 
    var running = setTimeout(animate, 1000 / 15);
    })();
}

function printWordByWordAnimation(string, container) {
    var str = string.split(" ");
    
    function animate() {
        if (str.length)
            container.innerHTML += (str.shift() + " ");
        else
            clearTimeout(running); 
    var running = setTimeout(animate, 1000 / 3);
    };

    animate();
}

// ----------Animating the text in the title tag----------
var titleText = document.title;
function titleMarquee() {
    titleText = titleText.substring(1, titleText.length) + titleText.substring(0, 1);
    document.title = titleText;
    setTimeout("titleMarquee()", 450);
}