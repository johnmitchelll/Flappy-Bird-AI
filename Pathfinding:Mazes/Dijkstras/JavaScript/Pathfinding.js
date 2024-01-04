var notIncluded = [];
var shortestPathSet = [];
var path = [];
var current;
var apple;
var done = false;
var start;

function scan (){
 	var neighbors = current.neighbors;

 	for (var i = 0; i < neighbors.length; i++) {
 		var neighborsCenter = [neighbors[i].i * BRICK_W + BRICK_W/2,
 								neighbors[i].j * BRICK_H + BRICK_H/2]
 		var currentCenter = [current.i * BRICK_W + BRICK_W/2,
 								current.j * BRICK_H + BRICK_H/2]

 		var distFromCenterToCenter = Math.floor(current.value + getDistance(neighborsCenter[0],neighborsCenter[1], currentCenter[0],currentCenter[1]));

 		if(distFromCenterToCenter < neighbors[i].value){
 			neighbors[i].value = distFromCenterToCenter;
 			neighbors[i].parent = current;
 		}

 	}

 	var lowest = notIncluded[0];
 	for (var i = 0; i < notIncluded.length; i++) {
 		if(lowest.value > notIncluded[i].value){
 			lowest = notIncluded[i];
 		}
 	}
	
 	current = lowest;
 	removeFromArray(notIncluded,current);
	shortestPathSet.push(current)
 // console.log(lowest)
	if(current == apple || lowest.value == Infinity){
		done = true;

	path = []
      var temp = current;
      path.push(temp)
        while(temp.parent){
          path.push(temp)
          temp = temp.parent
        }
	}
}

function getDistance(x1,y1, x2,y2){
	var D = Math.sqrt( (x2 - x1)*(x2 - x1) + (y2-y1)*(y2-y1))

		return D;
}


function heuristic(a, b){
	var dist  = Math.abs((a.i - b.i)) + Math.abs(a.j - b.j);

	return dist;

}

function getRandomInt(max){
	return Math.floor(Math.random() * max)

}


function removeFromArray(array,index){
	for(i = array.length - 1; i >= 0; i--){
		if(array[i] == index){
			array.splice(i, 1);
		}
	}
}