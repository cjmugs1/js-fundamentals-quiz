// High Scores Screen

var highScoresList = document.querySelector("#high-scores-list");
var homeBtn = document.querySelector("#home-btn");
var clearScoresBtn = document.querySelector("#clear-scores-btn");

// Make home button take you back to start screen
homeBtn.addEventListener("click", function(){
    window.location.href="./index.html"
});
