var pairsOfCollidingBalls = [];
var fakeBalls = [];
var ballSelected;
var lineSegmentSelected;
var selectedLineStart = false;

function handleBallBallCollision(balls){
	let numSimulationUpdates = 4;
	let simElapsedTime = elaspedTime / numSimulationUpdates;
	let maxSimulationSteps = 15;

	//handle input to the balls
	if(keyHeld_Space == false && ballSelected && mouseDown == false){
		ballSelected.vel.x = (ballSelected.pos.x - mouseX)/5;
		ballSelected.vel.y = (ballSelected.pos.y - mouseY)/5;
	}

	if(mouseDown || keyHeld_Space){
		if(ballSelected == undefined && lineSegmentSelected == undefined){
			for (var i = 0; i < balls.length; i++) {
				if(IsPointInCircle(mouseX, mouseY, balls[i].pos.x, balls[i].pos.y, balls[i].r)){
					ballSelected = balls[i];
					break;
				}
			}

			for (var i = 0; i < lines.length; i++) {
				if(IsPointInCircle(mouseX, mouseY, lines[i].start.x, lines[i].start.y, lines[i].r)){
					lineSegmentSelected = lines[i];
					selectedLineStart = true;
					break;
				}
				if(IsPointInCircle(mouseX, mouseY, lines[i].end.x, lines[i].end.y, lines[i].r)){
					lineSegmentSelected = lines[i];
					selectedLineStart = false;
					break; 
				}
			}
		}
	}else{
		ballSelected = undefined;
		lineSegmentSelected = undefined;
	}

	if(mouseDown){
		if(ballSelected){
			ballSelected.pos.x = mouseX;
			ballSelected.pos.y = mouseY;
		}
		if(lineSegmentSelected){
			if(selectedLineStart){
				lineSegmentSelected.start.x = mouseX;
				lineSegmentSelected.start.y = mouseY;
			}else{
				lineSegmentSelected.end.x = mouseX;
				lineSegmentSelected.end.y = mouseY;
			}	
		}
	}
	
	
	for (var t = 0; t < numSimulationUpdates; t++) {
		for (var i = 0; i < balls.length; i++) {
			balls[i].simTimeRemaining = simElapsedTime;
		}

		for (var step = 0; step < maxSimulationSteps; step++) {
			//apply forces to the balls
			for (var i = 0; i < balls.length; i++) {
				if(balls[i].simTimeRemaining > 0){
					balls[i].oPos.x = balls[i].pos.x;
					balls[i].oPos.y = balls[i].pos.y;

					balls[i].acc.x = 0;
					balls[i].acc.x = 0;

					//adding friction
					balls[i].acc.x = -balls[i].vel.x * 0.01;
					balls[i].acc.y = -balls[i].vel.y * 0.01 + 0.8;

					//update vetcors
					balls[i].vel.x += balls[i].acc.x * balls[i].simTimeRemaining;
					balls[i].vel.y += balls[i].acc.y * balls[i].simTimeRemaining;
					balls[i].pos.x += balls[i].vel.x * balls[i].simTimeRemaining;
					balls[i].pos.y += balls[i].vel.y * balls[i].simTimeRemaining;

					if(balls[i].pos.x <= 0){  balls[i].pos.x = canvas.width;  }
					if(balls[i].pos.x > canvas.width){	balls[i].pos.x = 0;	}
					if(balls[i].pos.y <= 0){  balls[i].pos.y = canvas.height;  }
					if(balls[i].pos.y > canvas.height){	balls[i].pos.y = 0;	}

					// if(Math.abs(balls[i].vel.x*balls[i].vel.x + balls[i].vel.y*balls[i].vel.y) <= 0.01){
					// 	balls[i].vel.x = 0;
					// 	balls[i].vel.y = 0;
					// }
				}
			}//apply forces


			//get collisions and handle static collisions
			for (var i = 0; i < balls.length; i++) {

				//against edges
				for (var j = 0; j < lines.length; j++) {

					let line1 = new Vector(lines[j].end.x - lines[j].start.x, lines[j].end.y - lines[j].start.y);
					let line2 = new Vector(balls[i].pos.x - lines[j].start.x, balls[i].pos.y - lines[j].start.y);

					let edgeLength = line1.x*line1.x + line1.y*line1.y;
					let tl = Math.max(0, Math.min(edgeLength, (line1.x*line2.x + line1.y*line2.y))) / edgeLength;

					let closestPointX = lines[j].start.x + tl * line1.x;
					let closestPointY = lines[j].start.y + tl * line1.y;

					let distance = distanceOfTwoPoints(closestPointX, closestPointY, balls[i].pos.x, balls[i].pos.y);

					if(distance <= (balls[i].r + lines[j].r)){

						//static collision has occured
						let fakeBall = new Ball(closestPointX, closestPointY, lines[j].r);
						fakeBall.mass = balls[i].mass * 0.8;
						fakeBall.vel.x = -balls[i].vel.x;
						fakeBall.vel.y = -balls[i].vel.y;

						fakeBalls.push(fakeBall);
						pairsOfCollidingBalls.push({b1:fakeBall, b2:balls[i]});

						let overlapLine = distance - balls[i].r - fakeBall.r;

						balls[i].pos.x -= overlapLine * (balls[i].pos.x - fakeBall.pos.x) / distance;
						balls[i].pos.y -= overlapLine * (balls[i].pos.y - fakeBall.pos.y) / distance;
					}
				}

				//agaisnt other balls
				for (var j = 0; j < balls.length; j++) {
					if(balls[i].id != balls[j].id){

						if(DoCirclesOverlap(balls[i].pos.x, balls[i].pos.y, balls[i].r, 
											balls[j].pos.x, balls[j].pos.y, balls[j].r)){

							pairsOfCollidingBalls.push({b1:balls[i], b2:balls[j]});

							let distFromBallsCenters = distanceOfTwoPoints(balls[i].pos.x, balls[i].pos.y, balls[j].pos.x, balls[j].pos.y);
							let overLap = (distFromBallsCenters - balls[i].r - balls[j].r)/2;

							//displace the current ball
							balls[i].pos.x -= overLap * (balls[i].pos.x - balls[j].pos.x) / distFromBallsCenters;
							balls[i].pos.y -= overLap * (balls[i].pos.y - balls[j].pos.y) / distFromBallsCenters;

							//displace the target ball
							balls[j].pos.x += overLap * (balls[i].pos.x - balls[j].pos.x) / distFromBallsCenters;
							balls[j].pos.y += overLap * (balls[i].pos.y - balls[j].pos.y) / distFromBallsCenters;
						}

					}
				}

				//time displacement
				let intendedSpeed = Math.sqrt(balls[i].vel.x*balls[i].vel.x + balls[i].vel.y*balls[i].vel.y);

				if(intendedSpeed != 0){
					let intendedDistance = intendedSpeed * balls[i].simTimeRemaining;
					let actualDistance = distanceOfTwoPoints(balls[i].pos.x, balls[i].pos.y,
														 balls[i].oPos.x, balls[i].oPos.y);
					let actualTime = actualDistance / intendedSpeed;

					balls[i].simTimeRemaining -= actualTime;
				}
			}//set time displacement and deal with static collisions

			//handle dynamic collisions
			for (var i = 0; i < pairsOfCollidingBalls.length; i++) {
				let b1 = pairsOfCollidingBalls[i].b1;
				let b2 = pairsOfCollidingBalls[i].b2;

				let distFromCollisionsCenters = distanceOfTwoPoints(b1.pos.x, b1.pos.y, b2.pos.x, b2.pos.y);

				//normal
				let nx = (b1.pos.x - b2.pos.x) / distFromCollisionsCenters;
				let ny = (b1.pos.y - b2.pos.y) / distFromCollisionsCenters;

				//tagent
				let tx = -ny;
				let ty = nx;

				//dot product tangent
				let dpTan1 = b1.vel.x * tx + b1.vel.y * ty;
				let dpTan2 = b2.vel.x * tx + b2.vel.y * ty;

				//dot product normal
				let dpNorm1 = b1.vel.x * nx + b1.vel.y * ny;
				let dpNorm2 = b2.vel.x * nx + b2.vel.y * ny;

				//conservation of momentum in 1D
				let m1 = (dpNorm1 * (b1.mass - b2.mass) + 2 * b2.mass * dpNorm2) / (b1.mass + b2.mass);
				let m2 = (dpNorm2 * (b2.mass - b1.mass) + 2 * b1.mass * dpNorm1) / (b1.mass + b2.mass);

				b1.vel.x = tx * dpTan1 + nx * m1;
				b1.vel.y = ty * dpTan1 + ny * m1;
				b2.vel.x = tx * dpTan2 + nx * m2;
				b2.vel.y = ty * dpTan2 + ny * m2;
				// pairsOfCollidingBalls = [];
			}//dynamic collisions
		}//max sim steps
	}//for shortened epoch
}//function

