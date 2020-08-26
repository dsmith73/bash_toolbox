class Obstacle {
    constructor(x, y, width, height, speed, type){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.speed = speed
        this. type = type
        this.frameX = 0
        this.frameY = 0
        this.randomize = Math.floor(Math.random() *30 +30)
        this.carType = Math.floor(Math.random() * numberOfCars)
        this.turtleType = Math.floor(Math.random() * numberOfTurtles)
    }
    draw(){
        if (this.type === 'turtle') {
            if (frame % this.randomize === 0) {
                this.frameX >= 1 ? this.frameX = 0 : this.frameX ++
            }
            // ctx1.fillRect(this.x, this.y, this.width, this.height)
            // ctx1.drawImage(turtle, sx, sy, sw, sh, dx, dy, dw, dh)
            // ctx1.drawImage(turtle, this.frameX *70, this.frameY *70, 70, 70, this.x, this.y, this.width, this.height)
            ctx2.drawImage(turtle, this.frameX *70, this.turtleType *70, grid -10, grid -10, this.x, this.y, this.width, this.height)
        } else if ( this.type === 'log') {
            ctx2.drawImage(log, this.x, this.y, this.width, this.height)
        } else {    // car  
            // ctx2.fillRect(this.x, this.y, this.width, this.height)
            ctx2.drawImage(car, this.frameX * this.width, this.carType * this.height, grid *2, grid, this.x, this.y, this.width, this.height)
        }
        // ctx3.fillStyle = 'blue'
        // ctx3.fillRect(this.x, this.y, this.width, this.height)

    }
    update(){
        this.x += this.speed * gameSpeed
        if (this.speed > 0) {
            if (this.x > canvas.width + this.width) {
                this.x = 0 - this.width
                this.carType = Math.floor(Math.random() * numberOfCars)
                this.turtleType = Math.floor(Math.random() * numberOfTurtles)
            }
        } else {
            this.frameX = 1
            if (this.x < 0 - this.width) {
                this.x = canvas.width + this.width
                this.carType = Math.floor(Math.random() * numberOfCars)
                this.turtleType = Math.floor(Math.random() * numberOfTurtles)
            }
        }
    }
}


function initObstacles() {
    // lane 1
    for (let i=0; i < 2; i++) {
        let x = i * 350
        carsArr.push(new Obstacle(x, canvas.height - grid *2 -20, grid *2, grid, 1, 'car'))
    }
    // lane 2  
    for (let i=0; i < 2; i++) {
        let x = i * 300
        carsArr.push(new Obstacle(x, canvas.height - grid *3 -20, grid *2, grid, -1.2, 'car'))
    }
    // lane 3  
    for (let i=0; i < 2; i++) {
        let x = i * 350
        carsArr.push(new Obstacle(x, canvas.height - grid *4 -20, grid *2, grid, 1, 'car'))
    }
    // lane 4  
    for (let i=0; i < 2; i++) {
        let x = i * 400
        logsArr.push(new Obstacle(x, canvas.height - grid *5 -20, grid *2, grid, -2, 'log'))
    }
    // lane 5  
    for (let i=0; i < 3; i++) {
        let x = i * canvas.width/3
        logsArr.push(new Obstacle(x, canvas.height - grid *6 -20, grid, grid, 1, 'turtle'))
    }
}

initObstacles()

function handleObstacles() {
    for (let i=0; i < carsArr.length; i++) {
        carsArr[i].update()
        carsArr[i].draw()
    }
    for (let i=0; i < logsArr.length; i++) {
        logsArr[i].update()
        logsArr[i].draw()
    }
    // collision with car  
    for (let i=0; i < carsArr.length; i++) {
        if(collision(frogger, carsArr[i])) {
            ctx4.drawImage(collisions, 0, 100, 100, 100, frogger.x, frogger.y, 50, 50)
            // setTimeout(function(){},1500)    //  find a way to make the "SPLAT" show up for longer  
            resetGame()
        }
    }
    // collision with logs & turtles  
    if (frogger.y < 250 && frogger.y > 100) {
        safe = false
        for (let i=0; i < logsArr.length; i++) {
            if(collision(frogger, logsArr[i])) {
                frogger.x += logsArr[i].speed
                safe = true
                // ctx4.drawImage(collisions, 0, 0, 100, 100, frogger.x, frogger.y, 50, 50)
            }
        }
        if (!safe) {
            for (let i=0; i < 30; i++) {
                ripplesArr.unshift(new Particle(frogger.x, frogger.y))
            }      
            ctx4.drawImage(collisions, 0, 0, 100, 100, frogger.x, frogger.y, 50, 50)
            resetGame()
        }
    }

}

