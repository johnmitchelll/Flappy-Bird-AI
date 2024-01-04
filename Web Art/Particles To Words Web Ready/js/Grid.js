const CELL_COLS = 5;
const CELL_ROWS = 7;

var BUFFER_ROWS = undefined;
var BRICK_COLS = undefined;
var BRICK_ROWS = undefined;
var BRICK_W;
var BRICK_H;
const BRICK_GAP = 1;

///MUST BE LOWER CASE!!!
var words =  "hello"

var brickGrid;

function drawAll() {
// colorRect(0,0, canvas.width,canvas.height,'rgba(18,18,18)')
	// showGrid()

	for (var i = 0; i < points.length; i++) {
		points[i].show();
		points[i].move();
	}
}

function showGrid(){
	for (var i = 0; i < BRICK_COLS; i++) {
		for (var j = 0; j < BRICK_ROWS; j++) {
			if(brickGrid[i][j].target == false){
				brickGrid[i][j].show('white');
			}
		}
	}
}

function colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
}

function colorCircle(centerX,centerY, radius, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX,centerY, radius, 0,Math.PI*2, true);
	canvasContext.fill();
}

function colorText(showWords, textX,textY, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillText(showWords, textX, textY);
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.random() * (max - min + 1) + min;
}
