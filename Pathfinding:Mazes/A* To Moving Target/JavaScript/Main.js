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

    	for(i = 0; i < BRICK_COLS; i++){
        for(j = 0; j < BRICK_ROWS; j++){
    	 brickGrid[i][j].addNeighbors(brickGrid);
    	}
    	}

    	BRICK_W = (canvas.width-1)/BRICK_COLS;
    	BRICK_H = (canvas.height-1)/BRICK_ROWS;

    	for (var i = 0; i < enemys.length; i++) {
     		enemys[i] = new Enemy();
    	}

    	// enemy.scanToTarget(brickGrid[Math.floor(Math.random()*BRICK_COLS)]
    	// 							[Math.floor(Math.random()*BRICK_ROWS)]);

    	for (var i = 0; i < enemys.length; i++) {
     		enemys[i].scanToTarget(brickGrid[0][0]);
    	}
    	

}

	// function setUp(){
 //    	current = brickGrid[0][0];
 //    	apple = brickGrid[Math.floor(Math.random() * BRICK_COLS)]
 //    					 [Math.floor(Math.random() * BRICK_ROWS)];

 //    	current.wall = false;
 //    	apple.wall = false;


    	

	// }

