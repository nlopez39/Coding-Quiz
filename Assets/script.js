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
var initials = document.querySelector("#initials");
var submitButton = document.querySelector("#submit-button");
var highScoresList = document.querySelector("#scores-list");
var menuBar = document.querySelector(".menu-bar");
var highScoreCard = document.querySelector(".high-score-container");
var highScoreButton = document.querySelector(".high-scores-button");
var goBackButton = document.querySelector("#go-back");
var clearScoresButton = document.querySelector("#clear-scores");

//pseudo
//step 1: create an array of question objects
var currentIndex = 0;
var score = 0;
var highScores = [];
var questionsArray = [
  {
    title: "Commonly Used Data Types Do not include",
    button1: ["1.Strings", "Wrong"],
    button2: ["2.Booleans", "Wrong"],
    button3: ["3.Alerts", "Correct"],
    button4: ["4.Numbers", "Wrong"],
  },
  {
    title: "The Condition in an if/else statement is enclosed with _________. ",
    button1: ["1.Quotes", "Wrong"],
    button2: ["2.Curly Brackets", "Correct"],
    button3: ["3.Parenthesis", "Wrong"],
    button4: ["4.Square Brackets", "Wrong"],
  },
  {
    title: "Arrays in JavaScript can be used to store _________. ",
    button1: ["1.Numbers and Strings", "Wrong"],
    button2: ["2.Other arrays", "Wrong"],
    button3: ["3.Booleans", "Wrong"],
    button4: ["4.All of the Above", "Correct"],
  },
  {
    title:
      "String value must be enclosed within________when being assigned to values",
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
var onQuiz = false;
//------------------------------Update the Page Function--------------------------------------------------------
function updatePage() {
  //update the page as long as we are not on the last question
  if (timeLeft > 0 && currentIndex < questionsArray.length) {
    onQuiz = true;
    mainTitle.textContent = questionsArray[currentIndex].title;
    button1.textContent = questionsArray[currentIndex].button1[0];
    button2.textContent = questionsArray[currentIndex].button2[0];
    button3.textContent = questionsArray[currentIndex].button3[0];
    button4.textContent = questionsArray[currentIndex].button4[0];
  } else if (timeLeft <= 0 || currentIndex == questionsArray.length) {
    //if we've reached the last quesiton display "All Done" or the timer is done
    onQuiz = false;
    startButton.setAttribute("style", "display:none");
    buttonsDiv.setAttribute("style", "display:none");
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
  //clear existing list items before appending new ones
  highScoresList.innerHTML = "";
  var counter = 0;
  for (var i = 0; i < highScores.length; i++) {
    var scorefromStorage = highScores[i].score;
    var initialStorage = highScores[i].userInitials;

    var li = document.createElement("li");
    counter++;
    li.textContent =
      counter + " . " + initialStorage + " - " + scorefromStorage;
    li.setAttribute("data-index", i);

    highScoresList.appendChild(li);
  }
}
function init() {
  var storedItems = JSON.parse(localStorage.getItem("highScores"));

  if (storedItems !== null) {
    highScores = storedItems;
  }

  showHighScores();
}
//------------------------Clear Scores Function--------------------
function clearScores() {
  //empty the array of scores
  highScores = [];

  //save empty array to localStorage
  localStorage.setItem("highScores", JSON.stringify(highScores));
  //clear the highlistScores list on the page
  highScoresList.innerHTML = "";

  // Optionally, hide the high scores container
  // highScoreCard.setAttribute("style", "display:none");
}
//-----------------------START AGain function ----------------------

function startAgain() {
  score = 0;
  timerEl.textContent = 0;
  timeLeft = 74;

  startContainer.setAttribute("style", "display:block");
  line.setAttribute("style", "display:none");
  answer.setAttribute("style", "display:none");
  submitForm.setAttribute("style", "display:none");
  mainTitle.textContent = "Coding Quiz Challenge";
  menuBar.setAttribute("style", "display:flex");
  startButton.setAttribute("style", "display:block; margin:auto");
  pararapgh.setAttribute("style", "display:block");
  scoreString.setAttribute("style", "display:none");
  highScoreCard.setAttribute("style", "display:none");
  currentIndex = 0;
}

//--------------------------Timer Global Variables -------------------------------
var penaltyApplied = false;
var timeInterval;
var timeLeft = 74;
//---------------------------Timer function -------------------------------------
function countdown() {
  // //this will keep track of when the user has clicked wrong

  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  timeInterval = setInterval(function () {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft >= 0 && currentIndex < questionsArray.length) {
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
      if (timeLeft > 0) {
        timerEl.textContent = timeLeft;
      } else {
        timerEl.textContent = 0;
      }
      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
      console.log(timeLeft);
      updatePage();
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
  buttonsDiv.setAttribute("style", "display:flex");
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
var highScores;
submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  // showHighScores();
  var initials = document.querySelector("#initials");

  var highScoreObject = {
    score: score,
    userInitials: initials.value,
  };

  //save multiple highScoreObject in LocalStorage
  // 1. Retrieve existing high scores from local storage

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
  init();
});

highScoreButton.addEventListener("click", function () {
  init();
  if (onQuiz) {
    clearInterval(timeInterval);
    buttonsDiv.setAttribute("style", "display:none");
  }
});

goBackButton.addEventListener("click", function () {
  startAgain();
});
clearScoresButton.addEventListener("click", function () {
  clearScores();
});

//Things to do:
//1. Add CSS
//2. Write the README
