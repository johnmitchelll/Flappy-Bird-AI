var canvas;
var canvasContext;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	setUp();

	var framesPerSecond = 60;
	setInterval(function(){update();},1000/framesPerSecond);

	}
	function update(){
		drawEverything();
	}

	function setUp(){
		population = new Population(100);
		box1 = new Box(0,canvas.width/2,canvas.width/2,10);
		box2 = new Box(canvas.width-canvas.width/2,canvas.width/3.5,canvas.width/2,10);
	}
