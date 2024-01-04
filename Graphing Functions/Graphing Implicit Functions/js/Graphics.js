//graph constants
const HEIGHT_OF_MARKS = 10;
const NUM_MARKS = 10;

//graph vars
var zoom = 5;
var offX = 0;
var offY = 0;
var t = 0;
var t_inc;

//FPS calculation vars
var FPS = 0;
var currentSecond = 0;
var framesPassed = 0;

function drawGraph(){   
    colorRect(-canvas.width, -canvas.height, canvas.width*2, canvas.height*2,  'rgb(18,18,18)');

    handleMouseInput();

    drawXYAxis();

    drawDomainOutput(domain)
    
    drawCrosshair();

    t += t_inc/1000;
    getDomain(t)

    drawCalcFPS();
}

function drawDomainOutput(domain){

    for (var x = 0; x < domain.length; x++) {
        for (var y = 0; y < domain[x].length; y++) {

            if(domain[x][y] != -1){ 
                let color = 'rgb(0,0,'+ (255 - Math.abs(domain[x][y].offSet*255)) +')'
                colorRect((x - canvas.width/2), -(y - canvas.height/2), 1, 1, color);
            }//if there is a point at x,y
            
        }//for y's
    }//for x's
}

function drawXYAxis(){
    let zoom_rangeslider = document.getElementById("zoom");
    zoom = zoom_rangeslider.value;

    let time_rangeslider = document.getElementById("time");
    t_inc = time_rangeslider.value;

    //X Markers
    let xMarksPos = getPosOfMarkers(zoom, canvas.width, offX);
    for (var i = 0; i < xMarksPos.length; i++) {

        //draw graph mark
        drawLine(xMarksPos[i]/zoom * canvas.width + offX * canvas.width/zoom,
                 -canvas.height,
                 xMarksPos[i]/zoom * canvas.width + offX * canvas.width/zoom,
                 canvas.height, 2, 'rgba(18,18,100,0.5)');

        //draw hash mark
        drawLine(xMarksPos[i]/zoom * canvas.width + offX * canvas.width/zoom,
                 HEIGHT_OF_MARKS + offY * canvas.height/zoom,
                 xMarksPos[i]/zoom * canvas.width + offX * canvas.width/zoom,
                 -HEIGHT_OF_MARKS + offY * canvas.height/zoom, 
                 2, 'rgba(255,255,255,0.5)');
    }

    //Y Markers
    let yMarksPos = getPosOfMarkers(zoom, canvas.height, offY);
    for (var i = 0; i < yMarksPos.length; i++) {

        //draw graph mark
        drawLine(-canvas.width/2,
                yMarksPos[i]/zoom * canvas.height+offY * canvas.height/zoom,
                canvas.width/2,
                yMarksPos[i]/zoom * canvas.height+offY * canvas.height/zoom, 
                2, 'rgba(18,18,100,0.5)');

        //draw hash mark
        drawLine(HEIGHT_OF_MARKS + offX * canvas.width/zoom,
                yMarksPos[i]/zoom * canvas.height+offY * canvas.height/zoom,
                -HEIGHT_OF_MARKS + offX * canvas.width/zoom,
                yMarksPos[i]/zoom * canvas.height+offY * canvas.height/zoom, 
                2, 'rgba(255,255,255,0.5)');

        //draw number
        let height = 6;
        let width = canvasContext.measureText(-yMarksPos[i]).width;
        drawText("white", -yMarksPos[i], -canvas.width/2+width/2, 
                 yMarksPos[i]/zoom * canvas.height+offY * canvas.height/zoom+height/2)
        drawText("white", -yMarksPos[i], canvas.width/2-width*1.5, 
                 yMarksPos[i]/zoom * canvas.height+offY * canvas.height/zoom+height/2)
    }

    //Drawing X numbers here so that the graph makrks for the Y coords dont cross out the numbers
    for (var i = 0; i < xMarksPos.length; i++) {
        // draw numbers 
        let width = canvasContext.measureText(xMarksPos[i]).width;
        drawText("white", xMarksPos[i],xMarksPos[i]/zoom * canvas.width + offX * canvas.width/zoom - width/2,
                 canvas.height/2-3)
        drawText("white", xMarksPos[i],xMarksPos[i]/zoom * canvas.width + offX * canvas.width/zoom - width/2,
                 -canvas.height/2+9)
    }

    //Axis
    drawLine(-canvas.width/2,offY * canvas.height/zoom,canvas.width/2,offY * canvas.height/zoom,2,'rgba(255,255,255,0.5)');
    drawLine(offX * canvas.width/zoom,-canvas.height/2,offX * canvas.width/zoom,canvas.height/2,2,'rgba(255,255,255,0.5)');

    //Border
    drawLine(-canvas.width/2,-canvas.height/2,canvas.width/2,-canvas.height/2,4,'rgba(255,255,255,0.5)');
    drawLine(canvas.width/2,-canvas.height/2,canvas.width/2,canvas.height/2,4,'rgba(255,255,255,0.5)');
    drawLine(canvas.width/2,canvas.height/2,-canvas.width/2,canvas.height/2,4,'rgba(255,255,255,0.5)');
    drawLine(-canvas.width/2,-canvas.height/2,-canvas.width/2,canvas.height/2,4,'rgba(255,255,255,0.5)');
}


function drawCrosshair(){
    drawLine(-HEIGHT_OF_MARKS/2,0,HEIGHT_OF_MARKS/2,0,2,'rgba(255,255,255,0.75)');
    drawLine(0,-HEIGHT_OF_MARKS/2,0,HEIGHT_OF_MARKS/2,2,'rgba(255,255,255,0.75)');
    // drawText('yellow', (-offX).toFixed(2) + ", " + (offY).toFixed(2), 3, -4)
}



