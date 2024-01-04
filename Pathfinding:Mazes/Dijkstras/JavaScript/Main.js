var canvas;
var canvasContext;
var diagonals = false;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	start();


	var framesPerSecond = 60;
	setInterval(function(){update();},1000/framesPerSecond);

}
	function update(){
	drawEverything();

}

	function start(){
		for(i = 0; i < BRICK_COLS; i++){
			brickGrid[i] = new Array(BRICK_ROWS)
	   	}

	   	for(i = 0; i < BRICK_COLS; i++){
        for(j = 0; j < BRICK_ROWS; j++){
		     brickGrid[i][j] = new nodeClass(i, j)
          }
    	}

    	apple = brickGrid[Math.floor(Math.random() * BRICK_COLS)][Math.floor(Math.random() * BRICK_ROWS)];
    	apple.wall = false;
    	for(i = 0; i < BRICK_COLS; i++){
        for(j = 0; j < BRICK_ROWS; j++){
    	brickGrid[i][j].addNeighbors(brickGrid);
    	}
    	}

    	for(i = 0; i < BRICK_COLS; i++){
        for(j = 0; j < BRICK_ROWS; j++){
			notIncluded.push(brickGrid[i][j])
    	}
    	}

    	// current = brickGrid[Math.floor(Math.random() * BRICK_COLS)][Math.floor(Math.random() * BRICK_ROWS)];
        current = brickGrid[0][0]

    	start = current;
    	current.value = 0;
    	removeFromArray(notIncluded,current)

    	current.wall = false;
    	
    	shortestPathSet.push(current)

    	BRICK_W = (canvas.width-1)/BRICK_COLS;
    	BRICK_H = (canvas.height-1)/BRICK_ROWS;

}


