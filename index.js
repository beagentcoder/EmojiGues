const emojiDetails = [
  { description: "Smiling face with sunglasses", emoji: "😎" },
  { description: "Thumbs up", emoji: "👍" },
  { description: "Heart eyes", emoji: "😍" },
  { description: "Crying face", emoji: "😢" },
  { description: "Party popper", emoji: "🎉" },
  // Add more emoji descriptions here
];

function random() {
  let randomNum = Math.floor((Math.random() * 10) / 2);
  return randomNum;
}
//   console.log(x)
let currentEmojiIndex = random();
let score = 0;
let flag = 0;
let seconds

const guessInput = document.getElementById("guess-input");
const resultElem = document.getElementById("result");
const scoreElem = document.getElementById("score");
const restartbtn = document.getElementById("restart-button");
const timerElem = document.getElementById("timer");

let counter;
let timeOutId;
function timer() {
  seconds = 40;
  timerElem.textContent = `Time Left :${seconds} sec`;
  counter = setInterval(() => {
    seconds--;
    timerElem.textContent = `Time Left :${seconds} sec`;
    if (seconds <= 0) {
      clearInterval(counter);
      timerElem.textContent = ` 0 sec`;
      guessInput.value = "";
      guessInput.disabled = true;
      restartbtn.style.display = "inline-block";
      if (score == 5) {
        resultElem.textContent = "Congratulations! You Won!";
      } else {
        resultElem.textContent = "Game Over!";
      }
    }
  }, 1000);
}

function displayEmoji() {
  const descElem = document.getElementById("description");
  descElem.textContent = emojiDetails[currentEmojiIndex].emoji;
  guessInput.focus();
}

function checkGuess() {
  const guess = guessInput.value.trim().toLowerCase();
  const answer = emojiDetails[currentEmojiIndex].description
    .trim()
    .toLowerCase();
  if (guess == answer) {
    resultElem.textContent = "Correct!";
    score++;
  } else {
    resultElem.textContent = "Wrong!";
  }
  scoreElem.textContent = `Score: ${score}`;
  guessInput.value = "";
  guessInput.focus();
  nextEmoji();
}

function nextEmoji() {
  flag++;

  if (checkFlag(flag)) {
    currentEmojiIndex++;
    if (currentEmojiIndex >= emojiDetails.length) {
      currentEmojiIndex = 0;
    }
    displayEmoji();
  } else {
    restartbtn.style.display = "inline-block";
    clearInterval(counter);
    guessInput.disabled = true;
  
    if (score == 5) {
      resultElem.textContent = "Congratulations! You Won!";
    } else {
      guessInput.disabled = true;
      resultElem.textContent = "Game Over!";
    }
  }
}

function checkFlag(flag) {
  if (flag < emojiDetails.length) return true;
  else return false;
}
restartbtn.addEventListener("click", () => {
  restartbtn.style.display = "none";
  currentEmojiIndex = random();
  score = 0;
  scoreElem.textContent = `Score: ${score}`;
  displayEmoji();
  resultElem.textContent = "";
  flag = 0;
  guessInput.disabled = false;
  clearInterval(counter);
  timer();
  guessInput.value = "";
  guessInput.focus();
  //    console.log(flag)
});

document.getElementById("guess-input").addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    checkGuess();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  displayEmoji();
  timer();
});
