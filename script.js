const grid = document.getElementById("grid");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const highScoreDisplay = document.getElementById("highScore");
const level = document.getElementById("level");

let score = 0;
let timeLeft = 30;
let timerId;
let gameSpeed = 900;
let lastHole;
let highScore = localStorage.getItem("highScore") || 0;

highScoreDisplay.textContent = highScore;

// create holes
for (let i = 0; i < 9; i++) {
  const hole = document.createElement("div");
  hole.classList.add("hole");
  grid.appendChild(hole);

  hole.addEventListener("click", () => {
    if (hole.classList.contains("mole")) {
      score++;
      scoreDisplay.textContent = score;
      hole.classList.remove("mole");
      playSound();
    }
  });
}

const holes = document.querySelectorAll(".hole");

function randomHole() {
  const index = Math.floor(Math.random() * holes.length);
  const hole = holes[index];

  if (hole === lastHole) return randomHole();

  lastHole = hole;
  return hole;
}

function showMole() {
  const hole = randomHole();
  hole.classList.add("mole");

  setTimeout(() => {
    hole.classList.remove("mole");
  }, gameSpeed);
}

function startGame() {
  score = 0;
  timeLeft = 30;
  gameSpeed = level.value;

  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;

  clearInterval(timerId);

  timerId = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;
    showMole();

    if (timeLeft === 0) {
      clearInterval(timerId);
      endGame();
    }
  }, 1000);
}

function endGame() {
  if (score > highScore) {
    localStorage.setItem("highScore", score);
    highScoreDisplay.textContent = score;
  }
  alert("Game Over!");
}

function playSound() {
  const audio = new Audio("hit.mp3");
  audio.play();
}