var f;
var circles;

var wave = [];

function drawEverything (){
	colorRect(0, 0, canvas.width, canvas.height, 'rgb(18,18,18)');

	for (var i = 1; i < circles.length; i++) {
		circles[i].x = circles[i-1].x+circles[i-1].outputX;
		circles[i].y = circles[i-1].y+circles[i-1].outputY;
	}

	wave.unshift(circles[circles.length-1].y+circles[circles.length-1].outputY);

	if(wave.length-1 > 500){
		wave.pop();
	}

	for (var i = 0; i < wave.length; i++) {
		// colorCircle(500+i, wave[i], 2, "white");

		if(i > 0){
			drawLine(499+i,wave[i-1],500+i,wave[i],4,"white")
		}
	}

	drawLine(500,wave[0],circles[circles.length-1].x+circles[circles.length-1].outputX,
			 circles[circles.length-1].y+circles[circles.length-1].outputY,2,"white")

	for (var i = 0; i < circles.length; i++) {
		circles[i].draw();
	}
}