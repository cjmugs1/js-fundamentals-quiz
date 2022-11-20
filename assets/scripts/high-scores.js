// High Scores Screen

var highScoresList = document.querySelector("#high-scores-list");
var homeBtn = document.querySelector("#home-btn");
var clearScoresBtn = document.querySelector("#clear-scores-btn");

var storedUserScores;

// Make home button take you back to start screen
homeBtn.addEventListener("click", function () {
  window.location.href = "./index.html";
  resetStartScreen();
});

function createHighScoresTable() {
  storedUserScores = JSON.parse(localStorage.getItem("userScoreData"));
  for (i = 0; i < storedUserScores.length; i++) {
    var savedUser = document.createElement("li");
    savedUser.textContent = storedUserScores[i];
    console.log(savedUser.textContent);
    highScoresList.appendChild(savedUser);
  }
}

createHighScoresTable();

clearScoresBtn.addEventListener("click", function () {
  var confirmClear = window.confirm(
    "Are you sure you want to clear the high-scores?"
  );
  if (confirmClear) {
    storedUserScores = [];
    localStorage.setItem("userScoreData", JSON.stringify(storedUserScores));
    window.location.reload();
  }
});
