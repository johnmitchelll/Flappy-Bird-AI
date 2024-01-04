function Boundary(x1,y1,x2,y2){
  this.start = {x:x1,y:y1};
  this.end = {x:x2,y:y2};

  this.show = function(){
    canvasContext.lineWidth = 2;
    canvasContext.strokeStyle = 'white';
    canvasContext.beginPath()
    canvasContext.moveTo(this.start.x, this.start.y);
    canvasContext.lineTo(this.end.x, this.end.y);
    canvasContext.stroke();
  }
}

function Ray(pos,ang){
  this.pos = {x:pos.x,y:pos.y};
  this.ang = ang;
  this.dir = {x:Math.cos(this.ang),y:Math.sin(this.ang)};

  this.cast = function(wall){
    let x1 = wall.start.x;
    let y1 = wall.start.y;
    let x2 = wall.end.x;
    let y2 = wall.end.y;

    let x3 = this.pos.x;
    let y3 = this.pos.y;
    let x4 = this.pos.x + this.dir.x;
    let y4 = this.pos.y + this.dir.y;


    //complex maths to see if there is a point of intersection bettween line segament and the ray
    let den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    if(den == 0){
      return;
    }

    let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    let u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

    if(t > 0 && t < 1 && u > 0){
      let pt = {x:undefined, y: undefined};
      pt.x = x1 + t * (x2 - x1);
      pt.y = y1 + t * (y2 - y1);
      return pt;
    }else{
      return;
    }

  }
}

function Particle(){
  this.pos = {x:halfScreen/2,y:canvas.height/2};
  this.rays = [];
  this.vel = 0;
  this.acc = 0;
  this.ang = 0;
  this.maxSpeed = 3.3;
  this.r = 10;

  this.init = function(){
    let angOfView = Math.PI/4;//30 Degrees
    for (var i = this.ang-(angOfView/2); i < angOfView; i += Math.PI/180) {
      this.rays.push(new Ray(this.pos,i))
    }
  }

  this.update = function(){
    // this.pos.x = mouseX;
    // this.pos.y = mouseY;

    if(keyHeld_Left){
      this.ang -= Math.PI/90;
      for (var i = 0; i < this.rays.length; i++) {
        this.rays[i].ang -= Math.PI/90;

        let rayAng = this.rays[i].ang;
        this.rays[i].dir = {x:Math.cos(rayAng),y:Math.sin(rayAng)};
      }
    }
    if(keyHeld_Up){
      this.acc += this.maxSpeed / 10;
    }
    if(keyHeld_Right){
      this.ang += Math.PI/90;
      for (var i = 0; i < this.rays.length; i++) {
        this.rays[i].ang += Math.PI/90;

        let rayAng = this.rays[i].ang;
        this.rays[i].dir = {x:Math.cos(rayAng),y:Math.sin(rayAng)};
      }
    }

    if(keyHeld_Down){
      this.acc -= this.maxSpeed / 10;
    }

    // for (var i = 0; i < this.rays.length; i++) {
    //   while(this.rays[i].ang > 2*Math.PI){
    //     this.rays[i].ang -= 2*Math.PI;
    //   }
    //   while(this.rays[i].ang < 0){
    //     this.rays[i].ang += 2*Math.PI;
    //   } 
    // }

    this.vel += this.acc;
    this.pos.x += Math.cos(this.ang) * this.vel;
    this.pos.y += Math.sin(this.ang) * this.vel;
    this.acc *= 0;

    if(this.vel > this.maxSpeed){
      this.vel  = this.maxSpeed;
    }else if(this.vel < -this.maxSpeed){
      this.vel = -this.maxSpeed;
    }

    if(this.vel > 0){
      this.vel -= 0.1;
    }else if(this.vel < 0){
      this.vel += 0.1;
    }

    if(Math.abs(this.vel) < 0.2){
      this.vel = 0;
    }

    if(this.pos.x - this.r < 0){
      this.pos.x = 0 + this.r;
      this.velX = 0;
    }
    if(this.pos.y - this.r < 0){
      this.pos.y = 0 + this.r;
      this.velY = 0;
    }
    if(this.pos.x + this.r > halfScreen){
      this.pos.x = halfScreen - this.r;
      this.velX = 0;
    }
    if(this.pos.y + this.r > canvas.height){
      this.pos.y = canvas.height - this.r;
      this.velY = 0;
    }

    for (var i = 0; i < this.rays.length; i++) {
      this.rays[i].pos.x = this.pos.x;
      this.rays[i].pos.y = this.pos.y;
    }
  }

  this.show = function(){
    colorCircle(this.pos.x, this.pos.y, this.r, 'white')
  }

  this.look = function(walls){
    let scene = [];
    for (var i = 0; i < this.rays.length; i++) {
      let record = Infinity;
      let closest = undefined;

      for (var j = 0; j < walls.length; j++) {
        let pt = this.rays[i].cast(walls[j]);
        
        if(pt != undefined){
          let d = getDist(this.pos.x,this.pos.y,pt.x,pt.y);
          let ca = this.rays[i].ang - this.ang;
          let deltaX = pt.x - this.pos.x;
          let deltaY = pt.y - this.pos.y;
          d = deltaX*Math.cos(this.ang)+deltaY*Math.sin(this.ang)

          if(d < record){
            record = d;
            closest = pt;
          }
        }
      }

      if(closest != undefined){
          canvasContext.lineWidth = 2;
          canvasContext.strokeStyle = 'rgb(255,255,255,0.1)'//getRGB();
          canvasContext.beginPath()
          canvasContext.moveTo(this.pos.x, this.pos.y);
          canvasContext.lineTo(closest.x, closest.y);
          canvasContext.stroke();
      }
      scene[i] = record;

    }
    return scene;
  }

}



