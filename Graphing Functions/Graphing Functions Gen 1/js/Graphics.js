var slope;

function drawGraph(){   
    drawXYAxis();

    // for (var i = 1; i < derivitiveDomains.length; i++) {
    //   drawDomainOutput(derivitiveDomains[i], colorList[i]);
    // }

    drawDomainOutput(domain, 'blue');
    
    drawTangentLine();

    drawGraphStats();
    
    t += 0.01;
    getDomain(t);  
}

function drawDomainOutput(domain, color){
    let temp = 0;

    for (var i = 0; i < domain.length; i++) {
        let yOfTempInRealSpace = (domain[temp] / zoom) * canvas.height;
        let yOfIInRealSpace = (domain[i] / zoom) * canvas.height;

        if(Math.abs(yOfTempInRealSpace - yOfIInRealSpace) < canvas.height/4 || 
                    (yOfTempInRealSpace > 0 && yOfIInRealSpace > 0) || (yOfTempInRealSpace < 0 && yOfIInRealSpace < 0)){
            drawLine(temp - domain.length/2,yOfTempInRealSpace,i - domain.length/2,yOfIInRealSpace,4,color);
        }

        if(i > 0){temp++;}
    }
}

function drawXYAxis(){
    colorRect(-canvas.width, -canvas.height, canvas.width*2, canvas.height*2,  'rgb(18,18,18)');
    drawLine(-canvas.width/2,0,canvas.width/2,0,1,'white');
    drawLine(0,-canvas.height,0,canvas.height,1,'white');

    let numMarks = 10;

    //X Markers
    for (var i = 1; i <= numMarks; i++) {
        drawLine((i * (canvas.width / numMarks) - canvas.width/2),5,
                (i * (canvas.width / numMarks) - canvas.width/2),-5,1,'white');

        let xValAfterZoom = ((i * (canvas.width / numMarks) - canvas.width/2) / canvas.width) * zoom;

        if(xValAfterZoom.toFixed(2) != 0){
            drawText('white', xValAfterZoom.toFixed(2), (i * (canvas.width / numMarks) - canvas.width/2) - 12, - 5);
        }
    }

    //Y Markers
    for (var i = 1; i <= numMarks; i++) {
        drawLine(5,(i * (canvas.height / numMarks) - canvas.height/2),
                -5,(i * (canvas.height / numMarks) - canvas.height/2),1,'white');

        let yValAfterZoom = -1 * ((i * (canvas.height / numMarks) - canvas.height/2) / canvas.height) * zoom;
        
        if(yValAfterZoom.toFixed(2) != 0){
            drawText('white', yValAfterZoom.toFixed(2), 5, (i * (canvas.height / numMarks) - canvas.height/2) - 3);
        }
    }
}


function drawTangentLine(){
    //draw vertical line at mouseX
    drawLine(mouseX,-canvas.height,mouseX,canvas.height,1,'white');

    let mouseXAfterZoom = (mouseX / canvas.width) * zoom;
    let outPutAtMouseX = Func(mouseXAfterZoom);
    let dAtMouseX = FuncDerivitive(mouseX, domain);

    let fa = outPutAtMouseX;
    let linearDomain = getLinearDomain(outPutAtMouseX, dAtMouseX.d / dAtMouseX.dx, mouseX);

    let temp = 0;

    let outPutAtMouseXInRealSpace = (outPutAtMouseX / zoom) * canvas.height;

    for (var i = 0; i < linearDomain.length; i++) {
        let yOfTempInRealSpace = (linearDomain[temp] / zoom) * canvas.height;
        let yOfIInRealSpace = (linearDomain[i] / zoom) * canvas.height;

        drawLine(temp - linearDomain.length/2+mouseX, yOfTempInRealSpace, 
                i - linearDomain.length/2+mouseX, yOfIInRealSpace, 4,'red');

        if(i > 0){temp++;}
    }

    slope = dAtMouseX.d / dAtMouseX.dx;
    colorCircle(mouseX-linearDomain.length/2, (linearDomain[0] / zoom) * canvas.height, 7, 'red');
    colorCircle(mouseX+linearDomain.length/2, (linearDomain[linearDomain.length-1] / zoom) * canvas.height, 7, 'red');

    let yOfMouseXInRealSpace = (outPutAtMouseX / zoom) * canvas.height;
    drawText('yellow', mouseXAfterZoom.toFixed(2), mouseX, yOfMouseXInRealSpace);
}

function getLinearDomain(fa, fpa, a){
    let linearDomain = [];
    let len = 250;

    let aAfterZoom =(a / canvas.width) * zoom;

    for (var x = a - len/2; x < a + len/2; x++) {
        let xAfterZoom = (x / canvas.width) * zoom;
        let outPutAtTanLineX = fa + fpa * (xAfterZoom - aAfterZoom);

        linearDomain.push(outPutAtTanLineX)
    }

    linearDomain = getTrunkcatedDomainBasedOnLen(linearDomain, len, a)

    return linearDomain;
}

function getTrunkcatedDomainBasedOnLen(domain, len, a){
    let i = Math.floor(len/2 - 1);
    let j = Math.floor(len/2);

    let startingPoint = a - len/2;
    let trunkcatedDomain = [];

    while(i > 0 && j < len){
        let yOfIInRealSpace = (domain[i] / zoom) * canvas.height;
        let yOfJInRealSpace = (domain[j] / zoom) * canvas.height;

        if(distanceOfTwoPoints(i, yOfIInRealSpace, j, yOfJInRealSpace) > len){
            break;
        }

        i--; j++;
    }

    for(u = i; u < j; u++){
        trunkcatedDomain.push(domain[u]);
    }

    return trunkcatedDomain;
}


function drawGraphStats(){
    let numPointsInGraph = 0;

    for (var i = 0; i < domain.length; i++) {
        let zoomToRealSpaceY = (domain[i] / zoom) * canvas.height;
        if(zoomToRealSpaceY < canvas.height/2 && zoomToRealSpaceY > -canvas.height/2){
            numPointsInGraph++;
        }
    }

    let percentVisual = (numPointsInGraph / domain.length) * 100;

    drawText('white', "Percent of Outputs Visible: " + (percentVisual).toFixed(2) + "%", 
             -canvas.width/2 + (canvas.width/2 * 0.10), -canvas.height/2 + (canvas.height * 0.15));

    drawText('white', "Time of Function: " + t.toFixed(2), 
             -canvas.width/2 + (canvas.width/2 * 0.10), -canvas.height/2 + (canvas.height * 0.17));

    drawText('white', "Dertivative of Point at Mouse: " + (slope * -1).toFixed(3), 
             -canvas.width/2 + (canvas.width/2 * 0.10), -canvas.height/2 + (canvas.height * 0.19));
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

function removeFromArray(array,index){
    for(i = array.length - 1; i >= 0; i--){
        if(array[i] == index){
            array.splice(i, 1);
        }
    }
}