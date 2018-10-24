/*

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

document.getElementById('');

class Game {
  constructor(){
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
    this.totalGuesses = 0;
  }

  difference() {
    return Math.abs(this.winningNumber - this.playersGuess);
  }

  isLower() {
    return this.playersGuess < this.winningNumber;
  }

  checkGuess() {

    let feedbackText = '';
    if (this.playersGuess === this.winningNumber) {
      feedbackText = `You Win! The winning number was ${this.winningNumber}.`;
    }
    else if (this.pastGuesses.includes(this.playersGuess)) {
      feedbackText = "You have already guessed that number.";

    } else {
      this.pastGuesses.push(this.playersGuess);
      if (this.pastGuesses.length === 5) {
        feedbackText = `You Lose. The winning number was ${this.winningNumber}.`;
      } else {
        let diff = this.difference();
        if (diff<10) feedbackText = `You're burning up!`;
        else if (diff < 25) feedbackText = `You're lukewarm.`;
        else if (diff < 50) feedbackText = `You're a bit chilly.`;
        else feedbackText = `You're ice cold!`;
          if (this.playersGuess > this.winningNumber) {
            document.querySelector('#adviceImg-reveal > h4').innerHTML = `Guess Lower!`;
          } else document.querySelector('#adviceImg-reveal > h4').innerHTML = `Guess Higher!`;
        }

    }

    document.querySelector('#guess-feedback > h4').innerHTML = feedbackText;
    if (feedbackText = "You have already guessed that number.") {
      document.querySelector(`#guess-list li:nth-child(${this.pastGuesses.length})`).innerHTML = `${this.pastGuesses[this.pastGuesses.length-1]}`;
    } else {
    document.querySelector(`#guess-list li:nth-child(${this.pastGuesses.length})`).innerHTML = this.playersGuess;
    }
    return feedbackText;
  }


  playersGuessSubmission(guess) {
    this.playersGuess = parseInt(guess, 10);
    if (this.playersGuess < 1 || this.playersGuess > 100 || isNaN(this.playersGuess)) {
      throw document.querySelector('#guess-feedback > h4').innerHTML = `That is an invalid guess.`;
    }
    this.totalGuesses++;
    return this.checkGuess();
  }

  provideHint() {
    let unshuffled = [];
    unshuffled[0] = this.winningNumber;
    unshuffled.push(generateWinningNumber());
    unshuffled.push(generateWinningNumber());

    return shuffle(unshuffled);
  }

}

function generateWinningNumber() {
  return Math.ceil(Math.random() * 100);
}

function newGame() {
  return new Game();
}

function shuffle(array) {
  // fisher-yates Shuffle algorithm
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);
    // swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

function playGame() {

  //creating variables
  const reset = document.querySelector('#reset');
  const button = document.querySelector('#submit');
  const hint = document.querySelector('#hint');
  let game = newGame();


  // when "go!" button gets clicked
  button.addEventListener('click', function() {
    const playGuess = +document.querySelector('#numberGuess').value;
    document.querySelector('#numberGuess').value = '';
    document.querySelector('#adviceImg-reveal > h4').innerHTML = "";
    game.playersGuessSubmission(playGuess);
    document.querySelector('#hint-reveal > h4').innerHTML = "";
  });


  // when reset button gets clicked
  reset.addEventListener('click', function() {
    //start a new game
    game = newGame();
    // empty out the stored guesses from previous game
    var liArr = document.getElementsByClassName('guess');
    for (let i = 0; i < liArr.length; ++i) {
      liArr[i].innerHTML = "-";
    };
    // remove any feedback or hints from previous game
    document.querySelector('#guess-feedback > h4').innerHTML = "";
    document.querySelector('#hint-reveal > h4').innerHTML = "";
  });


  // when the hint button gets clicked
  hint.addEventListener('click', function() {
    let hintArray = game.provideHint();
    // reveal a sentence with 3 values, one of which is the winning number
    document.querySelector('#hint-reveal > h4').innerHTML = `The winning number is either ${hintArray[0]}, ${hintArray[1]}, or ${hintArray[2]}`;
  });


}



playGame();












