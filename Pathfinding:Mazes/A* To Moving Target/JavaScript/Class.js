function nodeClass(col,row){
    this.i = col;
    this.j = row;
    this.index = col + BRICK_COLS * row;
    this.parent = undefined;
    this.f = 0;
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
                canvasContext.fillRect(this.i * BRICK_W +1 ,this.j * BRICK_H +1,
                                        BRICK_W-1,BRICK_H-1);
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

function Enemy(){
    this.col = Math.floor(Math.random()*BRICK_COLS);
    this.row = Math.floor(Math.random()*BRICK_ROWS);

    while(brickGrid[this.col][this.row].wall == true){
       this.col = Math.floor(Math.random()*BRICK_COLS);
       this.row = Math.floor(Math.random()*BRICK_ROWS);
    }

    this.x = this.col * BRICK_W + BRICK_W/2;
    this.y = this.row * BRICK_H + BRICK_H/2;
    this.path = [];
    this.velX = 0;
    this.velY = 0;
    this.r = 10;

    this.scanToTarget = function(target){
        this.path = scan(brickGrid[this.col][this.row],target);
    }

    this.show = function(color){
        // for (var i = 0; i < this.path.length; i++) {
        //     this.path[i].showNode('yellow')
        // }

        colorCircle(this.x, this.y, this.r, color);
    }

    this.moveOnPath = function(){
        if(this.path !== "no path" && this.path.length > 0){
            let nextPathTarget = this.path[this.path.length-1];

            if(this.col !== nextPathTarget.i || this.row !== nextPathTarget.j){

                if(Math.floor(this.x) < Math.floor(nextPathTarget.i*BRICK_W + BRICK_W/2)){
                    this.velX = 2;
                }else if(Math.floor(this.x) > Math.floor(nextPathTarget.i*BRICK_W + BRICK_W/2)) {
                    this.velX = -2;
                }else if(Math.floor(this.x) == Math.floor(nextPathTarget.i*BRICK_W + BRICK_W/2)){
                     this.velX = 0;
                }

                if(Math.floor(this.y) < Math.floor(nextPathTarget.j*BRICK_H + BRICK_H/2)){
                    this.velY = 2;
                }else if(Math.floor(this.y) > Math.floor(nextPathTarget.j*BRICK_H + BRICK_H/2)) {
                    this.velY = -2;
                }else if(Math.floor(this.y) == Math.floor(nextPathTarget.j*BRICK_H + BRICK_H/2)){
                     this.velY = 0;
                }
            }else{
                removeFromArray(this.path,this.path[this.path.length-1]);
            }

            this.x += this.velX;
            this.y += this.velY;

            this.col = Math.floor(this.x/BRICK_W);
            this.row = Math.floor(this.y/BRICK_H);
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

function colorCircle(centerX, centerY, radius, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}


function heuristic(a, b){
    var dist  = Math.abs((a.i - b.i)) + Math.abs(a.j - b.j);

    return dist;

}

function getRandomInt(max){
    return Math.floor(Math.random() * max)

}


function removeFromArray(array,index){
    for(i = array.length - 1; i >= 0; i--){
        if(array[i] == index){
            array.splice(i, 1);
        }
    }
}
