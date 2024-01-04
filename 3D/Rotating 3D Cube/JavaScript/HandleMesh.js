var meshCube = new Mesh();

var matrixProj = new Matrix4X4();

let matrixRotZ = new Matrix4X4();
let matrixRotX = new Matrix4X4();

var fTheta = 0;

function handleMeshedTriangles(){
	fTheta += 1 * 1/framesPerSecond;

	// Rotation Z
	matrixRotZ.m[0][0] = Math.cos(fTheta);
	matrixRotZ.m[0][1] = Math.sin(fTheta);
	matrixRotZ.m[1][0] = -Math.sin(fTheta);
	matrixRotZ.m[1][1] = Math.cos(fTheta);
	matrixRotZ.m[2][2] = 1;
	matrixRotZ.m[3][3] = 1;

	// Rotation X
	matrixRotX.m[0][0] = 1;
	matrixRotX.m[1][1] = Math.cos(fTheta * 0.5);
	matrixRotX.m[1][2] = Math.sin(fTheta * 0.5);
	matrixRotX.m[2][1] = -Math.sin(fTheta * 0.5);
	matrixRotX.m[2][2] = Math.cos(fTheta * 0.5);
	matrixRotX.m[3][3] = 1;

	//draw triangles 
	for (var i = 0; i < meshCube.triangles.length; i++) {
		//get the rotated Z axis Triangle
		let triangleRotZ = new Triangle(MatrixMultiplication(meshCube.triangles[i].points[0],matrixRotZ),
										MatrixMultiplication(meshCube.triangles[i].points[1],matrixRotZ),
										MatrixMultiplication(meshCube.triangles[i].points[2],matrixRotZ));

		//apply the rotated Z axis to get the rotated X Axis Triangle
		let triangleRotZX = new Triangle(MatrixMultiplication(triangleRotZ.points[0],matrixRotX),
										MatrixMultiplication(triangleRotZ.points[1],matrixRotX),
										MatrixMultiplication(triangleRotZ.points[2],matrixRotX));

		//Translate the triangle the to fit into the FOV
		let triangleTranslated = deepCopyObject(triangleRotZX);
		triangleTranslated.points[0].z += 3;
		triangleTranslated.points[1].z += 3;
		triangleTranslated.points[2].z += 3;


		//project tirangle from 3d to 2d
		let triProjected = new Triangle(MatrixMultiplication(triangleTranslated.points[0],matrixProj),
										MatrixMultiplication(triangleTranslated.points[1],matrixProj),
										MatrixMultiplication(triangleTranslated.points[2],matrixProj));

		//Scale into view
		triProjected.points[0].x += 1; triProjected.points[0].y += 1;
		triProjected.points[1].x += 1; triProjected.points[1].y += 1;
		triProjected.points[2].x += 1; triProjected.points[2].y += 1;

		triProjected.points[0].x *= canvas.width/2; triProjected.points[0].y *= canvas.height/2;
		triProjected.points[1].x *= canvas.width/2; triProjected.points[1].y *= canvas.height/2;
		triProjected.points[2].x *= canvas.width/2; triProjected.points[2].y *= canvas.height/2;

		//draw
		// drawFillTriangle(triProjected.points[0].x,triProjected.points[0].y, 
		// 				   triProjected.points[1].x,triProjected.points[1].y, 
		// 				   triProjected.points[2].x,triProjected.points[2].y,
		// 				   'white');	

		drawNoFillTriangle(triProjected.points[0].x,triProjected.points[0].y, 
						   triProjected.points[1].x,triProjected.points[1].y, 
						   triProjected.points[2].x,triProjected.points[2].y,
						   2,'white');	
	}
}