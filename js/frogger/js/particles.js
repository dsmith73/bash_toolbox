class Particle {
    constructor(x, y){
        this.x = x +25
        this.y = y +25
        this.radius = Math.random() *20 +1
        this.opacity = 0.5
        this.directionX = Math.random() *1 -0.5
        this.directionY = Math.random() *1 -0.5
    }
    draw(){
        ctx3.fillStyle = 'rgba(150,150,150,' + this.opacity +')'
        ctx3.beginPath()
        ctx3.arc(this.x, this.y, this.radius, 0, Math.PI *2)
        ctx3.fill()
        ctx3.closePath()
    }
    update(){
        this.x += this.directionX
        this.y += this.directionY
        if (this.opacity > 0.1) this.opacity -= 0.2
        if (this.radius > 0.15) this.radius -= 0.14
    }
    drawRipple(){
        ctx2.strokeStyle = 'rgba(255,255,255,' + this.opacity +')'
        ctx2.beginPath()
        ctx2.arc(this.x, this.y, this.radius, 0, Math.PI *2)
        ctx2.stroke()
        ctx2.closePath()
    }
    ripple(){
        if (this.radius < 50) {
            this.radius += 0.5
            this.x -= 0.03
            this.y -= 0.03
        }
        if (this.opacity > 0) this.opacity -= 0.01
    }
}

function handleParticles() {
    // dust particles
    for (let i=0; i < particlesArr.length; i++) {
        particlesArr[i].update()
        particlesArr[i].draw()
    }
    if (particlesArr.length > maxParticles) {
        for (let i=0; i < 30; i++) {
            particlesArr.pop()
        }
    }
    if ((keys['ArrowLeft'] || keys[37] || keys['ArrowUp'] || keys[38] || 
        keys['ArrowRight'] || keys[39] || keys['ArrowDown'] || keys[40]) && frogger.y > 250 && particlesArr.length < maxParticles +10) {
        for (let i=0; i < 10; i++) {
            particlesArr.unshift(new Particle(frogger.x, frogger.y))
        }
    }
}

function handleRipples() {
    // water ripples
    for (let i=0; i < ripplesArr.length; i++) {
        ripplesArr[i].ripple()
        ripplesArr[i].drawRipple()
    }
    if (ripplesArr.length > 20) {
        for (let i=0; i < 5; i++) {
            ripplesArr.pop()
        }
    }
    if ((keys['ArrowLeft'] || keys[37] || keys['ArrowUp'] || keys[38] || 
        keys['ArrowRight'] || keys[39] || keys['ArrowDown'] || keys[40]) && frogger.y < 250 && frogger.y > 100  ) {
        for (let i=0; i < 20; i++) {
            ripplesArr.unshift(new Particle(frogger.x, frogger.y))
        }
    }
}



