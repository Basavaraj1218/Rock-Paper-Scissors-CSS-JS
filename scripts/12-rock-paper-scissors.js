
let score = JSON.parse (localStorage.getItem('score')) || 
{
   wins : 0,
   losses : 0,
   ties : 0
 };

 updatescoreElement(); 

 /*

if (!score) {
 score = {
   wins : 0,
   losses : 0,
   ties : 0
 };
}
*/

let isAutoPlaying = false;
let intervalId;

//const  autoPlay = () => {

//};
document.querySelector('.js-auto-play-button').addEventListener('click', () => { 
  autoPlay();
});

function autoPlay() {
  if(!isAutoPlaying) {
    intervalId = setInterval (() => {
      const playerMove = pickcomputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true; 

  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('Rock')
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('Paper')
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('Scissors')
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('Rock');
  } else if ( event.key === 'p') {
    playGame('Paper');
  } else if ( event.key === 's') {
    playGame('Scissors');
  }  
});

function playGame(playerMove) {
 const computerMove = pickcomputerMove();

 let result = '';

 if (playerMove === 'Scissors') {
   if (computerMove  ===  'Rock') {
     result = 'you lose.';
   } else if  (computerMove === 'Paper') {
     result = 'you win.';
   } else if  (computerMove === 'Scissors') {
     result = 'tie.';
   }

 } else if (playerMove === 'Paper') {
   if (computerMove  ===  'Rock') {
     result = 'you win.';
   } else if  (computerMove === 'Paper') {
     result = 'tie.';
   } else if  (computerMove === 'Scissors') {
     result = 'you lose.';
   }

 } else if (playerMove === 'Rock') {
   if (computerMove  ===  'Rock') {
     result = 'tie.';
   } else if  (computerMove === 'Paper') {
     result = 'you lose.';
   } else if  (computerMove === 'Scissors') {
     result = 'you win.';
   }
 }


 if (result === 'you win.') {
   score.wins += 1;
 } else if (result == 'you lose.') {
   score.losses += 1;
 } else if (result == 'tie.') {
   score.ties += 1;
 }

 updatescoreElement();

 document.querySelector('.js-result')
 .innerHTML = result;

 document.querySelector('.js-moves').innerHTML = `You
 <img src="images/${playerMove}-emoji.png" class="move-icon">
 <img src="images/${computerMove}-emoji.png" class="move-icon">
 Computer`;

}

function updatescoreElement() {
 localStorage.setItem('score', JSON.stringify(score));

 document.querySelector('.js-score')
  .innerHTML = `Wins:${score.wins}. Losses:${score.losses}. Ties:${score.ties}`;

}

function pickcomputerMove() {
 const randomnumber = Math.random();

 let computerMove = '';

 if (randomnumber >= 0 && randomnumber < 1/3 ) {
   computerMove = 'Rock';
 } else if (randomnumber >= 1/3 && randomnumber < 2/3 ) {
   computerMove = 'Paper';
 } else if (randomnumber >= 2/3 && randomnumber < 1 ) {
   computerMove = 'Scissors';
 }

 return computerMove;
}

document.querySelector('.js-reset-score-button').addEventListener('click', () => {
  resetFunction();
});

function resetFunction () {
  score.wins = 0;
  score.losses = 0;
  score.ties =  0; 
  localStorage.removeItem('score');
  updatescoreElement();
}