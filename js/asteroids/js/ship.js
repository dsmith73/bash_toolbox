
function newShip() {
    return {
        x: canvas.width /2,
        y: canvas.height /2,
        r: SHIP_SIZE /2,
        a: 90 / 180 * Math.PI,   // convert to radians  
        blinkTime: Math.ceil(BLINK_DUR * FPS),
        blinkNum: Math.ceil(SHIP_INV_DUR / BLINK_DUR),
        canShoot: true,
        dead: false,
        explodeTime: 0,
        lasers: [],
        rot: 0,      // rotation  
        thrusting: false,
        thrust: {
            x: 0,
            y: 0
        }
    }
}


function shootLaser() {
    // create laser  
    if (ship.canShoot && ship.lasers.length < LASER_MAX) {
        ship.lasers.push({
            // shoot from front  
            x: ship.x + 4/3 * ship.r * Math.cos(ship.a),
            y: ship.y - 4/3 * ship.r * Math.sin(ship.a),
            xv: LASER_SPD * Math.cos(ship.a) / FPS,
            yv: -LASER_SPD * Math.sin(ship.a) / FPS,
            dist: 0,
            explodeTime: 0
        })
        fxLaser.play()
    }
    // lock shooting  
    ship.canShoot = false
}


function drawShip(x, y, a, color = "#52ceff") {
    ctx.strokeStyle     = color
    // Shadow & blur effects  
    // ctx.shadowOffsetX   = 3
    // ctx.shadowOffsetY   = 3
    // ctx.shadowBlur      = 2
    // ctx.shadowColor     = "yellow"
    ctx.lineWidth       = SHIP_SIZE /10
    ctx.beginPath()
    ctx.moveTo(     // ship nose  
        x + 4/3 * ship.r * Math.cos(a),     // horizontal loc  
        y - 4/3 * ship.r * Math.sin(a)      // vertical loc  
    )
    ctx.lineTo(     // ship rear left  
        x - ship.r * (2/3 * Math.cos(a) + Math.sin(a)), 
        y + ship.r * (2/3 * Math.sin(a) - Math.cos(a)) 
    )

    ctx.lineTo(     // ship rear right  
        x - ship.r * (2/3 * Math.cos(a) - Math.sin(a)), 
        y + ship.r * (2/3 * Math.sin(a) + Math.cos(a)) 
    )
    //ctx.fillStyle = '#f00'
    //ctx.arc(x, y + 1/3 * ship.r, SHIP_SIZE /2, 0, Math.PI *2, false)
    ctx.closePath()
    ctx.stroke()
    //ctx.fill()
}


function handleShip() {
    let blinkOn = ship.blinkNum % 2 == 0
    if (blinkOn && !ship.dead) {
        //draw ship  
        drawShip(ship.x, ship.y, ship.a)

        // ship center dot  
        if (SHOW_CTR_DOT) {
            ctx.fillStyle = '#aa0000'
            ctx.fillRect(ship.x -1, ship.y -1, 2, 2)
        }
        if (SHOW_BOUNDING) {
            ctx.strokeStyle = '#0f0'
            ctx.beginPath()
            ctx.arc(ship.x, ship.y, ship.r, 0, Math.PI *2, false)
            ctx.stroke()
        }
        // draw lasers  
        for (let i=0; i < ship.lasers.length; i++) {
            if (ship.lasers[i].explodeTime == 0) {
                ctx.fillStyle = '#e6b000'
                ctx.beginPath()
                ctx.arc(ship.lasers[i].x, ship.lasers[i].y, SHIP_SIZE /9, 0, Math.PI *2, false)
                ctx.fill()
            } else {
                // draw explosion 
                ctx.strokeStyle = '#f00' 
                ctx.fillStyle = '#e6b000'
                ctx.beginPath()
                ctx.arc(ship.lasers[i].x, ship.lasers[i].y, ship.r *0.75, 0, Math.PI *2, false)
                ctx.stroke()
                ctx.fill()
                ctx.fillStyle = '#ad0202'
                ctx.beginPath()
                ctx.arc(ship.lasers[i].x, ship.lasers[i].y, ship.r *0.5, 0, Math.PI *2, false)
                ctx.stroke()
                ctx.fill()
                ctx.fillStyle = '#fff'
                ctx.beginPath()
                ctx.arc(ship.lasers[i].x, ship.lasers[i].y, ship.r *0.25, 0, Math.PI *2, false)
                ctx.stroke()
                ctx.fill()
            }
            
        }

         // shoot lasers  
        for (let i= ship.lasers.length -1; i >= 0 ; i--) {
            // check dist travel  
            if (ship.lasers[i].dist > LASER_DIST * canvas.width) {
                ship.lasers.splice(i, 1)
                continue
            }

            // handle explode  
            if (ship.lasers[i].explodeTime > 0) {
                ship.lasers[i].explodeTime--
                // remove laser  
                if (ship.lasers[i].explodeTime > 0) {
                    ship.lasers.splice(i, 1)
                    continue
                }
            } else {
                // move laser  
                ship.lasers[i].x += ship.lasers[i].xv
                ship.lasers[i].y += ship.lasers[i].yv

                // calc dist:   a2 + b2 = c2
                ship.lasers[i].dist += Math.sqrt(       // c2
                    Math.pow(ship.lasers[i].xv, 2) +    // a2
                    Math.pow(ship.lasers[i].yv, 2)      // b2
                )
            }
            // handle edge of screen 
            if (ship.lasers[i].x < 0) {
                ship.lasers[i].x = canvas.width
            } else if (ship.lasers[i].x > canvas.width) {
                ship.lasers[i].x = 0
            }
            if (ship.lasers[i].y < 0) {
                ship.lasers[i].y = canvas.height
            } else if (ship.lasers[i].y > canvas.height) {
                ship.lasers[i].y = 0
            }
        }
    }

    // handle blink  
    if (ship.blinkNum > 0) {
        // reduce blink time
        ship.blinkTime--
        // reduce blinkNum
        if (ship.blinkTime === 0) {
            ship.blinkTime = Math.ceil(BLINK_DUR * FPS)
            ship.blinkNum--
        }
    }



    moveShip()
}


function moveShip() {
    // thrust  
    if (ship.thrusting && !ship.dead) {
        ship.thrust.x += SHIP_THRUST * Math.cos(ship.a) / FPS
        ship.thrust.y -= SHIP_THRUST * Math.sin(ship.a) / FPS
        fxThrust.play()
        // draw thruster graphic  
        ctx.strokeStyle     = '#ff0000'
        ctx.fillStyle       = '#e6e200'
        // Shadow & blur effects  
        // ctx.shadowOffsetX   = 0
        // ctx.shadowOffsetY   = 1
        // ctx.shadowBlur      = 1
        // ctx.shadowColor     = "red"
        ctx.lineWidth       = SHIP_SIZE /10
        ctx.beginPath()
        ctx.moveTo(     // back left 
            ship.x - ship.r * (2/3 * Math.cos(ship.a) +0.5 * Math.sin(ship.a)), 
            ship.y + ship.r * (2/3 * Math.sin(ship.a) -0.5 * Math.cos(ship.a)) 
        )
        ctx.lineTo(     // ship rear center (behind)  
            ship.x - ship.r * 5/3 * Math.cos(ship.a), 
            ship.y + ship.r * 5/3 * Math.sin(ship.a) 
        )
        ctx.lineTo(     // ship back right  
            ship.x - ship.r * (2/3 * Math.cos(ship.a) -0.5 * Math.sin(ship.a)), 
            ship.y + ship.r * (2/3 * Math.sin(ship.a) +0.5 * Math.cos(ship.a))
        )
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
    } else {
        ship.thrust.x -= FRICTION * ship.thrust.x / FPS
        ship.thrust.y -= FRICTION * ship.thrust.y / FPS
        fxThrust.stop()
    }

    // rotate ship  
    ship.a += ship.rot

    // move ship  
    ship.x += ship.thrust.x
    ship.y += ship.thrust.y

    // handle edge of screen  
    if (ship.x < - ship.r) {
        ship.x = canvas.width + ship.r
    } else if (ship.x > canvas.width + ship.r) {
        ship.x = 0 - ship.r
    }
    if (ship.y < - ship.r) {
        ship.y = canvas.height + ship.r
    } else if (ship.y > canvas.height + ship.r) {
        ship.y = 0 - ship.r
    }

}


function explosion() {
    ctx.strokeStyle = '#f00'
    ctx.fillStyle = '#ad0202'
    ctx.beginPath()
    ctx.arc(ship.x, ship.y, ship.r *1.5, 0, Math.PI *2, false)
    ctx.stroke()
    ctx.fill()
    ctx.fillStyle = '#ffa42e'
    ctx.beginPath()
    ctx.arc(ship.x, ship.y, ship.r *1.2, 0, Math.PI *2, false)
    ctx.stroke()
    ctx.fill()
    ctx.fillStyle = '#e6e200'
    ctx.beginPath()
    ctx.arc(ship.x, ship.y, ship.r *0.9, 0, Math.PI *2, false)
    ctx.stroke()
    ctx.fill()
    ctx.fillStyle = '#ffffff'
    ctx.beginPath()
    ctx.arc(ship.x, ship.y, ship.r *0.6, 0, Math.PI *2, false)
    ctx.stroke()
    ctx.fill()
}









/*
### OPTIONAL Updates:  
  * make thruster blink when ship blinks
    * IF (!exploding && blinkOn) THEN draw thrust  
  * 

*/
