


function createAsteroidBelt() {
    roids = []
    roidsTotal = (ROIDS_NUM + LVL) *7
    roidsLeft = roidsTotal
    let x, y
    for (let i =0; i < ROIDS_NUM + LVL; i++) {
        do {
        x = Math.floor(Math.random() * canvas.width)
        y = Math.floor(Math.random() * canvas.height)
    } while (distBetweenPoints(ship.x, ship.y, x, y) < ROIDS_SIZE /2 + ship.r)
        roids.push(newAsteroid(x, y, Math.ceil(ROIDS_SIZE /4.5)))
    }
}

function destroyAsteroid(index) {
    let x = roids[index].x
    let y = roids[index].y
    let r = roids[index].r

    // split roid 
    if (r == Math.ceil(ROIDS_SIZE /4.5)) {
        roids.push(newAsteroid(x, y, Math.ceil(ROIDS_SIZE /9)))
        roids.push(newAsteroid(x, y, Math.ceil(ROIDS_SIZE /9)))
        score += PTS_LG_ROID
    } else if (r == Math.ceil(ROIDS_SIZE /9)) {
        roids.push(newAsteroid(x, y, Math.ceil(ROIDS_SIZE /14)))
        roids.push(newAsteroid(x, y, Math.ceil(ROIDS_SIZE /14)))
        score += PTS_MD_ROID
    } else {
        score += PTS_SM_ROID
    }

    // High Score  
    if (score > scoreHigh) {
        scoreHigh = score
        localStorage.setItem(SAVE_KEY_SCORE, scoreHigh)     // save high score in local storage  
    }

    // destroy asteroid 
    roids.splice(index, 1)
    fxHit.play()

    // calc remaining roids to change music tempo  
    roidsLeft--
    music.setAsteroidRatio(roidsLeft == 0 ? 1 : roidsLeft / roidsTotal)

    // new level when all asteroids gone  
    // I had to modify this and make it part of the nextLevel func in main.js  
    // because I'm splitting this into multiple .js files, instead of 1 long script...  
    // if (roids.length === 0) {
    //     nextLevel()
    // }
}


function distBetweenPoints(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 -x1, 2) + Math.pow(y2 -y1, 2))
}


function newAsteroid(x, y, r) {
    let lvlMult = 1 +0.1 * LVL
    var roid = {
        x: x,
        y: y,
        xv: Math.random() * ROIDS_SPD * lvlMult / FPS * (Math.random() < 0.5 ? 1 : -1),
        yv: Math.random() * ROIDS_SPD * lvlMult / FPS * (Math.random() < 0.5 ? 1 : -1),
        r: r,   // ROIDS_SIZE /4.5,
        a: Math.random() * Math.PI *2,   // in radians  
        vert: Math.floor(Math.random() * (ROIDS_VERT +1) + ROIDS_VERT /2),
        offs: []
    }

    // create vert offset to deform asteroids  
    for (let i=0; i < roid.vert; i++) {
        ROIDS_JAG = Math.random()
        roid.offs.push(Math.random() * ROIDS_JAG * 2 +1 -ROIDS_JAG)
    }

    return roid
}


function handleAsteroids() {
    // draw asteroids  
    let x, y, r, a, vert, offs
    for (let i=0; i < roids.length; i++) {
        ctx.strokeStyle = '#6dacff'
        ctx.lineWidth = SHIP_SIZE/20

        // get asteroid properties 
        x = roids[i].x
        y = roids[i].y
        r = roids[i].r
        a = roids[i].a
        vert = roids[i].vert
        offs = roids[i].offs

        // draw path  
        ctx.beginPath()
        ctx.fillStyle       = '#000711'
        // Shadow & blur effects  
        // ctx.shadowOffsetX   = 0
        // ctx.shadowOffsetY   = 1
        // ctx.shadowBlur      = 1
        // ctx.shadowColor     = "red"
        ctx.moveTo(
            x + r * offs[0] * Math.cos(a),
            y + r * offs[0] * Math.sin(a)
        )

        //draw polygon  
        for (let j=1; j < vert; j++) {
            ctx.lineTo(
                x + r * offs[j] * Math.cos(a + j * Math.PI *2 / vert),
                y + r * offs[j] * Math.sin(a + j * Math.PI *2 / vert)
            )
        }
        ctx.closePath()
        ctx.fill()
        ctx.stroke()

        if (SHOW_BOUNDING) {
            ctx.strokeStyle = '#f00'
            ctx.beginPath()
            ctx.arc(x, y, r, 0, Math.PI *2, false)
            ctx.stroke()
        }
    }

    moveAsteroids()
}


function moveAsteroids() {
    for (let i=0; i < roids.length; i++) {
        // move asteroid  
        roids[i].x += roids[i].xv
        roids[i].y += roids[i].yv

        // handle edge of screen  
        if (roids[i].x < 0 - roids[i].r) {
            roids[i].x = canvas.width + roids[i].r
        } else if (roids[i].x > canvas.width + roids[i].r) {
            roids[i].x = 0 - roids[i].r
        }
        if (roids[i].y < - roids[i].r) {
            roids[i].y = canvas.height + roids[i].r
        } else if (roids[i].y > canvas.height + roids[i].r) {
            roids[i].y = 0 - roids[i].r
        }
    }
}


