function Vector(x,y){
	this.x = x;
	this.y = y;
}

function Ball(x,y,r){
	this.pos = new Vector(x,y);
	this.vel = new Vector(0,0);
	this.acc = new Vector(0,0);
	this.r = r;
	this.id = balls.length;
	this.mass = this.r * 10;
	this.simTimeRemaining;
	this.oPos = this.pos;

	this.draw = function(color){
		colorCircle(this.pos.x, this.pos.y, this.r, color);

		let ang = Math.atan2(this.vel.y, this.vel.x);
		drawLine(this.pos.x+Math.cos(ang)*this.r,this.pos.y+Math.sin(ang)*this.r,this.pos.x,this.pos.y,4,"yellow");
	}
}

function LineSegment(sx, sy, ex, ey, r){
	this.start = new Vector(sx, sy);
	this.end = new Vector(ex, ey);
	this.r = r;

	this.draw = function(color){
		colorCircle(this.start.x, this.start.y, this.r, color);
		colorCircle(this.end.x, this.end.y, this.r, color);

		let nx = -(this.end.y - this.start.y);
		let ny = this.end.x - this.start.x;
		let d = Math.sqrt(nx*nx + ny*ny);
		nx /= d;
		ny /= d;

		drawLine(this.start.x+nx*this.r, this.start.y+ny*this.r, this.end.x+nx*this.r, this.end.y+ny*this.r, 1, color);
		drawLine(this.start.x-nx*this.r, this.start.y-ny*this.r, this.end.x-nx*this.r, this.end.y-ny*this.r, 1, color);
	}
}

function DoCirclesOverlap(x1, y1, r1, x2, y2, r2){
	return distanceOfTwoPoints(x1, y1, x2, y2) <= r1 + r2;
}

function IsPointInCircle(x1, y1, x2, y2, r){
	return distanceOfTwoPoints(x1, y1, x2, y2) <= r;
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

function distanceOfTwoPoints(x1, y1, x2, y2){
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}

function updateTimeSteps(){
	currentTime = Date.now();

	totalTime = (currentTime - startTime)/1000;

	elaspedTime = totalTime - prevTotalTime;

	prevTotalTime = totalTime;
}



