// DOM Elements

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
    {
        question: "Which language is used for web development?",
        answers: [
            { text: "Python", correct: false },
            { text: "JavaScript", correct: true },
            { text: "C++", correct: false },
            { text: "Java", correct: false },
        ],
    },
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "HyperText Markup Language", correct: true },
            { text: "HighText Machine Language", correct: false },
            { text: "Hyper Transfer Markup Language", correct: false },
            { text: "High Transfer Machine Language", correct: false },
        ],
    },
    {
        question: "Which company developed React?",
        answers: [
            { text: "Google", correct: false },
            { text: "Facebook", correct: true },
            { text: "Microsoft", correct: false },
            { text: "Twitter", correct: false },
        ],
    },
    {
        question: "Which tag is used to insert an image in HTML?",
        answers: [
            { text: "<img>", correct: true },
            { text: "<image>", correct: false },
            { text: "<pic>", correct: false },
            { text: "<src>", correct: false },
        ],
    },
    {
        question: "Which of the following is a JavaScript framework?",
        answers: [
            { text: "Laravel", correct: false },
            { text: "React", correct: true },
            { text: "Django", correct: false },
            { text: "Flask", correct: false },
        ],
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Cascading Style Sheets", correct: true },
            { text: "Computer Style Sheets", correct: false },
            { text: "Creative Style System", correct: false },
            { text: "Colorful Style Sheet", correct: false },
        ],
    },
    {
        question: "Which method is used to fetch data in JavaScript?",
        answers: [
            { text: "getData()", correct: false },
            { text: "fetch()", correct: true },
            { text: "pull()", correct: false },
            { text: "query()", correct: false },
        ],
    },
    {
        question:
            "What is the correct syntax to refer to an external script called 'script.js'?",
        answers: [
            { text: "<script src='script.js'>", correct: true },
            { text: "<script href='script.js'>", correct: false },
            { text: "<script ref='script.js'>", correct: false },
            { text: "<script name='script.js'>", correct: false },
        ],
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        answers: [
            { text: "//", correct: true },
            { text: "##", correct: false },
            { text: "<!-- -->", correct: false },
            { text: "**", correct: false },
        ],
    },
    {
        question: "What is the output of 2 + '2' in JavaScript?",
        answers: [
            { text: "4", correct: false },
            { text: "22", correct: true },
            { text: "undefined", correct: false },
            { text: "NaN", correct: false },
        ],
    },
];

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;

maxScoreSpan.textContent = quizQuestions.length;

//even listeners

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    console.log("Quiz started");
    //reset vars
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = "0";

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}

function showQuestion() {
    answersDisabled = false;
    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    questionText.textContent = currentQuestion.question;
    progressBar.style.width = `${
        ((currentQuestionIndex + 1) / quizQuestions.length) * 100
    }%`;

    answersContainer.innerHTML = ""; // Clear previous answers
    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");
        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
        answersContainer.appendChild(button);
    });
}

function selectAnswer(event) {
    if (answersDisabled) return;

    answersDisabled = true;
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    Array.from(answersContainer.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect");
        }
    });

    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1000);
}

function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    const percentage = (score / quizQuestions.length) * 100;
    if (percentage === 100) {
        resultMessage.textContent = "Perfect Score! You're a genius!";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Great job! You scored above 80%!";
    } else if (percentage >= 50) {
        resultMessage.textContent = "Good effort! You scored above 50%.";
    } else {
        resultMessage.textContent = "Keep trying! You can do better.";
    }
}

function restartQuiz() {
    resultScreen.classList.remove("active");
    startQuiz();
}
