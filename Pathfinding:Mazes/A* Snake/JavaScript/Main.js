var canvas;
var canvasContext;
var diagonals = true;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	start();
	setUp();


	console.log(0.5 % 1)

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

    	for(i = 0; i < BRICK_COLS; i++){
        for(j = 0; j < BRICK_ROWS; j++){
    	 brickGrid[i][j].addNeighbors(brickGrid);
    	}
    	}

    	brickW = (canvas.width-1)/BRICK_COLS;
    	brickH = (canvas.height-1)/BRICK_ROWS;
}

	function setUp(){
    	current = brickGrid[0][0];
    	apple = brickGrid[Math.floor(Math.random() * BRICK_COLS)]
    					 [Math.floor(Math.random() * BRICK_ROWS)];

    	current.wall = false;
    	apple.wall = false;


    	openList.push(current)

	}

