const BRICK_GAP = 0;
var BRICK_W;
var BRICK_H;
const BRICK_COLS = 151;
const BRICK_ROWS = 151;
var brickGrid = new Array(BRICK_COLS)

var rate = 10;

var color = ['rgb(18,18,18)','#5513E8','rgb(122,0,229)','rgb(255,0,100)','rgb(0,104,255)']

function drawEverything (){
    // colorRect(0, 0, canvas.width, canvas.height, 'rgb(18,18,18')
    for(i = 0; i < BRICK_COLS; i++){
        for(j = 0; j < BRICK_ROWS; j++){
            if(brickGrid[i][j].value == 0){
                brickGrid[i][j].showNode(color[0])
            }
            if(brickGrid[i][j].value == 1){
                brickGrid[i][j].showNode(color[1])
            }
            if(brickGrid[i][j].value == 2){
                brickGrid[i][j].showNode(color[2])
            }
            if(brickGrid[i][j].value == 3){
                brickGrid[i][j].showNode(color[3])
            }
            if(brickGrid[i][j].value > 3){
                brickGrid[i][j].showNode(color[4])
            }


          }
        }

    for (var i = 0; i < rate; i++) {
        calculatGridValuesSymetricaly();
    }
        
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