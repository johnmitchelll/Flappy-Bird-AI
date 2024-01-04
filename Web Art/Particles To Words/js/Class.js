function Node(i,j){
  this.i = i;
  this.j = j;
  this.w = BRICK_W;
  this.h = BRICK_H;
  this.x = this.i * this.w;
  this.y = this.j * this.h;
  this.target = false;
  this.ang;

  this.show = function(color){
    colorRect(this.x+BRICK_GAP/2,this.y+BRICK_GAP/2, this.w - BRICK_GAP,this.h - BRICK_GAP, color)

    canvasContext.strokeStyle = 'red';
    canvasContext.lineWidth = 2;
    canvasContext.beginPath();
    canvasContext.moveTo((this.x+this.w/2), (this.y+this.h/2));
    canvasContext.lineTo((this.x+this.w/2)+Math.cos(this.ang)*10, (this.y+this.h/2)+Math.sin(this.ang)*10);
    canvasContext.stroke();
  }

  this.setAng = function(){
    if(targetList[0]){//if there are any targeted nodes
       
      ///get the clostest targeted node to this node
      let closest = 0;
      for (var i = 0; i < targetList.length; i++) {
        let dist = distBetweenPoints(this.x + this.w/2,this.y + this.h/2, 
                                    targetList[closest].x + targetList[closest].w/2,
                                    targetList[closest].y + targetList[closest].h/2);
        let currentDist = distBetweenPoints(this.x + this.w/2,this.y + this.h/2, 
                                    targetList[i].x + targetList[i].w/2,
                                    targetList[i].y + targetList[i].h/2);
        if(dist > currentDist){
          closest = i;
        }
      }

      let deltaY = targetList[closest].y - this.y;
      let deltaX = targetList[closest].x  - this.x;

      this.ang = Math.atan2(deltaY,deltaX);
    }
  }
}

var targetList = [];
var wordsGrid = new Array(BRICK_COLS)

function setTargetedNodes(){
//make a grid for the letter's nodes, one CELL_ROWS high
//then we need to sandwich that grid between two rows of a varying length


//make the words grid
  for (var i = 0; i < words.length; i++) {
   for (var j = 0; j < letters.length; j++) {

      if(words[i] == letters[j].l){
        //add the letters grid to the words grid

        for (var col = 0; col < CELL_COLS; col++) {
         for (var row = 0; row < CELL_ROWS; row++) {

            if(letters[j].g[col + CELL_COLS * row]  == 1){
              brickGrid[i+1+(i * CELL_COLS)+col][(BUFFER_ROWS/2)+row].target = true;
              targetList.push(brickGrid[i+1+(i * CELL_COLS)+col][(BUFFER_ROWS/2)+row]);
            }
          }
        }

      }
    }
  }

}


function distBetweenPoints(x1,y1,x2,y2){
  return Math.sqrt((x2 - x1)*(x2 - x1) + (y2 - y1)*(y2 - y1));
}

