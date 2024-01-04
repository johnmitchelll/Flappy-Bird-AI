
function Particle() {
  this.posX = Math.random()*canvas.width;
  this.posY = Math.random()*canvas.height;
  this.vel = 1 + Math.random() + 4;
  this.angle = Math.random() * 2;
  this.h = 0;

  this.prevPosX = this.posX;
  this.prevPosY = this.posY;

  this.update = function() {
    this.posX += Math.cos(this.angle) * this.vel;
    this.posY += Math.sin(this.angle) * this.vel;
  };

  this.randomize = function(){
    this.posY = randomIntFromInterval(this.posY - 100, this.posY)
    this.posX = randomIntFromInterval(this.posX - 100, this.posX)
    // this.posY = Math.random()*canvas.height;
  }

    var r = 85;
    var rDir = 1;
    var g = 0;
    var gDir = 1;
    var b = 175;
    var bDir = 1;
  this.show = function() {
    //   r += rDir;
    // if (r > 255) {
    //   rDir *= -1;
    // }else if(r < 0){
    //   rDir *= -1;
    // }
    // g += gDir;
    // if (g > 255) {
    //   gDir *= -1;
    // }else if(g < 0){
    //   gDir *= -1;
    // }
    b += bDir;
    if (b > 255) {
      bDir *= -1;
    }else if(b < 100){
      bDir *= -1;
    }

    colorRect(this.posX,this.posY,4,4,'rgba('+r+','+g+','+b+')');
  }

    this.updatePrev = function() {
    this.prevPosX  = this.posX;
    this.prevPosY  = this.posY;
  };


  this.edges = function() {
    if (this.posX > canvas.width) {
      this.posY = Math.random() * canvas.height;
      this.posX = 0.5
    }
    if (this.posX < 0) {
      this.posY = Math.random() * canvas.height;
      this.posX = canvas.width - 0.5;
    }
    if (this.posY > canvas.height) {
      this.posY = 0.5;
      this.posX = Math.random() * canvas.width;
    }
    if (this.posY < 0) {
      this.posY = canvas.height - 0.5;
      this.posX = Math.random() * canvas.width;
    }
  }

  this.follow = function(grid){
    for (var i = 0; i < grid.length; i++) {
      var col = Math.floor(this.posX / scale);
      var row = Math.floor(this.posY / scale);
      var index = row * rows + col;

      this.angle = grid[index]
    }
  }
}
