// Quize Data
const quizData = [
  {
    question: "who was the founder of NASA?",
    a: "Abraham Lincoln",
    b: "Dwight D. Eisenhower",
    c: "Bill Nelson",
    d: "Elon Mask",
    answer: "b",
  },
  {
    question: "how many oscar danial day lewis won?",
    a: 1,
    b: 2,
    c: 3,
    d: 0,
    answer: "c",
  },
  {
    question: "Who is the father of operating system??",
    a: "Gary Oldman",
    b: "Steve Jobs",
    c: "Gary Arlen Kildall",
    d: "Bill Gates",
    answer: "c",
  },
  {
    question: "What country has the most deaths in World War 2?",
    a: "Soviat Union",
    b: "Germany",
    c: "USA",
    d: "Italy",
    answer: "a",
  },
  {
    question: "what is the first 'black sabbath' album?",
    a: "Sabbath Bloody Sabbath",
    b: "Sabotage",
    c: "Master of Reality",
    d: "Black Sabbath",
    answer: "d",
  },
];

// DOM Selects
const loader = document.querySelector(".loader");
const question = document.querySelector("#question");
const answerEls = document.querySelectorAll(".answer__radio");
const bar = document.querySelector(".progress__bar");
const textA = document.querySelector("#a__text");
const textB = document.querySelector("#b__text");
const textC = document.querySelector("#c__text");
const textD = document.querySelector("#d__text");

const submitButton = document.querySelector("#submit");
const update = document.querySelector(".update");

// Initialize current data
let currentQuiz = 0;
let score = 0;

// Events

// Content Load
window.addEventListener("DOMContentLoaded", showQuestion);

// Submit
submitButton.addEventListener("click", () => {
  let answer = getAnswer();

  if (answer) {
    afterGetAnswer(answer);
  } else {
    showAlert("Please checked the answer", "error");
  }
});

// Functions

// Get answer
function getAnswer() {
  let answer = undefined;
  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });

  return answer;
}

// After get answer
function afterGetAnswer(ans) {
  // Show Leader
  showLoader();

  let quizNo = quizData.length - currentQuiz - 1;
  showAlert(`You have ${quizNo} Quiz left.`, "success");
  // Remove checked
  removeChecked();

  if (ans === quizData[currentQuiz].answer) {
    score++;
  }

  currentQuiz++;

  // Progress bar
  increaseProgress();

  if (currentQuiz === quizData.length - 1) {
    submitButton.innerText = "Submit All.";
  }

  if (currentQuiz < quizData.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

// Remove checked
function removeChecked() {
  answerEls.forEach((answerEl) => {
    answerEl.checked = false;
  });
}

// Show Loader
function showLoader() {
  loader.classList.add("show");
  setTimeout(() => {
    loader.classList.remove("show");
  }, 1000);
}

// Increase Progress Bar
function increaseProgress() {
  bar.style.width = (currentQuiz * 100) / quizData.length + "%";
  // progressBar.style.width = (position * 100) / 3 + "%";
}

// Show Alert
function showAlert(text, action) {
  update.innerHTML = text;
  update.classList.add(action);

  // Remove after a certain moment
  setTimeout(() => {
    update.innerHTML = "";
    update.classList.remove(action);
  }, 1000);
}

// End Quiz
function endQuiz() {
  const inner = document.querySelector(".wrapper");
  inner.innerHTML = `<p class='result'>Your score is ${score}.</p>
      <button class="quiz__button" onclick="location.reload()" id="again__submit">Do Again.</button>`;
  update.style.opacity = 0;
}

// Show question and answer at HTML docs
function showQuestion() {
  let quiz = quizData[currentQuiz];

  question.innerText = quiz.question;
  textA.innerText = quiz.a;
  textB.innerText = quiz.b;
  textC.innerText = quiz.c;
  textD.innerText = quiz.d;
}
