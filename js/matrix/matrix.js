var canvas          = document.getElementById('m'),
    // canvas      = document.body.appendChild( document.createElement( 'canvas' ) ),
    context         = canvas.getContext( '2d' )
context.globalCompositeOperation = 'lighter'

canvas.width        = 900;
canvas.height       = 600;

let stripX          = new Array(),
    stripY          = new Array(), 
    dY              = new Array(), 
    tailLength      = new Array(),
    stripFontSize   = new Array(),
    codeLen         = new Array()

    stripCount      = canvas.width /12,

    theColors       = [
                        '#cefbe4', 
                        '#81ec72', 
                        '#5cd646', 
                        '#54d13c', 
                        '#4ccc32', 
                        '#43c728',
                        'rgb(60, 163, 0)',
                        'rgb(130, 155, 120)',
                        'rgb(108, 148, 71)',
                        'rgb(43, 59, 41)',
                        'rgb(28, 58, 24)'
                    ]


for (let i = 0; i < stripCount; i++) {      // setup initial streams  
    stripX[i]           = Math.floor(Math.random()*1265)
    stripY[i]           = -100
    dY[i]               = Math.floor(Math.random()*7)+3
    stripFontSize[i]    = Math.floor(Math.random()*16)+8
    tailLength[i]       = Math.floor((Math.random() *10) *( Math.random()) *10) +2
}


function popArr() {     // populate the random length array with random characters     
    for (let i=0; i < tailLength.length; i++) {
        codeLen[i] = String.fromCharCode(1e2+Math.random()*31)
    }
}


function drawStrip(x, y, tail) {
    for (var k = 0; k <= tail; k++) {
        var randChar = codeLen[Math.floor(Math.random()*codeLen.length)]
        if (context.fillText) {
            switch (k) {
            case 0:
                context.fillStyle = theColors[0]
                break
            case 1:
                context.fillStyle = theColors[1]
                break
            case 3:
                context.fillStyle = theColors[2]
                break
            case 7:
                context.fillStyle = theColors[3]
                break
            case 11:
                context.fillStyle = theColors[4]
                break
            case 15:
                context.fillStyle = theColors[5]
                break
            case 19:
                context.fillStyle = theColors[6]
                break
            case 26:
                context.fillStyle = theColors[7]
                break
            case 34:
                context.fillStyle = theColors[8]
                break
            case 44:
                context.fillStyle = theColors[9]
                break
            case 60:
                context.fillStyle = theColors[10]
                break
            }
            context.fillText(randChar, x, y)
        }
        y -= stripFontSize[k]
    }
}


function draw() {
    popArr()
    // clear the canvas and set the properties
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Shadow & blur effects  
    context.shadowOffsetX       = 0
    context.shadowOffsetY       = -1
    context.shadowBlur          = 10
    context.shadowColor         = '#94f475'
    
    for (var j = 0; j < stripCount; j++) {
        context.font            = stripFontSize[j]+'px '
        context.textBaseline    = 'top'
        context.textAlign       = 'center'
        if (stripY[j] > 1358) {     // stream complete? Setup new stream  
            stripX[j]           = Math.floor(Math.random()*canvas.width)
            stripY[j]           = -100
            dY[j]               = Math.floor(Math.random()*7)+3
            stripFontSize[j]    = Math.floor(Math.random()*16)+8
            tailLength[j]       = Math.floor((Math.random() *10) *( Math.random()) *10) +2
            
            drawStrip(stripX[j], stripY[j], tailLength[j])

        } else drawStrip(stripX[j], stripY[j], tailLength[j])
        
        stripY[j] += dY[j]
    }
    setTimeout(draw, 70)
}

draw()

