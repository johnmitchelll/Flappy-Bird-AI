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

	var framesPerSecond = 90;
	setInterval(function(){update();},1000/framesPerSecond);	
}

function update(){
	updateTimeSteps();
	drawEverything();
}

function start(){
	prevTotalTime = 0;
	ballRadii = 30;

	balls = [];
	for (var i = 0; i < 16; i++) {
		balls.push(new Ball(Math.random()*canvas.width, Math.random()*canvas.height, ballRadii));
	}

	lines = [];
	lineRadii = 10;
	lines.push(new LineSegment(100,100,300,100, lineRadii));
	lines.push(new LineSegment(100,200,300,200, lineRadii));
	lines.push(new LineSegment(100,300,300,300, lineRadii));
}

