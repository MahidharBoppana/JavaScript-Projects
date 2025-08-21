const minNum = 1;
const maxNum = 100;
const answer = Math.floor(Math.random() * (maxNum - minNum) + 1) + minNum;

let attempts = 0;
let input = document.getElementById("input");
let guessBtn = document.getElementById("guessBtn");
let output = document.getElementById("output");

let running = true;

guessBtn.addEventListener("click", function(){
    let guessValue = Number(input.value);
    if(!running) return

    if (isNaN(guessValue)) {
        output.textContent = "❌ Please enter a valid number";
    }else if (guessValue < minNum || guessValue > maxNum) {
        output.textContent = `🚫 Enter a number between ${minNum} - ${maxNum}..`;
    }else{
        attempts++
        if (guessValue < answer) {
            output.textContent = "⬆️ Too Low! Try another number..";
        }else if (guessValue > answer) {
            output.textContent = "⬇️ Too High! Try another number..";
        }else{
            output.innerHTML = `🎉 You guessed correct: ${answer} ✅!It took you ${attempts} attempts.`;
             running = false
        }
    }
input.value = ""
})




