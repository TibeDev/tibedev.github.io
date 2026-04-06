//Input and Pos stuff
var xDir = 1;
var yDir = 0;
let changedDir = false;

var xPos = 0;
var yPos = 0;

//Grid stuff
var gridSize = 25;
var amountOfTiles = 10;
var tileSize = gridSize / amountOfTiles;
var unitType = "rem";

//Snake stuff
var snakeBodyParts = [];

var snakeHead = document.getElementById("snake-head");
snakeHead.style.display = "none";
snakeHead.style.width = tileSize + unitType;
snakeHead.style.height = tileSize + unitType;

var snakeGrid = document.getElementById("snake-grid");
snakeGrid.style.width = gridSize + unitType;
snakeGrid.style.height = gridSize + unitType;

snakeGrid.style.backgroundSize =
  tileSize * 2 + unitType + " " + tileSize * 2 + unitType;

//Fruits
var fruits = [];
var amountOfFruits = 2;

//Game loop
let gameLoop;

//Screens
var startGameScreen = document.getElementById("start-game");
var endGameScreen = document.getElementById("end-game");

//Score
var scoreTxts = document.querySelectorAll(".score-txt");
var score = 0;

//Input
SetInputListener();
function SetInputListener() {
  document.addEventListener("keydown", function (event) {
    switch (event.key) {
      case "ArrowLeft":
        if (xDir == 0 && !changedDir) {
          xDir = -1;
          yDir = 0;
          changedDir = true;
        }
        break;
      case "ArrowUp":
        if (yDir == 0 && !changedDir) {
          yDir = -1;
          xDir = 0;
          changedDir = true;
        }
        break;
      case "ArrowRight":
        if (xDir == 0 && !changedDir) {
          xDir = 1;
          yDir = 0;
          changedDir = true;
        }
        break;
      case "ArrowDown":
        if (yDir == 0 && !changedDir) {
          yDir = 1;
          xDir = 0;
          changedDir = true;
        }
        break;
    }
  });
}

//Game stuff
function StartGame() {
  window.addEventListener("keydown", handleArrowKeys);

  ResetValues();
  ResetSnakePos();

  StartGameLoop();
  AddBodyPart();

  for (let i = 0; i < amountOfFruits; i++) {
    AddNewFruit();
  }

  SetElementDisplay(snakeHead, "flex");
  SetElementDisplay(startGameScreen, "none");
  SetElementDisplay(endGameScreen, "none");
}
function StartGameLoop() {
  gameLoop = setInterval(() => {
    GameLoop();
  }, 325);
}
function StopGame() {
  window.removeEventListener("keydown", handleArrowKeys);

  RemoveGameElements();

  SetElementDisplay(snakeHead, "none");
  SetElementDisplay(endGameScreen, "flex");

  clearInterval(gameLoop);
}
function GameLoop() {
  xPos += xDir * tileSize;
  yPos += yDir * tileSize;

  CheckFruitCollision();
  CheckCollision();

  FollowSnakeTrail();
  MoveSnakeHead();

  changedDir = false;
}

//Adding element
function AddBodyPart() {
  let newBodyPart = document.createElement("div");
  newBodyPart.className = "snake-body";

  newBodyPart.style.width = tileSize + unitType;
  newBodyPart.style.height = tileSize + unitType;

  let bodyPartContent = document.createElement("div");
  newBodyPart.appendChild(bodyPartContent);

  snakeGrid.appendChild(newBodyPart);
  let lastBodyPart = snakeBodyParts[snakeBodyParts.length - 1];
  if (lastBodyPart != null) {
    newBodyPart.style.left = lastBodyPart.style.left;
    newBodyPart.style.top = lastBodyPart.style.top;
  }

  snakeBodyParts.push(newBodyPart);
}
function AddNewFruit() {
  let newFruit = document.createElement("div");
  newFruit.className = "fruit";

  newFruit.style.width = tileSize + unitType;
  newFruit.style.height = tileSize + unitType;

  let fruitContent = document.createElement("div");
  newFruit.appendChild(fruitContent);

  let fruitLeft, fruitTop;

  do {
    let randomPosX = Math.floor(Math.random() * amountOfTiles);
    let randomPosY = Math.floor(Math.random() * amountOfTiles);
    fruitLeft = randomPosX * tileSize + unitType;
    fruitTop = randomPosY * tileSize + unitType;
  } while (isOccupiedBySnake(fruitLeft, fruitTop));

  newFruit.style.left = fruitLeft;
  newFruit.style.top = fruitTop;

  snakeGrid.appendChild(newFruit);

  fruits.push(newFruit);
}
function isOccupiedBySnake(left, top) {
  if (snakeHead.style.left === left && snakeHead.style.top === top) {
    return true;
  }
  for (let i = 0; i < fruits.length; i++) {
    if (fruits[i].style.left === left && fruits[i].style.top === top) {
      return true;
    }
  }
  for (let i = 0; i < snakeBodyParts.length; i++) {
    if (
      snakeBodyParts[i].style.left === left &&
      snakeBodyParts[i].style.top === top
    ) {
      return true;
    }
  }
  return false;
}
function handleArrowKeys(e) {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
    e.preventDefault();
  }
}

//Resetting
function ResetValues() {
  score = 0;
  SetScoreToText();

  xDir = 1;
  yDir = 0;

  xPos = 0;
  yPos = 0;
}
function ResetSnakePos() {
  snakeHead.style.left = 0;
  snakeHead.style.top = 0;
}
function RemoveGameElements() {
  snakeBodyParts.forEach((part) => part.remove());
  snakeBodyParts = [];

  fruits.forEach((fruit) => fruit.remove());
  fruits = [];
}

//Setting stuff
function SetScoreToText() {
  for (let j = 0; j < scoreTxts.length; j++) {
    scoreTxts[j].textContent = score;
  }
}
function SetElementDisplay(el, type) {
  el.style.display = type;
}

//Collision
function CheckFruitCollision() {
  for (let i = 0; i < fruits.length; i++) {
    if (
      xPos + unitType == fruits[i].style.left &&
      yPos + unitType == fruits[i].style.top
    ) {
      AddBodyPart();
      AddNewFruit();

      fruits[i].remove();
      fruits.splice(i, 1);

      score++;
      SetScoreToText();
    }
  }
}
function CheckCollision() {
  if (xPos < 0 || xPos >= gridSize || yPos < 0 || yPos >= gridSize) {
    StopGame();
    return;
  } else {
    for (let i = 0; i < snakeBodyParts.length; i++) {
      if (
        xPos + unitType == snakeBodyParts[i].style.left &&
        yPos + unitType == snakeBodyParts[i].style.top
      ) {
        StopGame();
        return;
      }
    }
  }
}

//Moving Snake
function MoveSnakeHead() {
  snakeHead.style.left = xPos + unitType;
  snakeHead.style.top = yPos + unitType;
}
function FollowSnakeTrail() {
  for (let i = 0; i < snakeBodyParts.length; i++) {
    let targetPart =
      i >= snakeBodyParts.length - 1 ? snakeHead : snakeBodyParts[i + 1];

    snakeBodyParts[i].style.left = targetPart.style.left;
    snakeBodyParts[i].style.top = targetPart.style.top;
  }
}
