//call this function repeatedly
function scan(current,target){
	let availibleSpaces = 0;

	for (var i = 0; i < BRICK_COLS; i++) {
	 for (var j = 0; j < BRICK_ROWS; j++) {
	 	brickGrid[i][j].parent = undefined;
    	brickGrid[i][j].f = 0;
    	brickGrid[i][j].g = 0;
    	brickGrid[i][j].h = 0;
		if(brickGrid[i][j].wall == false){
			availibleSpaces++;
		}
	}
	}

	let path = [];
	let openList = [null];
	let closedList = [];
	openList.push(current);

	while(current !== target){
		sort(openList)
		current = openList[1];
		availibleSpaces--;

		removeFromArray(openList, current);
		closedList.push(current);

		let neighbors = current.neighbors;

		for(var i = 0;i < neighbors.length; i++){
			let neighbor = neighbors[i];
			let tempG = current.g + 1;
			
			if(closedList.includes(neighbor) == false && neighbor.wall == false){

			let newPath = false;
				if(openList.includes(neighbor)){
					if(tempG < neighbor.g){
							neighbor.g = tempG;
							newPath = true;
					}
				}else{
					neighbor.g = tempG;
					openList.push(neighbor)
					newPath = true;
				}

				if(newPath){
					neighbor.h = heuristic(neighbor, target);
					neighbor.f = neighbor.g + neighbor.h;
					neighbor.parent = current;	
				}
			}
		}

			path = []
			let temp = current;
			path.push(temp)
				while(temp.parent){
					path.push(temp)
					temp = temp.parent
				}

				if(availibleSpaces == 0){
					return "no path";
				}
	}

		return path;
}

//left child i * 2
//right child i * 2 + 1
//parent i/2
function sort(list){
	var index = Math.floor(list.length/2);

while(index >= 1){
	if(list[index*2] != undefined && list[index].f > list[index * 2].f){
		[list[index],list[index*2]] = [list[index*2],list[index]];
	}
	if(list[index*2+1] != undefined && list[index].f > list[index * 2+1].f){
		[list[index],list[index*2+1]] = [list[index*2+1],list[index]];
	}

	index--;
  }

}
