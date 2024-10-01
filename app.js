// Game Variables
let tiles = [];
let firstTile = null;
let secondTile = null;
let lockBoard = false;
let matchesFound = 0;
let score = 0;
let timerInterval = null;
let timeElapsed = 0;
let isPaused = false;
let gameStarted = false;  // Added to track if the game is started

// List of front images (ensure there are 18 unique images in the 'assets' folder)
const frontImages = [
    'apple.png',
    'banana.png',
    'cherry.png',
    'grape.png',
    'lemon.png',
    'orange.png',
    'peach.png',
    'pear.png',
    'pineapple.png',
    'strawberry.png',
    'watermelon.png',
    'blueberry.png',
    'kiwi.png',
    'mango.png',
    'melon.png',
    'papaya.png',
    'raspberry.png',
    'blackberry.png'
];

// Duplicate the frontImages array to create pairs
const tileImages = [...frontImages, ...frontImages];

// Initialize the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    tiles = Array.from(document.querySelectorAll('.tile'));
    initializeTiles(); // Set up event listeners
    disableGameSection(); // Initially disable the game section
});

// Function to start the game
function startGame() {
    resetGame();                   // Reset any previous game state
    shuffleTiles();                // Shuffle the tiles
    revealAllTilesTemporarily();   // Optional: Briefly show all tiles
    startTimer();                  // Start the game timer
    enableGameSection();           // Enable the game section for interaction
    disableStartButton();          // Disable the Start Game button to prevent multiple starts
    gameStarted = true;            // Set the game started state to true
}

// Function to reset the game
function resetGame() {
    // Reset variables
    firstTile = null;
    secondTile = null;
    lockBoard = false;
    matchesFound = 0;
    score = 0;
    timeElapsed = 0;
    isPaused = false;
    gameStarted = false;           // Reset game started state

    // Reset UI elements
    document.getElementById('score').textContent = score;
    document.getElementById('timer').textContent = timeElapsed;

    // Reset tile classes and images
    tiles.forEach(tile => {
        tile.classList.remove('active', 'matched');
        const img = tile.querySelector('img');
        img.src = 'assets/Yellow.png'; // Back of the card
    });

    // Clear any existing timer
    clearInterval(timerInterval);

    // Reset pause/resume button icon
    const pauseButton = document.querySelector('.pauseresume img');
    pauseButton.src = 'assets/pause.png'; // Ensure you have a pause.png in assets

    // Disable game section and enable Start button
    disableGameSection();
    enableStartButton();
}

// Function to shuffle tiles using Fisher-Yates algorithm
function shuffleTiles() {
    // Create a shuffled copy of tileImages
    const shuffled = [...tileImages];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Assign shuffled images to tiles
    tiles.forEach((tile, index) => {
        tile.setAttribute('data-emoji', shuffled[index]);
    });
}

// Function to initialize tile event listeners
function initializeTiles() {
    tiles.forEach(tile => {
        tile.addEventListener('click', onTileClick);
    });
}

// Function to handle tile click
function onTileClick(e) {
    if (lockBoard || !gameStarted || isPaused) return; // Prevent clicks when board is locked, game not started, or paused
    const clickedTile = e.currentTarget;

    if (clickedTile.classList.contains('matched') || clickedTile === firstTile) return; // Ignore already matched or same tile

    revealTile(clickedTile);

    if (!firstTile) {
        // First tile selected
        firstTile = clickedTile;
        return;
    }

    // Second tile selected
    secondTile = clickedTile;
    lockBoard = true;

    checkForMatch();
}

// Function to reveal a tile
function revealTile(tile) {
    tile.classList.add('active');
    const img = tile.querySelector('img');
    img.src = `assets/${tile.getAttribute('data-emoji')}`; // Front image
}

// Function to check if two tiles match
function checkForMatch() {
    const emoji1 = firstTile.getAttribute('data-emoji');
    const emoji2 = secondTile.getAttribute('data-emoji');

    if (emoji1 === emoji2) {
        // It's a match
        handleMatch();
    } else {
        // Not a match
        handleMismatch();
    }
}

// Function to handle a successful match
function handleMatch() {
    firstTile.classList.add('matched');
    secondTile.classList.add('matched');
    score += 10; // Increment score by 10 for a match
    document.getElementById('score').textContent = score;

    matchesFound++;

    resetSelection();

    // Check if all matches are found
    if (matchesFound === frontImages.length) {
        endGame();
    }
}

// Function to handle a mismatch
function handleMismatch() {
    setTimeout(() => {
        hideTile(firstTile);
        hideTile(secondTile);
        resetSelection();
    }, 1000); // 1 second delay before hiding
}

// Function to hide a tile
function hideTile(tile) {
    tile.classList.remove('active');
    const img = tile.querySelector('img');
    img.src = 'assets/Yellow.png'; // Back of the card
}

// Function to reset tile selection
function resetSelection() {
    [firstTile, secondTile] = [null, null];
    lockBoard = false;
}

// Function to start the timer
function startTimer() {
    timerInterval = setInterval(() => {
        if (!isPaused) {
            timeElapsed++;
            document.getElementById('timer').textContent = timeElapsed;
        }
    }, 1000);
}

// Function to toggle pause/resume
function togglePauseResume() {
    if (!gameStarted) return; // Prevent pausing/resuming if the game hasn't started

    isPaused = !isPaused;
    const pauseButton = document.querySelector('.pauseresume img');
    if (isPaused) {
        pauseButton.src = 'assets/resume.png'; // Update to resume icon
        disableGameSection(); // Disable game section while paused
    } else {
        pauseButton.src = 'assets/pause.png'; // Update to pause icon
        enableGameSection(); // Enable game section after resuming
    }
}

// Function to end the game
function endGame() {
    clearInterval(timerInterval);
    alert(`Congratulations! You completed the game in ${timeElapsed} seconds with a score of ${score}.`);
    enableStartButton(); // Re-enable the Start Game button
    disableGameSection(); // Disable the game section after game ends
    gameStarted = false; // Set the game started state to false
}

// Function to shuffle the grid (reshuffle emojis)
function shuffleGrid() {
    if (lockBoard) return; // Prevent shuffling during tile flipping
    shuffleTiles();
    tiles.forEach(tile => {
        hideTile(tile);
    });
    resetSelection();
    score = 0;
    matchesFound = 0;
    document.getElementById('score').textContent = score;
    timeElapsed = 0;
    document.getElementById('timer').textContent = timeElapsed;
}

// Function to reveal all tiles temporarily (optional, for a brief preview)
function revealAllTilesTemporarily() {
    tiles.forEach(tile => {
        const img = tile.querySelector('img');
        img.src = `assets/${tile.getAttribute('data-emoji')}`; // Show front image
    });
    setTimeout(() => {
        tiles.forEach(tile => {
            if (!tile.classList.contains('matched')) {
                hideTile(tile);
            }
        });
    }, 3000); // Show all tiles for 3 seconds
}

// Helper functions for enabling/disabling the game section
function disableGameSection() {
    const gameSection = document.querySelector('.game-section');
    gameSection.classList.add('disabled');
}

function enableGameSection() {
    const gameSection = document.querySelector('.game-section');
    gameSection.classList.remove('disabled');
}

// Function to disable the Start Game button
function disableStartButton() {
    const startButton = document.querySelector('.start');
    startButton.disabled = true;
}

// Function to enable the Start Game button
function enableStartButton() {
    const startButton = document.querySelector('.start');
    startButton.disabled = false;
}
