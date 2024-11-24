// script.js
// This file contains the logic for the game.
let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

// Handle guess submission
document.getElementById("submitGuess").addEventListener("click", () => {
  const userGuess = parseInt(document.getElementById("guessInput").value);
  const feedback = document.getElementById("feedback");
  attempts++;

  if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
    feedback.textContent = "Please enter a valid number between 1 and 100.";
  } else if (userGuess === randomNumber) {
    feedback.textContent = `🎉 Correct! You guessed the number in ${attempts} attempts.`;
  } else if (userGuess < randomNumber) {
    feedback.textContent = "Too low! Try again.";
  } else {
    feedback.textContent = "Too high! Try again.";
  }
});

// Handle game reset
document.getElementById("resetGame").addEventListener("click", () => {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  document.getElementById("guessInput").value = "";
  document.getElementById("feedback").textContent = "Game has been reset. Guess again!";
});

let timeLeft = 60;
let score = 0;
let timer;
let difficulty = "easy";

// Initialize the game
function initGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  timeLeft = difficulty === "easy" ? 60 : difficulty === "medium" ? 30 : 15;
  score = 0;
  document.getElementById("timer").textContent = timeLeft;
  document.getElementById("score").textContent = score;
  document.getElementById("guessInput").value = "";
  document.getElementById("feedback").textContent = "Game has started! Guess a number.";
  clearInterval(timer);
  startTimer();
}

// Start the timer
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      document.getElementById("feedback").textContent = "⏰ Time's up! You lost the game.";
      disableInputs();
    }
  }, 1000);
}

// Disable input and buttons
function disableInputs() {
  document.getElementById("guessInput").disabled = true;
  document.getElementById("submitGuess").disabled = true;
}

// Enable input and buttons
function enableInputs() {
  document.getElementById("guessInput").disabled = false;
  document.getElementById("submitGuess").disabled = false;
}

// Handle guess submission
document.getElementById("submitGuess").addEventListener("click", () => {
  const userGuess = parseInt(document.getElementById("guessInput").value);
  const feedback = document.getElementById("feedback");
  attempts++;

  if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
    feedback.textContent = "Please enter a valid number between 1 and 100.";
  } else if (userGuess === randomNumber) {
    score += difficulty === "easy" ? 10 : difficulty === "medium" ? 20 : 30;
    feedback.textContent = `🎉 Correct! You guessed the number in ${attempts} attempts. Score: ${score}`;
    document.getElementById("score").textContent = score;
    clearInterval(timer);
    disableInputs();
  } else if (userGuess < randomNumber) {
    feedback.textContent = "Too low! Try again.";
  } else {
    feedback.textContent = "Too high! Try again.";
  }
});

// Handle difficulty change
document.getElementById("difficulty").addEventListener("change", (event) => {
  difficulty = event.target.value;
  initGame();
});

// Handle game reset
document.getElementById("resetGame").addEventListener("click", () => {
  enableInputs();
  initGame();
});

// Start the game for the first time
initGame();
