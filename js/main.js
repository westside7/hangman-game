//*************** word list *************//
const wordBank = [    
    ['orange', 'fruits'],
    ['guava', 'fruits'],
    ['strawberry', 'fruits'],
    ['banana', 'fruits'],
    ['watermelon', 'fruits'],
    ['kiwi', 'fruits'],
    ['apple', 'fruits'],
    ['badminton', 'sports'],
    ['basketball', 'sports'],
    ['soccer', 'sports'],
    ['football', 'sports'],
    ['pickleball', 'sports'],
    ['baseball', 'sports'],
    ['tennis', 'sports'],
    ['hockey', 'sports'],
    ['flute', 'musical instruments'],
    ['violin', 'musical instruments'],
    ['piano', 'musical instruments'],
    ['guitar', 'musical instruments'],
    ['cello', 'musical instruments'],
    ['harp', 'musical instruments'],
    ['clarinet', 'musical instruments'],
    ['trumpet', 'musical instruments']
];

//********* Variables ***********//
const MAX_WRONG_GUESS = 6;
let wrongGuesses = 0;
let guessedLetters = [];
let currentWord;
let wordCat;

const wordDisplay = document.querySelector(".word-display");
const categoryDisplay = document.querySelector(".category b");
const statusDisplay = document.querySelector(".status");
const numGuesses = document.querySelector(".numGuesses b");
const letterCollector = document.querySelector(".guessed-letters b");

//sees if the guess button has been pressed
document.getElementById('guess').addEventListener('click', makeGuess);

//sees if reset button has been pressed
document.querySelector('#again').addEventListener('click', reset);


// ********* functions ***********//

function init() {
    const idx = Math.floor(Math.random() * wordBank.length);

    //assign word to current word
    currentWord = wordBank[idx][0];
    //assign the category to wordCat
    wordCat = wordBank[idx][1];

    //init vars
    guessedLetters = [];
    incorrectGuesses = 0;

    update();
}
init();

function update() {
    wordDisplay.innerHTML = '';
    categoryDisplay.innerHTML = wordCat.toUpperCase();

    // for each letter, place a _
    currentWord.split('').forEach(letter => {
        if (guessedLetters.includes(letter)) {
            wordDisplay.innerHTML += letter + ' ';
        } else {
            wordDisplay.innerHTML += '_ ';
        }
    });

    // determines if won
    if (incorrectGuesses === MAX_WRONG_GUESS) {
        statusDisplay.innerHTML = `Evil snowman will rule the world! The word was ${currentWord}`;
    } else if (wordDisplay.innerHTML === currentWord.split('').join(' ') + ' ') {
        statusDisplay.innerHTML = 'Evil snowman self-destructed';
    } else {
        statusDisplay.innerHTML = '';
    }
}

function makeGuess() {
    //get value from the letter inputted
    const letter = document.querySelector("input").value.toLowerCase();
    //document.querySelector("input").value = '';
    
    //push the guessed letters to the array and display it
    if (!guessedLetters.includes(letter)) {
        guessedLetters.push(letter);
        letterCollector.innerText = guessedLetters;

        // if the letter is not in the word, increase incorrectGuess and display it
        if (!currentWord.includes(letter)) {
            incorrectGuesses++;
            numGuesses.innerText = incorrectGuesses;
        }
    }

    update();
}

// if user wants to reset game
function reset() {
    // remove the guessed letterse
    while(guessedLetters.length != 0) {
        guessedLetters.pop();
    }
    // display it
    letterCollector.innerText = guessedLetters;

    //set incorrectGuesses to 0 and display it
    incorrectGuesses = 0;
    numGuesses.innerText = incorrectGuesses;

    //start a new game
    init();
}