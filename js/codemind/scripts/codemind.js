/* 
  Code game where a random color code is generated,  
  and you have ten attempts to guess the correct  
  color combination. After each guess, pegs will be  
  displayed randomly to indicate that you have a  
  correct globe in the correct location, a correct  
  globe in the wrong location, or an empty hole to  
  indicate incorrect globe altogether.
*/

let tile = document.querySelector(".tile")
let resultTile, 
    count
let numHints = 0
let resultClue = []
let square = document.querySelector(".guess-grid")
let result = document.querySelector(".result-grid")
// var slider = document.getElementById("myRange");
// var output = document.getElementById("value");
const alertContainer = document.querySelector("[data-alert-container]")
const keyboard = document.querySelector("[data-keyboard]")
const submission = document.querySelector("[data-keysubmit]")
const guessGrid = document.querySelector("[data-guess-grid]")
const resultGrid = document.querySelector("[data-result-grid]")

// declarations for pop.js
const openModalButton = document.querySelectorAll('[data-modal-target]')
const closeModalButton = document.querySelectorAll('[data-close-button]')
const openInfoButton = document.querySelectorAll('[data-info-target]')
const closeInfoButton = document.querySelectorAll('[info-close-button]')
const overlay = document.getElementById('overlay')
const gear = document.querySelector(".options")  
const hint = document.querySelector(".hint")  


//check if touchevent is available  
let touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click'
// define grid width based on word size from difficulty slider   
const gridWidth = 4
const numTries = 10
let secretCode = ""

let scale = 3
let turns = 0
let Player = {
    totGame: 0,                 // Total number of games played  
    pWins: 0,                   // Total number of Wins  
    numGuess: 0,                // Number of guesses this game  
    avgNumGuess: 0.0            // avgNumGuess  
}
const SAVE_KEY_SCORE = "codemind-dsmith73-player"   // save key for local storage of player data 
const FLIP_ANIMATION_DURATION = 500
const DANCE_ANIMATION_DURATION = 500
// score handling (resetting / retrieving)
let scoreReset = false
let scoreStr

scoreReset === true ? 
    localStorage.setItem(SAVE_KEY_SCORE, JSON.stringify(Player)) : 
    scoreStr = localStorage.getItem(SAVE_KEY_SCORE)


// handle different screen sizes  
let screenHeight = window.innerHeight
let screenWidth = window.innerWidth

if (screenHeight < 850 ) scale = scale - 2


// generate the secret code  
function generateRandomCode() {
    const colorArray = "bwgykr"

    for (let i = 0; i < gridWidth; i++) {
        secretCode += colorArray[Math.floor(Math.random() * colorArray.length)]
    }
    // console.log(secretCode)
}

generateRandomCode()
createMasterGrid()

function createMasterGrid() {
    // Build the guess grid  
    for (let i=0; i < (gridWidth * numTries) -1; i++) {
        const guessBox = tile.cloneNode()
        square.appendChild(guessBox)
    }
}


function startInteraction() {
    document.addEventListener("keydown", handleKeyPress)
    keyboard.addEventListener(touchEvent, handleMouseClick)
    submission.addEventListener(touchEvent, handleMouseClick)
    hint.addEventListener(touchEvent, handleMouseClick)
    const tileRow = getTileRow()
    if (tileRow.length >= 4) {
        for (let i = 0; i < 4; i++) {
            tileRow[i].setAttribute("ondrop", "drop(event)")
            tileRow[i].setAttribute('ondragover', 'allowDrop(event)')
        }
    }
}

function getPlayerInfo(scoreStr) {
    // If reset = true, get new score, otherwise, load existing  
    scoreReset === true ? scoreStr = localStorage.getItem(SAVE_KEY_SCORE) : scoreStr
    // Get locally saved object and load into Player{}  
    // if new player, use values in Player, otherwise, load pObject values  
    if (scoreStr === null ) {
        Player
    } else {
        var pObject = JSON.parse(scoreStr)
        Player.totGame      = pObject.totGame
        Player.pWins        = pObject.pWins 
        Player.avgNumGuess  = pObject.avgNumGuess 
    }

    console.log(Player)
}

function stopInteraction() {
    document.removeEventListener("keydown", handleKeyPress)
    keyboard.removeEventListener(touchEvent, handleMouseClick)
    submission.removeEventListener(touchEvent, handleMouseClick)
    hint.removeEventListener(touchEvent, handleMouseClick)
}

function handleMouseClick(e) {
    // console.log(e)
    if (e.target.matches("[data-key]")) {
        pressKey(e.target.dataset.key)
        return
    }
    if (e.target.matches("[data-enter]")) {
        submitGuess()
        return
    }
    if (e.target.matches("[data-delete]")) {
        deleteKey()
        return
    }
    if (e.target.matches("[data-hint]")) {
        provideHint()
        return
    }
}

function handleKeyPress(e) {
    // console.log(e)
    if (e.key === "Enter") {
        submitGuess()
        return
    }
    if (e.key === "Delete" || e.key === "Backspace") {
        deleteKey()
        e.preventDefault()
        return
    }
    if (e.key.match(/^[b,w,g,y,k,r]$/)) {
        pressKey(e.key)
        return
    }
}

function provideHint() {
    numHints++
    if (numHints === 1) {
        // remove a key that isn't in the code  
        const hintLetter = findDifferences(secretCode, "bwgykr")
        showAlert(hintLetter.toUpperCase() + " is not in the code.", 3000)
        const key = document.querySelector('[data-key="' + hintLetter + '"]')
        key.style.color = "transparent"
        key.style.opacity = ".3"
        key.style.pointerEvents = "none"
        hint.style.display = "none"
    } 

    if (numHints === 2) {
        // tell the player about 1 letter which is in the code  
        const hintLetter = secretCode[Math.floor(Math.random() * secretCode.length)]
        showAlert(hintLetter.toUpperCase() + " is in the code.", 3000)
        const key = document.querySelector('[data-key="' + hintLetter + '"]')
        key.style.boxShadow = "0 0 1em rgb(136, 255, 120)"
        hint.style.display = "none"
    }

    if (numHints === 3) {
        //showAlert("2 hints isn't enough?")
        const hintLetter = secretCode.charAt(secretCode.length -1)
        showAlert(hintLetter.toUpperCase() + " is the last letter in the code.", 3000)
        const key = document.querySelector('[data-key="' + hintLetter + '"]')
        key.style.boxShadow = "0 0 1em rgb(255, 139, 211)"
        hint.style.display = "none"
    }
}

function pressKey(key) {
    const activeTiles = getActiveTiles()
    // prevent user from typing past the end of the row  
    if (activeTiles.length >= gridWidth) return
    // select first tile that doesn't already have a letter on it  
    const nextTile = guessGrid.querySelector(":not([data-letter])")
    nextTile.dataset.letter = key.toLowerCase()
    nextTile.textContent = key
    nextTile.dataset.state = "active"
}

function getActiveTiles() {
    return guessGrid.querySelectorAll('[data-state="active"]')
}
function getResultsTiles() {
    return resultGrid.querySelectorAll('[data-state="queued"]')
}
function getTileRow() {
    return guessGrid.querySelectorAll('[data-state="ready"]')
}


function submitGuess() {
    const activeTiles = [...getActiveTiles()]
    
    if (activeTiles.length !== gridWidth) {
        showAlert("Code isn't long enough")
        shakeTiles(activeTiles)
        return
    }

    const guess = activeTiles.reduce((word, tile) => {
        return word + tile.dataset.letter
    }, "")

    if (activeTiles.length === gridWidth) {
        stopInteraction()
        // Create result grid   
        makeResultsGrid()
        activeTiles.forEach((...params) => flipTile(...params, guess))
    }
}


function makeResultsGrid() {
    var node = document.createElement('div')
    node.classList.add("result-tile")
    node.dataset.state = "queued"
    result.appendChild(node)

    resultTile = document.querySelector('[data-state="queued"]')
    // Build the results grid  
    for (let i=1; i < (gridWidth); i++) {
        const resultBox = resultTile.cloneNode()
        result.appendChild(resultBox)
    }

    // Add spacing to the results grid, so that it lines up  
    for (let j=0; j<2; j++) {
        const spacer = document.querySelector(".space").cloneNode()
        result.appendChild(spacer)
    }
    count = 0
    resultClue = []
}

// shuffle the result array so that the results are in a random order  
function shuffleResult(array) {
    array.sort(() => Math.random() - 0.5);
    showResult(array)
}

// display randomized results  
function showResult(resultClue) {
    const resultTiles = [...getResultsTiles()]
    for (let i=0; i< resultTiles.length; i++) {
        resultTiles[i].dataset.state = resultClue[i]
    }
}

function flipTile(tile, index, array, guess) {
    const letter = tile.dataset.letter
    setTimeout(() => {
        tile.classList.add("flip")
    }, (index * FLIP_ANIMATION_DURATION) /2)

    tile.addEventListener("transitionend", () => {
        tile.classList.remove("flip")
        if (secretCode[index] === letter) {
            resultClue.push("correct")
        } else if (secretCode.includes(letter)) {
            resultClue.push("wrong-location")
        } else {
            resultClue.push("wrong")
        }

        tile.dataset.state = "done"

        if (index === array.length -1) {
            tile.addEventListener("transitionend", () => {
                shuffleResult(resultClue)
                startInteraction()
                checkWinLose(guess, array)
                turns++
                if (turns%3 === 0) hint.style.display = "inherit"
            }, {once: true})
        }
    }, {once: true})
    count++
}

function deleteKey() {
    const activeTiles = getActiveTiles()
    const lastTile = activeTiles[activeTiles.length -1]
    if (lastTile == null) return
    lastTile.textContent = ""
    delete lastTile.dataset.state
    delete lastTile.dataset.letter
}

function showAlert(message, duration = 1000) {
   const alert = document.createElement("div") 
   alert.textContent = message
   alert.classList.add("alert")
   alertContainer.prepend(alert)
   if (duration == null) return

   setTimeout(() => {
    alert.classList.add("hide")
    alert.addEventListener("transitionend", () => {
        alert.remove()
    })
   }, duration)
}

function shakeTiles(tiles) {
    tiles.forEach(tile => {
        tile.classList.add("shake")
        tile.addEventListener("animationend", () => {
            tile.classList.remove("shake")
        }, {once: true})
    })
}



function checkWinLose(guess, tiles) {
    const remainingTiles = guessGrid.querySelectorAll(":not([data-letter])")

    if (guess === secretCode) {
        showAlert("You WIN!!", 5000)
        danceTiles(tiles)
        Player.pWins++
        Player.numGuess     = numTries - (remainingTiles.length / gridWidth)
        // running AVG = ((previous avg Guesses * previous total games) + new guesses) / new total games
        Player.avgNumGuess  = ((Player.avgNumGuess * Player.totGame) + Player.numGuess) / (Player.totGame + 1)
        Player.totGame++
        localStorage.setItem(SAVE_KEY_SCORE, JSON.stringify(Player))     // save Player info in local storage 
        console.log("Winner, Winner, Chicken Dinner!")
        stopInteraction()
        return
    }

    if (remainingTiles.length === 0) {
        showAlert(secretCode.toUpperCase(), null)
        Player.pWins        = Player.pWins
        Player.numGuess     = numTries
        Player.avgNumGuess  = ((Player.avgNumGuess * Player.totGame) + Player.numGuess) / (Player.totGame + 1)
        Player.totGame++
        localStorage.setItem(SAVE_KEY_SCORE, JSON.stringify(Player))     // save Player info in local storage 
        console.log("Loser, loser, Punkey Brewster!")
        stopInteraction()
    }
}

function danceTiles(tiles){
    tiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add("dance")
            tile.addEventListener("animationend", () => {
                tile.classList.remove("dance")
            }, {once: true})
        }, (index * DANCE_ANIMATION_DURATION) /5)

    })
}

