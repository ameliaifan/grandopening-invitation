
const questionBank = [
    {
        question: "Manakah yang merupakan Naga Hijau?",
        answers: [
            { tiles: ["1.png"], correct: true },
            { tiles: ["2.png"], correct: false },
            { tiles: ["3.png"], correct: false },
            { tiles: ["4.png"], correct: false }
        ]
    },
    {
        question: "Manakah susunan yang disebut Pong?",
        answers: [
            {tiles: ["5.png"], correct: false},
            {tiles: ["8.png"], correct: true},
            {tiles: ["6.png"], correct: false},
            {tiles: ["7.png"], correct: false}
        ]
    },
    {
        question: "Manakah susunan yang disebut Chi?",
        answers: [
            {tiles: ["12.png"],correct: true},
            {tiles: ["9.png"],correct: false},
            {tiles: ["10.png"],correct: false},
            {tiles: ["11.png"],correct: false}
        ]
    },
    {
        question: "Manakah yang merupakan tile Angin?",
        answers: [
            { tiles: ["14.png"], correct: false },
            { tiles: ["16.png"], correct: false },
            { tiles: ["15.png"], correct: false },
            { tiles: ["13.png"], correct: true }
        ]
    },
    {
        question: "Manakah yang merupakan Pair?",
        answers: [
            { tiles: ["18.png"], correct: false },
            { tiles: ["19.png"], correct: true },
            { tiles: ["17.png"], correct: true},
            { tiles: ["20.png"], correct: false}
        ]
    }
];

function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

const questions = shuffle(questionBank).slice(0, 3);

const questionText = document.querySelector("#question-text");
const questionNumber = document.querySelector("#question-number");
const progressFill = document.querySelector("#progress-fill");
const answerOptions = document.querySelector("#answer-options");
const feedback = document.querySelector("#quiz-feedback");

let currentQuestion = 0;
let locked = false;

function showQuestion() {
    locked = false;

    if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();  
    }
    answerOptions.querySelectorAll(".answer-option").forEach((button) => {
        button.blur();
        button.classList.remove("selected");
    });

    const question = questions[currentQuestion];

    questionNumber.textContent =
        `0${currentQuestion + 1} / 03`;

    progressFill.style.width =
        `${((currentQuestion + 1) / 3) * 100}%`;

    questionText.textContent = question.question;
    answerOptions.innerHTML = "";
    feedback.textContent = "";

    const answers = shuffle(question.answers);

    answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "answer-option";

        const label = document.createElement("span");
        label.className = "answer-label";
        label.textContent = String.fromCharCode(65 + index);

        const tilesContainer = document.createElement("span");
        tilesContainer.className = "answer-tiles";

        answer.tiles.forEach((tileFile) => {
            const image = document.createElement("img");
            image.src = `assets/${tileFile}`;
            image.alt = "Mahjong tile";
            image.className = "mahjong-tile";

            tilesContainer.appendChild(image);
        });

        button.appendChild(label);
        button.appendChild(tilesContainer);

        button.addEventListener("click", () => {
            if (locked) return;

            if (!answer.correct) {
                feedback.textContent = "Belum tepat! Coba pilih jawaban lain.";
                feedback.className = "quiz-feedback incorrect";
                return;
            }

            locked = true;
            feedback.textContent = "Benar! ✨";
            feedback.className = "quiz-feedback correct";

            setTimeout(() => {
                currentQuestion++;

                if (currentQuestion < 3) {
                    showQuestion();
                } else {
                    window.location.href = "invitation.html";
                }
            }, 700);
        });

        answerOptions.appendChild(button);
    });
}

showQuestion();
