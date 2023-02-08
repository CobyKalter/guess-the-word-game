// ul element where player's guessed letters will appear
const guessedLetters = document.querySelector(".guessed-letters");
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
    const guess = guessInput.value;
    console.log(guess);
    guessInput.value = "";
});