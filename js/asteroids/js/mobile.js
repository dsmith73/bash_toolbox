

// Up  - THRUST  
upArrow.addEventListener("mousedown", moveUp)
upArrow.addEventListener("touchstart", moveUp)
function moveUp() {
    const event = new KeyboardEvent('keydown',{'key':goUp})
    keyDown(event)
}
upArrow.addEventListener("mouseup", endMoveUp)
upArrow.addEventListener("touchend", endMoveUp)
function endMoveUp() {
    const event = new KeyboardEvent('keyup',{'key':goUp})
    keyUp(event)
}
// Down  - FIRE  
downArrow.addEventListener("mousedown", moveDown)
downArrow.addEventListener("touchstart", moveDown)
function moveDown() {
    const event = new KeyboardEvent('keydown',{'key':goDown})
    keyDown(event)
}
downArrow.addEventListener("mouseup", endMoveDown)
downArrow.addEventListener("touchend", endMoveDown)
function endMoveDown() {
    const event = new KeyboardEvent('keyup',{'key':goDown})
    keyUp(event)
}
// Left  
leftArrow.addEventListener("mousedown", moveLeft)
leftArrow.addEventListener("touchstart", moveLeft)
function moveLeft() {
    const event = new KeyboardEvent('keydown',{'key':goLeft})
    keyDown(event)
}
leftArrow.addEventListener("mouseup", endMoveLeft)
leftArrow.addEventListener("touchend", endMoveLeft)
function endMoveLeft() {
    const event = new KeyboardEvent('keyup',{'key':goLeft})
    keyUp(event)
}
// Right  
rightArrow.addEventListener("mousedown", moveRight)
rightArrow.addEventListener("touchstart", moveRight)
function moveRight() {
    const event = new KeyboardEvent('keydown',{'key':goRight})
    keyDown(event)
}
rightArrow.addEventListener("mouseup", endMoveRight)
rightArrow.addEventListener("touchend", endMoveRight)
function endMoveRight() {
    const event = new KeyboardEvent('keyup',{'key':goRight})
    keyUp(event)
}
