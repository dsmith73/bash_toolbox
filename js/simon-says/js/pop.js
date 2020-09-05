const openModalButton = document.querySelectorAll('[data-modal-target]')
const closeModalButton = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

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
        const modal = button.closest('.modal')  // get closest parent element with class modal  
        closeModal(modal)
    })
})

function openModal(modal) {
    if (modal == null) return   // just return if not clicked  
    // if we do have a click, then add active class to modal and overlay
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if (modal == null) return 
    // if we do have a close click, then remove active class to modal and overlay
    modal.classList.remove('active')
    overlay.classList.remove('active')
}




