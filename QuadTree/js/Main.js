
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
function start(){
	for (var i = 0; i < 2000; i++) {
		points[i] = new Point(randomIntFromInterval(0, canvas.width),
							randomIntFromInterval(0, canvas.height));
	}
	
}


var mouseX;
var mouseY;

function updateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;

  mouseX = evt.clientX - rect.left - root.scrollLeft;
  mouseY = evt.clientY - rect.top - root.scrollTop;
}


function handleMouseClick(){
	dir *= -1;
	console.log(dir)
}

document.addEventListener('mousemove', updateMousePos);
document.addEventListener('mousedown', handleMouseClick);
