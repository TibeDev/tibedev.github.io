var dob = new Date("03/21/2009");
var month_diff = Date.now() - dob.getTime();
var age_dt = new Date(month_diff);
var year = age_dt.getUTCFullYear();
var age = Math.abs(year - 1970);
var ageTxt = document.querySelectorAll(".age");

for (let i = 0; i < ageTxt.length; i++) {
  ageTxt[i].textContent = age;
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".scramble").forEach((span) => {
    const words = span.dataset.words.split(",");
    const intervalTime = Number(span.dataset.interval);
    span.textContent = words[0];
    ScrambleText(span, words, intervalTime);
  });
});

var scrambleChar = "<>!#@{}[]%$&*()+_-?/=";
var scrambleCount = 5;
var scrambleCharFreq = 75;
var scrambleFreq = 50;

function ScrambleText(textObj, words, loopInterval) {
  var currentWord = 0;
  function RunScramble() {
    if (currentWord == words.length - 1) {
      currentWord = 0;
    } else {
      currentWord++;
    }

    var str = textObj.textContent;
    var targetStr = words[currentWord];

    let length = Math.max(str.length, targetStr.length);

    let totalTime = length * scrambleCharFreq + scrambleCount * scrambleFreq;

    for (let index = 0; index < length; index++) {
      for (let i = 0; i < scrambleCount; i++) {
        setTimeout(
          () => {
            let randomIndex = Math.floor(Math.random() * scrambleChar.length);
            let randomChar =
              i == scrambleCount - 1
                ? (targetStr[index] ?? " ")
                : scrambleChar[randomIndex];

            str = str.slice(0, index) + randomChar + str.slice(index + 1);

            textObj.textContent = str;
          },
          index * scrambleCharFreq + i * scrambleFreq,
        );
      }
    }

    setTimeout(() => {
      setTimeout(RunScramble, loopInterval);
    }, totalTime);
  }
  setTimeout(RunScramble, loopInterval);
}
