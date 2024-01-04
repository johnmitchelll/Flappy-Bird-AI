var canvas;
var canvasContext;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	start();

	var framesPerSecond = 20;
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

    		document.addEventListener('keydown', keyPressed)
			document.addEventListener('keyup', keyReleased)
}



function keyPressed(evt){
    setKeyHoldState(evt.keyCode, true);
    evt.preventDefault();
}
function keyReleased(evt){
    setKeyHoldState(evt.keyCode, false);
    check = 1;
}
