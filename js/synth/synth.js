window.addEventListener('load', () => {
    const sounds = document.querySelectorAll(".sound")
    const pads = document.querySelectorAll(".pads div")
    const visual = document.querySelector('.visual')
    const colors = [
        "#60d394",
        "#d36060",
        "#cbd360",
        "#d3a560",
        "#a960d3",
        "#6084d3"
    ]

    //console.log(sounds)     // debug point  

    // sound
    pads.forEach((pad, index) => {
        pad.addEventListener('click', function() {
            sounds[index].currentTime = 0
            sounds[index].play()

            createBubbles(index)
        })
    })

    // make bubbles  
    const createBubbles = (index)  => {
        const bubble = document.createElement('div')
        visual.appendChild(bubble)
        bubble.style.backgroundColor = colors[index]
        bubble.style.animation = "jump 1.5s ease-in-out"
        bubble.addEventListener('animationend', function() {
            visual.removeChild(this)
        })
    }



})

