
const startGame = document.addEventListener('click', e => {
    console.log(e.srcElement.id)
    if (e.srcElement.id === "startGame") {
        centerCir.classList.add('active')
        setTimeout(() => {  // time to highlight the panel  
            centerCir.classList.remove('active')
        }, 400)
        setTimeout(() => {  // time to highlight the panel  
            gameOver = false
            count = 0
            score = 0
            order = []
            main()
        }, 1000)
        
    }
})

const getRandomPanel = () => {      // private function  
    const panels = [
        topLeft,
        topRight,
        botLeft,
        botRight
    ]
    return panels[parseInt(Math.random() * panels.length)]
}

const flash = panel => {
    return new Promise((resolve, reject) => {
        panel.classList.add('active')
        setTimeout(() => {  // time to highlight the panel  
            panel.classList.remove('active')
            setTimeout(() => {  // time until next flash  
                resolve()
            }, 200)
        }, 400)
    })
}

const panelClicked = panel => {
    if (!clickable) return
    // console.log(panel)
    if (panel === order[0]) {
        playSound(panel)
        order.shift()
        flash(panel)
    } else wamie(panel)
    if (order.length === 0) {
        score ++
        clickable = false
        setTimeout(() => {
            main()
        }, 1000)
        
    } 
}

function wamie(panel) {
    centerCir.classList.add('xxx')
    panel.classList.add('xxx')
    centerCir.style.animation = "kaboom .3s ease";
    setTimeout(() => {   
        centerCir.classList.remove('xxx')
        panel.classList.remove('xxx')
    }, 1500)
    gameOver = true
}

function gameLogic() {
    count++
    for (let i=0; i < count; i++) {
        order.push(getRandomPanel())
    }
    // console.log(order)
}

const main = async() => {
    if (!gameOver) {
        gameLogic()
        for (const panel of order) {
            playSound(panel)
            await flash(panel)
        }
        clickable = true
    }
}

main()






