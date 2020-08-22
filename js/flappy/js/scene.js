const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = 600
canvas.height = 400

let gameSpeed = 2


const background = new Image()
const clouds = new Image()
const clouds2 = new Image()
const ground = new Image()
const ground2 = new Image()
const ground3 = new Image()
const mtn = new Image()
const plant = new Image()

//background.src = './assets/back/layers/r1.png'
background.src = './assets/back/bg.png'
clouds.src = './assets/back/layers/c1.png'
clouds2.src = './assets/back/layers/c2.png'
ground.src = './assets/back/layers/g1.png'
ground2.src = './assets/back/layers/g2.png'
ground3.src = './assets/back/layers/g3.png'
mtn.src = './assets/back/layers/r1.png'
plant.src = './assets/back/layers/p1.png'


const CL = {    // Layers  
    x1: 0,  
    x2: canvas.width,   
    y: 0,
    width: canvas.width,
    height: canvas.height
}
function handleClouds() {
    if (CL.x1 <= -CL.width + gameSpeed) CL.x1 = CL.width
    else CL.x1 -= (gameSpeed -1.2)
    if (CL.x2 <= -CL.width + gameSpeed) CL.x2 = CL.width
    else CL.x2 -= (gameSpeed -1.2)
    ctx.drawImage(clouds, CL.x1, CL.y, CL.width, CL.height)
    ctx.drawImage(clouds2, CL.x2, CL.y, CL.width, CL.height)
}


const G1 = {    // Layers  
    x1: 0,  
    x2: canvas.width,   
    y: 0,
    width: canvas.width,
    height: canvas.height
}
function handleG1() {
    if (G1.x1 <= -G1.width + gameSpeed +3) G1.x1 = G1.width
    else G1.x1 -= (gameSpeed +.2)
    if (G1.x2 <= -G1.width + gameSpeed +3) G1.x2 = G1.width
    else G1.x2 -= (gameSpeed +.2)
    ctx.drawImage(ground, G1.x1, G1.y, G1.width, G1.height)
    ctx.drawImage(ground, G1.x2, G1.y, G1.width, G1.height)
}


const G2 = {    // Layers  
    x1: 0,  
    x2: canvas.width,   
    y: 0,
    width: canvas.width,
    height: canvas.height
}
function handleG2() {
    if (G2.x1 <= -G2.width + gameSpeed +3) G2.x1 = G2.width
    else G2.x1 -= (gameSpeed +1)
    if (G2.x2 <= -G2.width + gameSpeed +3) G2.x2 = G2.width
    else G2.x2 -= (gameSpeed +1)
    ctx.drawImage(ground2, G2.x1, G2.y, G2.width, G2.height)
    ctx.drawImage(ground2, G2.x2, G2.y, G2.width, G2.height)
}


const G3 = {    // Layers  
    x1: 0,  
    x2: canvas.width,   
    y: 10,
    width: canvas.width,
    height: canvas.height
}
function handleG3() {
    if (G3.x1 <= -G3.width + gameSpeed +3) G3.x1 = G3.width
    else G3.x1 -= (gameSpeed +3)
    if (G3.x2 <= -G3.width + gameSpeed +3) G3.x2 = G3.width
    else G3.x2 -= (gameSpeed +3)
    ctx.drawImage(ground3, G3.x1, G3.y, G3.width, G3.height)
    ctx.drawImage(ground3, G3.x2, G3.y, G3.width, G3.height)
}


const BG = {
    x1: 0,  // resolution for bg #1 
    x2: canvas.width,   // resolution for bg #2
    y: 0,
    width: canvas.width,
    height: canvas.height
}
function handleBackground() {
    // if (BG.x1 <= -BG.width + gameSpeed) BG.x1 = BG.width
    // else BG.x1 -= gameSpeed
    // if (BG.x2 <= -BG.width + gameSpeed) BG.x2 = BG.width
    // else BG.x2 -= gameSpeed
    ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height)
    // ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height)
}


const VV = {    // mountains  
    x1: 0,  
    x2: canvas.width,   
    y: 0,
    width: canvas.width,
    height: canvas.height
}
function handleMtn() {
    if (VV.x1 <= -VV.width + gameSpeed) VV.x1 = VV.width
    else VV.x1 -= (gameSpeed -1)
    if (VV.x2 <= -VV.width + gameSpeed) VV.x2 = VV.width
    else VV.x2 -= (gameSpeed -1)
    ctx.drawImage(mtn, VV.x1, VV.y, VV.width, VV.height)
    ctx.drawImage(mtn, VV.x2, VV.y, VV.width, VV.height)
}

