// Letters
const letters = "qwertyuiopasdfghjklzxcvbnm";

// Get Array From Letters
let lettersArray = Array.from(letters);

// Select Letters Container
let lettersContainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach((letter) => {
  // Create Span
  let span = document.createElement("span");

  // Create Letter Text Node
  let theLetter = document.createTextNode(letter);

  // Append the letter to the Span
  span.appendChild(theLetter);

  // Add class to the span
  span.className = "letter-box";

  // Append Span to the letters Container
  lettersContainer.appendChild(span);
});

// Objects of words + Categories

const words = {
  programming: [
    "Variable",
    "Function",
    "Algorithm",
    "Loop",
    "Array",
    "Object",
    "Compiler",
    "Syntax",
    "Debugging",
    "Framework",
  ],
  movies: [
    "The Godfather",
    "Pulp Fiction",
    "The Dark Knight",
    "Inception",
    "Forrest Gump",
    "The Matrix",
    "Titanic",
  ],
  people: [
    "Ethan",
    "Olivia",
    "Aarav",
    "Sophia",
    "Haruto",
    "Chijioke",
    "Anastasia",
    "Jiyeon",
    "William",
    "Valentina",
  ],
  countries: [
    "United States",
    "United Kingdom",
    "India",
    "Brazil",
    "Japan",
    "Nigeria",
    "Russia",
    "South Korea",
    "Australia",
    "Mexico",
  ],
};

// Get Random Property

let allKeys = Object.keys(words);

// Random Number Depends on Keys Length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);

// Category
let randomPropName = allKeys[randomPropNumber];

// Category Words
let randomPropValue = words[randomPropName];

// Random Number Depends on Words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

// Chosen Word
let randomValueValue = randomPropValue[randomValueNumber];

// Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// Select Letters Guess Element
let lettersGuessContainer = document.querySelector(".letters-guess");

// Convert Chosen word to Array
let lettersAndSpace = Array.from(randomValueValue);

// Create Spans depend on word
lettersAndSpace.forEach((letter) => {
  // Create Empty Span
  let emptySpan = document.createElement("span");
  // if letter is space
  if (letter === " ") {
    // Add Class to the span
    emptySpan.className = "with-space";
  }

  // Append span to the lettersGuessContainer
  lettersGuessContainer.appendChild(emptySpan);
});

// Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// Set Wrong Attempts
let wrongAttempts = 0;

// Select the Draw Element
let theDraw = document.querySelector(".hangman-draw");

// Handle Clicking On Letters
document.addEventListener("click", (e) => {
  // Set Status
  let theStatus = false;
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    // Get Clicked Letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();

    // The Chosen Word
    let theChosenWord = Array.from(randomValueValue.toLowerCase());

    theChosenWord.forEach((wordLetter, wordIndex) => {
      // If the Clicked Letter Equal to One of the chosen word letter
      if (theClickedLetter == wordLetter) {
        // Set Status to Correct
        theStatus = true;

        // Loop On All Guess Spans
        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
          }
        });
      }
    });

    // If letter is Wrong
    if(theStatus !== true) {
      // Increase the wrong Attempts
      wrongAttempts++;

      // Add class Wrong on the Draw Element
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      // Play Fail Sound
      document.getElementById("fail").play();

      if(wrongAttempts === 8) {
        endGame();

        lettersContainer.classList.add("finished");
      }
    } else {
      // Play Success Sound
      document.getElementById("success").play();
    }
  }
});

// End Game Function
function endGame() {
  // Create popup Div

  let div = document.createElement("div");

  // Create Text
  let divText = document.createTextNode(`Game Over, The word is ${randomValueValue}`);

  // Append text to the div
  div.appendChild(divText);

  // Add class On Div
  div.className = "popup";

  // Append to the body
  document.body.appendChild(div);
}
