// Mouse Input
var mouseX;
var mouseY;
var mouseDown = false;

const DELETE = 8;
const SPACE = 32;
const ENTER = 13;
const UP = 38
const DOWN = 40;

function keyPressed(evt){ 
  evt.preventDefault();

  currentScene.onAction(evt.keyCode);
}

document.addEventListener('keydown', keyPressed)
document.addEventListener('mousemove', updateMousePos);
document.addEventListener('mousedown', setMouseDown);
document.addEventListener('mouseup', setMouseUp);

function updateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;

  mouseX = (evt.clientX - rect.left) - canvas.width/2;
  mouseY = (evt.clientY - rect.top) - canvas.height/2;
}

function setMouseDown(){}
function setMouseUp(){}
function handleMouseInput(){}