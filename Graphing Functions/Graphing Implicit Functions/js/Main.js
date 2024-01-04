var canvas;
var canvasContext;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	canvas.height = 450;
	canvas.width  = canvas.height;

	start();

	//start of program drawing
  var framesPerSecond = 30;
	setInterval(function(){update();},1000/framesPerSecond);
}

function update(){
	drawGraph();
}

function start(){
  canvasContext.translate(canvas.width/2, canvas.height/2);

  //get domain of function at starting t
  domain = new Array(canvas.width);
  getDomain(t);

}

