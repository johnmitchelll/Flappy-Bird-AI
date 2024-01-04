const BRICK_COLS = 60;
const BRICK_ROWS = 60;
var BRICK_W;
var BRICK_H;
const BRICK_GAP = 1;
var brickGrid = new Array(BRICK_COLS)

function drawEverything (){
    colorRect(0,0,canvas.width,canvas.height,'black');

    for(i = 0; i < brickGrid.length; i++){
        for(j = 0; j < brickGrid.length; j++){
              brickGrid[i][j].showNode('white');
          }
    }

    apple.showNode('red')
    

    // for(i=0;i<openList.length;i++){
    //     openList[i].showNode("green")
    // }

    for(i=0;i<shortestPathSet.length;i++){
        shortestPathSet[i].showNode("lime")
    }

    for(var i = 0; i < path.length; i++){
        path[i].showNode("blue")
    }

    current.showNode('purple')

    start.showNode('blue')

if(done == false){
  scan();  
}


}


function nodeClass(col,row){
    this.i = col;
    this.j = row;
    this.index = col + BRICK_COLS * row;
    this.parent = undefined;
    this.value = Infinity;
    this.wall = false;

    
    if(Math.random() > .5){
        this.wall = false;
    }else{
        this.wall = true;
    }


    this.showNode = function(color){
        if(this.wall){
            color = "black"
        }
                canvasContext.fillStyle = color;
                canvasContext.fillRect(this.i * BRICK_W + BRICK_GAP ,this.j * BRICK_H + BRICK_GAP,
                                        BRICK_W- BRICK_GAP,BRICK_H- BRICK_GAP);

                // if(this.value < 10000){
                //     drawText('black', this.value, this.i * BRICK_W, this.j * BRICK_H + BRICK_H/1.25)
                // }

    }

    this.neighbors = [];
    this.addNeighbors = function(grid){
    var i = this.i;
    var j = this.j;
        if(i < BRICK_COLS-1 && grid[i+1][j].wall == false){
            this.neighbors.push(grid[i+1][j])
        }
        if(i > 0 && grid[i-1][j].wall == false){
            this.neighbors.push(grid[i-1][j]);
        }
        if(j < BRICK_ROWS - 1 && grid[i][j+1].wall == false){
            this.neighbors.push(grid[i][j+1]);
        }
        if(j > 0 && grid[i][j-1].wall == false){
            this.neighbors.push(grid[i][j-1]);
        }

        if(i < BRICK_COLS-1 && j < BRICK_ROWS - 1 && grid[i+1][j+1].wall == false){
            this.neighbors.push(grid[i+1][j+1]);
        }
        if(i < BRICK_COLS-1 && j > 0 && grid[i+1][j-1].wall == false){
            this.neighbors.push(grid[i+1][j-1]);
        }
        if(j > 0 && i > 0 && grid[i-1][j-1].wall == false){
            this.neighbors.push(grid[i-1][j-1]);
        }
        if(i > 0 && j < BRICK_ROWS - 1 && grid[i-1][j+1].wall == false){
            this.neighbors.push(grid[i-1][j+1]);
        }
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