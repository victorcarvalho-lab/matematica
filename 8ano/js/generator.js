
// =========================
// QUESTÃO ATUAL
// =========================

let currentQuestion = null;

// =========================
// GERAR QUESTÃO
// =========================

function generateQuestion()
{

    const difficulty =
    localStorage.getItem("difficulty")
    || "easy";

    if(difficulty === "easy")
    {
        return generateEasyQuestion();
    }

    if(difficulty === "medium")
    {
        return generateMediumQuestion();
    }

    return generateEasyQuestion();
}

// =========================
// FÁCIL
// =========================

function generateEasyQuestion()
{

    const divisor =
    randomNumber(2, 10);

    const quotient =
    randomNumber(2, 20);

    const dividend =
    divisor * quotient;

    return buildQuestion(
        dividend,
        divisor,
        quotient
    );
}

// =========================
// MÉDIO
// =========================

function generateMediumQuestion()
{

    const divisor =
    randomNumber(11, 25);

    const quotient =
    randomNumber(5, 50);

    const dividend =
    divisor * quotient;

    return buildQuestion(
        dividend,
        divisor,
        quotient
    );
}

// =========================
// MONTAR QUESTÃO
// =========================

function buildQuestion(
    dividend,
    divisor,
    correctAnswer
)
{

    let options = [
        correctAnswer
    ];

    while(options.length < 4)
    {

        let fakeAnswer =
        correctAnswer +
        randomNumber(-4,4);

        if(
            fakeAnswer > 0 &&
            !options.includes(fakeAnswer)
        )
        {
            options.push(fakeAnswer);
        }

    }

    options =
    shuffleArray(options);

    return {

        question:
        `${dividend} ÷ ${divisor} = ?`,

        correct:
        correctAnswer,

        options:
        options

    };
}

// =========================
// MOSTRAR QUESTÃO
// =========================

function showQuestion()
{

    currentQuestion =
    generateQuestion();

    document.getElementById(
        "question-text"
    ).textContent =
    currentQuestion.question;

    const container =
    document.getElementById(
        "answers-container"
    );

    container.innerHTML = "";

    currentQuestion.options.forEach(
        option =>
        {

            const button =
            document.createElement(
                "button"
            );

            button.classList.add(
                "answer-btn"
            );

            button.textContent =
            option;

            button.addEventListener(
                "click",
                () =>
                checkAnswer(option)
            );

            container.appendChild(
                button
            );

        }
    );
}

// =========================
// VERIFICAR RESPOSTA
// =========================

function checkAnswer(answer)
{

    if(
        answer ===
        currentQuestion.correct
    )
    {
        correctAnswer();
    }
    else
    {
        wrongAnswer();
    }

}

// =========================
// EMBARALHAR
// =========================

function shuffleArray(array)
{

    for(
        let i =
        array.length - 1;

        i > 0;

        i--
    )
    {

        const j =
        Math.floor(
            Math.random() *
            (i + 1)
        );

        [
            array[i],
            array[j]
        ] =
        [
            array[j],
            array[i]
        ];

    }

    return array;
}

// =========================
// NÚMERO ALEATÓRIO
// =========================

function randomNumber(min,max)
{

    return Math.floor(
        Math.random() *
        (max-min+1)
    ) + min;

}

