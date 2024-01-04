var walls = new Array(3);
var particle;

function drawEverything (){
    colorRect(0,0,canvas.width,canvas.height,'rgb(18,18,18');
    for (var i = 0; i < walls.length; i++) {
        walls[i].show();
    }

    particle.update();
    particle.look(walls);
    particle.show();
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

function getDist(x1,y1,x2,y2){
  let ans = Math.sqrt( (x2-x1) * (x2-x1) +  (y2-y1) * (y2-y1) );
  return ans;
}

    var r = 0;
    var rDir = 0.0001;
    var g = 25;
    var gDir = 0.0001;
    var b = 127;
    var bDir = 0.0001;

    function getRGB(){
        r += rDir;
        if (r > 255) {
          rDir *= -1;
        }else if(r < 0){
          rDir *= -1;
        }
        g += gDir;
        if (g > 30) {
          gDir *= -1;
        }else if(g < 0){
          gDir *= -1;
        }
        b += bDir;
        if (b > 255) {
          bDir *= -1;
        }else if(b < 0){
          bDir *= -1;
        }

        return('rgba('+r+','+g+','+b+',0.1)');
    }

    




