function Vector3D(x,y,z,w){
    this.x = x;
    this.y = y;
    this.z = z;
    if(w){  this.w = w;  }else{ this.w = 1; }
    
}

function Triangle(point1,point2,point3){
    this.points = [point1,point2,point3];
}
function Traingle_Identity(){
    this.points = [new Vector3D(0,0,0),new Vector3D(0,0,0),new Vector3D(0,0,0)];
}


function Line(p1, p2, r,g,b){
    this.r = r;
    this.g = g;
    this.b = b;
    //have point1 and point2 as oposite ends of a cube and create a cube from that
    this.points = [
        // SOUTH
        new Triangle(new Vector3D(p1.x, p1.y, p1.z),new Vector3D(p1.x, p2.y, p1.z),new Vector3D(p2.x, p2.y, p1.z)),
        new Triangle(new Vector3D(p1.x, p1.y, p1.z),new Vector3D(p2.x, p2.y, p1.z),new Vector3D(p2.x, p1.y, p1.z)),

        // // EAST
        new Triangle(new Vector3D(p2.x, p1.y, p1.z),new Vector3D(p2.x, p2.y, p1.z),new Vector3D(p2.x, p2.y, p2.z)),
        new Triangle(new Vector3D(p2.x, p1.y, p1.z),new Vector3D(p2.x, p2.y, p2.z),new Vector3D(p2.x, p1.y, p2.z)),

        // NORTH
        new Triangle(new Vector3D(p2.x, p1.y, p2.z),new Vector3D(p2.x, p2.y, p2.z),new Vector3D(p1.x, p2.y, p2.z)),
        new Triangle(new Vector3D(p2.x, p1.y, p2.z),new Vector3D(p1.x, p2.y, p2.z),new Vector3D(p1.x, p1.y, p2.z)),

        // WEST
        new Triangle(new Vector3D(p1.x, p1.y, p2.z),new Vector3D(p1.x, p2.y, p2.z),new Vector3D(p1.x, p2.y, p1.z)),
        new Triangle(new Vector3D(p1.x, p1.y, p2.z),new Vector3D(p1.x, p2.y, p1.z),new Vector3D(p1.x, p1.y, p1.z)),

        // TOP
        new Triangle(new Vector3D(p1.x, p2.y, p1.z),new Vector3D(p1.x, p2.y, p2.z),new Vector3D(p2.x, p2.y, p2.z)),
        new Triangle(new Vector3D(p1.x, p2.y, p1.z),new Vector3D(p2.x, p2.y, p2.z),new Vector3D(p2.x, p2.y, p1.z)),

        ///BOTTOM
        new Triangle(new Vector3D(p2.x, p1.y, p2.z),new Vector3D(p1.x, p1.y, p2.z),new Vector3D(p1.x, p1.y, p1.z)),
        new Triangle(new Vector3D(p2.x, p1.y, p2.z),new Vector3D(p1.x, p1.y, p1.z),new Vector3D(p2.x, p1.y, p1.z))
        ]
}

function Mesh(arrOfTriangles){
    this.triangles = arrOfTriangles;
}

function Graph(arrOf3DAxies, arrOf3DMarkers, boundary){
    this.axies = arrOf3DAxies;
    this.markers = arrOf3DMarkers;
    this.boundary = boundary;
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

function Matrix_MultiplyVecor(m,vec){
    let v = new Vector3D(0,0,0);

    v.x = vec.x * m.m[0][0] + vec.y * m.m[1][0] + vec.z * m.m[2][0] + vec.w * m.m[3][0];
    v.y = vec.x * m.m[0][1] + vec.y * m.m[1][1] + vec.z * m.m[2][1] + vec.w * m.m[3][1];
    v.z = vec.x * m.m[0][2] + vec.y * m.m[1][2] + vec.z * m.m[2][2] + vec.w * m.m[3][2];
    v.w = vec.x * m.m[0][3] + vec.y * m.m[1][3] + vec.z * m.m[2][3] + vec.w * m.m[3][3];

    return v;
}

function Matrix_MakeIdentity(){
    let m = new Matrix4X4();
    m.m[0][0] = 1;
    m.m[1][1] = 1;
    m.m[2][2] = 1;
    m.m[3][3] = 1;

    return m;
}
function Matrix_MakeRotationX(ang){
    let m = new Matrix4X4();
    m.m[0][0] = 1;
    m.m[1][1] = Math.cos(ang);
    m.m[1][2] = Math.sin(ang);
    m.m[2][1] = -Math.sin(ang);
    m.m[2][2] = Math.cos(ang);
    m.m[3][3] = 1;

    return m;
}
function Matrix_MakeRotationY(ang){
    let m = new Matrix4X4();
    m.m[0][0] = Math.cos(ang);
    m.m[1][1] = Math.sin(ang);
    m.m[2][0] = -Math.sin(ang);
    m.m[1][1] = 1;
    m.m[2][2] = Math.cos(ang);
    m.m[3][3] = 1;

    return m;
}
function Matrix_MakeRotationZ(ang){
    let m = new Matrix4X4();
    m.m[0][0] = Math.cos(ang);
    m.m[0][1] = Math.sin(ang);
    m.m[1][0] = -Math.sin(ang);
    m.m[1][1] = Math.cos(ang);
    m.m[2][2] = 1;
    m.m[3][3] = 1;

    return m;
}
function Matrix_MakeTranslation(x,y,z){
    let m = new Matrix4X4();
    m.m[0][0] = 1;
    m.m[1][1] = 1;
    m.m[2][2] = 1;
    m.m[3][3] = 1;
    m.m[3][0] = x;
    m.m[3][1] = y;
    m.m[3][2] = z;

    return m;
}
function Matrix_MakeProjection(fov,aR,fN,fF){
    let m = new Matrix4X4();
    var fFovRad = 1/Math.tan(fFov/2);

    m.m[0][0] = aR * fFovRad;
    m.m[1][1] = fFovRad;
    m.m[2][2] = fF / (fF - fN);
    m.m[3][2] = (-fF * fN) / (fF - fN);
    m.m[2][3] = 1;
    m.m[3][3] = 0;

    return m;
}
function Matrix_MatrixMult(m1, m2){
    let m = new Matrix4X4();

    for (var c = 0; c < 4; c++) {
        for (var r = 0; r < 4; r++) {
            m.m[r][c] = m1.m[r][0] * m2.m[0][c] + m1.m[r][1] * m2.m[1][c] + m1.m[r][2] * m2.m[2][c] + m1.m[r][3] * m2.m[3][c];
        }
    }

    return m;
}
function Matrix_PointAt(pos, target, up){
        // Calculate new forward direction
        let newForward = Vector_Sub(target, pos);
        newForward = Vector_Normalize(newForward);

        // Calculate new Up direction
        let a = Vector_Mult(newForward, Vector_DotProduct(up, newForward));
        let newUp = Vector_Sub(up, a);
        newUp = Vector_Normalize(newUp);

        // New Right direction is easy, its just cross product
        let newRight = Vector_CrossProduct(newUp, newForward);

        // Construct Dimensioning and Translation Matrix    
        let matrix = new Matrix4X4();
        matrix.m[0][0] = newRight.x;    matrix.m[0][1] = newRight.y;    matrix.m[0][2] = newRight.z;    matrix.m[0][3] = 0;
        matrix.m[1][0] = newUp.x;       matrix.m[1][1] = newUp.y;       matrix.m[1][2] = newUp.z;       matrix.m[1][3] = 0;
        matrix.m[2][0] = newForward.x;  matrix.m[2][1] = newForward.y;  matrix.m[2][2] = newForward.z;  matrix.m[2][3] = 0;
        matrix.m[3][0] = pos.x;         matrix.m[3][1] = pos.y;         matrix.m[3][2] = pos.z;         matrix.m[3][3] = 1;
        return matrix;

}
// Only for Rotation/Translation Matrices
function Matrix_QuickInverse(m){
        let matrix = new Matrix4X4();
        matrix.m[0][0] = m.m[0][0]; matrix.m[0][1] = m.m[1][0]; matrix.m[0][2] = m.m[2][0]; matrix.m[0][3] = 0;
        matrix.m[1][0] = m.m[0][1]; matrix.m[1][1] = m.m[1][1]; matrix.m[1][2] = m.m[2][1]; matrix.m[1][3] = 0;
        matrix.m[2][0] = m.m[0][2]; matrix.m[2][1] = m.m[1][2]; matrix.m[2][2] = m.m[2][2]; matrix.m[2][3] = 0;
        matrix.m[3][0] = -(m.m[3][0] * matrix.m[0][0] + m.m[3][1] * matrix.m[1][0] + m.m[3][2] * matrix.m[2][0]);
        matrix.m[3][1] = -(m.m[3][0] * matrix.m[0][1] + m.m[3][1] * matrix.m[1][1] + m.m[3][2] * matrix.m[2][1]);
        matrix.m[3][2] = -(m.m[3][0] * matrix.m[0][2] + m.m[3][1] * matrix.m[1][2] + m.m[3][2] * matrix.m[2][2]);
        matrix.m[3][3] = 1;
        return matrix;
    }

function Vector_Add(vec1, vec2){
    return new Vector3D(vec1.x + vec2.x, vec1.y + vec2.y, vec1.z + vec2.z);
}
function Vector_Sub(vec1, vec2){
    return new Vector3D(vec1.x - vec2.x, vec1.y - vec2.y, vec1.z - vec2.z);
}
function Vector_Mult(vec, k){
    return new Vector3D(vec.x * k, vec.y * k, vec.z * k);
}
function Vector_Div(vec, k){
    return new Vector3D(vec.x / k, vec.y / k, vec.z / k);
}

function Vector_DotProduct(vec1, vec2){
    return vec1.x*vec2.x + vec1.y*vec2.y + vec1.z*vec2.z;
}
function Vector_Length(vec){
    return Math.sqrt(Vector_DotProduct(vec, vec));
}
function Vector_Normalize(vec){
    let len = Vector_Length(vec);
    return new Vector3D(vec.x / len, vec.y / len, vec.z / len);
}
function Vector_CrossProduct(vec1, vec2){
    let v = new Vector3D();
    v.x = vec1.y * vec2.z - vec1.z * vec2.y;
    v.y = vec1.z * vec2.x - vec1.x * vec2.z;
    v.z = vec1.x * vec2.y - vec1.y * vec2.x;

    return v;
}
function Vector_IntersectPlane(plane_p, plane_n, lineStart, lineEnd){
    plane_n = Vector_Normalize(plane_n);
    let plane_d = -Vector_DotProduct(plane_n, plane_p);
    let ad = Vector_DotProduct(lineStart, plane_n);
    let bd = Vector_DotProduct(lineEnd, plane_n);
    let t = (-plane_d - ad) / (bd - ad);
    let lineStartToEnd = Vector_Sub(lineEnd, lineStart);
    let lineToIntersect = Vector_Mult(lineStartToEnd, t);

    return Vector_Add(lineStart, lineToIntersect);
}

function Triangle_ClipAgainstPlane(plane_p, plane_n, in_tri){
    plane_n = Vector_Normalize(plane_n);

    let inside_points = [];
    let outside_points = [];
    let nInsidePointCount = 0;
    let nOutsidePointCount = 0;

    // Get signed distance of each point in triangle to plane
    let d0 = dist(in_tri.points[0],plane_p,plane_n);
    let d1 = dist(in_tri.points[1],plane_p,plane_n);
    let d2 = dist(in_tri.points[2],plane_p,plane_n);

    if (d0 >= 0) { inside_points[nInsidePointCount] = in_tri.points[0]; nInsidePointCount++}
    else { outside_points[nOutsidePointCount] = in_tri.points[0]; nOutsidePointCount++}
    if (d1 >= 0) { inside_points[nInsidePointCount] = in_tri.points[1]; nInsidePointCount++}
    else { outside_points[nOutsidePointCount] = in_tri.points[1]; nOutsidePointCount++}
    if (d2 >= 0) { inside_points[nInsidePointCount] = in_tri.points[2]; nInsidePointCount++}
    else { outside_points[nOutsidePointCount] = in_tri.points[2]; nOutsidePointCount++}

        // Now classify triangle points, and break the input triangle into 
        // smaller output triangles if required. There are four possible
        // outcomes...

        let output = {num:0, out1:undefined, out2:undefined};
        let out_tri1 = new Traingle_Identity();
        let out_tri2 = new Traingle_Identity();

        if (nInsidePointCount == 3)
        {
            // All points lie on the inside of plane, so do nothing
            // and allow the triangle to simply pass through
            output.out1 = in_tri;
            output.num = 1;
        }

        if (nInsidePointCount == 1 && nOutsidePointCount == 2)
        {
            // Triangle should be clipped. As two points lie outside
            // the plane, the triangle simply becomes a smaller triangle

            // The inside point is valid, so keep that...
            out_tri1.points[0] = inside_points[0];

            // but the two new points are at the locations where the 
            // original sides of the triangle (lines) intersect with the plane
            out_tri1.points[1] = Vector_IntersectPlane(plane_p, plane_n, inside_points[0], outside_points[0]);
            out_tri1.points[2] = Vector_IntersectPlane(plane_p, plane_n, inside_points[0], outside_points[1]);

            output.out1 = out_tri1;
            output.num = 1;
        }

        if (nInsidePointCount == 2 && nOutsidePointCount == 1)
        {
            // Triangle should be clipped. As two points lie inside the plane,
            // the clipped triangle becomes a "quad". Fortunately, we can
            // represent a quad with two new triangles

            // The first triangle consists of the two inside points and a new
            // point determined by the location where one side of the triangle
            // intersects with the plane
            out_tri1.points[0] = inside_points[0];
            out_tri1.points[1] = inside_points[1];
            out_tri1.points[2] = Vector_IntersectPlane(plane_p, plane_n, inside_points[0], outside_points[0]);

            // The second triangle is composed of one of he inside points, a
            // new point determined by the intersection of the other side of the 
            // triangle and the plane, and the newly created point above
            out_tri2.points[0] = inside_points[1];
            out_tri2.points[1] = out_tri1.points[2];
            out_tri2.points[2] = Vector_IntersectPlane(plane_p, plane_n, inside_points[1], outside_points[0]);

            output.out1 = out_tri1;
            output.out2 = out_tri2;
            output.num = 2;
        }

        return output;

}

// Return signed shortest distance from point to plane, plane normal must be normalised
function dist(p, plane_p, plane_n){
    let n = Vector_Normalize(p);
    return (plane_n.x * p.x + plane_n.y * p.y + plane_n.z * p.z - Vector_DotProduct(plane_n, plane_p));
};

function getPosOfMarkers(len, real_len){
    let posMarkers = [];

    let a = -len/2 + 0.0001;
    let b = len/2 + 0.0001;

    let deltaX = 2;

    let numMarks = 0;
    for (var i = 0; i < real_len; i += deltaX) {
        numMarks++;
    }

    while(numMarks < NUM_MARKS){
        deltaX -= deltaX/2;

        numMarks = 0;
        for (var i = 0; i < real_len; i += deltaX) {
            numMarks++;
        }
    }

    while(numMarks > NUM_MARKS){
        deltaX += deltaX;

        numMarks = 0;
        for (var i = 0; i < real_len; i += deltaX) {
            numMarks++;
        }
    }

    let firstX = undefined;
    let j = 0;

    if(a < 0){
        while(j > a){
            j -= deltaX;
        }
        firstX = j + deltaX;
    }

    if(a > 0){
        j = 0;
        while(j < a){
            j += deltaX;
        }
        firstX = j;
    }

    j = 1;
    posMarkers.push(firstX);
    while(firstX + j * deltaX < b){
        posMarkers.push(firstX + j * deltaX);
        j++;
    }

    return posMarkers;

}

function distanceOfTwoPoints(x1, y1, x2, y2){
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}


function randomIntFromInterval(min, max) { // min and max included 
  return Math.random() * (max - min + 1) + min;
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}

function drawText(color, words, X, Y){
    canvasContext.fillStyle = color;
    canvasContext.fillText(words, X, Y);
}

function drawLine(x1,y1,x2,y2,width,color){
    canvasContext.lineWidth = width;
    canvasContext.strokeStyle = color;
    canvasContext.beginPath()
    canvasContext.moveTo(x1, y1);
    canvasContext.lineTo(x2, y2);
    canvasContext.stroke();
}

function drawNoFillTriangle(x1,y1, x2,y2, x3,y3, width, color){
    drawLine(x1,y1,x2,y2,2,color)
    drawLine(x2,y2,x3,y3,2,color)
    drawLine(x3,y3,x1,y1,2,color)
}

function drawFillTriangle(x1,y1, x2,y2, x3,y3, color){
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.moveTo(x1, y1);
    canvasContext.lineTo(x2, y2);
    canvasContext.lineTo(x3, y3);
    canvasContext.fill();
}

function removeFromArray(array,index){
    for(i = array.length - 1; i >= 0; i--){
        if(array[i] == index){
            array.splice(i, 1);
        }
    }
}

function circlePointColision(x1,y1,r, x2,y2){
  let dist = distanceOfTwoPoints(x1, y1, x2, y2);

  return dist < r;
}

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
function compare_zs(a, b){

        let z1 = (a.tri.points[0].z + a.tri.points[1].z + a.tri.points[2].z)/3;
        let z2 = (b.tri.points[0].z + b.tri.points[1].z + b.tri.points[2].z)/3;

        // a should come before b in the sorted order
        if(z1 > z2){
                return -1;
        // a should come after b in the sorted order
        }else if(z1 < z2){
                return 1;
        // a and b are the same
        }else{
                return 0;
        }
}
