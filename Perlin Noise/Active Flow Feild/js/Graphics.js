var scale = 10;
var cols, rows;
var particles = new Array(1000);

var flowFeild;

function start(){
    cols = Math.floor(canvas.width / scale);
    rows = Math.floor(canvas.width / scale);

    flowFeild = new Array(cols * rows);

    var yOff = 0;
    
    for (var j = 0; j < rows; j++) {
      var xOff = 0;
        for (var i = 0; i < cols; i++) {
            var index = j * cols + i;
            xOff += 0.005
            var angle = (0.5 + perlin.get(xOff, yOff)) * 6;
            var v = angle;
            flowFeild[index] = v;
            if(angle < 0){
                angle = 1
            }
            
           //drawText('black', angle, i*scale+scale/2,j*scale+scale/2)
        }
        yOff += 0.005;
    }

    for (var i = 0; i < particles.length; i++) {
        particles[i] = new Particle();
    }
    colorRect(0,0,canvas.width,canvas.height,'rgb(0,0,0)');
}


var timer = 200;
var zOff = 0;
function drawEverything (){
  //colorRect(0,0,canvas.width,canvas.height,'rgb(0,0,0, 0.3)');
  // timer--;
  // if(timer == 0){
  //   for (var i = 0; i < particles.length; i++) {
  //      particles[i].randomize();
  //   }
  //   timer = 30;
  // }

    for (var i = 0; i < particles.length; i++) {
       particles[i].update();
       particles[i].edges();
       particles[i].show();
       particles[i].follow(flowFeild);
    }
    for (var i = 0; i < flowFeild.length; i++) {
        // if(Math.random() > 0.1){
        //   flowFeild[i] += 0.005
        // }
          flowFeild[i] += perlin.get(0, zOff);

    }      
    zOff += 0.000001

      clearBackGround();

}

function clearBackGround(){
  colorRect(0,0,canvas.width,canvas.height,'rgb(0,0,0, 0.1)');
}

//'rgba(0,0,0, .05)'

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