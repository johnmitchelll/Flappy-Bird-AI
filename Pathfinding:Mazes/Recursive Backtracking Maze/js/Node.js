function nodeClass(i,j){
this.i = i;
this.j = j;
this.index = i + BRICK_COLS * j;
this.wall = false;

    this.parent = undefined;
    this.g = 0;
    this.h = 0;
    this.f = 0;

this.left = false;
this.up = false;
this.right = false;
this.down = false;
this.center = false;

this.show = function(color){
  colorRect(i * BRICK_W,j * BRICK_H, BRICK_W, BRICK_H, color)
}

this.neighbors = [];
    this.addNeighbors = function(grid){
    var i = this.i;
    var j = this.j;
        if(i < BRICK_COLS-1){
            this.neighbors.push(grid[i+1][j])
        }
        if(i > 0){
            this.neighbors.push(grid[i-1][j]);
        }
        if(j < BRICK_ROWS - 1){
            this.neighbors.push(grid[i][j+1]);
        }
        if(j > 0){
            this.neighbors.push(grid[i][j-1]);
        }
        if(i < BRICK_COLS-1 && j < BRICK_ROWS - 1){
            this.neighbors.push(grid[i+1][j+1]);
        }
        if(i < BRICK_COLS-1 && j > 0){
            this.neighbors.push(grid[i+1][j-1]);
        }
        if(j > 0 && i > 0){
            this.neighbors.push(grid[i-1][j-1]);
        }
        if(i > 0 && j < BRICK_ROWS - 1){
            this.neighbors.push(grid[i-1][j+1]);
        }

    }

}


function wallClass(i,j,nodes){
  this.i = i;
  this.j = j;
  this.nodes = nodes;

  this.visited = false;

  this.left = true;
  this.up = true;
  this.right = true;
  this.down = true;

  

  this.checkNeighbors = function(){
    var i = this.i;
    var j = this.j;
    this.neighbors = [];

        if(i < cellCols-1 && wallList[i+1][j].visited == false){
            this.neighbors.push(wallList[i+1][j])
        }
        if(i > 0 && wallList[i-1][j].visited == false){
            this.neighbors.push(wallList[i-1][j]);
        }
        if(j < cellCols - 1 && wallList[i][j+1].visited == false){
            this.neighbors.push(wallList[i][j+1]);
        }
        if(j > 0 && wallList[i][j-1].visited == false){
            this.neighbors.push(wallList[i][j-1]);
        }

        if(this.neighbors.length > 0){
          var randomNeightbor = Math.floor(Math.random() * this.neighbors.length)
          return this.neighbors[randomNeightbor]
        }else{
          return undefined;
        }
  }

  this.handleWalls = function(){
    if(currentMaze == this){
      this.visited = true;
    }

    var nodes = this.nodes;
    for (var j = 0; j < nodes.length; j++) {

      // if(this.visited && nodes[j].center){
      //   nodes[j].show('purple')
      // }

      if(currentMaze == this && nodes[j].center){
        nodes[j].show('blue')
      }

      if(this.left && nodes[j].left){
        nodes[j].wall = true;
      }else if(this.left == false && nodes[j].left
               && nodes[j].up == false && nodes[j].down == false){
        nodes[j].wall = false;
      }

      if(this.up && nodes[j].up){
        nodes[j].wall = true;
      }else if(this.up == false && nodes[j].up
               && nodes[j].right == false && nodes[j].left == false){
        nodes[j].wall = false;
      }

      if(this.right && nodes[j].right){
        nodes[j].wall = true;
      }else if(this.right == false && nodes[j].right
               && nodes[j].up == false && nodes[j].down == false){
        nodes[j].wall = false;
      }

      if(this.down && nodes[j].down){
        nodes[j].wall = true;
      }else if(this.down == false && nodes[j].down
               && nodes[j].right == false && nodes[j].left == false){
        nodes[j].wall = false;
      }

      if(this.up == false && this.left == false
          && nodes[j].up && nodes[j].left){
        nodes[j].wall = false;
      }
      if(this.up == false && this.right == false
          && nodes[j].up && nodes[j].right){
        nodes[j].wall = false;
      }
      if(this.down == false && this.right == false
          && nodes[j].down && nodes[j].right){
        nodes[j].wall = false;
      }
      if(this.down == false && this.left == false
          && nodes[j].down && nodes[j].left){
        nodes[j].wall = false;
      }

    }
  }

}