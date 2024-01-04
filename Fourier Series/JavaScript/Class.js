 function Vector(x,y){
	this.x = x;
	this.y = y;

    this.draw = function(color){
        colorCircle(this.x, this.y, 5, color);
    }
}

function DoCirclesOverlap(x1, y1, r1, x2, y2, r2){
	return distanceOfTwoPoints(x1, y1, x2, y2) <= r1 + r2;
}

function IsPointInCircle(x1, y1, x2, y2, r){
	return distanceOfTwoPoints(x1, y1, x2, y2) <= r;
}
function IsPointInRect(point,x,y,w,h){
	if(point.x >= x && point.x <= x + w
	&& point.y >= y && point.y <= y + h){
		return true;
	}
	return false;
}

function mapVal(minInput, maxInput, minOutPut, maxOutput, input){
    let m = (minOutPut - maxOutput) / (minInput - maxInput);

    let b = maxOutput / m - maxInput;

    return m * input + b;
}

function colorCircle(centerX, centerY, radius, drawColor){
	canvasContext.fillStyle = drawColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0,Math.PI*2, true);
	canvasContext.fill();	
}

function colorNoFillCircle(centerX, centerY, radius, drawColor, width){
	canvasContext.strokeStyle = drawColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0,Math.PI*2, true);
    canvasContext.lineWidth = width;
	canvasContext.stroke();	
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorNoFillRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor){
    canvasContext.beginPath();
    canvasContext.strokeStyle = fillColor;
    canvasContext.rect(topLeftX, topLeftY, boxWidth, boxHeight);
    canvasContext.stroke();
}

function drawLine(x1,y1,x2,y2,width,color){
    canvasContext.lineWidth = width;
    canvasContext.strokeStyle = color;
    canvasContext.beginPath()
    canvasContext.moveTo(x1, y1);
    canvasContext.lineTo(x2, y2);
    canvasContext.stroke();
}

function drawText(color, font, words, X, Y){
  canvasContext.fillStyle = color;
  canvasContext.font = font;
  canvasContext.fillText(words, X, Y);
}

 function drawFillTriangle(x1,y1, x2,y2, x3,y3, color){
   canvasContext.fillStyle = color;
   canvasContext.beginPath();
   canvasContext.moveTo(x1, y1);
   canvasContext.lineTo(x2, y2);
   canvasContext.lineTo(x3, y3);
   canvasContext.fill();
   // canvasContext.closePath();
 }

function drawImageFromSpriteSheetWithRotation(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight, ang, antiAli){
    canvasContext.save();
    canvasContext.translate(dx, dy);
    canvasContext.rotate(ang);
     canvasContext.imageSmoothingEnabled = false; 
    if(antiAli){
        canvasContext.imageSmoothingEnabled = true; 
    }
    canvasContext.drawImage(img, sx, sy, sWidth, sHeight, -dWidth/2, -dHeight/2, dWidth, dHeight);
    canvasContext.restore();
}


function distanceOfTwoPoints(x1, y1, x2, y2){
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}

function removeFromArray(array,index){
    for(i = array.length - 1; i >= 0; i--){
        if(i == index){
            array.splice(index, 1);
        }
    }
}

function removeFromArrayByID(array, id){
    for(i = array.length - 1; i >= 0; i--){
        if(array[i].id == id){
            array.splice(i, 1);
            return;
        }
    }
}

function insertAt(array, index, elementsArray) {
    for(i = elementsArray.length - 1; i >= 0; i--){
        array.splice(index, 0, elementsArray[i]);
    }
}

function updateTimeSteps(){
    currentTime = Date.now();

    totalTime = (currentTime - startTime)/1000;

    elaspedTime = totalTime - prevTotalTime;

    prevTotalTime = totalTime;
}


function measureText(pText, pFontSize, pStyle) {
    var lDiv = document.createElement('div');

    document.body.appendChild(lDiv);

    if (pStyle != null) {
        lDiv.style = pStyle;
    }
    lDiv.style.fontSize = "" + pFontSize + "px";
    lDiv.style.position = "absolute";
    lDiv.style.left = -1000;
    lDiv.style.top = -1000;

    lDiv.textContent = pText;

    var lResult = {
        width: lDiv.clientWidth,
        height: lDiv.clientHeight
    };

    document.body.removeChild(lDiv);
    lDiv = null;

    return lResult;
}

function deepCopy(arr){
  let copy = [];
  arr.forEach(elem => {
    if(Array.isArray(elem)){
      copy.push(deepCopy(elem))
    }else{
      if (typeof elem === 'object') {
        copy.push(deepCopyObject(elem))
    } else {
        copy.push(elem)
      }
    }
  })
  return copy;
}
// Helper function to deal with Objects
function deepCopyObject(obj){
  let tempObj = {};
  for (let [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      tempObj[key] = deepCopy(value);
    } else {
      if (typeof value === 'object') {
        tempObj[key] = deepCopyObject(value);
      } else {
        tempObj[key] = value
      }
    }
  }
  return tempObj;
}



