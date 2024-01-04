function Vector3D(x,y,z){
	this.x = x;
	this.y = y;
	this.z = z;
}

function Triangle(point1,point2,point3){
	this.points = [point1,point2,point3];
}

function Mesh(arrOfTriangles){
	this.triangles = arrOfTriangles;
}

function Matrix4X4(){
	this.m = new Array(4);

	for (var i = 0; i < this.m.length; i++) {
		this.m[i] = new Array(4);
	}

	for (var row = 0; row < this.m.length; row++) {
		for (var col = 0; col < this.m[row].length; col++) {
			this.m[row][col] = 0;
		}
	}
}

function MatrixMultiplication(vect3D,matrix){
	let newVect = new Vector3D(0,0,0);

	newVect.x = vect3D.x * matrix.m[0][0] + vect3D.y * matrix.m[1][0] + vect3D.z * matrix.m[2][0] + matrix.m[3][0];
	newVect.y = vect3D.x * matrix.m[0][1] + vect3D.y * matrix.m[1][1] + vect3D.z * matrix.m[2][1] + matrix.m[3][1];
	newVect.z = vect3D.x * matrix.m[0][2] + vect3D.y * matrix.m[1][2] + vect3D.z * matrix.m[2][2] + matrix.m[3][2];
	let w = vect3D.x * matrix.m[0][3] + vect3D.y * matrix.m[1][3] + vect3D.z * matrix.m[2][3] + matrix.m[3][3];

	if(w !== 0){
		newVect.x /= w;
		newVect.y /= w;
		newVect.z /= w;
	}

	return newVect;
}




// not my code this is used to set an objects value to 
// another objects value without changing the value of the original object

function deepCopy(arr){
  let copy = [];
  arr.forEach(elem => {
    if(Array.isArray(elem)){
      copy.push(deepCopy(elem))
    }else{
      if (typeof elem === 'object') {
        copy.push(deepCopyObject(elem))
    } else {
        copy.push(elem)
      }
    }
  })
  return copy;
}

function deepCopyObject(obj){
  let tempObj = {};
  for (let [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      tempObj[key] = deepCopy(value);
    } else {
      if (typeof value === 'object') {
        tempObj[key] = deepCopyObject(value);
      } else {
        tempObj[key] = value
      }
    }
  }
  return tempObj;
}