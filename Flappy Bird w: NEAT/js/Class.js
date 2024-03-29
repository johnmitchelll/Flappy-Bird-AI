const WALL_GAP = 400;
var wall_speed = 4;

function moveWalls(){
  if(walls[0].x + walls[0].w < 0){
    walls[0] = undefined;
    for (var i = 1; i < walls.length; i++) {
      walls[i-1] = walls[i];
    }
    walls[walls.length-1] = new Wall();
    population.payingAttentionTo = walls[0];
    population.nextWall = walls[1];
  }

  wall_speed += 0.01;

  if(wall_speed >  25){
    wall_speed = 25;
  }

  if(population.allDead == false){
    walls[0].x -= wall_speed;
    for (var i = 1; i < walls.length; i++) {
      if(walls[i-1].x < walls[i].x - WALL_GAP){
        walls[i].x -= wall_speed;
      }
    }
  }

}

function Wall(color){
  this.x = canvas.width;
  this.w = 125;
  this.vel = wall_speed;
  this.passed = false;
  this.color = color;
  this.gap = {
              y:randomIntFromInterval(80, canvas.height-160-80),
              h:randomIntFromInterval(160, 180)
            }

  this.show = function(color){
    //top wall
    colorRect(this.x,0, this.w,this.gap.y, color);
    canvasContext.strokeRect(this.x,0,this.w,this.gap.y);
    //bottom wall
    colorRect(this.x,this.gap.y+this.gap.h, 
              this.w,canvas.height-(this.gap.y+this.gap.h), color);
    canvasContext.strokeRect(this.x,this.gap.y+this.gap.h,
                            this.w,canvas.height-(this.gap.y+this.gap.h));
  }
}

/////////////////////////////////////////////////////////////////////////////////

const GRAV = 1.2;

function Ball(){
  this.x = walls[0].w + 120*(Math.random()-0.5);
  this.y = canvas.height/2;
  this.r = 15;
  this.vel =  0;
  this.acc = 0;
  this.score = 0;
  this.maxSpeed = 15;
  this.maxFallSpeed = 10;
  this.dead = false;
  this.fitness = 0;
  this.brain = new Brain();

  this.ang = 0;

  this.show = function(color){
    this.animate();
    drawImageFromSpriteSheetWithRotation(bird, 0, 0, 17, 12, this.x, this.y, 51, 36, this.ang, false);
  }

  this.animate = function(){
    this.ang = Math.atan2(this.vel, wall_speed);

    this.ang = normalizeValue(-2*Math.PI, 2*Math.PI, this.ang) - 0.5;

    this.ang *= 7.5;
  }

  this.move = function(){
    if(this.dead == false){
      this.acc += GRAV;
      this.vel += this.acc;

      let inputNodes = this.brain.layers[0];
      //must send as an object with a weight and value sent
      let xGap = normalizeValue(0, canvas.width, population.payingAttentionTo.x - (this.x + this.r));
      inputNodes[0].inputs.push({weight:1,val:xGap});

      let topYGap = normalizeValue(-canvas.height, canvas.height, population.payingAttentionTo.gap.y - this.y)
      inputNodes[1].inputs.push({weight:1,val:topYGap});

      let bottomYGap = normalizeValue(-canvas.height, canvas.height, Math.abs((population.payingAttentionTo.gap.y + population.payingAttentionTo.gap.h) - this.y))
      inputNodes[2].inputs.push({weight:1,val:bottomYGap});

      let nextBottomYGap = normalizeValue(-canvas.height, canvas.height, Math.abs((population.nextWall.gap.y + population.nextWall.gap.h) - this.y))
      inputNodes[3].inputs.push({weight:1,val:nextBottomYGap});

      let nextTopYGap = normalizeValue(-canvas.height, canvas.height, Math.abs(population.nextWall.gap.y - this.y))
      inputNodes[4].inputs.push({weight:1,val:nextTopYGap});
     
      let output = this.brain.getOutput();

      // console.log(output, this.vel)

      let diving = false;

      if(output.val > 0.5){
        if(output.index == 0){
          this.vel -= 20;
        }else if(output.index == 1){
          this.vel += 1;
          diving = true;
        }
      }


      // console.log(this.vel, diving, output)
      // if we are choosing to dive we will be able to faster than when in freefall
      if(this.vel > this.maxFallSpeed){
        this.vel = this.maxFallSpeed;
      }else if(this.vel < -this.maxFallSpeed && diving == false){
        this.vel = -this.maxFallSpeed;
      }else if(diving && this.vel < -this.maxSpeed){
        this.vel = -this.maxSpeed;
      }

      this.y += this.vel;
      this.acc *= 0;

      this.checkCollision();
    }
  }

  this.checkCollision = function(){

    if(walls[0].passed == false && this.x - this.r > walls[0].x + walls[0].w){
      walls[0].passed = true;
      population.payingAttentionTo = walls[1];
      population.nextWall = walls[walls.length-1];
    }

    if(this.y + this.r > canvas.height){
        this.y = canvas.height-this.r;
        this.dead = true;
        return;
    }

    let wall = walls[0];
    //top wall collision
    if(this.x + this.r > wall.x && this.x - this.r < wall.x + wall.w
      && this.y - this.r < wall.gap.y){
      this.dead = true;
      return;
    }
    //bottom wall collision
    if(this.x + this.r > wall.x && this.x - this.r < wall.x + wall.w
      && this.y + this.r > wall.gap.y + wall.gap.h){
      this.dead = true;
      return;
    }

    // only add score if below top, we dont want to reward that behavior
    if(this.y > 0){
      if(population.currentBestScore > this.score){
        this.score++;
      }
    }
  }

  this.reset = function(){
    this.x = walls[0].w + 120*(Math.random()-0.5);
    this.y = canvas.height/2;
    this.vel =  0;
    this.acc = 0;
    this.dead = false;
  }

}

/////////////////////////////////////////////////////////////////////////////////

function Population(size){
  this.size = size;
  this.balls = new Array(size);
  this.bestScore = -Infinity;
  this.allDead = false;
  this.genNum = 0;
  this.amountAlive = size;
  this.currentBestScore = 0;
  this.payingAttentionTo = walls[0];
  this.nextWall = walls[1];

  for (var i = 0; i < this.balls.length; i++) {
    this.balls[i] = new Ball();
  }

  this.show = function(){
    for (var i = 0; i < this.balls.length; i++) {
      if(this.balls[i].dead == false){
        this.balls[i].show();
      }
    }

    if(this.balls[0].dead == false){
      this.balls[0].show('orange');
    }
  }

  this.update = function(){

    this.allDead = areAllBallsDead(this.balls);
    if(this.allDead){
      for (var i = 0; i < walls.length; i++) {
        walls[i] = new Wall();
      }

      this.payingAttentionTo = walls[0];
      this.nextWall = walls[1];
      this.genNum++;

      this.createNewGeneration();
      this.amountAlive = this.balls.length;
      this.currentBestScore = 0;

      wall_speed = 4;
      
      this.allDead = false;
      return; 
    }

    this.amountAlive = 0;
    for (var i = 0; i < this.balls.length; i++) {
      if(this.balls[i].dead == false){
        this.amountAlive++;
        
        this.balls[i].move();
      }
    }

    this.currentBestScore++;

    moveWalls();
  }

  this.createNewGeneration = function(){

      this.balls.sort(function(a, b){return b.score - a.score});

      this.balls[0].reset();

       if(this.balls[0].score > this.bestScore){
          this.bestScore = this.balls[0].score;
        }

      for (var i = 1; i < this.balls.length; i++) {
        this.balls[i].reset();

        if(this.balls[i].score > this.bestScore){
          this.bestScore = this.balls[i].score;
        }

        this.balls[i].score = 0;
        this.balls[i].brain = deepCopyObject(this.balls[0].brain);

        this.balls[i].brain.randomlyMutate();
      }

  }

}

function areAllBallsDead(arr){
  let ballAlive = false;
    for (var i = 0; i < arr.length; i++) {
      if(arr[i].dead == false){
        ballAlive = true;
      }
    }

    if(ballAlive == false){
      return true;
    }else{
      return false;
    }
}
