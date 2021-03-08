const board = document.querySelector("main");
const currentPlayDisplay = document.querySelector("#current-play");
const reset = document.querySelector("button");
const count = 9;
let cell_id = 1;
let row_id = 1;
let currentPlayer = 1;
let currentMove = 0;

// Winning logic
const roundwon = (player) => {
    currentPlayDisplay.classList.add("game-over");
    if (currentPlayer % 2 != 0) {
        currentPlayDisplay.innerText = "Congratulations! Player1 wins";
        window.alert("Congratulations! Player1 wins");
    } else {
        currentPlayDisplay.innerText = "Congratulations! Player2 wins";
        window.alert("Congratulations! Player2 wins");
    }
    document.querySelectorAll(".cell").forEach((cell) => {
        if (!cell.classList.contains("clicked")) {
            cell.classList.add("clicked");
        }
    });
};

const winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let ticTacToe = new Array(9);

const calcWinner = () => {
    for (let i = 0; i < winningCombo.length; i++) {
        let a = ticTacToe[winningCombo[i][0]];
        let b = ticTacToe[winningCombo[i][1]];
        let c = ticTacToe[winningCombo[i][2]];

        if (a != undefined && a == b && b == c) {
            roundwon();
            document.querySelectorAll(".cell").forEach((cell) => {
                if (
                    cell.id == winningCombo[i][0] + 1 ||
                    cell.id == winningCombo[i][1] + 1 ||
                    cell.id == winningCombo[i][2] + 1
                ) {
                    let winCross = document.createElement("div");
                    winCross.classList.add("croos");
                    let diff = winningCombo[i][1] - winningCombo[i][0];
                    switch (diff) {
                        case 1:
                            winCross.classList.add("horizontal");
                            break;
                        case 3:
                            winCross.classList.add("vertical");
                            break;
                        case 4:
                            winCross.classList.add("right-slant");
                            break;
                        case 2:
                            winCross.classList.add("left-slant");
                    }
                    cell.appendChild(winCross);
                }
            });
            break;
        }
    }
};

// Moves counter Function
const playerMoves = () => {
    currentMove++;
    if (currentMove >= 9) {
        currentPlayDisplay.classList.add("game-over");
        currentPlayDisplay.innerText = "Draw!";
        window.alert("Draw!");
    }
};

// Current Player Display Function
const playerChange = () => {
    if (currentPlayer % 2 != 0) {
        currentPlayer = 1;
    } else {
        currentPlayer = 2;
    }
    currentPlayDisplay.innerText = `Player ${currentPlayer}'s Turn`;
    currentPlayer++;
};

// Creating the game board

for (let j = 0; j < count; j++) {
    let cell = document.createElement("div");
    cell.id = cell_id;
    cell_id++;
    cell.classList.add("cell");
    board.appendChild(cell);
}

// Adding borders to the game board
document.querySelectorAll(".cell").forEach((cell) => {
    if (cell.id == 1 || cell.id == 4 || cell.id == 7) {
        cell.classList.add("left");
    }
    if (Number(cell.id) % 3 == 0) {
        cell.classList.add("right");
    }
    if (cell.id == 1 || cell.id == 2 || cell.id == 3) {
        cell.classList.add("top");
    }
    if (cell.id == 7 || cell.id == 8 || cell.id == 9) {
        cell.classList.add("bottom");
    }
});

// Enabling the restart game button
board.addEventListener("click", () => {
    reset.disabled = false;
});

// Game reset
reset.addEventListener("click", () => {
    location.reload();
});

// Game starts
playerChange();

// Game play logic
document.querySelectorAll(".cell").forEach((cell) => {
    cell.addEventListener("click", () => {
        if (!cell.classList.contains("clicked")) {
            playerChange();
            playerMoves();
            if (currentPlayer == 2) {
                ticTacToe.splice(`${cell.id - 1}`, 1, "O");
                cell.innerText = "O";
            } else {
                ticTacToe.splice(`${cell.id - 1}`, 1, "X");
                cell.innerText = "X";
            }
            calcWinner();
        }
        cell.classList.add("clicked");
    });
});