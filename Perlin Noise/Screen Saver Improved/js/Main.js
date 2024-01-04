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

   

    var yOff = 0;

    for (var j = 0; j < rows; j++) {
      var xOff = 0;
        for (var i = 0; i < cols; i++) {
            var index = j * cols + i;
            xOff += 0.05
            var angle = Math.abs(flowNoise.perlin2(xOff, yOff)) * 6
            var v = angle;
            flowFeild[index] = v;

    
            if(angle < 0){
                angle = 1
            }
            
        }
        yOff += 0.05;
    }

    colorFeild = new Array(cols * rows);

    let r = Math.random() * 255;
    let g = Math.random() * 255;
    let b = Math.random() * 255;

    // let randomColor = 50 + Math.random()*150//Math.floor(85 + Math.random() * 170);
    // let randomSpread = 50 + Math.random()*100

    

    for (var j = 0; j < rows; j++) {
      var xOff = 0;
        for (var i = 0; i < cols; i++) {
            var index = j * cols + i;
            colorFeild[index] = {r:undefined,g:undefined,b:undefined};

            xOff += 0.03

            var red = r + perlin.get(xOff, yOff) * r;
            // var green = g + perlin.get(xOff, yOff) * g;
            // var blue = b + perlin.get(xOff, yOff) * b;


            colorFeild[index].r = red;
    
            
        }
        yOff += 0.03;
    }

        for (var j = 0; j < rows; j++) {
      var xOff = 0;
        for (var i = 0; i < cols; i++) {
            var index = j * cols + i;
            xOff += 0.03

            // var red = r + perlin.get(xOff, yOff) * r;
            var green = g + perlin.get(xOff, yOff) * g;
            // var blue = b + perlin.get(xOff, yOff) * b;


            colorFeild[index].g = green;
    
            
        }
        yOff += 0.03;
    }

    for (var j = 0; j < rows; j++) {
      var xOff = 0;
        for (var i = 0; i < cols; i++) {
            var index = j * cols + i;
            xOff += 0.03

            // var red = r + perlin.get(xOff, yOff) * r;
            // var green = g + perlin.get(xOff, yOff) * g;
            var blue = b + perlin.get(xOff, yOff) * b;


            colorFeild[index].b = blue;
    
            
        }
        yOff += 0.03;
    }

    




    colorRect(0,0,canvas.width,canvas.height,'rgb(18,18,18)');

}

