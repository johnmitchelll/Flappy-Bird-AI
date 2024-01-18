var population;
var walls = new Array(3);

var display = 0;
var dir = 0;

function drawEverything (){
  colorRect(0,0, canvas.width,canvas.height, 'darkblue');
  
  for (var i = 0; i < walls.length; i++) {
    walls[i].show('green');
  }

  // population.payingAttentionTo.show('purple');
    
    population.update();
    population.show();

    population.balls[display].brain.display();

  let width = measureTextWidth(population.currentBestScore, "Arial", 30);

  drawText('white', '30px Arial', population.currentBestScore, 
          canvas.width/2 - width/2, 100);

  width = measureTextWidth("Best Score: " + population.bestScore, "Arial", 30);

  drawText('white', '30px Arial', "Best Score: " + population.bestScore, 
          canvas.width - width - 10, 50);

  width = measureTextWidth("Generation: " + (population.genNum+1), "Arial", 30);

  drawText('white', '30px Arial', "Generation: " + (population.genNum+1), 
          canvas.width - width - 10, 100);

  width = measureTextWidth("Birds Left: " + population.amountAlive, "Arial", 30);

  drawText('white', '30px Arial', "Birds Left: " + population.amountAlive, 
          canvas.width - width - 10, 150);
}

var bird = document.createElement("img");

function loadImages() {
  bird.src = "imgs/bird.png";
}

function showAllBrains(){
  if(display < population.balls.length-1 && dir == 0){
     display++;
  }else{
    dir = 1;
  }

  if(display > 0 && dir == 1){
    display--;
  }else{
    dir = 0;
  }
}

function colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
}


function colorCircle(centerX, centerY, radius, drawColor){
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0,Math.PI*2, true);
  canvasContext.fill(); 
}

function colorNoFillCircle(centerX, centerY, radius, drawColor){
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  canvasContext.lineWidth = 3;
  canvasContext.strokeStyle = drawColor;
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

function randomIntFromInterval(min, max) { // min and max included 
  return Math.random() * (max - min) + min;
}

  function drawText(color, font, words, X, Y){
    canvasContext.fillStyle = color;
    canvasContext.font = font;
    canvasContext.fillText(words, X, Y);
}

function removeFromArray(array,index){
    for(i = array.length - 1; i >= 0; i--){
        if(array[i] == index){
            array.splice(i, 1);
        }
    }
}

function measureTextWidth(text, font, fontSize) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = `${fontSize}px ${font}`;
  return context.measureText(text).width;
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



// Helper function to deal with Arrays
function deepCopy(arr) {
  let copy = [];
  arr.forEach(elem => {
    if (Array.isArray(elem)) {
      copy.push(deepCopy(elem));
    } else {
      if (typeof elem === 'object') {
        copy.push(deepCopyObject(elem));
      } else {
        copy.push(elem);
      }
    }
  });
  return copy;
}

// Helper function to deal with Objects
function deepCopyObject(obj) {
  let tempObj = {};
  for (let [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      tempObj[key] = deepCopy(value);
    } else {
      if (typeof value === 'object') {
        tempObj[key] = deepCopyObject(value);
      } else {
        tempObj[key] = value;
      }
    }
  }
  return tempObj;
}
