var canvas;
var canvasContext;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	canvas.width  = 800
	canvas.height = 500

	start();

	var framesPerSecond = 10;
	setInterval(function(){update();},1000/framesPerSecond);

};


function update(){
	step();
}
