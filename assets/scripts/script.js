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
timerCount.textContent = startTime;

// Start Screen
var startScreen = document.querySelector(".start-screen");
var startBtn = startScreen.querySelector("#start-btn");

// Quiz
var quizScreens = document.querySelector(".quiz");

var quizQuestion = quizScreens.querySelector("#quiz-question");
var currentQuestionNumber = quizQuestion.dataset.questionIndex

var quizOptionBox = quizScreens.querySelectorAll(".option")
var quizOption1 = quizScreens.querySelector("#option-1");
var quizOption2 = quizScreens.querySelector("#option-1");
var quizOption3 = quizScreens.querySelector("#option-1");
var quizOption4 = quizScreens.querySelector("#option-1");

var userSelectionResult = document.querySelector("#user-selection-result");

// Results Screen
var quizResultsScreen = document.querySelector(".quiz-results");
var finalScore = quizResultsScreen.querySelector("#final-score")

var userInitials = quizResultsScreen.querySelector("#user-initials");
var saveScoreBtn = quizResultsScreen.querySelector("#save-score-btn");
var tryAgainBtn = quizResultsScreen.querySelector("#try-again-btn");



// Create necessary global variables
var startTime = 3;
var timeRemaining = parseInt(timerCount.textContent);

// Make view scores button take you to high-scores page
viewScoresBtn.addEventListener("click", function() {
    window.location.href="./high-scores.html";
});

// Create timer function
function setTime() {
    var timerInterval = setInterval(function() {
        timeRemaining--;
        timerCount.textContent = timeRemaining;

        if (timeRemaining < 10) {
            timerCount.setAttribute("style", "color: red;")
            } 

        if(timeRemaining === 0) {
          // Stops execution of action at set interval
        clearInterval(timerInterval);
        // Resets value of timeRemaining
        timeRemaining = startTime
        //   Takes the user to the quiz results screen
        quizScreens.setAttribute("style", "display: none;");
        quizResultsScreen.setAttribute("style", "display: block;")
        }
      }, 1000);
}

// Create event listener for start button, hide start screen show quiz screen.
startBtn.addEventListener("click", function(){
    setTimeout(function() {
        startScreen.style.display = "none";
        quizScreens.style.display = "block";
        viewScoresBtn.style.display = "none";
        header.style.justifyContent = "center";
    }, 500);

    setTimeout(setTime(), 500); 
    setTimeout(createQuizScreen(), 500);                  
});


var quizData = [
    {
        "question": "What are the 3 logical operators?",
        "answers":["&& [and] , || [or] , ! [not]", "!= [not] , !! [or] , && [and]", "&| [and or] , if ! [if not] , || [and]" , "|| [or] , !! [not] , & [and]"],
        "correctAnswerIndex": 0
    }, 

    {
        "question": "Each element in array has a numbered position know as its...",
        "answers":["element", "index", "object-value", "attribute"],
        "correctAnswerIndex": 1
    }, 

    {
        "question": "What does the .unshift() method do?",
        "answers":["Re-verses the order of an array.", "Adds an element to the end of the array. ", "Moves an element at the end of an array to the beginning.", "Adds an element to the beginning of the array."],
        "correctAnswerIndex": 3
    }, 

    {
        "question": "What is a global variable",
        "answers":["A variable that is written in every language.", "A variable that can be accessed anywhere in your code.", "A variable defined within a function.", "A variable that sits in your root directory."],
        "correctAnswerIndex": 1
    }
]

function createQuizScreen() {
 quizQuestion.textContent = quizData[currentQuestionNumber].question;

 for (i = 0; i <= quizData[currentQuestionNumber].answers.length; i++) {


 }



}


// Set event listener for the quiz options, needs to check whether answer is correct or incorrect.
// set background of clicked element, show the appropriate icon in the box, and set header footer
// and remove time if necessary
// then change the question number index and set timeout call the function that takes in the question number
// index to change the values of the quiz question and options
// quizOptionBox.addEventListener("click", function(event){
//     var element = event.target;



// })





// Create event listener for try again button
tryAgainBtn.addEventListener("click", function(){
    setTimeout(function() {
        timerCount.textContent = startTime;
        timerCount.style.color = "";
        quizResultsScreen.style.display = "none";
        startScreen.style.display = "block";
        viewScoresBtn.style.display = "";
        header.style.justifyContent = "";
    }, 500);
});