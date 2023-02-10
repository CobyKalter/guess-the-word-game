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
// Span in .remaining where reamining guesses will display
const remainingSpan = document.querySelector(".remaining span");
// Paragraph where messages will appear
const messages = document.querySelector(".message");
// Play again button
const playAgain = document.querySelector(".play-again");

// placeholder word
const word = "magnolia";
// Player guesses array
const guessedLetters = [];

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

// TROUBLESHOOT THIS SECTION //

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
letter.toUpperCase();
if (guessedLetters.includes(letter)) {
    messages.innerText = "You already guessed that letter. Please try again!"; //NOTE: this message is displaying for non-guessed letters
} else {
    guessedLetters.push(letter);
}
console.log(guessedLetters);
};