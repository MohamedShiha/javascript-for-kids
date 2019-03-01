// Guess the word one letter at a time.
// Each player is only allowed to guess
// wrong three times.

// Prompt Player 1 to enter a word to guess and store
// as a variable.
//var word = prompt("Player 1, Enter your secret word.");
var word = "";

// Create a variable to store the number of bad guesses
var strikes = 0;

function pullData() {
  strikes = 0;
  if(document.getElementById("secret-input").value.length > 0 
      && document.getElementById("proceed").innerHTML === "Proceed") {
    word = document.getElementById("secret-input").value;      
    reformLabel();
  }
}

// Fill this array with placeholders for guessing
function reformLabel() {
  var fixedLabel = document.getElementById("fixed-label");
  fixedLabel.innerHTML = "";
  for (i = 0; i < word.length; i++) {
    fixedLabel.innerHTML += "_ ";
  }
  document.getElementById("secret-input").placeholder = "Player 2: Guess a letter";
  document.getElementById("secret-input").value = "";
  document.getElementById("proceed").innerHTML = "Guess and press enter";
}

// Replaces a specific char in the string
String.prototype.replaceAt=function(index, char) {
  var a = this.split("");
  a[index] = char;
  return a.join("");
}

// Start a loop that continues as long as the person has
// not guessed wrong three times, or all of the letters have
// been guessed.
function guessWord(keyPress) {
  var txt = document.getElementById("fixed-label").innerHTML;
  if(event.key === 'Enter' && document.getElementById("proceed").innerHTML === "Guess and press enter") {
    // Start a loop that continues as long as the person has
    // not guessed wrong three times, or all of the letters have
    // been guessed.
    if(strikes < 3 && txt.indexOf("_") >= 0) {

      // Prompt Player 2 to Player 2: Guess a letter and store as
      // a variable.
      var letter = document.getElementById("secret-input").value;

      // If the letter does not exist in the word,
      if (word.indexOf(letter) < 0 || letter.length != 1) {
        // add a strike
        strikes++;
        if(strikes == 3) {
          TriggerError("You have failed :(");
        } else {
          TriggerError("Bad guess!");
        }
      // If the letter exists in the word, we need to
      // add it to the good guesses array
      } else {
        for (i = 0; i < word.length; i++) {
          // Each time the guess letter is found, we
          // add it as a good guess in the same spot
          if (word[i] === letter) {
            var label = document.getElementById("fixed-label");
            label.innerHTML= label.innerHTML.replaceAt(i*2, letter);
          }
        }
      }        
      document.getElementById("secret-input").value = "";      
      if(document.getElementById("fixed-label").innerHTML.indexOf("_") < 0) {
        getResult();
      }
    }
  }
}

// Once the player has exited the loop, congratulate
// them on a win, or tell them they have lost and show
// the secret word.
function getResult() {
  if(strikes < 3) {
    congrats();
  }
  else {
    TriggerError("You have failed :(");
  }
  setTimeout(resetUI, 5000);
}

function resetUI() {
    document.getElementById("fixed-label").innerHTML = "Enter your secret word";
    document.getElementById("secret-input").placeholder = "Player1: Type something...";
    document.getElementById("secret-input").value = "";
    document.getElementById("proceed").innerHTML = "Proceed";
  }

//Change some UI elements to display an error
//based on the remaining no. of trials
function TriggerError(ErrorMessage) {
  var mainBlock = document.getElementById("main-content");
  var inputElement = document.getElementById("secret-input");
  var mainLabel = document.getElementById("fixed-label");
  var btn = document.getElementById("proceed");
  inputElement.innerHTML = "";
  if(strikes < 3) {
    inputElement.placeholder = ErrorMessage + "  " + (3-strikes) + " trials remaining";
    btn.innerHTML = "Try Again";
    setTimeout(revertMainContainerStyle, 3000);
  } else {
      mainLabel.innerHTML = "Secret word was \"" + word + "\"";
      inputElement.placeholder = ErrorMessage;
      btn.innerHTML = "Game over, Try again";
      setTimeout(revertMainContainerStyle, 6000);
  } 
  mainBlock.style.animation = "shake 0.57s cubic-bezier(.36,.07,.19,.97) both";
  mainBlock.style.backfaceVisibility = "hiiden";
  mainBlock.style.perspective = "1000px";
  mainBlock.style.boxShadow = "0 0 20px 5px red";
  mainBlock.style.transitionDuration = "0.3s"
  mainBlock.style.transition = "box-shadow 500ms";
  mainBlock.style.transitionDelay = "3s";
  //Clone element and replace the old one to reset styles and animations
  var newElement = mainBlock.cloneNode(true);
  mainBlock.parentNode.replaceChild(newElement, mainBlock);
}

function revertMainContainerStyle() {
  var mainBlock = document.getElementById("main-content");
  var inputElement = document.getElementById("secret-input");
  var btn = document.getElementById("proceed");
  if(strikes < 3) {
    inputElement.placeholder = "Player 2: Guess a letter";
    btn.innerHTML = "Guess and press enter";
  } else {
    resetUI();      
  }
  mainBlock.style.boxShadow = "none";
  mainBlock.style.transitionDuration = "0.3s"
  mainBlock.style.transition = "box-shadow 500ms";
}

//Change some UI elements to display comgratulations
function congrats() {
  var mainBlock = document.getElementById("main-content");
  var labl =  document.getElementById("fixed-label");
  labl.innerHTML = "Yeey, you won :D";
  var txtbox =  document.getElementById("secret-input");
  txtbox.placeholder = "Congrats!";
  var btn =  document.getElementById("proceed");
  btn.innerHTML = "Secret word was \"" + word + "\"";
  mainBlock.style.webkitAnimationDuration = "1.25s";
  mainBlock.style.animationDuration = "1.25"
  mainBlock.style.webkitAnimationName = "tada";
  mainBlock.style.animationName = "tada";
  var newElement = mainBlock.cloneNode(true);
  mainBlock.parentNode.replaceChild(newElement, mainBlock);
}