const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const micBtn = document.getElementById("micBtn");

function addMessage(input, className) {
  const div = document.createElement("div");

  div.classList.add("message");

  div.classList.add(className);

  div.innerHTML = input;

  chatBox.appendChild(div);

  chatBox.scrollTop = chatBox.scrollHeight;
}

function calculateExpression(expression) {
   expression = expression.toLowerCase();

  expression = expression.replace(/plus/g, "+");

  expression = expression.replace(/minus/g, "-");

  expression = expression.replace(/multiply by/g, "*");

  expression = expression.replace(/multiplied by/g, "*");

  expression = expression.replace(/times/g, "*");

  expression = expression.replace(/divide by/g, "/");

  expression = expression.replace(/sqrt/g, "Math.sqrt");

  let result = eval(expression);

  return result;
}

function speak(text) {
  let speech = new SpeechSynthesisUtterance(text);

  speech.lang = "en-US";

  window.speechSynthesis.speak(speech);
}

function sendMessage() {
  let input = userInput.value.trim();

  if (input === "") {
    return;
  }

  addMessage(input, "user");

  let answer = calculateExpression(input);

  setTimeout(() => {
    addMessage("Answer: " + answer, "bot");

    speak("The Answer is " + answer);
  }, 500);

  userInput.value = " ";
}

function startVoice() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech Recognition Not Supported");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";

  recognition.start();

  micBtn.classList.add("listening");

  recognition.onresult = function (event) {
    let transcript = event.results[0][0].transcript;

    userInput.value = transcript;
    sendMessage();
  };

  recognition.onend = function () {
    micBtn.classList.remove("listening");
  };
}
