var canvas;
var canvasContext;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	var framesPerSecond = 50;
	setInterval(function(){update();},1000/framesPerSecond);

}
	function update(){
	drawEverything();
}

