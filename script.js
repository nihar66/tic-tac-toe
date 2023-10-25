// Get HTML elements
const playerText = document.getElementById('playerText');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const winnerSound = document.getElementById('winnerSound');
const clickSound = document.getElementById('clickSound');
const dancingDoll = document.getElementById('dancingDoll');

// Event listeners
startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', restart);
const boxes = Array.from(document.getElementsByClassName('box'));
const winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');

// Game constants
const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);

// Start the game
function startGame() {
    boxes.forEach(box => box.addEventListener('click', boxClicked));
    playerText.innerHTML = 'Tic Tac Toe';
    dancingDoll.style.display = 'none';
}

// Handle box click
function boxClicked(e) {
    const id = e.target.id;

    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;
        playClickSound();

        if (playerHasWon() !== false) {
            playerText.innerHTML = `${currentPlayer} has won!`;
            let winningBlocks = playerHasWon();

            winningBlocks.map(box => boxes[box].style.backgroundColor = winnerIndicator);
            showDancingDoll();
            return;
        }

        currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT;
    }
}

// Check for a win
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition;

        if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
            return [a, b, c];
        }
    }
    return false;
}

// Reset the game
function restart() {
    spaces.fill(null);

    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = '';
    });

    playerText.innerHTML = 'Tic Tac Toe';
    dancingDoll.style.display = 'none';

    currentPlayer = X_TEXT;
}

// Play sounds
function playWinnerSound() {
    winnerSound.play();
}

function playClickSound() {
    clickSound.play();
}

// Initialize the game
startGame();
