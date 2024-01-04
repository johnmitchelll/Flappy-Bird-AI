var mouseX;
var mouseY;
var mouseDown = false;
const SPACE = 32;
var keyHeld_Space = false;

function updateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;

  mouseX = evt.clientX - rect.left - root.scrollLeft;
  mouseY = evt.clientY - rect.top - root.scrollTop;
}

function handleMouseDown(evt) {
	mouseDown = true;	
}

function handleMouseUp(evt){
	mouseDown = false;
}

document.addEventListener('mousemove', updateMousePos);
document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mouseup', handleMouseUp);


function setKeyHoldState(thisKey, setTo) {
	if(thisKey == SPACE){
		keyHeld_Space = setTo;
	}
}

function keyPressed(evt){
	setKeyHoldState(evt.keyCode, true);
	evt.preventDefault();
}

function keyReleased(evt){
	setKeyHoldState(evt.keyCode, false);
}

document.addEventListener('keydown', keyPressed);
document.addEventListener('keyup', keyReleased);
