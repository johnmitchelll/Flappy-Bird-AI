const BRICK_COLS = 10;
const BRICK_ROWS = 10;
const BRICK_W = 60;
const BRICK_H = 60; 
const BRICK_GAP = 1;
var brickGrid = [0,0,0,0,0,0,0,0,0,0,
                 0,0,0,0,0,0,0,0,0,0,
                 0,0,0,0,0,0,0,0,0,0,
                 0,0,0,0,0,0,0,0,0,0,
                 0,0,0,0,0,0,0,0,0,0,
                 0,0,0,0,0,0,0,0,0,0,
                 0,0,0,0,0,0,0,0,0,0,
                 0,0,0,0,0,0,0,0,0,0,
                 0,0,0,0,0,0,0,0,0,0,
                 0,0,0,0,0,0,0,0,0,0]

var population;
var box1;
var box2;

function drawEverything(){
    colorRect(0,0,canvas.width,canvas.height,'black');

    handleDots();
}

var goal = {x:300.5,y:90,r:15,color:'red'}

  function handleDots(){
    colorCircle(goal.x,goal.y,goal.r,goal.color);

    if(population.allDotsDead){
      population.calculateFitness();
      population.naturalSelection();
      population.mutateChildren();
      population.allDotsDead = false
    }else{
      population.show();
      population.update();
    }
    box1.show();
    box2.show();

  }


function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
    }

function colorCircle(centerX, centerY, radius, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
    }


function drawText(color, words, X, Y){
    canvasContext.fillStyle = color;
    canvasContext.fillText(words, X, Y);
    }


function removeFromArray(array,index){
    for(i = array.length - 1; i >= 0; i--){
        if(array[i] == index){
            array.splice(i, 1);
        }
    }
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.random() * (max - min + 1) + min;
}

function dist(x1,x2,y1,y2){
  var distance = Math.sqrt((x2-x1) * (x2-x1) + (y2-y1) * (y2-y1))
  return distance;
}




