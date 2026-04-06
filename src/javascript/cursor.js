var cursor = document.getElementById("cursor");
var cursorOutline = document.getElementById("cursorOutline");
var cursorHoverEls = document.querySelectorAll(".cursorHover");

var cursorSize = 7;
var cursorOutlineSize = 50;

cursor.style.width = cursorSize + "px";
cursor.style.height = cursorSize + "px";

cursorOutline.style.width = cursorOutlineSize + "px";
cursorOutline.style.height = cursorOutlineSize + "px";

document.body.onpointermove = (event) => {
  const { clientX, clientY } = event;

  cursor.animate(
    {
      left: `${clientX - cursorSize / 2}px`,
      top: `${clientY - cursorSize / 2}px`,
    },
    { duration: 0, fill: "forwards" },
  );

  cursorOutline.animate(
    {
      left: `${clientX - cursorOutlineSize / 2}px`,
      top: `${clientY - cursorOutlineSize / 2}px`,
    },
    { duration: 500, fill: "forwards" },
  );
};

document.querySelectorAll(".cursorHover").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursorOutline.classList.add("active");
  });
  el.addEventListener("mouseleave", () => {
    cursorOutline.classList.remove("active");
  });
});
