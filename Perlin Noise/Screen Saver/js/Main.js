var canvas;
var canvasContext;

 
// // CJS
// const perlinNoise3d = require('perlin-noise-3d');


window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;



    start();

	var framesPerSecond = 30;
	setInterval(function(){update();},1000/framesPerSecond);

}
	function update(){
	drawEverything();
}

function start(){
    cols = Math.floor(canvas.width / scale)+1;
    rows = Math.floor(canvas.height / scale)+1;

    flowFeild = new Array(cols * rows);

    colorFeild = new Array(cols * rows);

    var yOff = 0;

    let randomColor = 50 + Math.random()*150//Math.floor(85 + Math.random() * 170);
    let randomSpread = 50 + Math.random()*100
    
    for (var j = 0; j < rows; j++) {
      var xOff = 0;
        for (var i = 0; i < cols; i++) {
            var index = j * cols + i;
            xOff += 0.06
            var angle = (0.5 + perlin.get(xOff, yOff)) * 6;
            var v = angle;
            flowFeild[index] = v;
            var red = (0.5 + perlin.get(xOff, yOff)) * randomColor - randomSpread/4;
            var green = (0.5 + perlin.get(xOff, yOff)) * randomColor - randomSpread;
            var blue = (0.5 + perlin.get(xOff, yOff)) * randomColor + randomSpread/2;
            colorFeild[index] = {r:red,g:green,b:blue};
            if(angle < 0){
                angle = 1
            }
            
        }
        yOff += 0.06;
    }

    colorRect(0,0,canvas.width,canvas.height,'rgb(18,18,18)');

}

