var canvas;
var canvasContext;
var framesPerSecond = 60;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;

	start();

	// drawEverything();

	setInterval(function(){update();},1000/framesPerSecond);	
}

function update(){
	drawEverything();
}


function start(){
	//setting all sides of the mesh cube

	let arrOfTriangles = [
		//SOUTH
		new Triangle(new Vector3D(0, 0, 0),new Vector3D(0, 1, 0),new Vector3D(1, 1, 0)),
		new Triangle(new Vector3D(0,0,0),new Vector3D(1,1,0),new Vector3D(1,0,0)),

		//EAST
		new Triangle(new Vector3D(1, 0, 0),new Vector3D(1, 1, 0),new Vector3D(1, 1, 1)),
		new Triangle(new Vector3D(1, 0, 0),new Vector3D(1, 1, 1),new Vector3D(1, 0, 1)),

		//NORTH
		new Triangle(new Vector3D(1, 0, 1),new Vector3D(1, 1, 1),new Vector3D(0, 1, 1)),
		new Triangle(new Vector3D(1, 0, 1),new Vector3D(0, 1, 1),new Vector3D(0, 0, 1)),

		//WEST
		new Triangle(new Vector3D(0, 0, 1),new Vector3D(0, 1, 1),new Vector3D(0, 1, 0)),
		new Triangle(new Vector3D(0, 0, 1),new Vector3D(0, 1, 0),new Vector3D(0, 0, 0)),

		//TOP
		new Triangle(new Vector3D(0, 1, 0),new Vector3D(0, 1, 1),new Vector3D(1, 1, 1)),
		new Triangle(new Vector3D(0, 1, 0),new Vector3D(1, 1, 1),new Vector3D(1, 1, 0)),

		///BOTTOM
		new Triangle(new Vector3D(1, 0, 1),new Vector3D(0, 0, 1),new Vector3D(0, 0, 0)),
		new Triangle(new Vector3D(1, 0, 1),new Vector3D(0, 0, 0),new Vector3D(1, 0, 0))
	];

	meshCube.triangles = arrOfTriangles;

	//projection matrix set
	let fNear = 0.1;
	let fFar = 1000;
	let fFov = 90;
	let fAspectRatio = canvas.height/canvas.width;
	let fFovRad = 1/Math.tan(fFov*0.5);

	matrixProj.m[0][0] = fAspectRatio * fFovRad;
	matrixProj.m[1][1] = fFovRad;
	matrixProj.m[2][2] = fFar / (fFar - fNear);
	matrixProj.m[3][2] = (-fFar * fNear) / (fFar - fNear);
	matrixProj.m[2][3] = 1;
	matrixProj.m[3][3] = 0;

}

