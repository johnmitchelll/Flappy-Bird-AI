var canvas;
var canvasContext;

var elaspedTime;
var prevTotalTime;
var totalTime;
var startTime;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;

	startTime = Date.now();

	start();

	var framesPerSecond = 40;
	setInterval(function(){update();},1000/framesPerSecond);	
}

function update(){
	updateTimeSteps();
	drawEverything();
}


function start(){
	f = new Fourier(0, undefined);
	circles = [f];

	for (var i = 1; i < 6; i++) {
		circles.push(new Fourier(circles[i-1].n+1, circles[i-1]));
	}

	console.log(Math.pow(5, 236) % 7);
}


