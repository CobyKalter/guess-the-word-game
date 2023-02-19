// ul element where player's guessed letters will appear
const guessedLettersPar = document.querySelector(".guessed-letters");
// Guess button
const guessButton = document.querySelector("button");
// Guess input text box
const guessInput = document.querySelector(".letter");
// Empty paragraph where word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
// Paragraph where remaining guesses is displayed
const guessesLeft = document.querySelector(".remaining");
// Span in .remaining where remaining guesses will display
const remainingSpan = document.querySelector(".remaining span");
// Paragraph where messages will appear
const messages = document.querySelector(".message");
// Play again button
const playAgain = document.querySelector(".play-again");


// placeholder word
let word = "magnolia";
// Player guesses array
const guessedLetters = [];
// Number of guesses
let remainingGuesses = 8;

// Words source file
const getWord = async function() {
 const words = await fetch (
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
 );
 const data = await words.text();
 // Creating an array from the words list
 const wordsArray = data.split("\n");
 // Grabbing a random word from the words list
 const randomIndex = Math.floor(Math.random()* wordsArray.length);
 const randomWord = wordsArray[randomIndex].trim();
 word = randomWord;
    
 console.log(data);
 hiddenLetter(word);
};

// Initiate game
getWord();


// hiding each letter of the word with ●
function hiddenLetter (word) {
   let placeholder = [];
   for (let letter of word) {
    console.log(letter);
    placeholder.push("●");
   }
wordInProgress.innerText = placeholder.join("");
};
hiddenLetter(word); 

// Event listener for guess button
guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    //Empty message paragraph
    messages.innerText = ""; 
    //Grab entered letter in input
    const guess = guessInput.value;
    //console.log(guess);
    // Verify single letter
    const letterCheck = inputVal(guess);
    // When a letter is a valid guess
    if (letterCheck) {
        // Let's guess a letter
        makeGuess(guess);
    }
    guessInput.value = "";
});


// Check the player's input - parameter is selecting the input
const inputVal = function (input) {
const acceptedLetter = /[a-zA-Z]/; //< regular expression
if (input.length === 0) {
    // When input is entered blank
    messages.innerText = "Please type a letter from A-Z";
} else if (input.length > 1 ) {
    // When more than one letter is inputted
    messages.innerText = "Please type only 1 letter";
} else if (!input.match(acceptedLetter)) {
    // When characters that are not letters are inputted
    messages.innerText = "Only letters are accepted";
} else {
return input;
}
};

// Capturing input
const makeGuess = function (letter) {
letter = letter.toUpperCase(); // makes input display as uppercase
if (guessedLetters.includes(letter)) {
    messages.innerText = "You already guessed that letter. Please try again!"; //NOTE: this message is displaying for non-guessed letters
} else {
    guessedLetters.push(letter);
    guessDisplay(letter);
    console.log(guessedLetters);
    remGuessCount(letter);
    updateWordInProgress(guessedLetters);
}
};

// Show guessed letters
const guessDisplay = function () {
guessedLettersPar.innerHTML = "";
guessedLetters.forEach(function (letter) {
let li = document.createElement("li");
li.innerHTML = letter;
guessedLettersPar.append(li);
}
)
};

//Update Word in progress
const updateWordInProgress = function (guessedLetters) {
 const wordUpper = word.toUpperCase();
 const wordArray = wordUpper.split("");
 const revealWord = [];
 // Matching guessed letters to answer and revealing answer
 for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
    revealWord.push(letter.toUpperCase());
    } else {
    revealWord.push("●");
    }
 } 
// console.log(wordArray); 
wordInProgress.innerText = revealWord.join("");
winner();
};

// Counting guesses remaining
const remGuessCount = function(guess) {
    const wordUpper = word.toUpperCase();
    if (!wordUpper.includes(guess)) {
        messages.innerText = "Sorry that letter is not in the word";
        remainingGuesses = remainingGuesses - 1;
    } else {
        messages.innerText = "Hooray you guessed a correct letter!";
    }
    if (remainingGuesses === 0) {
        messages.innerHTML = `Sorry you have run out of guesses. The correct answer is ${word.toUpperCase()}. <br> GAME OVER`;
        remainingSpan.innerText = "0 guesses";
    } else if (remainingGuesses === 1) {
        remainingSpan.innerText = "1 guess";
    } else {
        remainingSpan.innerText = `${remainingGuesses} guesses`;
    }
}

// Check if player has won
const winner = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        messages.classList.add("win");
        messages.innerHTML = `<p class="highlight"> You guessed the correct word! Congrats! </p>`;
}
}
