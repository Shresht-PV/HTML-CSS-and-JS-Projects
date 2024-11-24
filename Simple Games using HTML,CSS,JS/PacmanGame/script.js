// script.js
// This file contains the logic for Pacman's movement and collecting dots.
// Add logic for ghosts, levels, power-ups, and scoring.
const pacman = document.getElementById("pacman");
const gameContainer = document.getElementById("gameContainer");
const dots = document.querySelectorAll(".dot");
const ghost = document.getElementById("ghost");
const powerUp = document.getElementById("powerUp");
const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("highScore");
const levelElement = document.getElementById("level");

let pacmanX = 0; // Pacman's X position
let pacmanY = 0; // Pacman's Y position
let ghostX = 300; // Ghost's X position
let ghostY = 300; // Ghost's Y position
let score = 0;

let highScore = localStorage.getItem("highScore") || 0;
let level = 1;
let isPoweredUp = false;
let poweredUpTimeout;

// Move Pacman based on arrow keys
document.addEventListener("keydown", (e) => {
  const step = 10; // Step size

  // Move Pacman within boundaries
  if (e.key === "ArrowUp" && pacmanY > 0) pacmanY -= step;
  if (e.key === "ArrowDown" && pacmanY < gameContainer.offsetHeight - 20)
    pacmanY += step;
  if (e.key === "ArrowLeft" && pacmanX > 0) pacmanX -= step;
  if (e.key === "ArrowRight" && pacmanX < gameContainer.offsetWidth - 20)
    pacmanX += step;

  // Update Pacman's position
  pacman.style.top = `${pacmanY}px`;
  pacman.style.left = `${pacmanX}px`;

  checkCollision();
});

// Check if Pacman collides with any dots
function checkCollision() {
  dots.forEach((dot) => {
    const dotRect = dot.getBoundingClientRect();
    const pacmanRect = pacman.getBoundingClientRect();

    if (
      pacmanRect.left < dotRect.right &&
      pacmanRect.right > dotRect.left &&
      pacmanRect.top < dotRect.bottom &&
      pacmanRect.bottom > dotRect.top
    ) {
      // Collision detected
      dot.style.display = "none"; // Hide the dot
      score++;
      scoreElement.textContent = score; // Update score
    }
  });
}

// Update high score display
highScoreElement.textContent = highScore;

// Move Pacman
document.addEventListener("keydown", (e) => {
  const step = 10;

  if (e.key === "ArrowUp" && pacmanY > 0) pacmanY -= step;
  if (e.key === "ArrowDown" && pacmanY < gameContainer.offsetHeight - 20)
    pacmanY += step;
  if (e.key === "ArrowLeft" && pacmanX > 0) pacmanX -= step;
  if (e.key === "ArrowRight" && pacmanX < gameContainer.offsetWidth - 20)
    pacmanX += step;

  pacman.style.top = `${pacmanY}px`;
  pacman.style.left = `${pacmanX}px`;

  checkCollision();
  checkPowerUp();
});

// Check collision with dots
function checkCollision() {
  dots.forEach((dot) => {
    const dotRect = dot.getBoundingClientRect();
    const pacmanRect = pacman.getBoundingClientRect();

    if (
      pacmanRect.left < dotRect.right &&
      pacmanRect.right > dotRect.left &&
      pacmanRect.top < dotRect.bottom &&
      pacmanRect.bottom > dotRect.top
    ) {
      dot.style.display = "none"; // Hide the dot
      score++;
      scoreElement.textContent = score;

      // Level up if all dots are collected
      if (Array.from(dots).every((dot) => dot.style.display === "none")) {
        levelUp();
      }
    }
  });
}

// Check collision with power-up
function checkPowerUp() {
  const powerUpRect = powerUp.getBoundingClientRect();
  const pacmanRect = pacman.getBoundingClientRect();

  if (
    pacmanRect.left < powerUpRect.right &&
    pacmanRect.right > powerUpRect.left &&
    pacmanRect.top < powerUpRect.bottom &&
    pacmanRect.bottom > powerUpRect.top
  ) {
    powerUp.style.display = "none"; // Hide the power-up
    isPoweredUp = true;
    ghost.style.background = "blue"; // Ghost becomes vulnerable

    // Reset power-up after 10 seconds
    clearTimeout(poweredUpTimeout);
    poweredUpTimeout = setTimeout(() => {
      isPoweredUp = false;
      ghost.style.background = "red"; // Ghost returns to normal
    }, 10000);
  }
}

// Move Ghost
function moveGhost() {
  const step = 10;

  // Move ghost towards Pacman
  if (ghostX < pacmanX) ghostX += step;
  if (ghostX > pacmanX) ghostX -= step;
  if (ghostY < pacmanY) ghostY += step;
  if (ghostY > pacmanY) ghostY -= step;

  ghost.style.left = `${ghostX}px`;
  ghost.style.top = `${ghostY}px`;

  // Check collision with Pacman
  const ghostRect = ghost.getBoundingClientRect();
  const pacmanRect = pacman.getBoundingClientRect();

  if (
    pacmanRect.left < ghostRect.right &&
    pacmanRect.right > ghostRect.left &&
    pacmanRect.top < ghostRect.bottom &&
    pacmanRect.bottom > ghostRect.top
  ) {
    if (isPoweredUp) {
      score += 10; // Bonus for eating the ghost
      ghostX = 300; // Reset ghost position
      ghostY = 300;
    } else {
      alert("Game Over! Your score: " + score);
      resetGame();
    }
  }
}

// Level up
function levelUp() {
  level++;
  levelElement.textContent = level;

  // Reset dots
  dots.forEach((dot) => {
    dot.style.display = "block";
  });

  // Increase ghost speed
  ghost.style.transition = `all ${0.2 - level * 0.02}s linear`;
}

// Reset the game
function resetGame() {
  score = 0;
  level = 1;
  isPoweredUp = false;
  pacmanX = 0;
  pacmanY = 0;
  ghostX = 300;
  ghostY = 300;
  scoreElement.textContent = score;
  levelElement.textContent = level;
  dots.forEach((dot) => {
    dot.style.display = "block";
  });

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
    highScoreElement.textContent = highScore;
  }
}

// Start ghost movement
setInterval(moveGhost, 500);
