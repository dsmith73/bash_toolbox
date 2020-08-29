var canvas = document.getElementById('gameCanvas')
var ctx = canvas.getContext('2d')


const FPS               = 30                    // Frames per sec  
const FRICTION          = 0.7                   // friction of space (0 = no friction && 1 = lots)
const SHIP_SIZE         = canvas.height /14     // ship height in px  30px?
const TURN_SPD          = 360                   // turn speed in deg / sec
const SHIP_THRUST       = 5                     // speed in px per sec per sec
const SHOW_CTR_DOT      = false                 // show / hide ship center dot  
const SHOW_BOUNDING     = false                 // show / hide collision circles
const SHIP_INV_DUR      = 3                     // amt of time that ship is invisible  
const BLINK_DUR         = 0.1                   // how often to attempt chip creation  
const LASER_MAX         = 10                    // max # laser on scr at once  
const LASER_SPD         = 500                   // speed of lasers in px per sec  
const LASER_DIST        = 0.4                   // max dist laser shoot

let ROIDS_NUM           = 2                     // num of asteroids at game start  
const ROIDS_SIZE        = 100                   // starting size of asteroids  
let ROIDS_SPD           = 10                    // asteroid speed in px per sec  
const ROIDS_VERT        = 11                    // avg # vertices on asteroid  
let   ROIDS_JAG                                 // deform (0 = none && 1 = lots)
const STARS_NUM         = 50                    // give bg texture... make stars  
const PTS_LG_ROID       = 20                    // points per asteroid, by size  
const PTS_MD_ROID       = 50 
const PTS_SM_ROID       = 100 
let scoreHigh                                   // implement high score  
const SAVE_KEY_SCORE    = "asteroids-dsmith73-high-score"   // save key for local storage of high score  

const EXPLODE_DUR       = .4                    // duration of explosions  
let LVL                 = 0                     // starting level of game  
let deaths              = 3 
let deathCount          = 0                     // num deaths on current level 
let score               = 0                     // num asteroids killed  
const TXT_FADE_TIME     = 2                     // 
const TXT_SIZE          = 26                    // size of text  
const SOUND_ON          = true
const MUSIC_ON          = false

// mobile  
// arrow keys  
const upArrow = document.querySelector('.up-arrow')
const downArrow = document.querySelector('.down-arrow')
const leftArrow = document.querySelector('.left-arrow')
const rightArrow = document.querySelector('.right-arrow')
const goLeft = 'ArrowLeft'
const goUp = 'ArrowUp'  // thrust 
const goRight = 'ArrowRight'
const goDown = ' '      // fire  

// sound FX 
let fxLaser     = new Sound("./sounds/laser.m4a", 5, 0.2)
let fxExplode   = new Sound("./sounds/explode.m4a")
let fxHit       = new Sound("./sounds/hit.m4a", 3, 0.2)
let fxThrust    = new Sound("./sounds/thrust.m4a")

// music 
let music = new Music("./sounds/music-low.m4a", "./sounds/music-high.m4a")
let roidsLeft, roidsTotal

function Sound(src, maxStreams = 1, vol = 1.0) {
    this.streamNum = 0
    this.streams = []
    for (let i=0; i < maxStreams; i++) {
        this.streams.push(new Audio(src))
        this.streams[i].volume = vol
    }

    this.play = function() {
        if (SOUND_ON){
            this.streamNum = (this.streamNum +1) % maxStreams
            this.streams[this.streamNum].play()
        }
    }

    this.stop = function() {
        this.streams[this.streamNum].pause()
        this.streams[this.streamNum].currentTime = 0
    }
}

function Music(srcLow, srcHigh) {
    this.soundLow           = new Audio(srcLow)
    this.soundHigh          = new Audio(srcHigh)
    this.low                = true
    this.tempo              = 1.0        // sec per beat  
    this.beatTime           = 0       // frames until next beat  
    this.soundLow.volume    = 0.05
    this.soundHigh.volume   = 0.05

    this.play = function() {
        if ( MUSIC_ON) {
            if (this.low) {
                this.soundLow.play()
            } else {
                this.soundHigh.play()
            }
            this.low = !this.low
        }
    }

    this.setAsteroidRatio = function(ratio) {
        this.tempo = 1.0 - 0.75 * (1.0 - ratio)
    }

    this.tick = function() {
        if (this.beatTime == 0) {
            this.play()
            this.beatTime = Math.ceil(this.tempo * FPS)
        } else {
            this.beatTime--
        }
    }
}





