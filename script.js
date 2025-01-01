const targetColorElement = document.getElementById("target-color");
const colorOptionsContainer = document.getElementById("color-options");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const highScoreElement = document.getElementById("high-score");
const startButton = document.getElementById("start-button");

let score = 0;
let highScore = 0;
let timer = 30; // Initial time in seconds
let gameInterval;
let colors = ["RED", "BLUE", "GREEN", "YELLOW", "ORANGE", "PURPLE"];

// Load high score from local storage
window.onload = () => {
    highScore = localStorage.getItem('highScore') || 0;
    highScoreElement.textContent = `High Score: ${highScore}`;
}

// Start the game
function startGame() {
    score = 0;
    timer = 30;
    scoreElement.textContent = `Score: ${score}`;
    timerElement.textContent = `Time Left: ${timer}s`;
    startButton.disabled = true;
    generateNewRound();
    gameInterval = setInterval(updateTimer, 1000);
}

// Generate a new round
function generateNewRound() {
    const targetColor = colors[Math.floor(Math.random() * colors.length)];
    targetColorElement.textContent = targetColor;
    targetColorElement.style.color = colors[Math.floor(Math.random() * colors.length)];

    // Clear previous options
    colorOptionsContainer.innerHTML = "";

    // Generate color options
    const shuffledColors = [...colors].sort(() => 0.5 - Math.random());
    shuffledColors.forEach(color => {
        const colorOption = document.createElement("div");
        colorOption.classList.add("color-option");
        colorOption.textContent = color;
        colorOption.style.backgroundColor = color.toLowerCase();
        colorOption.addEventListener("click", () => checkColorMatch(color, targetColor));
        colorOptionsContainer.appendChild(colorOption);
    });
}

// Check if selected color matches the target
function checkColorMatch(selectedColor, targetColor) {
    if (selectedColor === targetColor) {
        score++;
        scoreElement.textContent = `Score: ${score}`;
        showFeedback("correct");
    } else {
        score = Math.max(0, score - 1);
        scoreElement.textContent = `Score: ${score}`;
        showFeedback("incorrect");
    }
    generateNewRound();
}

// Display feedback for correct/incorrect answers
function showFeedback(status) {
    colorOptionsContainer.classList.add(status);
    setTimeout(() => colorOptionsContainer.classList.remove(status), 500);
}

// Update timer
function updateTimer() {
    timer--;
    timerElement.textContent = `Time Left: ${timer}s`;
    if (timer <= 0) endGame();
}

// End the game
function endGame() {
    clearInterval(gameInterval);
    startButton.disabled = false;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        highScoreElement.textContent = `High Score: ${highScore}`;
        alert("New High Score!");
    }
    alert("Game Over! Your score is " + score);
}

// Start the game on button click
startButton.addEventListener("click", startGame);
