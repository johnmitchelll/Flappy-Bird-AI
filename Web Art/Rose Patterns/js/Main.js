var canvas;
var canvasContext;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	start();

	var framesPerSecond = 40;
	setInterval(function(){update();},1000/framesPerSecond);

}
	function update(){
	drawEverything();
}


	function start(){
		colorRect(0, 0, canvas.width, canvas.height, 'rgb(18,18,18)')
		canvasContext.translate(canvas.width/2, canvas.height/2);
}

function sliderChangeD(val){
	document.getElementById('sliderStatusD').innerHTML = val;
	d = val;
}
function sliderChangeN(val){
	document.getElementById('sliderStatusN').innerHTML = val;
	n = val;
}


		