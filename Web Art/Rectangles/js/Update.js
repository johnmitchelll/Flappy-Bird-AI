const shiftRange = 100;

function step(){
	if(line.dir == 0){
		for (var i = 0; i < rects.length; i++) {
			if(line.y > rects[i].y && line.y < rects[i].y + rects[i].h){
				rects.push(new Rect(rects[i].x+randomIntFromInterval(-shiftRange, shiftRange),
									line.y,rects[i].w,rects[i].y + rects[i].h - line.y));
				rects[i].h = line.y - rects[i].y;
			}
		}
	}else if(line.dir == 1){
		for (var i = 0; i < rects.length; i++) {
			if(line.x > rects[i].x && line.x < rects[i].x + rects[i].w){
				rects.push(new Rect(line.x,rects[i].y+randomIntFromInterval(-shiftRange, shiftRange),
									rects[i].x + rects[i].w - line.x,rects[i].h));
				rects[i].w = line.x - rects[i].x;
			}
		}
	}

	line.x = Math.random()*zoom - canvas.width/2;
	line.y = Math.random()*zoom - canvas.height/2;
	if(Math.random() > 0.5){
		line.dir = 1;
	}else{
		line.dir = 0;
	}
	
}