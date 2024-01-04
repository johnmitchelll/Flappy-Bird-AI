// Mouse Input
var mouseX;
var mouseY;
var mouseDown = false;

const DELETE = 8;
const SPACE = 32;
const ENTER = 13;
const UP = 38
const RIGHT = 39;
const DOWN = 40;
const LEFT = 37;
const G = 71;
const Y = 89;
const B = 66;


function keyPressed(evt){ 
  currentScene.onAction(evt.keyCode); 
  evt.preventDefault();

  if(winner && evt.keyCode == SPACE){
      start();
  }
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