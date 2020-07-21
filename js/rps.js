const game = () => {
    let pScore = 0;
    let cScore = 0;

    // start game  
    const startGame = () => {
        const playBtn = document.querySelector(".intro button");
        const introScreen = document.querySelector(".intro");
        const match = document.querySelector(".match");
        playBtn.addEventListener("click", () => {
            introScreen.classList.add("fadeOut");
            match.classList.add("fadeIn");
        });
    };
    // play match  
    const playMatch = () => {
        const options = document.querySelectorAll(".options button");
        const playerHand = document.querySelector(".player-hand");
        const computerHand = document.querySelector(".computer-hand");
        // animation  
        const hands = document.querySelectorAll(".hands img");
        hands.forEach(hand => {
            hand.addEventListener("animationend", function(){
                this.style.animation = "";
            });
        });
        // computer options  
        const computerOptions = ["rock", "paper", "scissors", "lizard", "spock"];
        options.forEach(option => {
            option.addEventListener("click", function() {
                // computer choice
                const computerNumber = Math.floor(Math.random() * 5);
                const computerChoice = computerOptions[computerNumber];
                // console.log(computerChoice);   // debugging  
                // delay  
                setTimeout(() => {
                    // call Compare Hands  
                    compareHands(this.textContent, computerChoice);
                    // update images  
                    playerHand.src = `./assets/${this.textContent}.png`;
                    playerHand.alt = `${this.textContent}`;
                    computerHand.src = `./assets/${computerChoice}.png`;
                    computerHand.alt = `${computerChoice}`;
                }, 2000);
                // animation  
                playerHand.style.animation = "shakePlayer 2s ease";
                computerHand.style.animation = "shakeComputer 2s ease";
            });
        });
    };

    const updateScore = () => {
        const playerScore = document.querySelector(".player-score p");
        const computerScore = document.querySelector(".computer-score p");
        playerScore.textContent = pScore;
        computerScore.textContent = cScore;
    };

    const compareHands = (playerChoice, computerChoice) => {
        // update text  
        const winner = document.querySelector(".winner");
        // check for a TIE  
        if (playerChoice === computerChoice){
            winner.textContent = "TIE";
            return;
        }
        // check for rock  
        if (playerChoice === 'rock') {
            if (computerChoice === 'scissors') {
                winner.textContent = 'You Win!';
                pScore++;
                updateScore();
                return;
            }else if (computerChoice === 'lizard') {
                winner.textContent = 'You Win!';
                pScore++;
                updateScore();
                return;
            }else{
                winner.textContent = 'Computer Wins';
                cScore++;
                updateScore();
                return;
            }
        }  
        //check for paper  
        if (playerChoice === 'paper') {
            if (computerChoice === 'rock') {
                winner.textContent = 'You Win!';
                pScore++;
                updateScore();
                return;
            }else if (computerChoice === 'spock') {
                winner.textContent = 'You Win!';
                pScore++;
                updateScore();
                return;
            }else{
                winner.textContent = 'Computer Wins';
                cScore++;
                updateScore();
                return;
            }
        }  
        // check for scissors  
        if (playerChoice === 'scissors') {
            if (computerChoice === 'paper') {
                winner.textContent = 'You Win!';
                pScore++;
                updateScore();
                return;
            }else if (computerChoice === 'lizard') {
                winner.textContent = 'You Win!';
                pScore++;
                updateScore();
                return;
            }else{
                winner.textContent = 'Computer Wins';
                cScore++;
                updateScore();
                return;
            }
        }
        // check for lizard  
        if (playerChoice === 'lizard') {
            if (computerChoice === 'paper') {
                winner.textContent = 'You Win!';
                pScore++;
                updateScore();
                return;
            }else if (computerChoice === 'spock') {
                winner.textContent = 'You Win!';
                pScore++;
                updateScore();
                return;
            }else{
                winner.textContent = 'Computer Wins';
                cScore++;
                updateScore();
                return;
            }
        }
         // check for spock  
        if (playerChoice === 'spock') {
            if (computerChoice === 'scissors') {
                winner.textContent = 'You Win!';
                pScore++;
                updateScore();
                return;
            }else if (computerChoice === 'rock') {
                winner.textContent = 'You Win!';
                pScore++;
                updateScore();
                return;
            }else{
                winner.textContent = 'Computer Wins';
                cScore++;
                updateScore();
                return;
            }
        }
    };

    // call inner functions  
    startGame();
    playMatch();
    // updateScore();
};

// start the game function  
game();











// Dark-Mode  
var checkbox = document.querySelector('input[name=theme]');

checkbox.addEventListener('change', function() {
    if (this.checked) {
        trans()
        document.documentElement.setAttribute('data-theme', 'light')
    } else {
        trans()
        document.documentElement.setAttribute('data-theme', 'dark')
    }
})

let trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
        document.documentElement.classList.remove('transition')
    }, 1000)
}
