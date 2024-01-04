
window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;

	start();

	var framesPerSecond = 10;
	setInterval(updateAll, 1000/framesPerSecond);

}

function updateAll() {
	drawAll();
}

function start(){
	canvasContext.translate(canvas.width/2, canvas.height/2);
	colorRect(-canvas.width/2,-canvas.height/2, canvas.width,canvas.height,'rgba(18,18,18)');

	zoom = canvas.width;
	boxSize = canvas.width/4;
	rects.push(new Rect(-boxSize/2,-boxSize/2, boxSize, boxSize));
	line = new Line(Math.random()*canvas.width - canvas.width/2,Math.random()*canvas.height - canvas.height/2,0);
}

