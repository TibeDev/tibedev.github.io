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
