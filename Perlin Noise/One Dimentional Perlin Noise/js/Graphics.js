var start = 0;

var inc = 0.005;

function drawEverything (){
colorRect(0,0,canvas.width,canvas.height,'black');

    var width = canvas.width;

 var xOff = start;

    for (var i = 0; i < width; i++) {
        var y = (0.5+perlin.get(0,xOff))*canvas.height

        colorRect(i,y, 3, 2, "white");

        xOff += inc;
    }
    
    start += inc;

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