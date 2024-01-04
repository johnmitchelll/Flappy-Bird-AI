const BRICK_COLS = 100;
const BRICK_ROWS = 100;
var brickW;
var brickH;
const BRICK_GAP = 1;
var brickGrid = new Array(BRICK_COLS)

function nodeClass(col,row){
    this.f = 0;
    this.i = col;
    this.j = row;
    this.index = col + BRICK_COLS * row;
    this.parent = undefined;
    this.g = 0;
    this.h = 0;
    
    this.wall;

    if(Math.random() > .1){
        this.wall = false;
    }else{
        this.wall = true;
    }

    this.showNode = function(color){
        if(this.wall){
            color = "black"
        }
                canvasContext.fillStyle = color;
                canvasContext.fillRect(this.i * brickW +1 ,this.j * brickH +1,
                                        brickW-1,brickH-1);

    }

    this.neighbors = [];
    this.addNeighbors = function(grid){
    var i = this.i;
    var j = this.j;
        if(i < BRICK_COLS-1){
            this.neighbors.push(grid[i+1][j])
        }
        if(i > 0){
            this.neighbors.push(grid[i-1][j]);
        }
        if(j < BRICK_ROWS - 1){
            this.neighbors.push(grid[i][j+1]);
        }
        if(j > 0){
            this.neighbors.push(grid[i][j-1]);
        }

    if(diagonals){
        if(i < BRICK_COLS-1 && j < BRICK_ROWS - 1){
            this.neighbors.push(grid[i+1][j+1]);
        }
        if(i < BRICK_COLS-1 && j > 0){
            this.neighbors.push(grid[i+1][j-1]);
        }
        if(j > 0 && i > 0){
            this.neighbors.push(grid[i-1][j-1]);
        }
        if(i > 0 && j < BRICK_ROWS - 1){
            this.neighbors.push(grid[i-1][j+1]);
        }
    }

    }
}

function drawEverything (){
    colorRect(0,0,canvas.width,canvas.height,'black');

    for(i = 0; i < brickGrid.length; i++){
        for(j = 0; j < brickGrid.length; j++){
              brickGrid[i][j].showNode('white');
          }
    }

    apple.showNode('red')
    

    for(i=1;i<openList.length;i++){
        openList[i].showNode("green")
    }

    for(i=0;i<closedList.length;i++){
        closedList[i].showNode("orange")
    }

    for(var i = 0; i < path.length; i++){
        path[i].showNode("blue")
    }

    current.showNode('blue')

    scan();


}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}


function drawText(color, words, X, Y){
    canvasContext.fillStyle = color;
    canvasContext.fillText(words, X, Y);
  }