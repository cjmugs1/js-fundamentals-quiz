// get all necessary elements into script

// make an interval function that displays to the timer

// create an onclick listener for start quiz. this should set the start screen visibility to none, and bring up the first question of the quiz.

// create an onclick listener for show results. this should show the list of total results.

// window.location.href="/high-scores.html";

// Identify all the needed elements from the DOM and add in any other relevant global variables near them.

// Header elements
var header = document.querySelector(".header");
var viewScoresBtn = document.querySelector("#view-scores-btn");
var timerCount = document.querySelector("#timer-count");

// Start Screen
var startScreen = document.querySelector(".start-screen");
var startBtn = startScreen.querySelector("#start-btn");
var displayNumQuizQuestions = startScreen.querySelector(
  "#display-num-quiz-questions"
);
var timeForQuiz = startScreen.querySelector("#time-for-quiz");

// Quiz
var quizScreens = document.querySelector(".quiz");

var quizQuestion = quizScreens.querySelector("#quiz-question");

var quizOptionBox = quizScreens.querySelector(".question-options");
var quizOption1 = quizScreens.querySelector("#option-1");
var quizOption2 = quizScreens.querySelector("#option-2");
var quizOption3 = quizScreens.querySelector("#option-3");
var quizOption4 = quizScreens.querySelector("#option-4");

var userSelectionResult = document.querySelector("#user-selection-result");

// Results Screen
var quizResultsScreen = document.querySelector(".quiz-results");
var finalScore = quizResultsScreen.querySelector("#final-score");

var userInitials = quizResultsScreen.querySelector("#user-initials");
var saveScoreBtn = quizResultsScreen.querySelector("#save-score-btn");
var tryAgainBtn = quizResultsScreen.querySelector("#try-again-btn");

// Create necessary global variables
var quizData = [
  {
    question: "What are the 3 logical operators?",
    answers: [
      "&& [and] , || [or] , ! [not]",
      "!= [not] , !! [or] , && [and]",
      "&| [and or] , if ! [if not] , || [and]",
      "|| [or] , !! [not] , & [and]",
    ],
    correctAnswerIndex: 0,
  },

  {
    question: "Each element in array has a numbered position know as its...",
    answers: ["element", "index", "object-value", "attribute"],
    correctAnswerIndex: 1,
  },

  {
    question: "What does the .unshift() method do?",
    answers: [
      "Re-verses the order of an array.",
      "Adds an element to the end of the array. ",
      "Moves an element at the end of an array to the beginning.",
      "Adds an element to the beginning of the array.",
    ],
    correctAnswerIndex: 3,
  },

  {
    question: "What is a global variable",
    answers: [
      "A variable that is written in every language.",
      "A variable that can be accessed anywhere in your code.",
      "A variable defined within a function.",
      "A variable that sits in your root directory.",
    ],
    correctAnswerIndex: 1,
  },

  {
    question: "What function do we need to call to save objects to local storage?",
    answers: [
      "JSON.parse()",
      "JSON.save()",
      "JSON.setItem()",
      "JSON.stringify()",
    ],
    correctAnswerIndex: 3,
  },
];

timeRemaining = 50;
timerCount.textContent = timeRemaining;

timeForQuiz.textContent = timeRemaining.toString();
displayNumQuizQuestions.textContent = quizData.length.toString();

var currentQuestionNumber = 0;

var userScore = 0;

var quizScreenDelay = 500;

// make a function which sets the variables back to their initialized values
function resetVariables() {
  timeRemaining = 50;
  currentQuestionNumber = 0;
  quizScreenDelay = 500;
  userScore = 0;
}

// Make view scores button take you to high-scores page
viewScoresBtn.addEventListener("click", function () {
  window.location.href = "./high-scores.html";
});

// Create timer function
function setTime() {
  var timerInterval = setInterval(function () {
    timeRemaining--;
    timerCount.textContent = timeRemaining;

    if (timeRemaining < 10) {
      timerCount.style.color = "red";
    }

    if (timeRemaining === 0 || currentQuestionNumber > quizData.length - 1) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      quizScreens.style.display = "none";
      generateQuizResults();
    }
  }, 1000);
}

// Create event listener for start button, hide start screen show quiz screen.
startBtn.addEventListener("click", function () {
  resetVariables();
  setTimeout(function () {
    startScreen.style.display = "none";
    quizResultsScreen.style.display = "none";
    quizScreens.style.display = "block";
    viewScoresBtn.style.display = "none";
    header.style.justifyContent = "center";
  }, 500);

  setTimeout(setTime(), quizScreenDelay);
  createQuizScreen();
});

function createQuizScreen() {
  // check if we have not exceeded the number of questions in our quizData array. if we have not, create
  // screen, otherwise, wait the delay time then go to the quiz results screen.
  if (currentQuestionNumber <= quizData.length - 1) {
    setTimeout(function () {
      userSelectionResult.textContent = "";

      quizQuestion.textContent = quizData[currentQuestionNumber].question;

      quizOption1.style.backgroundColor = "#fff";
      quizOption2.style.backgroundColor = "#fff";
      quizOption3.style.backgroundColor = "#fff";
      quizOption4.style.backgroundColor = "#fff";

      quizOption1.textContent = quizData[currentQuestionNumber].answers[0];
      quizOption2.textContent = quizData[currentQuestionNumber].answers[1];
      quizOption3.textContent = quizData[currentQuestionNumber].answers[2];
      quizOption4.textContent = quizData[currentQuestionNumber].answers[3];

      quizOptionBox.style.pointerEvents = "all";
    }, quizScreenDelay);

    quizOption1.dataset.answerStatus = "";
    quizOption2.dataset.answerStatus = "";
    quizOption3.dataset.answerStatus = "";
    quizOption4.dataset.answerStatus = "";

    var correctAnswer = quizData[currentQuestionNumber].correctAnswerIndex;

    if (correctAnswer === 0) {
      quizOption1.dataset.answerStatus = "correct";
    } else if (correctAnswer === 1) {
      quizOption2.dataset.answerStatus = "correct";
    } else if (correctAnswer === 2) {
      quizOption3.dataset.answerStatus = "correct";
    } else if (correctAnswer === 3) {
      quizOption4.dataset.answerStatus = "correct";
    }

    quizScreenDelay = 2000;
  } else {
    setTimeout(function () {
      userSelectionResult.textContent = "";
      quizScreens.style.display = "none";
      generateQuizResults();
    }, quizScreenDelay);
  }
}

// Set event listener for the quiz options, needs to check whether answer is correct or incorrect.
// set background of clicked element, show the appropriate icon in the box, and set header footer
// and remove time if necessary
// then change the question number index and set timeout call the function that takes in the question number
// index to change the values of the quiz question and options
quizOptionBox.addEventListener("click", function (event) {
  var element = event.target;

  if (!element.matches(".answer")) {
    return;
  }

  quizOption1.style.backgroundColor = "#fff";
  quizOption2.style.backgroundColor = "#fff";
  quizOption3.style.backgroundColor = "#fff";
  quizOption4.style.backgroundColor = "#fff";

  if (element.dataset.answerStatus === "correct") {
    element.style.backgroundColor = "#fcd9c3";
    quizOptionBox.style.backgroundColor = "#fff";
    userScore += 10;
    userSelectionResult.textContent = "Correct! ";
    var correctIcon = document.createElement("i");
    correctIcon.classList.add("bi-check-circle");
    userSelectionResult.append(correctIcon);
    quizOptionBox.style.pointerEvents = "none";
  } else {
    element.style.backgroundColor = "#fcd9c3";
    quizOptionBox.style.backgroundColor = "#fff";
    timeRemaining -= 10;
    timerCount.style.color = "red";
    setTimeout(function () {
      timerCount.style.color = "black";
    }, 500);
    userSelectionResult.textContent = "Incorrect ";
    var incorrectIcon = document.createElement("i");
    incorrectIcon.classList.add("bi-x-circle");
    userSelectionResult.append(incorrectIcon);
    quizOptionBox.setAttribute("style", "pointer-events: none;");
  }
  currentQuestionNumber += 1;
  createQuizScreen();
});

function generateQuizResults() {
  if (timeRemaining < 0) {
    timerCount.textContent = "0";
  }
  quizResultsScreen.style.display = "block";
  finalScore.textContent = userScore;
}

saveScoreBtn.addEventListener("click", function () {
  var userInputInitials = userInitials.value.trim();
  if (userInputInitials === "") {
    window.alert("Please put in your initials!");
  } else {
    var userScoreData = JSON.parse(localStorage.getItem("userScoreData"));
    userScoreData.push(userInputInitials + " - " + userScore);
    localStorage.setItem("userScoreData", JSON.stringify(userScoreData));
    window.location.href = "./high-scores.html";
  }
});

function resetStartScreen() {
  timerCount.textContent = timeRemaining;
  timerCount.style.color = "";
  quizResultsScreen.style.display = "none";
  startScreen.style.display = "block";
  viewScoresBtn.style.display = "";
  header.style.justifyContent = "";
}

// Create event listener for try again button
tryAgainBtn.addEventListener("click", function () {
  setTimeout(function () {
    resetVariables();
    resetStartScreen();
  }, 500);
});
