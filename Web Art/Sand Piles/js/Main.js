var canvas;
var canvasContext;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	start();

	var framesPerSecond = 10;
	setInterval(function(){update();},1000/framesPerSecond);

}
	function update(){
	drawEverything();
}


var initailSand = 20000;

	function start(){
		BRICK_W = canvas.width/BRICK_COLS;
		BRICK_H = canvas.height/BRICK_ROWS;

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
		     brickGrid[i][j].addNeighbors();
          }
    	}


    	//center grid peice to start with lots of sand
    	brickGrid[BRICK_COLS/2-.5][BRICK_ROWS/2-.5].value = initailSand;
}

function sliderChange(val){
	document.getElementById('sliderStatus').innerHTML = val;
	rate = val;
}
		