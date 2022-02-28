// Setting Variables // 

var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var timesUp = document.getElementById("timesUp");
var startDiv = document.getElementById("startDiv");
var startQuizBtn = document.getElementById("start-quiz-button");
var questionDiv = document.getElementById("questionDiv");
var questionTitle = document.getElementById("questionTitle");
var choiceA = document.getElementById("choiceA");
var choiceB = document.getElementById("choiceB");
var choiceC = document.getElementById("choiceC");
var choiceD = document.getElementById("choiceD");
var answerCheck = document.getElementById("answerCheck");
var summary = document.getElementById("summary");
var submitInitialsBtn = document.getElementById("submitInitialsBtn");
var initialsInput = document.getElementById("initialsInput");
var highScoreSection = document.getElementById("highScoreSection");
var finalScore = document.getElementById("finalScore");
var goBackBtn = document.getElementById("goBackBtn");
var clearHighScoresBtn = document.getElementById("clearHighScoresBtn");
var previousHighScores = document.getElementById("previousHighScores");
var highScoreList = document.getElementById("highScoreList");

var correctAnswer = 0;
var questionIndex = 0;
var totalTime = 100;

// Setting Questions //

const questions = [
    {
        question: "What is the name of the language that is used to style a website?",
        choices: [
            "a. JavaScript",
            "b. HTML",
            "c. Bootstrap",
            "d. CSS"
        ],
        answer: "d. CSS"
    },
    {
        question: "What element is used to set a hyperlink/link in and HTML document?",
        choices: [
            "a. <a>",
            "b. <p>",
            "c. <link>",
            "d. <img>"
        ],
        answer: "a. <a>"
    },
    {
        question: "What is the name of the website that one can save a local repository?",
        choices: [
            "a. GitLab",
            "b. GitHub",
            "c. Google",
            "d. GitSpace"
        ],
        answer: "b. GitHub"
    },
    {
        question: "True or False: Bootstrap has predetermined css styling for certain elements and can be used along side CSS.",
        choices: [
            "a. True",
            "b. False",
            "c. Maybe True",
            "d. Maybe False",
        ],
        answer: "a. True"
    },
    {
        question: "<article>, <header>, <footer>, are examples of:",
        choices: [
            "a. JavaScript",
            "b. HTML",
            "c. Semantic HTML Elements",
            "d. CSS"
        ],
        answer: "c. Semantic HTML Elements"
    },
    {
        question: "The beginning value in an index of an array is represented by which of the following:",
        choices: [
            "a. [0]",
            "b. [1]",
            "c. [i]",
            "d. [first]"
        ],
        answer: "a. [0]"
    },
    {
        question: "How do you bold a piece of HTML text without using css?",
        choices: [
            "a. <p>",
            "b. <h1>",
            "c. <font-weight-bold>",
            "d. <span>"
        ],
        answer: "d. <span>"
    },    
    {
        question: "What display setting allows for the webpage elements to change and accomodate for the size of the viewprort:",
        choices: [
            "a. block",
            "b. flex",
            "c. column",
            "d. media query"
        ],
        answer: "b. flex"
    },
    {
        question: "What does the following script do: 'function resize() {}'",
        choices: [
            "a. calls the 'resize' function",
            "b. writes out what the 'resize' function will complete",
            "c. all of the above",
            "d. none of the above"
        ],
        answer: "b. writes out what the 'resize' function will complete"
    },
    {
        question: "True or False: it is best to link your script at the bottom of your html document",
        choices: [
            "a. True",
            "b. False",
            "c. Maybe True",
            "d. Maybe False",
        ],
        answer: "a. True"
    },
]

// Create function to start new quiz //

function startQuiz() {
    questionIndex = 0;
    totalTime = 100;
    timeLeft.textContent = totalTime;
    initialsInput.textContent = "";

    startDiv.style.display = "none";
    questionDiv.style.display = "block";
    timer.style.display = "block";
    timesUp.style.display = "none";

    var startTimer = setInterval(function() {
        totalTime--;
        timeLeft.textContent = totalTime;
        if(totalTime <= 0) {
            clearInterval(startTimer);
            if (questionIndex < questions.length - 1) {
                gameOver();
            }
        }
    },1000);

    showQuiz();
};

function showQuiz() {
    nextQuestion();
}

function nextQuestion() {
    questionTitle.textContent = questions[questionIndex].question;
    choiceA.textContent = questions[questionIndex].choices[0];
    choiceB.textContent = questions[questionIndex].choices[1];
    choiceC.textContent = questions[questionIndex].choices[2];
    choiceD.textContent = questions[questionIndex].choices[3];
}

function checkAnswer(answer) {

    var lineBreak = document.getElementById("lineBreak");
    lineBreak.style.display = "block";
    answerCheck.style.display = "block";

    if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
        correctAnswer++;
        answerCheck.textContent = "Nice!";
    } else {
        totalTime -= 10;
        timeLeft.textContent = totalTime;
        answerCheck.textContent = "That is incorrect!"
    }

    questionIndex++;
    if (questionIndex < questions.length) {
        nextQuestion();
    } else {
        gameOver();
    }
}

// add function for each choice selection //

function chooseA() { checkAnswer(0); }
function chooseB() { checkAnswer(1); }
function chooseC() { checkAnswer(2); }
function chooseD() { checkAnswer(3); }

// End Game function //
function gameOver() {
    summary.style.display = "block";
    questionDiv.style.display = "none";
    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "none";
    finalScore.textContent = correctAnswer;
}

// Function for storing high scores//
function storeHighScores(event) {
    event.preventDefault();

    if (initialsInput.value === "") {
        alert("Please enter your initials!");
        return;
    } 

    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";   

    var savedHighScores = localStorage.getItem("high scores");
    var scoresArray;

    if (savedHighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHighScores)
    }

    var userScore = {
        initials: initialsInput.value,
        score: finalScore.textContent
    };

    console.log(userScore);
    scoresArray.push(userScore);

    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);
    
    showHighScores();
}

// Function to show high scores //
var i = 0;
function showHighScores() {

    startDiv.style.display = "none";
    timer.style.display = "none";
    questionDiv.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";

    var savedHighScores = localStorage.getItem("high scores");

    if (savedHighScores === null) {
        return;
    }
    console.log(savedHighScores);

    var storedHighScores = JSON.parse(savedHighScores);

    for (; i < storedHighScores.length; i++) {
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
        highScoreList.appendChild(eachNewHighScore);
    }
}

// Adding Even Listeners to btns //
startQuizBtn.addEventListener("click", startQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

// Event listener for initials btn //

submitInitialsBtn.addEventListener("click", function(event) {
    storeHighScores(event);
});

previousHighScores.addEventListener("click", function(event) {
    showHighScores(event);
});

goBackBtn.addEventListener("click", function() {
    startDiv.style.display = "block";
    highScoreSection.style.display = "none";
});

clearHighScoresBtn.addEventListener("click", function(){
    window.localStorage.removeItem("high scores");
    highScoreList.innerHTML = "high scores have been deleted.";
    highScoreList.setAttribute("style", "font-family: sans-serif; font-style: italic;");
});