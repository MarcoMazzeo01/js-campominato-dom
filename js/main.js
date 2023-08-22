const startButton = document.getElementById("start_game")
let selector = document.getElementById("difficulty-selector")

let grid = document.getElementById("grid")
let rootRules = document.querySelector(":root")

let bombs = [];
const maxBombs = 16;
let score = 0
let maxScore = 0;

// ! start game here ! //
startButton.addEventListener("click",startGame) 

// * GAME FUNCTIONS * //
function startGame() {
    grid.innerHTML = ""
    score = 0

    let difficulty = selector.value
    rootRules.style.setProperty("--grid-divisor",selector.value)

    //ottieni range numeri in base alla difficoltà elevando al quadrato il valore della difficoltà
    const range = Math.pow(difficulty,2)
    generateGrid(range)

    const bombsList = (difficulty) => {
        let bombsArray = []

        while (bombsArray.length <= maxBombs - 1) {
            const bombValue = RNG(1,difficulty)

            //controlla se bombValue esiste già per evitare numeri ripetuti; se è così, genera numeri casuali finché non genera un numero unico.
            if (!bombsArray.includes(bombValue)) {
              bombsArray.push(bombValue)
            }
        }
        return bombsArray
    }

    bombs = bombsList(range)
    maxScore = range - maxBombs
    console.table(bombs)
}

function checkBomb(){
    const num = parseInt(this.getAttribute("number"))

    if (bombs.includes(num)) {
        lose() 
    } else {

        if (this.getAttribute("selected") === "false") {
            this.setAttribute("selected",true)
            score++;
            this.style.backgroundColor = "green"
            this.style.color = "white"

            if (score == maxScore) {
                win()
            }
        }
    }
}


function lose() {
    //informa il giocatore del punteggio dopo aver perso e ricarica la pagina alla chiusura della finestra di dialogo
    if (!alert("Hai perso! Punteggio: " + score)) {
        window.location.reload()
    }
}

function win() {
    if (!alert("Congratulazioni! Hai vinto! Punteggio finale: " + score)) {
        window.location.reload()
    }
}


// * MISC * //
function generateGrid(difficulty) {
    for (i = 1; i <= difficulty; i++) {
        let numLi = document.createElement("li")
        numLi.innerHTML = i
        numLi.setAttribute("number",i)
        numLi.setAttribute("selected",false) //indica se la casella è già stata premuta dal giocatore
        grid.append(numLi)

        numLi.addEventListener("click",checkBomb)
    }
    
}

function RNG(min,max) {
    return Math.round((Math.random())*(max-min+1))+min;
}


