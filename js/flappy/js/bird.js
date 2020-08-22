const demonSprite = new Image()
demonSprite.src = './assets/bird/demon.png'

class Bird {
    constructor(){
        this.x = 150    // initial position  
        this.y = 200
        this.vy = 0     // vertical speed of bird  
        // size of bird sprite
        this.originalWidth = 239
        this.originalHeight = 236
        // size of collision box
        this.width = this.originalWidth /10
        this.height = this.originalHeight /10
        this.weight = 1     // force pulling character down  
        this.frameX = 0
    }
    update(){   // make player fall... the longer it falls, the faster it falls  
        let curve = Math.sin(angle) * 20
        if (this.y > canvas.height - (this.height * 2.2) + curve) {
            this.y = canvas.height - (this.height * 2.2) + curve
            this.vy = 0
        } else {
            this.vy += this.weight
            this.vy *= 0.9
            this.y += this.vy
        }
        if (this.y < 0 + this.height) {
            this.y = 0 + this.height
            this.vy = 0
        }
        if (spacePressed && this.y > this.height * 3) this.flap()
    }
    draw(){
        ctx.fillStyle = 'transparent'   // what player looks like  
        ctx.fillRect(this.x -10, this.y -5,  // location 
            this.width +10, this.height +10)   // size of box  
        ctx.drawImage(demonSprite, 
            this.frameX * this.originalWidth, 0, 
            this.originalWidth, this.originalHeight, 
            this.x -25, this.y -20, 
            this.width *2.5, this.height *2.5)  // sprite animation  
    }
    flap(){
        this.vy -=2     // move the character  
        if (this.frameX >= 9) this.frameX = 0
        else /* if (frame%2 === 0) SLOW DOWN WING FLAP */ this.frameX++
    }
}
// create new player and give all props  
const bird = new Bird()