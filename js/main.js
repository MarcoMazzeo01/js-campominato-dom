const startButton = document.getElementById("start_game")
let selector = document.getElementById("difficulty-selector")

let grid = document.getElementById("grid")
let rootRules = document.querySelector(":root")

let bombs = [];
const maxBombs = 16;


function RNG(min,max) {
    return Math.floor((Math.random())*(max-min+1))+min;
}

startButton.addEventListener("click",function() {
    grid.innerHTML = ""
    let difficulty = selector.value
    rootRules.style.setProperty("--grid-divisor",selector.value)

    //ottieni range numeri in base alla difficoltà elevando al quadrato il valore della difficoltà
    const range = Math.pow(difficulty,2)
    generateGrid(range)

    bombs = (difficulty) => {
        let bombsArray = []

        for (i = 0; i <= maxBombs; i++) {
            const bombValue = RNG(1,difficulty)

            //controlla se bombValue esiste già per evitare numeri ripetuti; se è così, genera numeri casuali finché non genera un numero unico.
            while (bombsArray.includes(bombValue)) {
              bombValue = RNG(1,difficulty)
            }
        }
        return bombsArray
    }

    console.table(bombs)
})


function generateGrid(difficulty) {
    for (i = 1; i <= difficulty; i++) {
        let numLi = document.createElement("li")
        numLi.innerHTML = i
        numLi.setAttribute("number",i)
        grid.append(numLi)

        numLi.addEventListener("click",function(){
            console.log(this.getAttribute("number"))
        })
    }
    
}