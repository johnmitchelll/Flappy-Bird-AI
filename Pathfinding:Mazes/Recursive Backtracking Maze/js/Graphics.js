const BRICK_COLS = 60;
const BRICK_ROWS = 60;
var BRICK_W;
var BRICK_H;
const BRICK_GAP = 1;

var brickGrid = new Array(BRICK_COLS)

 function drawEverything(){
  // colorRect(0,0,canvas.width,canvas.height,'black');


  for (var i = 0; i < BRICK_COLS; i++) {
    for (var j = 0; j < BRICK_ROWS; j++) {
          brickGrid[i][j].show('white')

        if(brickGrid[i][j].wall){
          brickGrid[i][j].show('black')
        }
    }
  }

  for (var i = 0; i < cellCols; i++) {
    for (var j = 0; j < cellRows; j++) {
       wallList[i][j].handleWalls();
    }
  }

    apple.show('red')
    

    for(i=1;i<openList.length;i++){
        openList[i].show("#A500EA")
    }

    for(i=0;i<closedList.length;i++){
        closedList[i].show("#73109E")
    }

    for(var i = 0; i < path.length; i++){
        path[i].show("#A3EB00")
    }

    current.show('blue')

    if(doneWithMaze == false){
       scanMaze();
    }else if(done == false){
      scan();
    }
    
 }

function randomIntFromInterval(min, max) {
  return Math.random() * (max - min + 1) + min;
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
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