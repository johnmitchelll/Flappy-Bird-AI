var canvas;
var canvasContext;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	start();

	var framesPerSecond = 100;
	setInterval(function(){update();},1000/framesPerSecond);

}
	function update(){
	drawEverything();
}

