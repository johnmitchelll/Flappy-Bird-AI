
window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;

	start();

	var framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);

}

function updateAll() {
	drawAll();
}


var points = [];
var scale = 4;
function start(){
	colorRect(0,0, canvas.width,canvas.height,'rgba(18,18,18)')

	BRICK_COLS = words.length * (CELL_COLS*scale) + words.length + scale * 2 + scale;

	BUFFER_ROWS = (words.length * 2)*scale;

	BRICK_ROWS = CELL_ROWS + BUFFER_ROWS;

	BRICK_W = canvas.width/BRICK_COLS;
	BRICK_H = canvas.height/BRICK_ROWS;

	brickGrid = new Array(BRICK_COLS);


	for (var i = 0; i < brickGrid.length; i++) {
		brickGrid[i] = new Array(BRICK_ROWS)
	}

	for (var i = 0; i < BRICK_COLS; i++) {
		for (var j = 0; j < BRICK_ROWS; j++) {
			brickGrid[i][j] = new Node(i,j);
		}
	}

	setTargetedNodes();

	for (var i = 0; i < BRICK_COLS; i++) {
		for (var j = 0; j < BRICK_ROWS; j++) {
			brickGrid[i][j].setAng()
		}
	}

	for (var i = 0; i < 2000; i++) {
		points[i] = new Point(Math.random() * canvas.width,Math.random() * canvas.height);
	}
	
}

