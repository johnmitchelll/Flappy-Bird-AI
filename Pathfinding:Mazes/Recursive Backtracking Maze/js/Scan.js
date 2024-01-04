var cellSize = 3;//must be odd ad divisible by cols and rows
var cellCols = BRICK_COLS/cellSize;
var cellRows = BRICK_ROWS/cellSize;
var wallList = new Array(BRICK_COLS/cellSize);
var currentMaze;
var stack = [];
var doneWithMaze = false;


function scanMaze(){
  var next = currentMaze.checkNeighbors();
  // console.log(next)

  if(next){
    next.visted = true;
    stack.push(currentMaze);
    removeWall(currentMaze, next);
    currentMaze = next
  }else if(stack.length > 0){
    currentMaze = stack.pop();
  }else{
    console.log("DONE");
    doneWithMaze = true;
  }
}

function removeWall(a,b){
  var x = a.i - b.i;
  var y = a.j - b.j;

   if(x == -1){
    wallList[a.i][a.j].right = false;
    wallList[b.i][b.j].left = false;
   }
   if(x == 1){
    wallList[a.i][a.j].left = false;
    wallList[b.i][b.j].right = false;
   }

   if(y == -1){
    wallList[a.i][a.j].down = false;
    wallList[b.i][b.j].up = false;
   }
   if(y == 1){
    wallList[a.i][a.j].up = false;
    wallList[b.i][b.j].down = false;
   }

}

function getCells(){
  for (var i = 0; i < wallList.length; i++) {
    wallList[i] = new Array(BRICK_ROWS/cellSize)
  }

  var temp = [];
    for (var o = 0; o < BRICK_COLS; o += cellSize) {
      for (var e = 0; e < BRICK_ROWS; e += cellSize) {
      for (var i = 0; i < cellSize; i++) {
      for (var j = 0; j < cellSize; j++) {
          temp.push(brickGrid[o+i][e+j]);

          if(i == 0){
            brickGrid[o+i][e+j].left = true;
          }
          if(j == 0){
            brickGrid[o+i][e+j].up = true;
          }
          if(i == cellSize-1){
            brickGrid[o+i][e+j].right = true;
          }
          if(j == cellSize-1){
            brickGrid[o+i][e+j].down = true;
          }
          if(i == 1 && j == 1){
            brickGrid[o+i][e+j].center = true;
          }
        }//for
      }//for
      wallList[o/cellSize][e/cellSize] = new wallClass(o/cellSize,e/cellSize,temp);
      temp = [];
    }
  }

  console.log(wallList)
}

function index(i,j){
  return i + (j * BRICK_COLS)
}

///////////////////////////////////////////////
///////////////////////////////////////////////
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
        openList.push(neighbor);
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
  }else{
    done = true;
  }

}

function sort(list){
  var index = Math.floor(list.length/2);

while(index >= 1){
  if(list[index*2] != undefined && list[index].f > list[index * 2].f){
    [list[index],list[index*2]] = [list[index*2],list[index]];
    if(index == 1){
      index = Math.floor(list.length/2);
    }
  }
  if(list[index*2+1] != undefined && list[index].f > list[index * 2+1].f){
    [list[index],list[index*2+1]] = [list[index*2+1],list[index]];
    if(index == 1){
      index = Math.floor(list.length/2);
    }
  }

  index--;
}

}



function heuristic(a, b){
  //var dist  = Math.abs((a.i - b.i)) + Math.abs(a.j - b.j);
  var dist  = Math.sqrt((a.i - b.i)*(a.i - b.i) + (a.j - b.j)*(a.i - b.i));

  return dist;

}

function getRandomInt(max){
  return Math.floor(Math.random() * max)

}

