// Mouse Input
var mouseX;
var mouseY;
var mouseDown = false;

function updateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;

  mouseX = (evt.clientX - rect.left - root.scrollLeft) - canvas.width/2;
  mouseY = (evt.clientY - rect.top - root.scrollTop) - canvas.height/2;

}

function setMouseDown(){
  mouseDown = true;
}
function setMouseUp(){
  mouseDown = false;
}

document.addEventListener('mousemove', updateMousePos);
document.addEventListener('mousedown', setMouseDown);
document.addEventListener('mouseup', setMouseUp);

function handleMouseInput(){

}

//Key Input
const UP = 38;
const LEFT = 37;
const RIGHT = 39;
const DOWN = 40;
const W = 87;
const A = 65;
const S = 83;
const D = 68;

var keyHeld_Up = false;
var keyHeld_Left = false;
var keyHeld_Right = false;
var keyHeld_Down = false;
var keyHeld_W = false;
var keyHeld_A = false;
var keyHeld_S = false;
var keyHeld_D = false;

function setKeyHoldState(thisKey, setTo) {
  if(thisKey == UP){
    keyHeld_Up = setTo;
  }
  if(thisKey == LEFT){
    keyHeld_Left = setTo;
  }
  if(thisKey == RIGHT){
    keyHeld_Right = setTo;
  }
  if(thisKey == DOWN){
    keyHeld_Down = setTo;
  }
  if(thisKey == W){
    keyHeld_W = setTo;
  }
  if(thisKey == A){
    keyHeld_A = setTo;
  }
  if(thisKey == S){
    keyHeld_S = setTo;
  }
  if(thisKey == D){
    keyHeld_D = setTo;
  }
}

function handleUserInputs(){

    let vForward = Vector_Mult(vLookDir, CAM_SPEED);
    
    if(keyHeld_Up){
        vCamera = Vector_Add(vCamera, vForward);
    }
    if(keyHeld_Down){
        vCamera = Vector_Sub(vCamera, vForward);
    }
    if(keyHeld_Left){
        fYaw -= CAM_SPEED/2;
    }
    if(keyHeld_Right){
        fYaw += CAM_SPEED/2;
    }

    if(keyHeld_W){
        fTheta += 0.0174533;
    }
    if(keyHeld_A){
        fYaw -= CAM_SPEED/6;
    }
    if(keyHeld_S){
        fTheta -= 0.0174533;
    }
    if(keyHeld_D){
        fYaw += CAM_SPEED/6;
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

