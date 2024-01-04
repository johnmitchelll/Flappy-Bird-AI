var balls;
var lines;
var ballRadii;
var lineRadii;


//pool table colorrgb(0,45,1)

function drawEverything (){
	colorRect(0, 0, canvas.width, canvas.height, 'rgb(18,18,18)');
	handleBalls();
}

function handleBalls(){
	handleBallBallCollision(balls);

	for (var i = 0; i < balls.length; i++) {
		balls[i].draw("red");
	}

	// for (var i = 0; i < pairsOfCollidingBalls.length; i++) {
	// 	drawLine(pairsOfCollidingBalls[i].b1.pos.x,pairsOfCollidingBalls[i].b1.pos.y,
	// 			 pairsOfCollidingBalls[i].b2.pos.x,pairsOfCollidingBalls[i].b2.pos.y,4,"white");
	// }


	if(ballSelected){
		drawLine(ballSelected.pos.x,ballSelected.pos.y, mouseX,mouseY,4,"white");
	}

	for (var i = 0; i < lines.length; i++) {
		lines[i].draw("green");
	}
}

