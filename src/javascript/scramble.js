document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".scramble").forEach((span) => {
    const words = span.dataset.words.split(",");
    const intervalTime = Number(span.dataset.interval);
    span.textContent = words[0];
    ScrambleText(span, words, intervalTime);
  });
});

var scrambleChar = "<>!#@{}[]%$&*()+_-?/=";
var scrambleCount = 7; //Amount of scrambles for each letter
var scrambleCharFreq = 100; //Time before scrambling next letter
var scrambleFreq = 50; //Time before scrambling to next icon

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
