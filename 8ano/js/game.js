
// =========================
// VARIÁVEIS GLOBAIS
// =========================

let currentPlayer =
localStorage.getItem(
    "startingPlayer"
) || "X";

let gameActive = true;

let selectedCell = null;

let board = [
    "", "", "",
    "", "", "",
    "", "", ""
];

// =========================
// COMBINAÇÕES DE VITÓRIA
// =========================

const winningCombinations = [

    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]
];

// =========================
// ELEMENTOS
// =========================

const cells = document.querySelectorAll(".cell");

const currentPlayerDisplay =
document.getElementById("current-player");

currentPlayerDisplay.textContent =
currentPlayer;

const message =
document.getElementById("message");

const questionModal =
document.getElementById("question-modal");

const victoryScreen =
document.getElementById("victory-screen");

const winnerText =
document.getElementById("winner-text");

const playAgainBtn =
document.getElementById("play-again-btn");

const restartBtn =
document.getElementById("restart-btn");

// =========================
// EVENTOS
// =========================

cells.forEach(cell => {

    cell.addEventListener(
        "click",
        handleCellClick
    );

});

restartBtn.addEventListener(
    "click",
    restartGame
);

playAgainBtn.addEventListener(
    "click",
    restartGame
);

// =========================
// CLIQUE NA CASA
// =========================

function handleCellClick(event)
{

    if(!gameActive) return;

    const cell = event.target;

    const index =
    cell.dataset.index;

    if(board[index] !== "")
    {
        return;
    }

    selectedCell = index;

    openQuestion();
}

// =========================
// ABRIR PERGUNTA
// =========================

function openQuestion()
{
    questionModal.classList.add(
        "active"
    );

    showQuestion();
}

// =========================
// RESPOSTA CORRETA
// =========================

function correctAnswer()
{

    board[selectedCell] =
    currentPlayer;

    const cell =
    document.querySelector(
        `[data-index="${selectedCell}"]`
    );

    cell.textContent =
    currentPlayer;

    if(currentPlayer === "X")
    {
        cell.classList.add("x");
    }
    else
    {
        cell.classList.add("o");
    }

    questionModal.classList.remove(
        "active"
    );

    checkWinner();

}

// =========================
// RESPOSTA ERRADA
// =========================

function wrongAnswer()
{

    questionModal.classList.remove(
        "active"
    );

    switchPlayer();
}

// =========================
// TROCAR JOGADOR
// =========================

function switchPlayer()
{

    currentPlayer =
    currentPlayer === "X"
    ? "O"
    : "X";

    currentPlayerDisplay.textContent =
    currentPlayer;

    message.textContent =
    `Vez do jogador ${currentPlayer}`;
}

// =========================
// VERIFICAR VITÓRIA
// =========================

function checkWinner()
{

    let won = false;

    winningCombinations.forEach(
        combination =>
        {

            const a =
            board[combination[0]];

            const b =
            board[combination[1]];

            const c =
            board[combination[2]];

            if(
                a !== "" &&
                a === b &&
                b === c
            )
            {
                won = true;
            }

        }
    );

    if(won)
    {

        gameActive = false;

        winnerText.textContent =
        `${currentPlayer} VENCEU!`;

        victoryScreen.classList.add(
            "active"
        );

        return;
    }

    checkDraw();
}

// =========================
// EMPATE
// =========================

function checkDraw()
{

    const draw =
    board.every(
        cell => cell !== ""
    );

    if(draw)
    {

        gameActive = false;

        winnerText.textContent =
        "EMPATE!";

        victoryScreen.classList.add(
            "active"
        );

        return;
    }

    switchPlayer();
}

// =========================
// REINICIAR
// =========================

function restartGame()
{

    board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    gameActive = true;

    currentPlayer =
	localStorage.getItem(
    "startingPlayer"
) || "X";

    currentPlayerDisplay.textContent =
    currentPlayer;

    cells.forEach(cell =>
    {

        cell.textContent = "";

        cell.classList.remove(
            "x",
            "o"
        );

    });

    victoryScreen.classList.remove(
        "active"
    );

    questionModal.classList.remove(
        "active"
    );

    message.textContent =
    "Toque em uma casa para jogar.";
}

// =========================
// TESTE TEMPORÁRIO
// =========================

// APAGAR DEPOIS

window.correctAnswer =
correctAnswer;

window.wrongAnswer =
wrongAnswer;

