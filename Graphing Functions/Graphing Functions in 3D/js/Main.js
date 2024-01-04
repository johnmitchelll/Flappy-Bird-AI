var canvas;
var canvasContext;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	canvas.width  = window.innerWidth-document.getElementById("rangeslider").offsetWidth;
	canvas.height = window.innerHeight;

	start();

	setInterval(function(){iterate();},1000/framesPerSecond);
}

function iterate(){
	update();
	drawToScreen();
}

function start(){
  canvasContext.translate(canvas.width/2, canvas.height/2);

  let arrOfAxies = [
		//X
		new Line(new Vector3D(-LEN_OF_VISIBLE_GRAPH, 0, 0),
			new Vector3D(LEN_OF_VISIBLE_GRAPH, THICKNES_OF_LINES, THICKNES_OF_LINES),255,255,255),

		// //Y
		new Line(new Vector3D(0, -LEN_OF_VISIBLE_GRAPH, 0),
			new Vector3D(THICKNES_OF_LINES, LEN_OF_VISIBLE_GRAPH, THICKNES_OF_LINES),255,255,255),

		//Z
		new Line(new Vector3D(0, 0, -LEN_OF_VISIBLE_GRAPH),
			new Vector3D(THICKNES_OF_LINES, THICKNES_OF_LINES, LEN_OF_VISIBLE_GRAPH),255,255,255)
	];

	let arrOfMarkers = [];

	for (var i = 0; i < NUM_MARKS+1; i++) {
		//X
		arrOfMarkers.push(new Line(new Vector3D(-LEN_OF_VISIBLE_GRAPH, i - LEN_OF_VISIBLE_GRAPH, 0),
			                         new Vector3D(LEN_OF_VISIBLE_GRAPH, i - LEN_OF_VISIBLE_GRAPH + THICKNES_OF_LINES, THICKNES_OF_LINES),
			                         0,0,255));
	}
	for (var i = 0; i < NUM_MARKS+1; i++) {
		//Y
		arrOfMarkers.push(new Line(new Vector3D(i - LEN_OF_VISIBLE_GRAPH, -LEN_OF_VISIBLE_GRAPH, 0),
															 new Vector3D(i - LEN_OF_VISIBLE_GRAPH + THICKNES_OF_LINES, LEN_OF_VISIBLE_GRAPH, THICKNES_OF_LINES),
															 0,0,255));
	}

	graph = new Graph(arrOfAxies, arrOfMarkers);


	getMeshDomain()
}

