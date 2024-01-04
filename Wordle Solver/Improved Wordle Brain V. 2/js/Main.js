var canvas;
var canvasContext;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	canvas.width  = window.innerWidth//-document.getElementById("rangeslider").offsetWidth;
	canvas.height = window.innerHeight;

	calculateWordConfigurations()

	start();

	//start of program drawing
  var framesPerSecond = 100;
	setInterval(function(){update();},1000/framesPerSecond);
}

function update(){
	drawGraph();
	handleTurn();
}

function start(){
	initScenes();
	currentScene = scenes[1];

	turn = 0;

	winner = undefined;
	peeking = false;
	currentTurn = "Player";
	
	
	cpuWordle = new WordGrid(0);
	playerWordle = new WordGrid(1);
}

