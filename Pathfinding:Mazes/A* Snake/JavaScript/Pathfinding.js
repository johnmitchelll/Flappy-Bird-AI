var openList = [null];
var closedList = [];
var path = [];
var current;
var apple;
var done = false;

//call this function repeatedly
function scan(){
	if(current != apple){

		sort(openList)
		current = openList[1];

		removeFromArray(openList, current);
		closedList.push(current);

		var neighbors = current.neighbors;

		for(var i = 0;i < neighbors.length; i++){
			var neighbor = neighbors[i];
			var tempG = current.g + 1;
			
			if(closedList.includes(neighbor) == false && neighbor.wall == false){

			var newPath = false;
			if(openList.includes(neighbor)){
				if(tempG < neighbor.g){
						neighbor.g = tempG;
						newPath = true;
					}
			}else{
				neighbor.g = tempG;
				openList.push(neighbor)
				// openList.push(neighbor);
				newPath = true;
				}

				if(newPath){
					neighbor.h = heuristic(neighbor, apple);
					neighbor.f = neighbor.g + neighbor.h;
					neighbor.parent = current;	
				}
			}
		}

			path = []
			var temp = current;
			path.push(temp)
				while(temp.parent){
					path.push(temp)
					temp = temp.parent
				}
	}
	if(current.index == apple.index){
		openList = [null];
		closedList = [];
		path = [];

		setUp();

	}
}

//left child i * 2
//right child i * 2 + 1
//parent i/2
function sort(list){
	var index = Math.floor(list.length/2);

while(index >= 1){
	if(list[index*2] != undefined && list[index].f > list[index * 2].f){
		[list[index],list[index*2]] = [list[index*2],list[index]];
		// if(index == 1){
		// 	index = Math.floor(list.length/2);
		// }
	}
	if(list[index*2+1] != undefined && list[index].f > list[index * 2+1].f){
		[list[index],list[index*2+1]] = [list[index*2+1],list[index]];
		// if(index == 1){
		// 	index = Math.floor(list.length/2);
		// }
	}

	index--;
  }

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