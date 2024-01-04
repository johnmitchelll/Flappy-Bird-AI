var twoPI = 2 * Math.PI;
var n = 10;
var d = 10;

function drawEverything (){
    canvasContext.translate(-canvas.width/2, -canvas.height/2);
    colorRect(0, 0, canvas.width, canvas.height, 'rgb(18,18,18)')
    canvasContext.translate(canvas.width/2, canvas.height/2);

    var k = n/d;

   for (var i = 0; i < twoPI * d; i += 0.001) {
    var radius = 150 * Math.cos(k * i);
    var x = radius * Math.cos(i);
    var y = radius * Math.sin(i);

    var r = 255;
    var b = 255 ;

     colorRect(x, y, 2, 2, 'rgb('+r+',255,'+b+',0.3)'); 
   }       
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

function removeFromArray(array,index){
    for(i = array.length - 1; i >= 0; i--){
        if(array[i] == index){
            array.splice(i, 1);
        }
    }
}