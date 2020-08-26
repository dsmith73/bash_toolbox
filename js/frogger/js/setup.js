const canvas = document.getElementById('canvas1')
const ctx1 = canvas.getContext('2d')
canvas.width = 600
canvas.height = 600

const canvas2 = document.getElementById('canvas2')
const ctx2 = canvas2.getContext('2d')
canvas2.width = 600
canvas2.height = 600

const canvas3 = document.getElementById('canvas3')
const ctx3 = canvas3.getContext('2d')
canvas3.width = 600
canvas3.height = 600

const canvas4 = document.getElementById('canvas4')
const ctx4 = canvas4.getContext('2d')
canvas4.width = 600
canvas4.height = 600

const canvas5 = document.getElementById('canvas5')
const ctx5 = canvas5.getContext('2d')
canvas5.width = 600
canvas5.height = 600


// Global VARs
const grid = 80     // each sq = 80px  
let keys = []
let score = 0
let collisionsCount = 0
let frame = 0
let gameSpeed = 1
let safe = false

const particlesArr = []
const maxParticles = 300
const ripplesArr = []
const carsArr = []
const logsArr = []

// arrow keys  
const upArrow = document.querySelector('.up-arrow')
const downArrow = document.querySelector('.down-arrow')
const leftArrow = document.querySelector('.left-arrow')
const rightArrow = document.querySelector('.right-arrow')
const goLeft = 'ArrowLeft'
const goUp = 'ArrowUp'
const goRight = 'ArrowRight'
const goDown = 'ArrowDown'


// images  
const background = new Image()
background.src = './assets/background.png'
const background_lvl2 = new Image()
background_lvl2.src = './assets/background_lvl2.png'

const grass = new Image()
grass.src = './assets/grass.png'

const frogSprite = new Image()
frogSprite.src = './assets/frog_spritesheet.png'

// water declared in css  

const log = new Image()
log.src = './assets/log.png'

const collisions = new Image()
collisions.src = './assets/collisions.png'

const car = new Image()
car.src = './assets/cars.png'
let numberOfCars = 3

const turtle = new Image()
turtle.src = './assets/turtles.png'
let numberOfTurtles = 4


