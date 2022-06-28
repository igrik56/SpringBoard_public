const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}



// TODO: Implement this function!
let a = undefined;
let b = undefined;
let clickCount = 0;
const gameBoard = document.querySelector('#game');
let cards = document.querySelector('#game').children;
startBtn = document.querySelector("#Start");
let cardCount = 0;
recordScore = 10;
currentScore = 0;

if (localStorage.getItem('BestScore') === undefined || localStorage.getItem('BestScore') === null){
  document.querySelector('#recordScoreOut').innerHTML = recordScore;
}
else{
  recordScore = parseInt(localStorage.getItem('BestScore'));
  document.querySelector('#recordScoreOut').innerHTML = recordScore;
}
startBtn.onClick = startGame;

function bestScoreCheck(num){
  let x = parseInt(localStorage.getItem('BestScore'));
  if(x < num){
    return x;
  }
}

function resetPick(){
  a = undefined;
  b = undefined;
  clickCount = 0;
}

function noMatch(x, y){
  console.log(`no match`);                                                            //if does not match close both cards.
  //console.log (x+` `+y);
  let dotA = x.indexOf('.');
  document.querySelector('div.'+x).className = x.slice(0, dotA);
  let dotB = y.indexOf(`.`);
  document.querySelector('div.'+y).className = y.slice(0, dotB);
}

function startGame(){
  console.log(`start new game`);
  while(gameBoard.firstChild){
    gameBoard.removeChild(gameBoard.firstChild);
  }
  currentScore = 0;
  shuffle(COLORS);
  createDivsForColors(shuffledColors);
  document.querySelector('#currentScoreOut').innerHTML = currentScore;
  localStorage.setItem('BestScore', recordScore);
}
function restartGame(){
  // will be a restart same game function.
  console.log("Restart game");
  for(let i = 0; i<cards.length; i++){
    if(cards[i].classList.length > 1){
        let x = cards[i].className.indexOf(` `);
        cards[i].className = cards[i].className.slice(0, x);
      }
    }
    cardCount = 0;
    currentScore = 0;
    document.querySelector('#currentScoreOut').innerHTML = currentScore;
  }

function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  //console.log("you just clicked", event.target);
  if(clickCount === 2) return resetPick();
  if(event.target.classList.length !== 2){
        
    event.target.classList.add(`${event.target.className}-open`);
    if(a === undefined){  
      a = event.target.className;
      a = a.replace(` `,'.');
    }
    else if(b === undefined){
      b = event.target.className;
      b = b.replace(` `,'.');
      //console.log(`${a} ${b}`);
      
      if(a !== b){
        clickClounter = 2;        
        let timer = setTimeout(() => {
          noMatch(a, b);
          resetPick();
          currentScore++;
          document.querySelector('#currentScoreOut').innerHTML = currentScore;
          clearTimeout(timer);     
        }, 150);
      }
      else{
        console.log(`Match!`);
        cardCount +=2;
        resetPick();
      }
    }
  }
  if(cardCount == cards.length){
    let wimMsg = setTimeout(() => {
      if(currentScore < recordScore){
        recordScore = currentScore;
        alert(`Congratz! YOU WON!\nNEW HIGH SCORE: ${recordScore}`);
        bestScoreCheck(recordScore);
        localStorage.setItem('BestScore', recordScore);
      }
      else{
        alert(`Congratz! You won!\nYour score is: ${currentScore}\nHighest score is: ${recordScore}`);
      }
      cardCount = 0;
      startGame();
      clearInterval(wimMsg);
    }, 500);
  }
}


// when the DOM loads
//document.addEventListener('DOMContentLoaded', function(e){
  createDivsForColors(shuffledColors);
 
//});

/* */