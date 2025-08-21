document.addEventListener("DOMContentLoaded", () => {
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question");
  const choiceList = document.getElementById("choice-list");
  const displayMarks = document.getElementById("marks");
  const nextBtn = document.getElementById("next-btn");
  const resultContainer = document.getElementById("result-container");
  const totalScore = document.getElementById("score");
  const restartBtn = document.getElementById("restart-btn");
  const startBtn = document.getElementById("start-btn");

  let currentQestionIndex = 0;
  let score = 0;

  const questions = [
    {
      question: "What is the capital of India?",
      choices: ["Mumbai", "New Delhi", "Bangalore", "Chennai"],
      answer: "New Delhi",
      marks: 5,
    },
    {
      question: "Which data type is used to store true/false in JavaScript?",
      choices: ["String", "Number", "Boolean", "Object"],
      answer: "Boolean",
      marks: 3,
    },
    {
      question: "What does HTML stand for?",
      choices: [
        "HyperText Machine Language",
        "HighText Markup Language",
        "HyperText Markup Language",
        "Hyperlink and Text Markup Language",
      ],
      answer: "HyperText Markup Language",
      marks: 4,
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Earth", "Venus", "Mars", "Jupiter"],
      answer: "Mars",
      marks: 3,
    },
    {
      question: "Who developed the theory of relativity?",
      choices: [
        "Isaac Newton",
        "Nikola Tesla",
        "Albert Einstein",
        "Galileo Galilei",
      ],
      answer: "Albert Einstein",
      marks: 5,
    },
    {
      question: "Which is the largest ocean on Earth?",
      choices: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Arctic Ocean",
        "Pacific Ocean",
      ],
      answer: "Pacific Ocean",
      marks: 3,
    },
    {
      question: "What is the square root of 144?",
      choices: ["10", "11", "12", "13"],
      answer: "12",
      marks: 2,
    },
    {
      question: "Which tag is used to insert a line break in HTML?",
      choices: ["<br>", "<hr>", "<p>", "<lb>"],
      answer: "<br>",
      marks: 2,
    },
    {
      question: "Which programming language runs in a web browser?",
      choices: ["Python", "C++", "JavaScript", "Java"],
      answer: "JavaScript",
      marks: 3,
    },
    {
      question: "What year did India gain independence?",
      choices: ["1942", "1945", "1947", "1950"],
      answer: "1947",
      marks: 4,
    },
    {
      question: "Which is the smallest prime number?",
      choices: ["1", "2", "3", "5"],
      answer: "2",
      marks: 2,
    },
    {
      question: "CSS stands for?",
      choices: [
        "Computer Style Sheet",
        "Cascading Style Sheets",
        "Creative Style Sheets",
        "Colorful Style Sheets",
      ],
      answer: "Cascading Style Sheets",
      marks: 3,
    },
    {
      question: "Who is known as the father of computers?",
      choices: ["Bill Gates", "Steve Jobs", "Charles Babbage", "Alan Turing"],
      answer: "Charles Babbage",
      marks: 4,
    },
    {
      question: "Which gas is essential for humans to breathe?",
      choices: ["Nitrogen", "Oxygen", "Carbon Dioxide", "Hydrogen"],
      answer: "Oxygen",
      marks: 1,
    },
    {
      question: "What does JS stand for?",
      choices: ["JavaStyle", "JavaStandard", "JavaScript", "JScript"],
      answer: "JavaScript",
      marks: 2,
    },
  ];

  startBtn.addEventListener("click", startQuizz);

  function startQuizz() {
    choiceList.innerHTML = "";
    // submitBtn.classList.add("hidden");
    startBtn.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    showQuestion();
  }

  let answered = false;

  function showQuestion() {
    answered = false;
    nextBtn.classList.add("hidden");
    questionText.textContent = questions[currentQestionIndex].question;
    questions[currentQestionIndex].choices.forEach((choice) => {
      let li = document.createElement("li");
      li.textContent = choice;
      li.addEventListener("click", () => selectOption(choice, li));
      choiceList.appendChild(li);
    });

    displayMarks.textContent = `Marks : ${questions[currentQestionIndex].marks}`;
  }

  function selectOption(choice, li) {
    if (answered) return;
    answered = true;

    let allChoices = document.querySelectorAll("li");
    allChoices.forEach((item) => {
      item.style.pointerEvents = "none";
    });

    let currentQuestion = questions[currentQestionIndex];
    let correctAnswer = questions[currentQestionIndex].answer;

    if (currentQestionIndex === questions.length - 1) {
      nextBtn.classList.add("hidden");

      if (!document.getElementById("finish-btn")) {
        let submitBtn = document.createElement("button");
        submitBtn.textContent = "Finish";
        submitBtn.id = "finish-btn";
        submitBtn.addEventListener("click", showResult);
        document.getElementById("button-container").appendChild(submitBtn);
      }
    } else {
      nextBtn.classList.remove("hidden");

      const oldFinishBtn = document.getElementById("finish-btn");
      if (oldFinishBtn) oldFinishBtn.remove();
    }

    if (choice === correctAnswer) {
      li.style.backgroundColor = "lightgreen";
      score += currentQuestion.marks;
    } else {
      li.style.backgroundColor = "red";
    }

    allChoices.forEach((item) => {
      if (item.textContent === correctAnswer) {
        item.style.backgroundColor = "lightgreen";
      }
    });
  }

  nextBtn.addEventListener("click", () => {
    currentQestionIndex++;
    choiceList.innerHTML = "";
    if (currentQestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });

  function showResult() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");

    let totalMarks = questions.reduce(
      (sum, question) => sum + question.marks,
      0
    );
    totalScore.textContent = `Total Score : ${score} out of ${totalMarks}`;
  }

  restartBtn.addEventListener("click", () => {
    const oldFinishBtn = document.getElementById("finish-btn");
    if (oldFinishBtn) oldFinishBtn.remove();

    resultContainer.classList.add("hidden");
    currentQestionIndex = 0;
    score = 0;
    startQuizz();
  });
});
