
// Sounds  
const sounds = {
    blue:   new Audio("./sounds/simonSound1.mp3"),
    yellow: new Audio("./sounds/simonSound2.mp3"),
    red:    new Audio("./sounds/simonSound3.mp3"),
    fail:   new Audio("./sounds/fail.mp3"),
    green:  new Audio("./sounds/simonSound4.mp3")
}

function playSound(that) {
    var thisSound = that.id
    // console.log(that.id)
    sounds[thisSound].currentTime = 0
    sounds[thisSound].play()
}

function playWhammy() {
    var fail = "fail"
    sounds[fail].currentTime = 0
    sounds[fail].play()
}

