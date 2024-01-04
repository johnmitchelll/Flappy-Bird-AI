//graphical vars
const HEIGHT_OF_MARKS = 10;
const THICKNES_OF_LINES = 0.05
const NUM_MARKS = 10;
const LEN_OF_VISIBLE_GRAPH = 5;

const MARKER_COLORS = 'rgba(18,18,100,0.8)';

const framesPerSecond = 20;

var depth = 10;

function drawToScreen(){   
    colorRect(-canvas.width, -canvas.height, canvas.width*2, canvas.height*2,  'rgb(18,18,18)');

    let trisToDraw = [];

    for (var i = 0; i < meshDomain.triangles.length; i++) {
        let output = addToDrawList(meshDomain.triangles[i], true, 0,0,255, true, false)
        if(output) { trisToDraw.push(output) };
    }   

    for (var i = 0; i < graph.markers.length; i++) {
         for (var j = 0; j < graph.markers[i].points.length; j++) {
            let l = graph.markers[i];
            let output = addToDrawList(l.points[j], false, 18,18,100, true, false);
            if(output) { trisToDraw.push(output) };
        }
    }

    for (var i = 0; i < graph.axies.length; i++) {
        for (var j = 0; j < graph.axies[i].points.length; j++) {
            let l = graph.axies[i];
            let output = addToDrawList(l.points[j], false, 255,255,255, true, false);
            if(output) { trisToDraw.push(output) };
        }
    }   

    drawTriangles(trisToDraw);

    //boader
    drawLine(-canvas.width/2,-canvas.height/2,canvas.width/2,-canvas.height/2,2,'white');
    drawLine(canvas.width/2,-canvas.height/2,canvas.width/2,canvas.height/2,2,'white');
    drawLine(canvas.width/2,canvas.height/2,-canvas.width/2,canvas.height/2,2,'white');
    drawLine(-canvas.width/2,-canvas.height/2,-canvas.width/2,canvas.height/2,2,'white');
}


function addToDrawList(triangle, fill, r,g,b, culling, ligting){
    let triangleTransformed = new Triangle(Matrix_MultiplyVecor(matrixWorld, triangle.points[0]),
                                           Matrix_MultiplyVecor(matrixWorld, triangle.points[1]),
                                           Matrix_MultiplyVecor(matrixWorld, triangle.points[2]));

    //calculate normal direction of the plane of each triangle
    let normal = new Vector3D();
    let line1 = new Vector3D();
    let line2 = new Vector3D();

    line1 = Vector_Sub(triangleTransformed.points[1], triangleTransformed.points[0]);
    line2 = Vector_Sub(triangleTransformed.points[2], triangleTransformed.points[0]);

    normal = Vector_CrossProduct(line1, line2);
    normal = Vector_Normalize(normal);

    let vCameraRay = Vector_Sub(triangleTransformed.points[0], vCamera);

    let clipped;

    // if the side of the cube is visible from the cameras pos
    if(culling && Vector_DotProduct(normal, vCameraRay) < 0){
        return calculateLightingAndAddToList(triangleTransformed, normal,r,g,b, ligting, fill);
    }else{
        return calculateLightingAndAddToList(triangleTransformed, normal,r,g,b, ligting, fill);
    }
}//func

function calculateLightingAndAddToList(tri, normal,r,g,b,l, fill){
        // Illumination
        let light_direction = new Vector3D(0, 1, -1);
        light_direction = Vector_Normalize(light_direction);

        // How "aligned" are light direction and triangle surface normal?
        let dp = Math.max(0.1, Vector_DotProduct(light_direction, normal));

        //Convert wolrd space into view space :)
        let triangleViewed = new Triangle(Matrix_MultiplyVecor(matVeiw,tri.points[0]),
                                          Matrix_MultiplyVecor(matVeiw,tri.points[1]),
                                          Matrix_MultiplyVecor(matVeiw,tri.points[2]));

        let numClipped = 0;
        let clipped = [new Traingle_Identity(), new Traingle_Identity()];
        let output = Triangle_ClipAgainstPlane(new Vector3D(0,0,fNear), new Vector3D(0,0,1), triangleViewed);
        numClipped = output.num;
        clipped[0] = output.out1;
        clipped[1] = output.out2;

        for (var i = 0; i < numClipped; i++) {
            //project tirangle from 3d to 2d
            let triProjected = new Triangle(Matrix_MultiplyVecor(matrixProj,clipped[i].points[0]),
                                            Matrix_MultiplyVecor(matrixProj,clipped[i].points[1]),
                                            Matrix_MultiplyVecor(matrixProj,clipped[i].points[2]));

            triProjected.points[0] = Vector_Div(triProjected.points[0], triProjected.points[0].w);
            triProjected.points[1] = Vector_Div(triProjected.points[1], triProjected.points[1].w);
            triProjected.points[2] = Vector_Div(triProjected.points[2], triProjected.points[2].w);

            triProjected.points[0].x *= canvas.width/2; triProjected.points[0].y *= canvas.height/2;
            triProjected.points[1].x *= canvas.width/2; triProjected.points[1].y *= canvas.height/2;
            triProjected.points[2].x *= canvas.width/2; triProjected.points[2].y *= canvas.height/2;

            return {tri:triProjected,dp:dp,r:r,g:g,b:b,l:l,fill:fill};

        }//for
}
            
function drawTriangles(arr){

    arr.sort(compare_zs)

    for (var i = 0; i < arr.length; i++) {

        let dp = 1;
        if(arr[i].l){
            dp = arr[i].dp;
        }
        
        let tri = arr[i].tri;
        let r = arr[i].r;
        let g = arr[i].g;
        let b = arr[i].b;

        if(arr[i].fill){
            drawFillTriangle(tri.points[0].x,tri.points[0].y, 
                        tri.points[1].x,tri.points[1].y, 
                        tri.points[2].x,tri.points[2].y, 
                        'rgba('+dp*r+','+dp*g+','+dp*b+')'); 
            drawNoFillTriangle(tri.points[0].x,tri.points[0].y, 
                        tri.points[1].x,tri.points[1].y, 
                        tri.points[2].x,tri.points[2].y,
                        2,'rgba('+0+','+0+','+0+')');
        }else{
            drawNoFillTriangle(tri.points[0].x,tri.points[0].y, 
                        tri.points[1].x,tri.points[1].y, 
                        tri.points[2].x,tri.points[2].y,
                        2,'rgba('+dp*r+','+dp*g+','+dp*b+')');
        }
    }
}
