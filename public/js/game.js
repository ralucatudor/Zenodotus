let gameWrapper = document.getElementById("game-wrapper");

let gameEnded = false;
let gameScore = 0;

function printUpdatedScore() {
    document.getElementById("game-score").innerHTML = `Scor: ${gameScore}`;
}

let player = null;
let playerPosition;

let finalPosOnMovePlayer;
let startPosOnMovePlayer;

let gameItems = [];

let cannotTakeItemText = null;
let mousePosition = { 
    x: 0, 
    y: 0 
};

// initGame() seteaza functionalitatile jocului, adauga playerul si initializeaza variabilele
function initGame() {
    // Adaug event-uri pentru div-ul de joc - click si miscarea mouse-ului
    gameWrapper.addEventListener('click', gameWrapperOnClick);
    gameWrapper.addEventListener('mousemove', gameWrapperOnMouseMove);

    // Fundalul div-ului de joc
    gameWrapper.style.background = "linear-gradient(0deg, rgba(109,111,108,1) 0%, rgba(136,147,139,1) 27%, rgba(187,201,179,1) 100%)";
    
    // Setez scorul la 0
    gameScore = 0;
    printUpdatedScore();

    // Ascund tag-ul pentru scorul final pana la Game Over
    document.getElementById("final-score").style.display = "none";

    // Adaug jucatorul:
    // Creez tag-ul
    player = document.createElement("img");
    player.style.position = "absolute";
    // Setez marimea jucatorului
    player.style.width = `${ITEM_WIDTH}px`;
    player.style.height = `${ITEM_HEIGHT}px`;
    // Setez imaginea
    player.setAttribute("src", PLAYER_FILEPATH);
    // Setez pozitia - initial plasez jucatorul in centrul div-ului de joc
    playerPosition = { 
        x: WINDOW_WIDTH / 2, 
        y: WINDOW_HEIGHT / 2 
    };
    
    player.style.left = `${playerPosition.x- ITEM_WIDTH / 2}px`;
    player.style.top = `${playerPosition.y - ITEM_HEIGHT / 2}px`;
    
    // Append-uiesc jucatorul in div-ul de joc
    gameWrapper.appendChild(player);

    // Intializez pozitiile pentru miscarea jucatorului
    finalPosOnMovePlayer = {  
        x: WINDOW_WIDTH / 2, 
        y: WINDOW_HEIGHT / 2 
    };
    startPosOnMovePlayer = {
        x: WINDOW_WIDTH / 2, 
        y: WINDOW_HEIGHT / 2 
    };

    // Itemii apar la fiecare 2 secunde
    setInterval(addItem, 2000);
    setInterval(movePlayer, 10);
}

// Functie care adauga un item in mod aleatoriu - book/ social media
function addItem() {
    // Creez tag-ul item-ului
    let imgItem = document.createElement("img");
    imgItem.style.position = "absolute";
    // imgItem.style.transformOrigin = "center";
    // Setez marimea - va fi egal cu jucatorul
    imgItem.style.width = `${ITEM_WIDTH}px`;
    imgItem.style.height = `${ITEM_HEIGHT}px`;

    imgItem.setAttribute("id", "item");

    // Calculez random ce fel de item adaug in div-ul de joc
    let randomDistribution = getRandomInteger(1, 10);
    let isGood = true;
    if (randomDistribution <= 5) {
        imgItem.setAttribute("src", BOOKS_FILEPATH);
    }
    else {
        isGood = false;
        imgItem.setAttribute("src", Social_Media_FILEPATH);
    }

    // Setez random pozitia item-ului in div-ul de joc
    let itemPosition = { 
        x: getRandomInteger(ITEM_WIDTH, WINDOW_WIDTH - ITEM_WIDTH), 
        y: getRandomInteger(ITEM_HEIGHT, WINDOW_HEIGHT - ITEM_HEIGHT) 
    };

    imgItem.style.left = `${itemPosition.x- ITEM_WIDTH / 2}px`;
    imgItem.style.top = `${itemPosition.y - ITEM_HEIGHT / 2}px`;

    // Append-uiesc item-ul in div
    gameWrapper.appendChild(imgItem);

    // Pastrez in vectorul gameItems obiecte item de tipul:
    let gameItem = {
        DOM_Object: imgItem,    // retin si obiectul DOM pentru a putea scoate/ ascunde item-ul din div 
        position: itemPosition, // pozitia stabilita
        isGoodItem: isGood,     // true pentru carte si false pentru telefon
        isNotTaken: true        // daca inca nu a fost "prins" de player
    };

    gameItems.push(gameItem);

    // Itemul va disparea dupa 5 secunde
    setTimeout(function () {
        // scot item-ul din div -> nu il mai afisez
        gameItem.DOM_Object.style.display = "none";
        // Si il voi sterge din vector
        const gameItemIndex = gameItems.indexOf(gameItem);
        console.log(gameItemIndex);
        if (gameItemIndex > -1) {
            gameItems.splice(gameItemIndex, 1);
        }
    }, 5000);
}

function gameWrapperOnClick(event) {
    // The target event property returns the element that triggered the event.
    if (event.target.id == "item") {    // Daca s-a facut click pe un item
        if (gameScore > 0) {
            gameScore -= 1;
            printUpdatedScore();

            // Retin faptul ca itemul a fost luat, pentru a-l sterge ulterior
            gameItems.forEach(element => {
                if (element.DOM_Object == event.target) {
                    element.isNotTaken = false;
                }
            });
        }
        else 
            if (cannotTakeItemText == null) {
                cannotTakeItemText = document.createElement("p");
                cannotTakeItemText.textContent = "Nu aveti voie!";
                cannotTakeItemText.style.position = "absolute";
                cannotTakeItemText.style.left = `${mousePosition.x}px`;
                cannotTakeItemText.style.top = `${mousePosition.y}px`;
                gameWrapper.appendChild(cannotTakeItemText);
            }
    }
    else {  // Daca s-a facut click in div - vom misca jucatorul
        // pozitia de unde incepe sa se miste
        startPosOnMovePlayer = { 
            x : playerPosition.x,
            y : playerPosition.y
        };
        // pozitia unde s-a dat click - pozitia finala
        let outerBorders = gameWrapper.getBoundingClientRect(); // Element’s size and positioning within a webpage.
        finalPosOnMovePlayer = { 
            x: event.clientX - outerBorders.left,
            y: event.clientY - outerBorders.top
        };
    }
}

// Cand miscam mouse-ul se apeleaza functia gameWrapperOnMouseMove(event)
function gameWrapperOnMouseMove(event) {
    // Textul "Nu aveti voie" dispare la miscarea mouse-ului
    if (cannotTakeItemText != null) {
        cannotTakeItemText.remove();
        cannotTakeItemText = null;
    }    
    
    // Actualizez pozitia mouse-ului - o si normalizez
    let outerBorders = gameWrapper.getBoundingClientRect();

    mousePosition.x = event.clientX - outerBorders.left;
    mousePosition.y = event.clientY - outerBorders.top;
}

function movePlayer() {
    let start_finishDifference = {
        x: finalPosOnMovePlayer.x - startPosOnMovePlayer.x,
        y: finalPosOnMovePlayer.y - startPosOnMovePlayer.y 
    }
    // Distanta de la pozitia initiala la pozitia unde s-a dat click-ul
    let start_finishDistance = getEuclideanDistance(start_finishDifference);

    let p_x = start_finishDifference.x / start_finishDistance;
    let p_y = start_finishDifference.y / start_finishDistance;

    if (start_finishDistance != 0) {
        let start_playerDifference = {
            x: playerPosition.x - startPosOnMovePlayer.x,
            y: playerPosition.y - startPosOnMovePlayer.y 
        }

        // Distanta parcursa pana acum
        let distanceTravelled = getEuclideanDistance(start_playerDifference);

        if (distanceTravelled < start_finishDistance) {
            playerPosition.x += p_x * MOVE_SPEED;
            playerPosition.y += p_y * MOVE_SPEED;
            
            // Setez pozitia        
            player.style.left = `${playerPosition.x - ITEM_WIDTH / 2}px`;
            player.style.top = `${playerPosition.y - ITEM_HEIGHT / 2}px`
        }
    }

    // Verific daca am vreun item in cale
    gameItems.forEach(item => {  // parcurg lista de item-uri
        if (item.isNotTaken) {   // daca item-ul inca nu a fost luat
            let item_playerDifference = {
                x: item.position.x - playerPosition.x,
                y: item.position.y - playerPosition.y 
            }
            
            let item_playerDistance = getEuclideanDistance(item_playerDifference);

            if (item_playerDistance <= itemCollisionDistance) {
                item.isNotTaken = false;    // luam item-ul
                
                if (!item.isGoodItem) {
                    gameEnded = true;
                }
                else {
                    gameScore += 1;
                    printUpdatedScore();
                }
            }
        }
    });

    // Trebuie sa ma asigur ca nu las vizibile in div item-urile pe care le-am luat 
    gameItems.forEach(item => {
        if (!item.isNotTaken) {
            item.DOM_Object.style.display = "none";
        }
    });
    // Iar acum pot sterge toate item-urile care au fost luate
    gameItems = gameItems.filter(item => item.isNotTaken);

    if (gameEnded) {
        gameOver();
    }
}

function gameOver() {
    // Ascund tot si scot la iveala final score-ul
    document.getElementById('game-score').style.display = "none";
    gameWrapper.style.display = "none";

    document.getElementById("final-score").textContent = `Game Over! Scorul final este ${gameScore}!`;
    document.getElementById("final-score").style.display = "block";
}

// Apelez functia de start
initGame();