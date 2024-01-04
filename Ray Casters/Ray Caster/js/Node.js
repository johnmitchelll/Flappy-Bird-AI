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
  this.dir = {x:Math.cos(ang),y:Math.sin(ang)};

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
  this.pos = {x:canvas.width/2,y:canvas.height/2};
  this.rays = [];
  this.velX = 0;
  this.accX = 0;
  this.velY = 0;
  this.accY = 0;
  this.maxSpeed = 3.3;
  this.r = 10;

  for (var i = 0; i < 2*Math.PI-Math.PI/720; i += Math.PI/720) {
    this.rays.push(new Ray(this.pos,i))
  }

  this.update = function(){
    // this.pos.x = mouseX;
    // this.pos.y = mouseY;

    if(keyHeld_Left){
      this.accX -= this.maxSpeed / 10;
    }
    if(keyHeld_Up){
      this.accY -= this.maxSpeed / 10;
    }
    if(keyHeld_Right){
      this.accX += this.maxSpeed / 10;
    }
    if(keyHeld_Down){
      this.accY += this.maxSpeed / 10;
    }
    this.velX += this.accX;
    this.velY += this.accY;
    this.pos.x += this.velX;
    this.pos.y += this.velY;
    this.accX *= 0;
    this.accY *= 0;

    if(this.velX > this.maxSpeed){
      this.velX  = this.maxSpeed;
    }else if(this.velX < -this.maxSpeed){
      this.velX = -this.maxSpeed;
    }
    if(this.velY > this.maxSpeed){
      this.velY  = this.maxSpeed;
    }else if(this.velY < -this.maxSpeed){
      this.velY = -this.maxSpeed;
    }

    if(this.velX > 0){
      this.velX -= 0.1;
    }else if(this.velX < 0){
      this.velX += 0.1;
    }
    if(this.velY > 0){
      this.velY -= 0.1;
    }else if(this.velY < 0){
      this.velY += 0.1;
    }

    if(Math.abs(this.velX) < 0.2){
      this.velX = 0;
    }
    if(Math.abs(this.velY) < 0.2){
      this.velY = 0;
    }

    if(this.pos.x - this.r < 0){
      this.pos.x = 0 + this.r;
      this.velX = 0;
    }
    if(this.pos.y - this.r < 0){
      this.pos.y = 0 + this.r;
      this.velY = 0;
    }
    if(this.pos.x + this.r > canvas.width){
      this.pos.x = canvas.width - this.r;
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
    for (var i = 0; i < this.rays.length; i++) {
      let record = Infinity;
      let closest = undefined;

      for (var j = 0; j < walls.length; j++) {
        let pt = this.rays[i].cast(walls[j]);
        if(pt != undefined){
          let d = getDist(this.pos.x,this.pos.y,pt.x,pt.y)
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
    }

  }
}



