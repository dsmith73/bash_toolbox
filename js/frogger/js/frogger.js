class Frog {
    constructor(){
        // sprite size  
        this.spriteW = 250  
        this.spriteH = 250
        // sprite scale
        this.width = this.spriteW/5       
        this.height = this.spriteH/5
        // starting location
        this.x = canvas.width/2 - this.width/2    
        this.y = canvas.height - this.height - 40
        // animation  
        this.moving = false
        this.frameX = 0
        this.frameY = 0
    }
    update(){
        // console.log('update')
        if (keys['ArrowLeft'] || keys[37]) { 
            if (this.x > this.width && this.moving === false) {
                leftArrow.classList.add("click")
                // this.frameX = 1
                this.frameY = 2
                this.x -= grid
                this.moving = true
                setTimeout(function(){ leftArrow.classList.remove("click") }, 300)
            }
        }
        if (keys['ArrowUp'] || keys[38]) { 
            if (this.moving === false) {
                upArrow.classList.add("click")
                this.frameX = 1
                this.frameY = 0
                this.y -= grid
                this.moving = true
                setTimeout(function(){ upArrow.classList.remove("click") }, 300)
            }
        }
        if (keys['ArrowRight'] || keys[39]) {  
            if (this.moving === false && this.x < canvas.width - this.width *2) {
                rightArrow.classList.add("click")
                // this.frameX = 1
                this.frameY = 1
                this.x += grid
                this.moving = true
                setTimeout(function(){ rightArrow.classList.remove("click") }, 300)
            }
        }
        if (keys['ArrowDown'] || keys[40]) { 
            if (this.y < canvas.height - this.height *2 && this.moving === false) {
                downArrow.classList.add("click")
                // this.frameX = 1
                this.frameY = 3
                this.y += grid
                this.moving = true
                setTimeout(function(){ downArrow.classList.remove("click") }, 300)
            }
        }
        if (this.y < 0) scored()
    }
    draw(){
        // ctx3.fillStyle = 'green'
        // ctx3.fillRect(this.x, this.y, this.width, this.height)
        ctx3.drawImage(frogSprite, 
            this.frameX * this.spriteW, this.frameY * this.spriteH, 
            this.spriteW, this.spriteH, 
            this.x -37, this.y -38,     // position frog on box  
            this.width *2.5, this.height *2.5)  // size of frog  
    }
    jump(){
        if (this.moving === false) this.frameX = 1 
        else if (this.frameX === 1) this.frameX = 0  
    }
}

const frogger = new Frog()