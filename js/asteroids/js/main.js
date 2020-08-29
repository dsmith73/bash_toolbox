
// eventListeners  
document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp)




// setup the game  
let roids, ship, text, textAlpha      // let level, roids, ship 
newGame()


function newGame() {
    ROIDS_NUM           = 2
    ROIDS_SPD           = 10
    LVL                 = 0
    deaths              = 3 
    deathCount          = 0
    score               = 0
    ship = newShip()

    // get high from local 
    let scoreStr = localStorage.getItem(SAVE_KEY_SCORE)
    scoreStr == null ? scoreHigh =0 : scoreHigh = parseInt(scoreStr)

    nextLevel()
}


// setup game loop  
setInterval(update, 1000 / FPS)




function keyDown(e) {
    // console.log(e)       // debug  
    if (ship.dead) {
        switch(e.key) {
            case 'Enter':
            case ' ':
            case 'Space':
                newGame()
                break;
        }
    }

    switch(e.key) {
        case 'ArrowLeft':     // rotate ship LEFT  
            ship.rot = TURN_SPD / 180 * Math.PI / FPS
            leftArrow.classList.add('click')
            break;
        case 'ArrowUp':   // forward thrust  
            ship.thrusting = true
            upArrow.classList.add('click')
            break;
        case 'ArrowRight':
            ship.rot = -TURN_SPD / 180 * Math.PI / FPS
            rightArrow.classList.add('click')
            break;
        case 'ArrowDown':      
        case ' ':           // fire  
        case 'Space':       // e.code  
            downArrow.classList.add('click')
            shootLaser()
            break;
    }
}
function keyUp(e) {
    if (ship.dead) return       // don't allow ship control when gameOver()  

    switch(e.key) {
        case 'ArrowLeft':     // stop rotate ship LEFT  
            ship.rot = 0
            leftArrow.classList.remove('click')
            break;
        case 'ArrowUp':   // forward thrust  
            ship.thrusting = false
            upArrow.classList.remove('click')
            break;
        case 'ArrowRight':
            ship.rot = 0
            rightArrow.classList.remove('click')
            break;
        case 'ArrowDown':      
        case ' ':           // fire  
        case 'Space':       // e.code  
            ship.canShoot = true    // allow ship to shoot again 
            downArrow.classList.remove('click')
            break;
    }
}







function update() {
    let exploding = ship.explodeTime > 0

    handleSpace()


    !exploding ? handleShip() : explosion()

    laserHits()

    handleAsteroids()


    if (!exploding) {
        handleCollisions()
    } else {
        ship.explodeTime--

        if (ship.explodeTime === 0) {
            ship = newShip()
        }
    }


    // score  
    currentScore()
    
    //nextLevel()
    levelNum()

    if (score != 0) {
        // tick the music  
        music.tick()
    }


    // draw num lives
    let lifeColor
    for (let i=0; i < deaths; i++) {
        lifeColor = exploding && i == deaths -1 ? "red" : "#a6ffa2"
        drawShip(SHIP_SIZE + i * SHIP_SIZE *1.2, SHIP_SIZE, 0.5 * Math.PI, lifeColor)
    }

    //gameOver()
}

function currentScore() {
    ctx.textAlign = "right"
    ctx.textBaseAlign = "middle"
    ctx.fillStyle = "rgb(200,200,200)"
    ctx.font = TXT_SIZE -12 + "px 'Roboto Mono', sans-serif"
    ctx.fillText(score, canvas.width - SHIP_SIZE /2, SHIP_SIZE)
    highScore()
}

function highScore() {
    ctx.textAlign = "center"
    ctx.textBaseAlign = "middle"
    ctx.fillStyle = "rgb(200,200,200)"
    ctx.fontStyle = "bold"
    ctx.font = TXT_SIZE *0.4 + "px 'Roboto Mono', sans-serif"
    ctx.fillText("High Score:", canvas.width /2, SHIP_SIZE -3)
    ctx.fillText(scoreHigh, canvas.width /2, SHIP_SIZE +7)
}

function levelNum() {
    // draw level text  
    if (textAlpha >= 0 && deaths !== 0) {
        ctx.textAlign = "center"
        ctx.textBaseAlign = "middle"
        ctx.fillStyle = "rgba(233,233,233, " + textAlpha + ")"
        ctx.font = "small-caps " + TXT_SIZE + "px 'Roboto Mono', sans-serif"
        ctx.fillText(text, canvas.width /2, canvas.height *0.25)
        textAlpha -= (1.0 / TXT_FADE_TIME / FPS)
    } 
}


function laserHits() {
    let ax, ay, ar, lx, ly 
    for (let i = roids.length -1; i >= 0; i--) {
        // get asteroid props  
        ax = roids[i].x
        ay = roids[i].y
        ar = roids[i].r
        // lasers  
        for (let j = ship.lasers.length -1; j >= 0; j--) {
            // get laser props  
            lx = ship.lasers[j].x
            ly = ship.lasers[j].y
            // detect hits 
            if (ship.lasers[j].explodeTime == 0 && distBetweenPoints(ax, ay, lx, ly) < ar) {
                // remove laser 
                // ship.lasers.splice(j, 1)
                // remove asteroid 
                // roids.splice(i, 1)
                destroyAsteroid(i)
                ship.lasers[j].explodeTime = Math.ceil(EXPLODE_DUR /3 * FPS)
                if (roids.length === 0) nextLevel()
                break
            }
        }
    }
}

function nextLevel() {
    LVL++
    text        = "Level " + LVL
    textAlpha   = 1.0  

    if (LVL === 1) {                                            // New Game  
        createAsteroidBelt()
    } else if (LVL > 1 && deathCount === 0) {        // Level UP, 0 deaths  
        //LVL++
        deaths++    // get an extra life  
        deathCount = 0
        createAsteroidBelt()
    } else if (LVL > 1 && deathCount !== 0) {        // Level UP, 1+ deaths  
        //LVL++
        deathCount = 0
        createAsteroidBelt()
    }
}

function handleCollisions() {   // may need to put in moveShip()  
    if (deaths === 0) gameOver()

    if (ship.blinkNum === 0 && !ship.dead) {
        for (let i=0; i < roids.length; i++) {
            if (distBetweenPoints(ship.x, ship.y, roids[i].x, roids[i].y) < ship.r + roids[i].r) {
                deaths--
                deathCount++
                explodeShip()
                destroyAsteroid(i)
                if (roids.length === 0) nextLevel()
                break
            }
        }
    }
}

function explodeShip() {
    ship.explodeTime = Math.ceil(EXPLODE_DUR * FPS)
    fxExplode.play()
}


function resetGame() {
    newGame()
}

function gameOver() {
    ship.dead = true
    ctx.textAlign = "center"
    ctx.textBaseAlign = "middle"
    ctx.font = "26px 'Roboto'"
    ctx.fillStyle = 'white'
    ctx.fillText('Game Over!', canvas.width /2, canvas.height /2 -10)
    ctx.font = "14px 'Roboto'"
    ctx.fillText('Level: ' + LVL + ' Score: ' + score, canvas.width /2, canvas.height/2 + 10)

}



