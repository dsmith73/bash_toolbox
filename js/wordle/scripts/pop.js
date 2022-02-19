// Popup with difficulty selector and score data  
let total = document.querySelector(".totgame")
let totalWins = document.querySelector(".totwin")
let avgDifficulty = document.querySelector(".avgdiff")
let avgGuess = document.querySelector(".avgguess")


openModalButton.forEach(button => {
    button.addEventListener('click', () => {
        // get #modal from data-modal-target
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

closeModalButton.forEach(button => {
    button.addEventListener('click', () => {
        // get #modal from data-modal-target
        const modal = button.closest('.modal')  // get closest parent element with class modal  
        closeModal(modal)
    })
})

function openModal(modal) {
    gear.classList.add("active")
    modal.classList.add('active')
    overlay.classList.add('active')
    getPlayerInfo(scoreStr)
    total.innerHTML = Player.totGame
    totalWins.innerHTML = Player.pWins
    avgDifficulty.innerHTML = Player.avgDiff.toFixed(3)
    avgGuess.innerHTML = Player.avgNumGuess.toFixed(3)
    destroyGrid()
}

function closeModal(modal) {
    if (modal == null) return 
    modal.classList.remove('active')
    overlay.classList.remove('active')
    gear.classList.remove("active")
    gridWidth = parseInt(slider.value)
    implementWord()         // get random word for game randword.js  
    startInteraction()
}

// Difficulty Slider  
// get slider value from last saved game, else set value to default (5)  
scoreStr === null ? slider.value = 5 : slider.value = Player.lastGrid 
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
}


// start game  
let startGame = () => {
    const playBtn = document.querySelector(".modal-begin");
    const modal = document.querySelector(button.dataset.modalTarget)
    playBtn.addEventListener("click", () => {
        closeModal(modal)
        implementWord()         // get random word for game randword.js  
        startInteraction()
    });
};

function begin() {
    const modal = document.querySelector(".modal")
    const infoPanel = document.querySelector(".infoPanel")
    Player.totGame <= 3 ? showInfo(infoPanel) : openModal(modal)  
    
    openModal(modal) 
}


///////////  Info Panel  ///////////  
function showInfo(infoPanel) {
    infoPanel.classList.add('active')
}
    
function closeInfo(infoPanel) {
    infoPanel.classList.remove('active')
}

openInfoButton.forEach(button => {
    button.addEventListener('click', () => {
        // get #modal from data-modal-target
        const info = document.querySelector(".infoPanel")
        showInfo(info)
    })
})

closeInfoButton.forEach(button => {
    button.addEventListener('click', () => {
        // get #modal from data-modal-target
        const info = button.closest('.infoPanel')  // get closest parent element with class modal  
        closeInfo(info)
    })
})


begin()
