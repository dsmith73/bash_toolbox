// get high from local 
let scoreStr = localStorage.getItem(SAVE_KEY_SCORE)
scoreStr == null ? scoreHigh =0 : scoreHigh = parseInt(scoreStr)

function animate() {
    ctx1.clearRect(0, 0, canvas.clientWidth, canvas.height)
    ctx2.clearRect(0, 0, canvas.clientWidth, canvas.height)
    ctx3.clearRect(0, 0, canvas.clientWidth, canvas.height)
    ctx4.clearRect(0, 0, canvas.clientWidth, canvas.height)
    ctx5.clearRect(0, 0, canvas.clientWidth, canvas.height)
    ctx2.drawImage(background, 0, 0, canvas.width, canvas.height)
    handleRipples()
    ctx2.drawImage(background_lvl2, 0, 0, canvas.width, canvas.height)
    handleParticles()
    frogger.draw()
    frogger.update()
    handleObstacles()
    ctx4.drawImage(grass, 0, 0, canvas.width, canvas.height)
    handleScoreBoard()
    frame++
    requestAnimationFrame(animate)  // recursion  
}

animate()

// event listeners  
window.addEventListener('keydown', function(e) {
    keys = []
    keys[e.key] = true
    if (keys[37] || keys[38] || keys[39] || keys[40] ||     // adding e.key since e.keyCode is deprecated  
        keys['ArrowLeft'] || keys['ArrowUp'] || keys['ArrowRight'] || keys['ArrowDown']) {
        // console.log(e.key)
        frogger.jump()
    }
})

window.addEventListener('keyup', function(e) {
    delete keys[e.key]
    frogger.moving = false
    frogger.frameX = 0
})


// Up  
upArrow.addEventListener("mousedown", moveUp)
upArrow.addEventListener("touchstart", moveUp)
function moveUp() {
    keys = []
    const event = new KeyboardEvent('keydown',{'key':goUp})
    upArrow.dispatchEvent(event);
    keys[event.key] = true
    frogger.jump()
}
upArrow.addEventListener("mouseup", endMoveUp)
upArrow.addEventListener("touchend", endMoveUp)
function endMoveUp() {
    const event = new KeyboardEvent('keyup',{'key':goUp})
    upArrow.dispatchEvent(event);
    delete keys[event.key]
    frogger.moving = false
    frogger.frameX = 0
}
// Down  
downArrow.addEventListener("mousedown", moveDown)
downArrow.addEventListener("touchstart", moveDown)
function moveDown() {
    keys = []
    const event = new KeyboardEvent('keydown',{'key':goDown})
    downArrow.dispatchEvent(event);
    keys[event.key] = true
    frogger.jump()
}
downArrow.addEventListener("mouseup", endMoveDown)
downArrow.addEventListener("touchend", endMoveDown)
function endMoveDown() {
    const event = new KeyboardEvent('keyup',{'key':goDown})
    downArrow.dispatchEvent(event);
    delete keys[event.key]
    frogger.moving = false
    frogger.frameX = 0
}
// Left  
leftArrow.addEventListener("mousedown", moveLeft)
leftArrow.addEventListener("touchstart", moveLeft)
function moveLeft() {
    keys = []
    const event = new KeyboardEvent('keydown',{'key':goLeft})
    leftArrow.dispatchEvent(event);
    keys[event.key] = true
    frogger.jump()
}
leftArrow.addEventListener("mouseup", endMoveLeft)
leftArrow.addEventListener("touchend", endMoveLeft)
function endMoveLeft() {
    const event = new KeyboardEvent('keyup',{'key':goLeft})
    leftArrow.dispatchEvent(event);
    delete keys[event.key]
    frogger.moving = false
    frogger.frameX = 0
}
// Right  
rightArrow.addEventListener("mousedown", moveRight)
rightArrow.addEventListener("touchstart", moveRight)
function moveRight() {
    keys = []
    const event = new KeyboardEvent('keydown',{'key':goRight})
    rightArrow.dispatchEvent(event);
    keys[event.key] = true
    frogger.jump()
}
rightArrow.addEventListener("mouseup", endMoveRight)
rightArrow.addEventListener("touchend", endMoveRight)
function endMoveRight() {
    const event = new KeyboardEvent('keyup',{'key':goRight})
    rightArrow.dispatchEvent(event);
    delete keys[event.key]
    frogger.moving = false
    frogger.frameX = 0
}


function scored() {
    score++
    // High Score  
    if (score > scoreHigh) {
        scoreHigh = score
        localStorage.setItem(SAVE_KEY_SCORE, scoreHigh)     // save high score in local storage  
    }
    gameSpeed += 0.05
    frogger.x = canvas.width/2 - frogger.width/2
    frogger.y = canvas.height - frogger.height - 40
}

function handleScoreBoard() {
    ctx4.fillStyle = 'black'
    ctx4.strokeStyle = 'black'
    ctx4.font = '15px Verdana'
    ctx4.strokeText('Score', 265, 15)
    ctx4.font = '60px Verdana'
    ctx4.fillText(score, 270, 65)
    ctx4.font = '15px Verdana'
    ctx4.strokeText('Deaths: ' + collisionsCount, 10, 30)
    ctx4.strokeText('Speed: ' + gameSpeed.toFixed(1), 10, 45)
    ctx4.strokeText('High Score: ' + scoreHigh, 10, 15)
    //ctx4.strokeText('Lives: ' + lives, 10, 60)
}

// collisions of rectangles  
function collision(first, second) {
    // check for collisions between rectangles 
    // use NOT operator to return false = no overlap && true = overlap
    return !(first.x > second.x + second.width || first.x + first.width < second.x ||   // check collisions on x axis  
            first.y > second.y + second.height || first.y + first.height < second.y)    // check collisions on y axis  
}

function resetGame() {
    frogger.x = canvas.width/2 - frogger.width/2
    frogger.y = canvas.height - frogger.height - 40
    score = 0
    collisionsCount++
    gameSpeed = 1
}





