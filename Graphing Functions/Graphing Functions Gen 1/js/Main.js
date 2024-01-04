var canvas;
var canvasContext;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;

	start();

	//start of program drawing
  var framesPerSecond = 30;
	setInterval(function(){update();},1000/framesPerSecond);
}

function update(){
	drawGraph();
}

function start(){
  colorRect(0, 0, canvas.width, canvas.height, 'black');
  canvasContext.translate(canvas.width/2, canvas.height/2);

  getDomain(t);  
}

// Mouse Input
var mouseX;
var mouseY;

function updateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;

  mouseX = (evt.clientX - rect.left - root.scrollLeft) - canvas.width/2;
  mouseY = (evt.clientY - rect.top - root.scrollTop) - canvas.height/2;

}

document.addEventListener('mousemove', updateMousePos);

