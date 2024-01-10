var startContainer = document.querySelector(".start-container");
var pararapgh = document.querySelector("#paragraph");
var startButton = document.querySelector(".start-quiz-button");
var buttonsDiv = document.querySelector(".special-buttons");
var mainTitle = document.querySelector(".main-title");
var button1 = document.querySelector(".button-1");
var button2 = document.querySelector(".button-2");
var button3 = document.querySelector(".button-3");
var button4 = document.querySelector(".button-4");
var scoreString = document.querySelector(".final-score");
var numScore = document.querySelector("#total-score");
var line = document.querySelector("#line");
var answer = document.querySelector("#answer");
var submitBox = document.querySelector("submit-form");
var initialsBox = document.querySelector("#initials");

//pseudo
//step 1: create an array of question objects
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
//Step2: Create a function that will update the page
function updatePage() {
  mainTitle.textContent = questionsArray[currentIndex].title;
  button1.textContent = questionsArray[currentIndex].button1[0];
  button2.textContent = questionsArray[currentIndex].button2[0];
  button3.textContent = questionsArray[currentIndex].button3[0];
  button4.textContent = questionsArray[currentIndex].button4[0];
}

//current index var
var currentIndex = 0;

startButton.addEventListener("click", function () {
  mainTitle.textContent = questionsArray[currentIndex].title;
  buttonsDiv.setAttribute("style", "display:block");
  startButton.setAttribute("style", "display:none");
  pararapgh.setAttribute("style", "display:none");
  updatePage();
});

button1.addEventListener("click", function () {
  line.setAttribute("style", "display:block");
  answer.textContent = questionsArray[currentIndex].button1[1];
  currentIndex++;
  updatePage();
});

button2.addEventListener("click", function () {
  line.setAttribute("style", "display:block");
  answer.textContent = questionsArray[currentIndex].button2[1];
  currentIndex++;
  updatePage();
});
button3.addEventListener("click", function () {
  line.setAttribute("style", "display:block");
  answer.textContent = questionsArray[currentIndex].button3[1];
  currentIndex++;
  updatePage();
});
button4.addEventListener("click", function () {
  line.setAttribute("style", "display:block");
  answer.textContent = questionsArray[currentIndex].button4[1];
  currentIndex++;
  console.log(currentIndex);
  updatePage();
});

//figure out what to do when you get to the last question:
if (currentIndex == 4) {
  startButton.setAttribute("style", "display:none");
  pararapgh.setAttribute("style", "display:none");
  mainTitle.textContent = "All Done!";
  scoreString.setAttribute("style", "display:block");
  numScore.textContent = score;
  submitBox.setAttribute("style", "display: block");
  //change this to make it into a local storage item and to listen for user input
  initialsBox.textContent = "NL";
}
