// High Scores Screen

var highScoresList = document.querySelector("#high-scores-list");
var homeBtn = document.querySelector("#home-btn");
var clearScoresBtn = document.querySelector("#clear-scores-btn");

// initializes empty variable
var storedUserScores;

// Make home button take you back to start screen, calls the reset start screen on load
homeBtn.addEventListener("click", function () {
  window.location.href = "./index.html";
  resetStartScreen();
});

// creates the high scores table from the array in local storage
function createHighScoresTable() {
  // sets stored scores to the array of user data in the local storage
  storedUserScores = JSON.parse(localStorage.getItem("userScoreData"));
  //   creates an element for each index of the array and adds it to the screen
  for (i = 0; i < storedUserScores.length; i++) {
    var savedUser = document.createElement("li");
    savedUser.textContent = storedUserScores[i];
    highScoresList.appendChild(savedUser);
  }
}

// calls the create high scores table function on load
createHighScoresTable();

// the clear scores button
clearScoresBtn.addEventListener("click", function () {
  // asks the user if they are sure
  var confirmClear = window.confirm(
    "Are you sure you want to clear the high-scores?"
  );
  //   if ok, then set stored scores to a blank array, save it to local storage, and reload the page
  // (createHighScores table is called and now is blank, with length of 0)
  if (confirmClear) {
    storedUserScores = [];
    localStorage.setItem("userScoreData", JSON.stringify(storedUserScores));
    window.location.reload();
  }
});
