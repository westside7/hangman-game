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
    ['trumpet', 'musical instruments'],
    ['viola', 'musical instruments'],
    ['toyota', 'car brands'],
    ['acura', 'car brands'],
    ['lexus', 'car brands'],
    ['porsche', 'car brands'],
    ['honda', 'car brands'],
    ['tesla', 'car brands'],
    ['bentley', 'car brands'],
    ['ford', 'car brands'],
    ['ferrari', 'car brands'],
    ['hyundai', 'car brands'],
    ['lamborghini', 'car brands'],
    ['chevrolet', 'car brands'],
    ['mazda', 'car brands'],
  ];
  
  //********* Variables ***********//
  const MAX_WRONG_GUESS = 6;
  
  let wrongGuesses = 0;
  let guessedLetters = [];
  let currentWord;
  let wordCat;
  let count;
  
  const wordDisplay = document.querySelector(".word-display");
  const categoryDisplay = document.querySelector(".category b");
  const statusDisplay = document.querySelector(".status");
  const numGuesses = document.querySelector(".numGuesses b");
  const letterCollector = document.querySelector(".guessed-letters b");
  //const userInput = document.getElementbyId("input");
  
  //sees if the guess button has been pressed
  document.getElementById('guess').addEventListener('click', makeGuess);
  
  //sees if reset button has been pressed
  document.querySelector('#again').addEventListener('click', reset);
  
  //********** calling functions **********//
  init();
  
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
      count = 0;
  
      // calling from canvasCreator to reset drawing
      let {initialDrawing} = canvasCreator();
      // clear the canvas
      initialDrawing();
    
      update();
  }
  
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
              count++;
              incorrectGuesses++;
              numGuesses.innerText = incorrectGuesses;
              drawMan(count);
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
  
  function canvasCreator() {
      // canvas setup
      let context = canvas.getContext("2d");
      context.beginPath();
      context.strokeStyle = "#000";
      context.lineWidth = 2;
  
      // created function to draw line
      const drawLine = (xStart, yStart, xEnd, yEnd) => {
          context.moveTo(xStart, yStart);   // start
          context.lineTo(xEnd, yEnd);       // end
          context.stroke();                 // draw
      };
      // head
      const head = () => {
          context.beginPath();
          context.arc(70, 30, 10, 0, Math.PI*2, true);
          context.stroke();
      };
      // body
      const body = () => {
          drawLine(70, 40, 70, 80);
      };
      // left arm
      const leftArm = () => {
          drawLine(70, 50, 50, 70);
      };
      // right arm
      const rightArm = () => {
          drawLine(70, 50, 90, 70);
      };
      // left leg
      const leftLeg = () => {
          drawLine(70, 80, 50, 110);
      };
      // right leg
      const rightLeg = () => {
          drawLine(70, 80, 90, 110);
      };
      const initialDrawing = () => {
          // clear drawing
          context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  
      };
      // return the inner functions to be called elsewhere
      return {initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg};
  }
  
  function drawMan(count) {
        // call the inner functions from canvasCreator
      let {head, body, leftArm, rightArm, leftLeg, rightLeg} = canvasCreator();
      
      // using case statements to draw
      switch(count) {
          case 1: 
              head();
              break;
          case 2:
              body();
              break;
          case 3:
              leftArm();
              break;
          case 4:
              rightArm();
              break;
          case 5:
              leftLeg();
              break;
          case 6:
              rightLeg();
              break;
          default:
              break;
      }
  }