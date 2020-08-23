document.addEventListener('DOMContentLoaded', () => {
    const grid          = document.querySelector('.grid')
    let width           = 10  // change this to be a selector... Easy, Normal, Difficult  
    const area          = Math.pow(width, 2)
    let bombAmount      = 20
    let squares         = []
    let isGameOver      = false
    let flags           = 0
    // let timer           = 100
    const flagsUsed     = document.querySelector('.flags-used')
    const outcome       = document.querySelector('.main')
    // const difficulty    = document.getElementById("difficulty[name=level-val]")


    // function loadSettings() {
    //     difficulty.addEventListener("click", loadSettings)
    //     // difficulty  
    //     switch(difficulty) {
    //         case difficulty == 'easy':
    //             timer       = 120
    //             bombAmount  = 10
    //             break
    //         case difficulty == 'normal':
    //             timer       = 100
    //             bombAmount  = 20
    //             break
    //         case difficulty == 'hard':
    //             timer       = 80
    //             bombAmount  = 25
    //             break
    //         case difficulty == 'insane':
    //             timer       = 100
    //             bombAmount  = 30
    //             break
    //     }
    // }

    // create board  
    function createBoard() {
        // get shuffled array with random bombs  
        const bombsArr = Array(bombAmount).fill('bomb')
        const emptyArr = Array(area - bombAmount).fill('valid')
        const gamesArr = emptyArr.concat(bombsArr)
        const shuffledArr = gamesArr.sort(() => Math.random() -0.5)
        // console.log(shuffledArr)

        // board layout  
        for (let i = 0; i < area; i++) {
            const square = document.createElement('div')
            square.setAttribute('id', i)
            square.classList.add(shuffledArr[i])
            grid.appendChild(square)
            squares.push(square)

            // normal click  
            square.addEventListener('click', function(e) {
                click(square)
            })

            // right click  OR ctrl + left click  
            square.oncontextmenu = function(e) {
                e.preventDefault()
                addFlag(square)
            }
        }

        // add numbers  
        for (let i=0; i < squares.length; i++) {
            let total           = 0
            const leftEdge      = (i % width === 0)
            const rightEdge     = (i % width === width -1)

            if (squares[i].classList.contains('valid')) {   // add up bomb count  
                if (i >= width && i < area    &&                squares[i -width].classList.contains('bomb')) total ++              // N  
                if (i < (area -width)         &&                squares[i +width].classList.contains('bomb')) total ++              // S  
                if (i < (area -1)             && !rightEdge &&  squares[i +1].classList.contains('bomb')) total ++                  // E  
                if (                                           !leftEdge  &&  squares[i -1].classList.contains('bomb')) total ++    // W  
                if (i >= width                && !rightEdge &&  squares[(i +1) -width].classList.contains('bomb')) total ++         // NE  
                if (i < ((area -width) -1)    && !rightEdge &&  squares[(i +1) +width].classList.contains('bomb')) total ++         // SE  
                if (i < (area -width)         && !leftEdge  &&  squares[(i -1) +width].classList.contains('bomb')) total ++         // SW  
                if (i > width                 && !leftEdge  &&  squares[(i -1) -width].classList.contains('bomb')) total ++         // NW  
                squares[i].setAttribute('data', total)
                // console.log(squares[i])
            }
        }
    }

    createBoard()


    // create flag on right click  
    function addFlag(square) {
        if (isGameOver) return
        if (!square.classList.contains('checked') && (flags < bombAmount)) {
            if (!square.classList.contains('flag')) {
                square.classList.add('flag')
                square.innerHTML = '🚩'
                flags ++
                checkWinner()
            } else {
                square.classList.remove('flag')
                square.innerHTML = ''
                flags --
            }
            flagsUsed.innerHTML = ` ${flags}`
        }
    }

    // click on square actions  
    function click(square) {
        let currentId = square.id
        
        if (isGameOver) return
        if (square.classList.contains('checked') || square.classList.contains('flag')) return
        if (square.classList.contains('bomb')) {
            square.classList.add('kaboom')
            square.style.animation = "shakeBomb .3s ease";
            
            // alert('Game Over')  // change to popup in future  
            gameOver()
        } else {
            let total = square.getAttribute('data')
            if (total != 0) {
                square.classList.add('checked')
                square.innerHTML = total
                numColor(total, square)
                return
            }
            checkSquare(square, currentId)
        }
        square.classList.add('checked')
    }

    function numColor(total, square) {
        if (total < 3 ) square.style.color = 'rgb(21, 73, 0)'
        if (total > 2 && total < 5 ) square.style.color = 'rgb(161, 91, 0)'
        if (total > 4 && total < 7 ) square.style.color = 'rgb(176, 0, 182)'
        if (total == 7 ) square.style.color = 'rgb(85, 0, 182)'
        if (total == 8 ) square.style.color = 'rgb(189, 0, 0)'
    }

    // check neighbor squares once square checked
    function checkSquare(square, currentId) {
        const leftEdge    = (currentId % width === 0)
        const rightEdge   = (currentId % width === width -1)

        setTimeout(() => {
            if (/*currentId > */ !leftEdge){  // W  
                const newId     = squares[parseInt(currentId) -1].id
                const newSquare = document.getElementById(newId)
                // console.log(currentId, square.classList)     // debugging  
                click(newSquare)
            }
            if (currentId >= width && !rightEdge){  // NE  
                const newId     = squares[(parseInt(currentId) +1) -width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId >= width && currentId < area){  // N  
                const newId     = squares[parseInt(currentId) -width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId > width && !leftEdge){  // NW  
                const newId     = squares[(parseInt(currentId) -1) -width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < (area -1) && !rightEdge){  // E  
                const newId     = squares[parseInt(currentId) +1].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < (area -width) && !leftEdge){  // SW  
                const newId     = squares[(parseInt(currentId) -1) +width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < ((area -width) -1) && !rightEdge){  // SE  
                const newId     = squares[(parseInt(currentId) +1) +width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < (area -width)) {   // S  
                const newId     = squares[parseInt(currentId) +width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
        }, 10)
    }

function gameOver(square) {
    console.log('BOOM! Game Over!')
    outcome.classList.add('big-bada-boom')
    isGameOver = true

    // show all bomb locations  
    squares.forEach(square => {
        if (square.classList.contains('bomb')) {
            square.innerHTML = '💣'
            square.classList.add('reveal')
        }
    })
}


// check winner  
function checkWinner() {
    let matches = 0
    for (let i=0; i < squares.length; i++) {
        if (squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')) {
            matches ++
        }
        if (matches === bombAmount) {
            console.log('YOU WIN!')
            outcome.classList.add('winner')
            isGameOver = true
        }
    }
}


// class MixOrMatch {
//     constructor(totalTime) {
//         this.totalTime = totalTime;
//         this.timeRemaining = totalTime;
//         this.timer = document.getElementById('time-remaining')
//     }

//     startGame() {
//         this.timeRemaining = this.totalTime;
//         setTimeout(() => {
//             this.countdown = this.startCountdown();
//         }, 500)
//         this.timer.innerText = this.timeRemaining;
//     }

//     startCountdown() {
//         return setInterval(() => {
//             this.timeRemaining--;
//             this.timer.innerText = this.timeRemaining;
//             if(this.timeRemaining === 0)
//                 this.gameOver();
//         }, 1000);
//     }
//     gameOver() {
//         clearInterval(this.countdown);
//     }
//     victory() {
//         clearInterval(this.countdown);
//     }
// }





})

/*
TO-DO:
    - Add countdown timer
        - Have timer start on first click event in .grid
    - Add Difficulty
        select name="difficulty">
            <option class="difficulty" value="normal">Normal</option>
            <option class="difficulty" value="easy">Easy</option>
            <option class="difficulty" value="hard">Hard</option>
            <option class="difficulty" value="insane">Insane</option>
    - Add Buttons for Start & Reset
        - Start implements Difficulty settings
            button id="control-submit
        - Reset returns to Normal Difficulty

*/