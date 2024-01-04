// Mouse Input
var mouseX;
var mouseY;
var mouseDown = false;
var mouseInA = false;
var mouseInB = false;
var numFramesAfterClick = 0;
var lastMousePoint = {x:undefined, y:undefined};
var prevMousePoint = {x:undefined, y:undefined};
var prevOrientation = getDeviceOrientation();

function getDeviceOrientation(){
  if(Math.abs(window.orientation) == 90){
    //landscape
    return 0;
  }else{
    //portrait
    return 1;
  }
}

function updateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;

  mouseX = (evt.clientX - rect.left) - canvas.width/2;
  mouseY = (evt.clientY - rect.top) - canvas.height/2;
}

function setMouseDown(evt){
  if(mouseX > canvasOffSets.left && mouseX < canvasOffSets.right &&
     mouseY > canvasOffSets.top && mouseY < canvasOffSets.bottom){
    evt.preventDefault();
  } 

  if(event.changedTouches){
    mouseX = event.changedTouches[0].pageX;
    mouseY = event.changedTouches[0].pageY;
  }

  mouseDown = true;
}

function setMouseUp(evt){
  if(mouseX > canvasOffSets.left && mouseX < canvasOffSets.right &&
     mouseY > canvasOffSets.top && mouseY < canvasOffSets.bottom){
    evt.preventDefault();
  } 
  
  mouseDown = false;
  mouseInA = false;
  mouseInB = false;
  numFramesAfterClick = 0;
}

function touchMove(evt){
  if(mouseX > canvasOffSets.left && mouseX < canvasOffSets.right &&
     mouseY > canvasOffSets.top && mouseY < canvasOffSets.bottom){
    evt.preventDefault();
  } 

  if(event.changedTouches[0]){
    mouseX = event.changedTouches[0].pageX;
    mouseY = event.changedTouches[0].pageY;
  }

  mouseDown = true;
}

document.addEventListener('mousemove', updateMousePos);
document.addEventListener('mousedown', setMouseDown);
document.addEventListener('mouseup', setMouseUp);
//the { passive: false } makes it so that the window will not scroll with the users movement
//it will also get rid of the touch delay on mobile devices 
document.addEventListener('touchstart', setMouseDown, { passive: false });
document.addEventListener('touchend', setMouseUp, { passive: false });
document.addEventListener('touchmove', touchMove, { passive: false });

function handleMouseInput(){

  if(circlePointColision((a / zoom) * canvas.width + offX * canvas.width/zoom,offY * canvas.height/zoom,10, mouseX,mouseY) && mouseDown && mouseInB == false){
    mouseInA  = true;
  }

  if(circlePointColision((b / zoom) * canvas.width + offX * canvas.width/zoom,offY * canvas.height/zoom,10, mouseX,mouseY) && mouseDown && mouseInA == false){
    mouseInB  = true;
  }

  if(mouseInA){
    a = (mouseX / canvas.width) * zoom - offX;
  }
  if(mouseInB){
    b = (mouseX / canvas.width) * zoom - offX;
  }

  if(mouseDown 
    && mouseY > -canvas.height/2 && mouseY < canvas.height 
    && mouseX > -canvas.width/2 && mouseX < canvas.width
    && mouseInA == false && mouseInB == false){

    if(numFramesAfterClick == 0){
      lastMousePoint.x = mouseX;
      lastMousePoint.y = mouseY;
      prevMousePoint.x = mouseX;
      prevMousePoint.y = mouseY;
    }else{
      if(mouseX != prevMousePoint.x){
        let dx = mouseX - prevMousePoint.x;
        offX += dx * zoom/canvas.width;
      }
      if(mouseY != prevMousePoint.y){
        let dy = mouseY - prevMousePoint.y;
        offY += dy * zoom/canvas.height;
      }

      prevMousePoint.x = mouseX;
      prevMousePoint.y = mouseY;
    }

    numFramesAfterClick++; 
  }
}

