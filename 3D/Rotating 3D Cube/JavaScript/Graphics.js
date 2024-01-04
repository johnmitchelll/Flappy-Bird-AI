function drawEverything (){
	colorRect(0, 0, canvas.width, canvas.height, 'rgb(18,18,18)');

	handleMeshedTriangles();
}

function colorCircle(centerX, centerY, radius, drawColor){
	canvasContext.fillStyle = drawColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0,Math.PI*2, true);
	canvasContext.fill();	
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function drawLine(x1,y1,x2,y2,width,color){
    canvasContext.lineWidth = width;
    canvasContext.strokeStyle = color;
    canvasContext.beginPath()
    canvasContext.moveTo(x1, y1);
    canvasContext.lineTo(x2, y2);
    canvasContext.stroke();
}

  function drawText(color, font, words, X, Y){
    canvasContext.fillStyle = color;
    canvasContext.font = font;
    canvasContext.fillText(words, X, Y);
  }

  function drawNoFillTriangle(x1,y1, x2,y2, x3,y3, width, color){
  	drawLine(x1,y1,x2,y2,2,'white')
  	drawLine(x2,y2,x3,y3,2,'white')
  	drawLine(x3,y3,x1,y1,2,'white')
  }

  function drawFillTriangle(x1,y1, x2,y2, x3,y3, color){
  	canvasContext.fillStyle = color;
  	canvasContext.beginPath();
    canvasContext.moveTo(x1, y1);
    canvasContext.lineTo(x2, y2);
    canvasContext.lineTo(x3, y3);
    canvasContext.fill();
  }
