var meshCube = new Mesh();

var matrixProj = new Matrix4X4();

let matrixRotZ = new Matrix4X4();
let matrixRotX = new Matrix4X4();

let vCamera = new Vector3D(0,0,0)

var fTheta = 1;

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


		//calculate normal direction of the plane of each triangle
		let normal = new Vector3D();
		let line1 = new Vector3D();
		let line2 = new Vector3D();

		line1.x = triangleTranslated.points[1].x - triangleTranslated.points[0].x;
		line1.y = triangleTranslated.points[1].y - triangleTranslated.points[0].y;
		line1.z = triangleTranslated.points[1].z - triangleTranslated.points[0].z;

		line2.x = triangleTranslated.points[2].x - triangleTranslated.points[0].x;
		line2.y = triangleTranslated.points[2].y - triangleTranslated.points[0].y;
		line2.z = triangleTranslated.points[2].z - triangleTranslated.points[0].z;

		normal.x = line1.y * line2.z - line1.z * line2.y;
		normal.y = line1.z * line2.x - line1.x * line2.z;
		normal.z = line1.x * line2.y - line1.y * line2.x;

		let length = Math.sqrt(normal.x*normal.x + normal.y*normal.y + normal.z*normal.z);
		normal.x /= length; normal.y /= length; normal.z /= length;

 
 		// if the side of the cube is visible from the cameras pos
		if(normal.x * (triangleTranslated.points[0].x - vCamera.x) +  
		   normal.y * (triangleTranslated.points[0].y - vCamera.y) +
		   normal.z * (triangleTranslated.points[0].z - vCamera.z) < 0){

		   	let lightDir = new Vector3D(0, 0, -1)
		   	let l = Math.sqrt(lightDir.x*lightDir.x + lightDir.y*lightDir.y + lightDir.z*lightDir.z);
			lightDir.x /= l; lightDir.y /= l; lightDir.z /= l;

			let dp = normal.x * lightDir.x +  normal.y * lightDir.y  + normal.z * lightDir.z;

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
			drawFillTriangle(triProjected.points[0].x,triProjected.points[0].y, 
							   triProjected.points[1].x,triProjected.points[1].y, 
							   triProjected.points[2].x,triProjected.points[2].y, 
							   'rgba('+dp*r+','+dp*g+','+dp*b+')');	

			// drawNoFillTriangle(triProjected.points[0].x,triProjected.points[0].y, 
			// 			   triProjected.points[1].x,triProjected.points[1].y, 
			// 			   triProjected.points[2].x,triProjected.points[2].y,
			// 			   2,'black');	
		}
	}
}