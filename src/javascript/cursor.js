var cursors = [];

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".cursor").forEach((cursor) => {
    const duration = cursor.dataset.duration;

    cursor.style.transform = "translate(-50%, -50%)";
    cursor.style.position = "fixed";
    cursor.style.pointerEvents = "none";

    cursors.push({ obj: cursor, duration: duration });
  });
});

var xPos;
var yPos;

document.body.onpointermove = (event) => {
  const { clientX, clientY } = event;

  xPos = clientX;
  yPos = clientY;

  for (let i = 0; i < cursors.length; i++) {
    AnimateCursor(cursors[i]);
  }
};
function AnimateCursor(cursor) {
  cursor.obj.animate(
    {
      left: `${xPos}px`,
      top: `${yPos}px`,
    },
    { duration: parseInt(cursor.duration), fill: "forwards" },
  );
}
