function nodeClass(col,row){
    this.i = col;
    this.j = row;
    this.index = col + (BRICK_COLS * row);
    this.value = 0;

    this.showNode = function(color){
                canvasContext.fillStyle = color;
                canvasContext.fillRect(this.i * BRICK_W +1 ,this.j * BRICK_H +1,
                                        BRICK_W-BRICK_GAP,BRICK_H-BRICK_GAP);
    }

this.addNeighbors = function(){
    this.neighbors = [];

    var i = this.i;
    var j = this.j;
        if(i < BRICK_COLS-1){
            this.neighbors.push(brickGrid[i+1][j])
        }
        if(i > 0){
            this.neighbors.push(brickGrid[i-1][j]);
        }
        if(j < BRICK_ROWS - 1){
            this.neighbors.push(brickGrid[i][j+1]);
        }
        if(j > 0){
            this.neighbors.push(brickGrid[i][j-1]);
        }
    }
}


function calculatGridValues(){
    for(i = 0; i < BRICK_COLS; i++){
        for(j = 0; j < BRICK_ROWS; j++){
            var neighbors = brickGrid[i][j].neighbors;

        if(brickGrid[i][j].value > 4){

            for (var e = 0; e < neighbors.length; e++) {
                neighbors[e].value++;

            }

            brickGrid[i][j].value -= 4;

            }
        }
    }
}


function calculatGridValuesSymetricaly(){
    var nextPiles = new Array(BRICK_COLS)
    for(i = 0; i < BRICK_COLS; i++){
        nextPiles[i] = new Array(BRICK_ROWS)
    }
    for(i = 0; i < BRICK_COLS; i++){
        for(j = 0; j < BRICK_ROWS; j++){
             nextPiles[i][j] = new nodeClass(i, j)
        }
    }

    for(i = 0; i < BRICK_COLS; i++){
        for(j = 0; j < BRICK_ROWS; j++){
            var num = brickGrid[i][j].value;
            if(num < 4){
                nextPiles[i][j].value = brickGrid[i][j].value;
            }
        }

    }

    for(i = 0; i < BRICK_COLS; i++){
        for(j = 0; j < BRICK_ROWS; j++){
            var num = brickGrid[i][j].value;
            
        if(num >= 4){
            nextPiles[i][j].value += (num - 4);
            if(i < BRICK_COLS-1){
                nextPiles[i+1][j].value++;
            }
            if(i > 0){
                nextPiles[i-1][j].value++;
            }
            if(j < BRICK_ROWS - 1){
                nextPiles[i][j+1].value++;
            }
            if(j > 0){
                nextPiles[i][j-1].value++;
            }
                
            }
        }
    }

    brickGrid = nextPiles;
}



