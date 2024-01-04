const BRICK_COLS = 20;
const BRICK_ROWS = 20;
var BRICK_W;
var BRICK_H;
const BRICK_GAP = 1;
var brickGrid = new Array(BRICK_COLS)

var enemys = new Array(70);


function drawEverything (){
    colorRect(0,0,canvas.width,canvas.height,'black');

    for(i = 0; i < brickGrid.length; i++){
        for(j = 0; j < brickGrid.length; j++){
              brickGrid[i][j].showNode('white');
          }
    }

    for (var i = 0; i < enemys.length; i++) {
      enemys[i].moveOnPath();
      enemys[i].show('blue');
    }
   	
}

var mouseX;
var mouseY;
var mouseCol;
var mouseRow;

function updateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;

  mouseX = evt.clientX - rect.left - root.scrollLeft;
  mouseY = evt.clientY - rect.top - root.scrollTop;

  mouseCol = Math.floor(mouseX/BRICK_W);
  mouseRow = Math.floor(mouseY/BRICK_H);
}

	
document.addEventListener('mousemove', updateMousePos);