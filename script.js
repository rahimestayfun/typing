let quote = document.querySelector(".quote");
quote.innerHTML = "<h3>Let's practice some typing.</h3>";
let userText;
let quoteApi = "https://type.fit/api/quotes";
let randomQuote;
let randomNum;
let isMatching = true;
let userTyping = [];
let music = document.querySelector(".music");
let errorCount = 0;
let timer = 0;
let startBtn = document.querySelector("#startButton");
startBtn.innerText = "Start";
let toggle = document.querySelector('input[type = "checkbox"]');
var canType = false;

function playAudio(e) {
  e.preventDefault();
  let key = document.querySelector(`div[data-key ="${e.keyCode}"]`);
  let audio = document.querySelector(`audio[data-key ="${e.keyCode}"]`);
  if (!canType) return;
  if (!audio) return;
  // console.log(key);
  music.play();
  music.loop = true;
  audio.play();
  audio.currentTime = 0;
  key.classList.add("playing");
  setTimeout(() => {
    key.classList.remove("playing");
  }, 90);

  let quoteSpans = document.querySelectorAll("div>span");
  if (e.key == "Backspace") {
    userTyping.pop();
  } else {
    userTyping.push(e.key);
  }
  // console.log(userTyping);
  quoteSpans.forEach((el, i) => {
    const charToMatch = userTyping[i];
    if (charToMatch == null) {
      el.classList.remove("matching");
      el.classList.remove("unmatching");
    } else if (charToMatch === el.innerText) {
      music.volume = 1;
      el.classList.add("matching");
      el.classList.remove("unmatching");
    } else {
      // let typo = document.createElement("span");
      // typo.innerText = charToMatch;
      // typo.classList.add("correction");
      // const top = el.offsetTop;
      // const left = el.offsetLeft;
      // typo.style.top = `${top}px`;
      // typo.style.left = `${left}px`;
      // document.body.appendChild(typo);
      // el.classList.add("out");
      // setTimeout(() => {
      //   typo.style.display = "none";
      //   el.classList.remove("out");
      //   console.dir(quote);
      // }, 300);

      music.volume = 0.3;
      el.classList.add("unmatching");
      el.classList.remove("matching");
    }
  });
  if (quoteSpans.length !== 0 && quoteSpans.length === userTyping.length) {
    quoteSpans.forEach((quote) => {
      if (quote.className === "unmatching") {
        errorCount++;
      }
    });
    console.log(errorCount);
    errorCount;
    generateQuote();
  }
  // setTimer();
}

function generateQuote() {
  canType = true;
  quote.innerText = "";
  userTyping = [];
  errorCount = 0;
  startBtn.innerText = "Stop";
  return fetch(quoteApi)
    .then((response) => response.json())
    .then((data) => {
      randomNum = Math.floor(Math.random() * data.length);
      randomQuote = data[randomNum].text;
      let splitQuote = randomQuote.split("");
      splitQuote.forEach((char) => {
        const charSpan = document.createElement("span");
        charSpan.innerText = char;
        quote.appendChild(charSpan);
      });
    });
}
function stopTyping() {
  music.pause();
  startBtn.innerText = "Start";
  quote.innerHTML = "<h3>Let's practice some typing.</h3>";
  canType = false;
}

function startStop() {
  if (!canType) {
    generateQuote();
  } else {
    stopTyping();
  }
}

// function setTimer() {
//   setInterval(() => {
//     timer++;
//   }, 1000);
//   // console.log(timer);
// }

window.addEventListener("keydown", playAudio);
startBtn.addEventListener("click", startStop);

toggle.addEventListener("click", (e) => {
  console.log(e);
  if (e.target.checked === true) {
    document.querySelector("body").classList.add("dark");
    document.querySelector(".quote-container").classList.add("dark-mode");
    console.log("dark");
  } else {
    document.querySelector("body").classList.remove("dark");
    document.querySelector(".quote-container").classList.remove("dark-mode");
    console.log("light");
  }
});
