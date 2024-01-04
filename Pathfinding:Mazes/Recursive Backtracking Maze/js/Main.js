var canvas;
var canvasContext;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	start();

	var framesPerSecond = 60;
	setInterval(function(){update();},1000/framesPerSecond);

};


function update(){
	drawEverything();
}

function start(){
	BRICK_W = (canvas.width-1)/BRICK_COLS;
	BRICK_H = (canvas.height-1)/BRICK_ROWS;

	for (var i = 0; i < brickGrid.length; i++) {
		brickGrid[i] = new Array(BRICK_ROWS)
	}

	for (var i = 0; i < BRICK_COLS; i++) {
    for (var j = 0; j < BRICK_ROWS; j++) {
		brickGrid[i][j] = new nodeClass(i,j);
	  }
	}

	    for(i = 0; i < BRICK_COLS; i++){
        for(j = 0; j < BRICK_ROWS; j++){
    	 brickGrid[i][j].addNeighbors(brickGrid);
    	}
    	}

	getCells();

	currentMaze = wallList[0][0];

	current = brickGrid[1][1];
    apple = brickGrid[BRICK_COLS-2][BRICK_ROWS-2]

    current.wall = false;
    apple.wall = false;

    openList.push(current)
}
