// PSEUDO CODE:

// get all necessary elements from the DOM into the script as variables

// make an interval function that displays to the timer

// create an onclick listener for start quiz. this should set the start screen visibility to none, and bring up the first question of the quiz.

// the quiz screen should be dynamically generated from objects in an array

// the answer elements should be labelled as correct or incorrect, so that when the user clicks the correct answer, Correct! is displayed, and their score increases by 10 

// if they are incorrect we want to penalize their time by 10.

// if the time reaches zero or the user answers all questions we should generate a results screen that shows their score

// to save the initials and score we need to add them to an array, and save that array locally. 

// when the high scores screen loads it should dynamically generate the high scores list using the array from local storage



// Identify all the needed elements from the DOM and add in any other relevant global variables near them.

// Header elements
var header = document.querySelector(".header");
var viewScoresBtn = document.querySelector("#view-scores-btn");
var timerCount = document.querySelector("#timer-count");

// Start Screen
var startScreen = document.querySelector(".start-screen");
var startBtn = startScreen.querySelector("#start-btn");
var displayNumQuizQuestions = startScreen.querySelector("#display-num-quiz-questions");
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



// Create our necessary global variables
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

// sets the time time and question numbers in the quiz rules box dynamically
timeForQuiz.textContent = timeRemaining.toString();
displayNumQuizQuestions.textContent = quizData.length.toString();

var currentQuestionNumber = 0;

var userScore = 0;

// sets the initial delay for creating the quiz screen, used on the start quiz button
var quizScreenDelay = 500;



// Make view the scores button take you to the high-scores page
viewScoresBtn.addEventListener("click", function () {
    window.location.href = "./high-scores.html";
  });


// make a function which sets the global variables back to their initialized values
function resetVariables() {
    timeRemaining = 50;
    currentQuestionNumber = 0;
    quizScreenDelay = 500;
    userScore = 0;
  }

// Create timer function
function setTime() {
  var timerInterval = setInterval(function () {
    timeRemaining--;
    timerCount.textContent = timeRemaining;

    if (timeRemaining < 10) {
      timerCount.style.color = "red";
    }

    // if the time remaining is 0 or the user clicks the last question, stop the interval and show the results
    if (timeRemaining === 0 || currentQuestionNumber > quizData.length - 1) {
      clearInterval(timerInterval);
      quizScreens.style.display = "none";
      generateQuizResults();
    }
  }, 1000);
}

// Create event listener for start button
startBtn.addEventListener("click", function () {
// first we reset our global variables for the quiz section
  resetVariables();
//   after a delay, we set the start screen to hidden, center the time, start the timer, and call the create quiz function.
  setTimeout(function () {
    startScreen.style.display = "none";
    quizResultsScreen.style.display = "none";
    quizScreens.style.display = "block";
    viewScoresBtn.style.display = "none";
    header.style.justifyContent = "center";
    setTime()
    createQuizScreen();
  }, quizScreenDelay);
  
});

function createQuizScreen() {
  // check if we have not exceeded the number of questions in our quizData array. if we have not, create
  // screen, otherwise, wait the delay time then go to the quiz results screen.
  if (currentQuestionNumber <= quizData.length - 1) {
    // until line 206, we are resetting the quiz screen (setting backgrounds back to white)
    // setting the quiz question(line 189), and options (lines 196-199). clearing answer statuses
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

    quizOption1.dataset.answerStatus = "";
    quizOption2.dataset.answerStatus = "";
    quizOption3.dataset.answerStatus = "";
    quizOption4.dataset.answerStatus = "";

    quizOptionBox.style.pointerEvents = "all";

    // get the index of the correct answer for the current question
    var correctAnswer = quizData[currentQuestionNumber].correctAnswerIndex;

    // set the answerStatus of the option holding the correct answer to correct. now the quiz click listener can perform
    if (correctAnswer === 0) {
      quizOption1.dataset.answerStatus = "correct";
    } else if (correctAnswer === 1) {
      quizOption2.dataset.answerStatus = "correct";
    } else if (correctAnswer === 2) {
      quizOption3.dataset.answerStatus = "correct";
    } else if (correctAnswer === 3) {
      quizOption4.dataset.answerStatus = "correct";
    }

// if our current question number is more than the number of questions we have in the quiz, show the results screen
  } else {
    userSelectionResult.textContent = "";
    quizScreens.style.display = "none";
    generateQuizResults();
  }
//   After the quiz starts, i am setting a longer delay between quiz question screens than the delay for the start quiz button.
  quizScreenDelay = 900;
}


// event listener for the quiz screens, when the user clicks
quizOptionBox.addEventListener("click", function (event) {
    // sets the element to the user clck
  var element = event.target;
    // Checks to make sure the user has click on an answer element, and not somewhere else on the screen (do nothing).
  if (!element.matches(".answer")) {
    return;
  }

    //   set the background of all elements back to white momentarily after click
  quizOption1.style.backgroundColor = "#fff";
  quizOption2.style.backgroundColor = "#fff";
  quizOption3.style.backgroundColor = "#fff";
  quizOption4.style.backgroundColor = "#fff";

    //   if the user has selected the option that the createQuizScreen function gave an answerStatus of correct
  if (element.dataset.answerStatus === "correct") {
    // set the background of the selection to orange
    element.style.backgroundColor = "#fcd9c3";
    // add 10 points to the user score
    userScore += 10;
    // set the text at the bottom of the quiz
    userSelectionResult.textContent = "Correct!";
    // add a check icon to the text
    var correctIcon = document.createElement("i");
    correctIcon.classList.add("bi-check-circle");
    userSelectionResult.append(correctIcon);
    // do not allow the user to click again
    quizOptionBox.style.pointerEvents = "none";
// if the user selected an incorrect option
  } else {
    element.style.backgroundColor = "#fcd9c3";
    // subtract 10 seconds
    timeRemaining -= 10;
    // momentarily turn the timer count red
    timerCount.style.color = "red";
    setTimeout(function () {
      timerCount.style.color = "black";
    }, 500);
    userSelectionResult.textContent = "Incorrect ";
    var incorrectIcon = document.createElement("i");
    incorrectIcon.classList.add("bi-x-circle");
    userSelectionResult.append(incorrectIcon);
    quizOptionBox.style.pointerEvents = "none";
  }
//   after click, add one to the current question number so that createQuizScreen can get the next question
  currentQuestionNumber += 1;
// create the next quiz screen
  setTimeout(function(){createQuizScreen()}, quizScreenDelay);
});

// create the quiz results screen
function generateQuizResults() {
    // makes sure that if a user selects a wrong answer on the last screen and there were less than ten seconds left, the timer does not show negative
  if (timeRemaining < 0) {
    timerCount.textContent = "0";
  }
  quizResultsScreen.style.display = "block";
//   displays the users score (logged by the quiz click function)
  finalScore.textContent = userScore;
}

// allows the user to save their score
saveScoreBtn.addEventListener("click", function () {
    // trims the users input in the initials input box
  var userInputInitials = userInitials.value.trim();
//   if initials are blank, then require initials to save
  if (userInputInitials === "") {
    window.alert("Please put in your initials!");
  } else {
    // create a variable which gets an array from local storage
    var userScoreData = JSON.parse(localStorage.getItem("userScoreData"));
    // push the user data into the array
    userScoreData.push(userInputInitials + " - " + userScore);
    // save the array back to local storage
    localStorage.setItem("userScoreData", JSON.stringify(userScoreData));
    // show the high scores screen
  }
  window.location.href = "./high-scores.html";
});

// resets the look of the start screen for when the buttons that take you to start are clicked
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
    // reset all the global variables and then reset the start screen
    resetVariables();
    resetStartScreen();
  }, 500);
});
