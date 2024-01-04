var counter = 1;
var index = 0;
var sequence = [];
    var r = 0;
    var rDir = 1;
    var b = 125;
    var bDir = 1;
var arcs = [];
var biggest = 0;

function start(){
  colorRect(0,0,canvas.width,canvas.height,'rgb(18,18,18)');
  sequence.push(index);
}


function step(){
  var next = index - counter
    if(next < 0 || sequence.includes(next)){
          next = index + counter;
      }
      
    if(counter % 2 == 0){
      colorArc(index, next, "down");
    }else{
      colorArc(index, next, "up");
    }

    
    sequence.push(next);
    counter++;
    index = next;

    //console.log(index)
}

function colorArc(start, end, dir){
    radius = Math.abs((end - start)/2);
    middle = (end + start)/2

      canvasContext.beginPath();
      if(dir == "down"){
        canvasContext.arc(middle, canvas.height/2,radius, 0,Math.PI);
      }else if(dir == "up"){
        canvasContext.arc(middle, canvas.height/2,radius, Math.PI,0);
      }

        r += rDir;
        if (r > 255) {
          rDir *= -1;
        }else if(r < 0){
          rDir *= -1;
        }
        b += bDir;
        if (b > 255) {
          bDir *= -1;
        }else if(b < 0){
          bDir *= -1;
        }

      canvasContext.lineWidth = 1;
      canvasContext.strokeStyle = 'rgba('+r+',25,'+b+')';
      canvasContext.stroke();
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