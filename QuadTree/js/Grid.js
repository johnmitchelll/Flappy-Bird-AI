const BRICK_COLS = 3;
const BRICK_ROWS = 3;
var BRICK_W;
var BRICK_H;
const BRICK_GAP = 5;

var brickGrid;

function drawAll() {
	colorRect(0,0, canvas.width,canvas.height,'#121212')

	let boundary = new Rectangle(canvas.width/2,canvas.height/2,
								canvas.width/2,canvas.height/2);
	let qt = new QuadTree(boundary,limit,0);


	for (var i = 0; i < points.length; i++) {
		points[i].show();
		points[i].move();
		let p = new Point(points[i].x,points[i].y,points[i]);
		qt.insert(p);
	}
	qt.show();	
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
