var startContainer = document.querySelector(".start-container");
var startGame = document.querySelector(".start-game");
var pararapgh = document.querySelector("#paragraph");
var startButton = document.querySelector(".start-quiz-button");
var buttonsDiv = document.querySelector(".special-buttons");
var mainTitle = document.querySelector(".main-title");
var timerEl = document.querySelector("#new-time");
var button1 = document.querySelector(".button-1");
var button2 = document.querySelector(".button-2");
var button3 = document.querySelector(".button-3");
var button4 = document.querySelector(".button-4");
var scoreString = document.querySelector(".final-score");
var numScore = document.querySelector("#total-score");
var line = document.querySelector("#line");
var answer = document.querySelector("#answer");
var submitForm = document.querySelector(".submit-form");
var submitButton = document.querySelector("#submit-button");
var highScoresList = document.querySelector("#scores-list");
var menuBar = document.querySelector(".menu-bar");
var highScoreCard = document.querySelector(".high-score-container");
var highScoreButton = document.querySelector(".high-scores-button");
var goBackButton = document.querySelector("#go-back");

//pseudo
//step 1: create an array of question objects
var currentIndex = 0;
var score = 0;
var questionsArray = [
  {
    title: "Commonly Used Data Types Do not include",
    button1: ["1.Strings", "Wrong"],
    button2: ["2.Booleans", "Wrong"],
    button3: ["3.Alerts", "Correct"],
    button4: ["4.Numbers", "Wrong"],
  },
  {
    title: "The Condition in an if/else statement is enclosed with _________ ",
    button1: ["1.Quotes", "Wrong"],
    button2: ["2.Curly Brackets", "Correct"],
    button3: ["3.Parenthesis", "Wrong"],
    button4: ["4.Square Brackets", "Wrong"],
  },
  {
    title: "Arrays in JavaScript can be used to store _________ ",
    button1: ["1.Numbers and Strings", "Wrong"],
    button2: ["2.Other arrays", "Wrong"],
    button3: ["3.Booleans", "Wrong"],
    button4: ["4.All of the Above", "Correct"],
  },
  {
    title:
      "String value must be enclosed within _________ when being assigned to values",
    button1: ["1.Commas", "Wrong"],
    button2: ["2.Curly Brackets", "Wrong"],
    button3: ["3.Quotes", "Correct"],
    button4: ["4.Parenthesis", "Wrong"],
  },
  {
    title:
      "A very useful tool used during development and debugging for printing content to the debugger is: ",
    button1: ["1.JavaScript", "Wrong"],
    button2: ["2.Terminal/Bash", "Wrong"],
    button3: ["3.For Loops", "Wrong"],
    button4: ["4.Console Log", "Correct"],
  },
];
//------------------------------Update the Page Function--------------------------------------------------------
function updatePage() {
  //update the page as long as we are not on the last question
  if (currentIndex < questionsArray.length) {
    mainTitle.textContent = questionsArray[currentIndex].title;
    button1.textContent = questionsArray[currentIndex].button1[0];
    button2.textContent = questionsArray[currentIndex].button2[0];
    button3.textContent = questionsArray[currentIndex].button3[0];
    button4.textContent = questionsArray[currentIndex].button4[0];
  } else {
    //if we've reached the last quesiton display "All Done"
    startButton.setAttribute("style", "display:none");
    buttonsDiv.setAttribute("style", "display: none");
    pararapgh.setAttribute("style", "display:none");
    mainTitle.textContent = "All Done!";
    scoreString.setAttribute("style", "display:block");
    submitForm.setAttribute("style", "display: block");
    numScore.textContent = score;
  }
}
//-----------------------Show the High Scores ----------------------------
function showHighScores() {
  var menuBar = document.querySelector(".menu-bar");
  highScoreCard.setAttribute("style", "display:block");
  menuBar.setAttribute("style", "display:none");
  startContainer.setAttribute("style", "display:none");

  //create two buttons
}
function startAgain() {
  score = 0;
  startContainer.setAttribute("style", "display:block");
  line.setAttribute("style", "display:none");
  answer.setAttribute("style", "display:none");
  submitForm.setAttribute("style", "display:none");
  mainTitle.textContent = "Coding Quiz";
  menuBar.setAttribute("style", "display:flex");
  startButton.setAttribute("style", "display:block");
  pararapgh.setAttribute("style", "display:block");
  scoreString.setAttribute("style", "display:none");
  highScoreCard.setAttribute("style", "display:none");
  currentIndex = 0;
}

//--------------------------Timer Global Variables -------------------------------
var penaltyApplied = false;
var timeInterval;
//---------------------------Timer function -------------------------------------
function countdown() {
  var timeLeft = 74;
  // //this will keep track of when the user has clicked wrong
  // var penaltyApplied = false;
  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  timeInterval = setInterval(function () {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1 && currentIndex < questionsArray.length) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      timerEl.textContent = timeLeft;
      //if user is wrong but doesn't have a penalty already then apply a penalty
      if (answer.textContent == "Wrong" && !penaltyApplied) {
        //decrement by 10
        timeLeft -= 10;
        penaltyApplied = true;
        console.log("Penalty applied");
      } else if (answer.textContent == "Correct") {
        penaltyApplied = false;
      }
      // Decrement `timeLeft` by 1
      timeLeft--;
    } else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      timerEl.textContent = timeLeft;
      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
    }
  }, 1000);
}
//-------------------Calculate Score-------------------
function calculateScore() {
  if (answer.textContent == "Correct") {
    score += 10;
  }
}
//----------------------------------------------------EVENT LISTENERS ------------------------------------------------------------------------------
startButton.addEventListener("click", function () {
  timerEl.textContent = 75;
  countdown();
  mainTitle.textContent = questionsArray[currentIndex].title;
  buttonsDiv.setAttribute("style", "display:block");
  startButton.setAttribute("style", "display:none");
  pararapgh.setAttribute("style", "display:none");
  updatePage();
});

button1.addEventListener("click", function () {
  line.setAttribute("style", "display:block");
  answer.setAttribute("style", "display:block");
  answer.textContent = questionsArray[currentIndex].button1[1];
  calculateScore();
  currentIndex++;
  penaltyApplied = false;
  updatePage();
});

button2.addEventListener("click", function () {
  line.setAttribute("style", "display:block");
  answer.setAttribute("style", "display:block");
  answer.textContent = questionsArray[currentIndex].button2[1];
  calculateScore();
  currentIndex++;
  penaltyApplied = false;
  updatePage();
});
button3.addEventListener("click", function () {
  line.setAttribute("style", "display:block");
  answer.setAttribute("style", "display:block");
  answer.textContent = questionsArray[currentIndex].button3[1];
  calculateScore();
  currentIndex++;
  penaltyApplied = false;
  updatePage();
});
button4.addEventListener("click", function () {
  line.setAttribute("style", "display:block");
  answer.setAttribute("style", "display:block");
  answer.textContent = questionsArray[currentIndex].button4[1];
  calculateScore();
  currentIndex++;
  penaltyApplied = false;
  updatePage();
});
submitButton.addEventListener("click", function (event) {
  showHighScores();
  event.preventDefault();
  var initials = document.querySelector("#initials");

  var highScoreObject = {
    score: score,
    userInitials: initials.value,
  };

  //save multiple highScoreObject in LocalStorage
  // 1. Retrieve existing high scores from local storage
  var highScores;
  var storedHighScores = localStorage.getItem("highScores");

  if (storedHighScores) {
    highScores = JSON.parse(storedHighScores);
  } else {
    //empty array is assigned to high scores
    highScores = [];
  }

  // Add the new high score to the array
  highScores.push(highScoreObject);

  // Save the updated high scores back to local storage
  localStorage.setItem("highScores", JSON.stringify(highScores));
});
highScoreButton.addEventListener("click", function () {
  showHighScores();
});
goBackButton.addEventListener("click", function () {
  startAgain();
});

//Things to do:
//2. Make Sure the highest score button at the top left works
// highScoresHereButton.eventListener("click", function){
//   renderhighScores();
//}
//3. Output the  High Scores page with 2 buttons
// one button takes you to the beginnign and the other clears the all high scores
//
