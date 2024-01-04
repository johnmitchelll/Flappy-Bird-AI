const BRICK_COLS = 90;
const BRICK_ROWS = 90;
var brickGrid = new Array(BRICK_COLS)
var mouseX;
var mouseY;

function drawEverything (){
    colorRect(0,0,canvas.width,canvas.height,'black');

    for(i = 0; i < BRICK_COLS; i++){
        for(j = 0; j < BRICK_ROWS; j++){

            if(brickGrid[i][j].wall == true){
              brickGrid[i][j].showNode('black');
            }else if(brickGrid[i][j].wall == false){
              brickGrid[i][j].showNode('white');
            }
            if(brickGrid[i][j].door){
                brickGrid[i][j].showNode('white');
            }
          }
    }

        scanMaze();
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