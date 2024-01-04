function dotClass(){
  this.r = 7.5;
  this.x = canvas.width/2;
  this.y = canvas.height-this.r*10;
  this.acc = 0;
  this.vel = 0;
  this.ang = 0;
  this.brain = getSteps();
  this.maxVel = 20;
  this.dead = false;
  this.reachedGoal = false;

  this.show = function(color){
    colorCircle(this.x, this.y, this.r, color)
  }

  this.step = 0;
  this.move = function(){
    this.acc = this.brain[this.step].acceleration;
    this.ang = this.brain[this.step].angle;

    if(this.vel < this.maxVel){
      this.vel += this.acc;
    }

    this.x += Math.cos(this.ang) * this.vel;
    this.y += Math.sin(this.ang) * this.vel;
    this.acc *= 0; 

    if(this.step < this.brain.length-1 && this.reachedGoal == false 
      && this.step < minSteps){
      this.step++;
    }else{
      this.dead = true;
    }
    this.checkBoundaries();
  }

  this.closest = Infinity;

  this.checkBoundaries = function(){
    if(this.dead == false){
      if(this.x + this.r > canvas.width || this.x - this.r < 0 
        || this.y + this.r > canvas.height || this.y - this.r < 0){
          this.dead = true;
      }else{
        if(dist(this.x,goal.x,this.y,goal.y) < this.r + goal.r){
          this.reachedGoal = true;
          this.dead = true;
        }
      }
      if(box1.intersects(this.x,this.y,this.r) || box2.intersects(this.x,this.y,this.r)){
        this.dead = true;
      }
   }
  }

  this.calculateFitness = function(){
    if(this.reachedGoal){
      this.fitness = 1/16 + 1000/(this.step * this.step)
    }else{
        var distance = dist(this.x,goal.x,this.y,goal.y)
        this.fitness = 1/(distance * distance * distance);
    }
  }

}

function mutateBrainStep(){
    var randomAcc = Math.random();
    var randomAng = Math.random() * 2*Math.PI;
    return {acceleration:randomAcc , angle:randomAng};
  }

function getSteps(){
  var brain = [];
  var offset = 0;
  for (var i = 0; i < steps; i++) {
    var randomAcc = Math.random();
    var randomAng = Math.random() * 2*Math.PI;
    brain[i] = {acceleration:randomAcc , angle:randomAng};
    offset += 0.001
  }
  return brain;
}

var steps = 10;
var minSteps = Infinity;
function Population(size){
  this.dots = new Array(size);
  this.fitnessSum = 0;
  this.generation = 1;

    for (var i = 0; i < size; i++) {
      this.dots[i] = new dotClass();
    }

  this.show = function(){
    for (var i = 1; i < this.dots.length; i++) {
      this.dots[i].show('blue');
    }
    this.dots[0].show('yellow');

    drawText('yellow', "Generation: "+this.generation, 50, 50)
  }

  this.update = function(){
    this.move();
    this.allDotsDead = areAllDotsDead(this.dots);
  }

  this.move = function(){
    for (var i = 0; i < this.dots.length; i++) {
      if(this.dots[i].dead == false && this.dots[i].reachedGoal == false){
        this.dots[i].move();
      }
    }
  }

  this.calculateFitness = function(){
    this.fitnessSum = 0;
    for (var i = 0; i < this.dots.length; i++) {
      this.dots[i].calculateFitness();
      this.fitnessSum += this.dots[i].fitness;
    }
  }


  this.naturalSelection = function(){
    let nextDots = new Array(this.dots.length);
   
    for (var i = 0; i < this.dots.length; i++) {
      nextDots[i] = new dotClass();
    }
    nextDots[0].brain = this.getBestDot();

    for (var i = 1; i < this.dots.length; i++) {
      let parent = this.selectParent();
      nextDots[i].brain = deepCopy(parent.brain);
    }

    this.dots = deepCopy(nextDots);
    this.generation++;

    if(this.generation % 20 == 0 && minSteps > 20000){
      let nextSteps = getSteps(); 
      for (var i = 0; i < this.dots.length; i++) {
        for (var j = 0; j < nextSteps.length; j++) {
          this.dots[i].brain.push(nextSteps[j])
        }
      }
      console.log(this.dots[0].brain);
    }
  }

  this.selectParent = function(){
    let randomPoint = Math.random() * this.fitnessSum;
    let runningSum = 0;

      for (var i = 0; i < this.dots.length; i++) {
        runningSum += this.dots[i].fitness;

        if(runningSum > randomPoint){
          return this.dots[i]
        }
      }
  }

  this.mutateChildren = function(){
    let mutationRate = 0.01;

    for (var i = 1; i < this.dots.length; i++) {
      for (var e = 0; e < this.dots[i].brain.length; e++) {
          if(Math.random() < mutationRate){
            this.dots[i].brain[e] = mutateBrainStep();
          }
      }
    }
  }

  this.getBestDot = function(){
    let bestFitness = 0;
    let bestDot = undefined;
    for (var i = 0; i < this.dots.length; i++) {
      if(this.dots[i].fitness > bestFitness){
        bestDot = this.dots[i];
        bestFitness = this.dots[i].fitness;
      }
    }

    if(bestDot.reachedGoal){
      minSteps = bestDot.step;
      console.log(minSteps)
    }
    return bestDot.brain;
  }

}


function areAllDotsDead(array){
    var dotAlive = false;
    for (var i = 0; i < array.length; i++) {
      if(array[i].dead == false){
        dotAlive = true;
      }
    }
    if(dotAlive == false){
      return true;
    }else{
      return false;
    }
}

function deepCopy(arr){
  let copy = [];
  arr.forEach(elem => {
    if(Array.isArray(elem)){
      copy.push(deepCopy(elem))
    }else{
      if (typeof elem === 'object') {
        copy.push(deepCopyObject(elem))
    } else {
        copy.push(elem)
      }
    }
  })
  return copy;
}
// Helper function to deal with Objects
function deepCopyObject(obj){
  let tempObj = {};
  for (let [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      tempObj[key] = deepCopy(value);
    } else {
      if (typeof value === 'object') {
        tempObj[key] = deepCopyObject(value);
      } else {
        tempObj[key] = value
      }
    }
  }
  return tempObj;
}





