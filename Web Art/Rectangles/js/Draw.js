var rects = [];
var line;
var boxSize;
var go = true;
var zoom;

function drawAll() {
	colorRect(-canvas.width/2,-canvas.height/2, canvas.width,canvas.height,'rgba(18,18,18)');

	// step();
	
	for (var i = 0; i < rects.length; i++) {
		rects[i].show('white');
	}

	line.show('red');

}

function colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
}
function colorNoFillRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor) {
	canvasContext.strokeStyle = fillColor;
	canvasContext.strokeRect(topLeftX,topLeftY, boxWidth,boxHeight);
}

function drawLine(x1,y1,x2,y2,width,color){
    canvasContext.lineWidth = width;
    canvasContext.strokeStyle = color;
    canvasContext.beginPath()
    canvasContext.moveTo(x1, y1);
    canvasContext.lineTo(x2, y2);
    canvasContext.stroke();
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
