
// =========================
// TELAS
// =========================

const homeScreen =
document.getElementById("home-screen");

const configScreen =
document.getElementById("config-screen");

const gameScreen =
document.getElementById("game-screen");

// =========================
// BOTÕES
// =========================

const playBtn =
document.getElementById("play-btn");

const startGameBtn =
document.getElementById("start-game-btn");

const backMenuBtn =
document.getElementById("back-menu-btn");

// =========================
// CONFIGURAÇÕES
// =========================

let selectedDifficulty = "easy";

let selectedSymbol = "X";

// =========================
// IR PARA CONFIGURAÇÃO
// =========================

playBtn.addEventListener(
    "click",
    () =>
    {
        homeScreen.classList.remove(
            "active"
        );

        configScreen.classList.add(
            "active"
        );
    }
);

// =========================
// ESCOLHER SÍMBOLO
// =========================

document
.querySelectorAll(".symbol-btn")
.forEach(button =>
{
    button.addEventListener(
        "click",
        () =>
        {
            document
            .querySelectorAll(".symbol-btn")
            .forEach(btn =>
                btn.classList.remove(
                    "selected"
                )
            );

            button.classList.add(
                "selected"
            );

            selectedSymbol =
            button.dataset.symbol;
        }
    );
});

// =========================
// ESCOLHER DIFICULDADE
// =========================

document
.querySelectorAll(".difficulty-btn")
.forEach(button =>
{
    button.addEventListener(
        "click",
        () =>
        {
            document
            .querySelectorAll(".difficulty-btn")
            .forEach(btn =>
                btn.classList.remove(
                    "selected"
                )
            );

            button.classList.add(
                "selected"
            );

            selectedDifficulty =
            button.dataset.level;
        }
    );
});

// =========================
// INICIAR PARTIDA
// =========================

startGameBtn.addEventListener(
    "click",
    () =>
    {

        localStorage.setItem(
            "difficulty",
            selectedDifficulty
        );

	localStorage.setItem(
    "startingPlayer",
    selectedSymbol
);

        homeScreen.classList.remove(
            "active"
        );

        configScreen.classList.remove(
            "active"
        );

        gameScreen.classList.add(
            "active"
        );

    }
);

// =========================
// VOLTAR AO MENU
// =========================

backMenuBtn.addEventListener(
    "click",
    () =>
    {

        gameScreen.classList.remove(
            "active"
        );

        configScreen.classList.remove(
            "active"
        );

        homeScreen.classList.add(
            "active"
        );

    }
);

