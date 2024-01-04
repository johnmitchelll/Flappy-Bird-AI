var scale = 15;
var cols, rows;
var particles = new Array(200);

var flowFeild;

var colorFeild;

var timer = 3;
function drawEverything (){
  colorRect(0,0,canvas.width,canvas.height,'black');

    timer--
    if(timer <= 0){
      getColors();
      timer = 3
    }
  

  handleVectors();
}



zOff = 0;
var zOffValue = 0.0001;

function handleVectors(){
 var offset = 0;
    for (var i = 0; i < flowFeild.length; i++) {
       offset += 0.01


        if(i != 1){
          flowFeild[i] += perlin.get(offset, zOff)*3
        }else{
          flowFeild[i] = flowFeild[i-1];
        }


          if(i){
            offset = 0;
          }
    }
    zOff += zOffValue;

    for (var i = 0; i < flowFeild.length; i++) {
      while(flowFeild[i] > 2*Math.PI){
        flowFeild[i] -= 2*Math.PI;
      }
       while(flowFeild[i] < 0){
        flowFeild[i] += 2*Math.PI;
      }
    }
    

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {

        let x = i * scale + scale/2;
        let y = j * scale + scale/2;

        let index = j * cols + i;

        let color = 'rgba('+colorFeild[index].r+','+colorFeild[index].g+','+colorFeild[index].b+')'

        drawLine(x,y,
        x + Math.cos(flowFeild[index])*20,
        y + Math.sin(flowFeild[index])*20,2,color)

        // colorCircle(x + Math.cos(flowFeild[index])*20,y + Math.sin(flowFeild[index])*20, 2, color)
    }
  }

  colorFeild[1] = deepCopyObject(colorFeild[0] )

}


var colorZ = 0;
function getColors(){
  var colorOff = 0;
    for (var i = 0; i < colorFeild.length; i++) {

          colorFeild[i].r += perlin.get(colorOff, colorZ)*5
          colorFeild[i].g += perlin.get(colorOff, colorZ)*5
          colorFeild[i].b += perlin.get(colorOff, colorZ)*5

          colorOff += 0.5

          if(i){
            colorOff = 0;
          }
    }
    colorZ += 0.01;
}


function randomIntFromInterval(min, max) { // min and max included 
  return Math.random() * (max - min + 1) + min;
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}


function drawText(color, words, X, Y){
    canvasContext.fillStyle = color;
    canvasContext.fillText(words, X, Y);
  }

function removeFromArray(array,index){
    for(i = array.length - 1; i >= 0; i--){
        if(array[i] == index){
            array.splice(i, 1);
        }
    }
}

function drawLine(x1,y1,x2,y2,width,color){
    canvasContext.lineWidth = width;
    canvasContext.strokeStyle = color;
    canvasContext.beginPath()
    canvasContext.moveTo(x1, y1);
    canvasContext.lineTo(x2, y2);
    canvasContext.stroke();
}

function colorCircle(centerX,centerY, radius, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX,centerY, radius, 0,Math.PI*2, true);
  canvasContext.fill();
}