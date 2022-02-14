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

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    // loop over each modal  
    modals.forEach(modal => {
        closeModal(modal)
    })
})

closeModalButton.forEach(button => {
    button.addEventListener('click', () => {
        // get #modal from data-modal-target
        // const modal = document.querySelector(button.dataset.modalTarget)
        const modal = button.closest('.modal')  // get closest parent element with class modal  
        closeModal(modal)
    })
})

function openModal(modal) {
    // if (modal == null) return   // just return if not clicked  
    // if we do have a click, then add active class to modal and overlay
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
    // if we do have a close click, then remove active class to modal and overlay
    modal.classList.remove('active')
    overlay.classList.remove('active')
    gear.classList.remove("active")
    gridWidth = parseInt(slider.value)
    implementWord()         // get random word for game randword.js  
    startInteraction()
}

// Difficulty Slider  
slider.value = parseInt(Player.lastDiff)
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
    openModal(modal)  
}

begin()