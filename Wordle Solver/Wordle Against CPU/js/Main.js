var canvas;
var canvasContext;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	canvas.width  = window.innerWidth//-document.getElementById("rangeslider").offsetWidth;
	canvas.height = window.innerHeight;

	calculateLetterPositionalFrequency();

	start();

	//start of program drawing
  var framesPerSecond = 60;
	setInterval(function(){update();},1000/framesPerSecond);
}

function update(){
	drawGraph();
	handleTurn()
}

function start(){
	initScenes();
	currentScene = scenes[0];

	winner = undefined;
	peeking = false;
	currentTurn = undefined;
	
	cpuWordle = new WordGrid(0);
	playerWordle = new WordGrid(1);
}

