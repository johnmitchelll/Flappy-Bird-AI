//information vars
var meshDomain;
var graph;
var axis;

const CAM_SPEED = 0.25;
var vCamera = new Vector3D(0,0,0);
var vLookDir = new Vector3D(0,0,0);
var matCamera = new Matrix4X4();
var matVeiw = new Matrix4X4();
var fYaw = 0;
var fPitch = 0;

//
var matrixProj = new Matrix4X4();

let matrixRotZ = new Matrix4X4();
let matrixRotX = new Matrix4X4();

let matrixTrans = new Matrix4X4();
let matrixWorld = new Matrix4X4();

var fTheta = Math.PI/4;
var fFov = 10;
const fNear = 0.1;
const fFar = 1000;
var fAspectRatio;

var fov_rangeslider = document.getElementById("FOV");

const NUM_INPUTS = 20;
var t = 0;

var equation = "";


function update(){
    handleUserInputs();

    fFov = parseInt(fov_rangeslider.value, 10)/100;

    //projection matrix
	matrixProj = Matrix_MakeProjection(fFov,canvas.height/canvas.width, fNear, fFar);

    // fTheta += 1/framesPerSecond/4;

    // Rotation Z
    matrixRotZ = Matrix_MakeRotationZ(fTheta);
    // Rotation X
    matrixRotX = Matrix_MakeRotationX(fTheta);

    matrixTrans = Matrix_MakeTranslation(0, 0, 10);

    matrixWorld = Matrix_MakeIdentity();
    matrixWorld = Matrix_MatrixMult(matrixRotZ, matrixRotX);
    matrixWorld = Matrix_MatrixMult(matrixWorld, matrixTrans);

    
    let vUp = new Vector3D(0,1,0);
    let vTarget = new Vector3D(0,0,1);
    let matCameraRotationYaw = Matrix_MakeRotationY(fYaw);
    vLookDir = Matrix_MultiplyVecor(matCameraRotationYaw,vTarget);
    vTarget = Vector_Add(vCamera, vLookDir);

    matCamera = Matrix_PointAt(vCamera, vTarget, vUp);
    matVeiw = Matrix_QuickInverse(matCamera);

    t += 0.01;
    getMeshDomain()
}

function getMeshDomain(){
    let outPutLine = new Array(NUM_INPUTS);

    for (var i = 0; i < NUM_INPUTS; i++) {
        outPutLine[i] = new Array(NUM_INPUTS);
    }

    for (var i = 0; i < NUM_INPUTS; i++) {
        for (var j = 0; j < NUM_INPUTS; j++) {
            let x = j * LEN_OF_VISIBLE_GRAPH*2/NUM_INPUTS - LEN_OF_VISIBLE_GRAPH;
            let y = i * LEN_OF_VISIBLE_GRAPH*2/NUM_INPUTS - LEN_OF_VISIBLE_GRAPH;
            outPutLine[j][i] = new Vector3D(x,y,Func(x,y));
        }
    }
    
    let arrOfTriangles = [];

    for (var i = 0; i < outPutLine.length; i++) {
        for (var j = 0; j < outPutLine[i].length; j++) {

            if(i+1 < outPutLine.length && j+1 < outPutLine[i].length){

                arrOfTriangles.push(new Triangle(outPutLine[i+1][j],outPutLine[i][j],outPutLine[i][j+1]));
                arrOfTriangles.push(new Triangle(outPutLine[i+1][j],outPutLine[i][j+1],outPutLine[i+1][j+1]));
            }

        }
    }

    meshDomain = new Mesh(arrOfTriangles);

}

function Func(x,y){
    // equation = document.getElementById('form-function').value;

    if(x ==  0 && y == 0){
        // console.log(document.getElementById('form-function').value);
    }

    let z = x * y * Math.sin(t)
    return z;
}


