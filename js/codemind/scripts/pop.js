// Popup with score data  
let total = document.querySelector(".totgame")
let totalWins = document.querySelector(".totwin")
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
    total.innerHTML = Player.totGame
    totalWins.innerHTML = Player.pWins
    avgGuess.innerHTML = Player.avgNumGuess.toFixed(3)
}

function closeModal(modal) {
    if (modal == null) return 
    modal.classList.remove('active')
    overlay.classList.remove('active')
    gear.classList.remove("active")
    startInteraction()
}



// start game  
let startGame = () => {
    const playBtn = document.querySelector(".modal-begin");
    const modal = document.querySelector(button.dataset.modalTarget)
    playBtn.addEventListener("click", () => {
        closeModal(modal)
        startInteraction()
    });
};

function begin() {
    const modal = document.querySelector(".modal")
    const infoPanel = document.querySelector(".infoPanel")
    getPlayerInfo(scoreStr)

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