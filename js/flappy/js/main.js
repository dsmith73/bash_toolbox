
let spacePressed = false
let angle = 0   // will be used by side method to make bird move up and down  
let hue = 0
let frame = 0
let score = 0

const gradient = ctx.createLinearGradient(0, 0, 0, 70)
gradient.addColorStop('0.4', '#fff')
gradient.addColorStop('0.5', '#000')
gradient.addColorStop('0.55', '#4040ff')
gradient.addColorStop('0.6', '#000')
gradient.addColorStop('0.9', '#fff')


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // ctx.fillRect(10, canvas.height - 90, 50, 50)
    handleBackground()
    handleMtn()
    handleClouds()
    handleG1()
    handleG2()
    handleG3()
    handleObstacles()   // call sooner to overt color shifting with particle trail  
    handleParticles()
    bird.update()
    bird.draw()
    // score  
    ctx.fillStyle = gradient
    ctx.font = '90px Georgia'
    ctx.strokeText(score, 450, 70)
    ctx.fillText(score, 450, 70)

    handleCollisions()
    if (handleCollisions()) return
    requestAnimationFrame(animate)
    angle += 0.11    // slow down static movement  
    hue++
    frame++
}

animate()


window.addEventListener('keydown', function(e) {    // move character  
    // console.log(e.code)  // get name of keypress  
    if (e.code === 'Space') spacePressed = true
})
window.addEventListener('keyup', function(e) {
    if (e.code === 'Space') spacePressed = false
    bird.frameX = 0
})


const bang = new Image()
bang.src = './assets/fx/bang.png'
function handleCollisions() {
    for ( let i = 0; i < obstaclesArray.length; i++) {
        if ( bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
            bird.x + bird.width > obstaclesArray[i].x &&
            ((bird.y < 0 + obstaclesArray[i].top && 
            bird.y + bird.height > 0) ||
            (bird.y > canvas.height - obstaclesArray[i].bottom &&
            bird.y + bird.height < canvas.height))) {
                // collision detected  
                ctx.drawImage(bang, bird.x -25, bird.y -20, 100, 100)
                ctx.font = "25px Georgia"
                ctx.fillStyle = 'white'
                ctx.fillText('Game Over!', 200, canvas.height/2 - 35)
                ctx.fillText('Your Score: ' + score, 200, canvas.height/2 - 5)
                return true
            }
    }
}






