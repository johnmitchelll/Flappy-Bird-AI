var limit = 1;
function Point(x,y) {
    this.x = x;
    this.y = y;

    while(brickGrid[Math.floor(this.x/BRICK_W)][Math.floor(this.y/BRICK_H)].target == true){
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
    }

    this.show = function(){
        colorRect(this.x,this.y, 2,3, getRGB())
    }

    this.velX = 0
    this.accX = 0;
    this.velY = 0;
    this.accY = 0;
    this.ang;

    this.move = function(){
      if(this.x > canvas.width){
          this.x = 0;
        }
        if(this.x < 0){
         this.x = canvas.width-1;
        }
        if(this.y > canvas.height){
          this.y = 0;
        }
        if(this.y < 0){
           this.y = canvas.height-1;
        }

      let currentNode = brickGrid[Math.floor(this.x/BRICK_W)][Math.floor(this.y/BRICK_H)];

      if(currentNode.target == false){

        this.ang = currentNode.ang;

          this.accX += Math.cos(this.ang)*3;
          this.accY += Math.sin(this.ang)*3;

      }

      this.velX += this.accX;
      this.velY += this.accY;
      if(this.velX > 11){
        this.velX = 11
      }
      if(this.velX < -11){
        this.velX = -11
      }
      if(this.velY > 11){
        this.velY = 11
      }
      if(this.velY < -11){
        this.velY = -11
      }
      this.x += this.velX;
      this.y += this.velY;
      this.accX = 0;
      this.accY = 0;

    }
}

    var r = 0;
    var rDir = 0.001;
    var g = 25;
    var gDir = 0.001;
    var b = 127;
    var bDir = 0.001;

    function getRGB(){
        r += rDir;
        if (r > 255) {
          rDir *= -1;
        }else if(r < 0){
          rDir *= -1;
        }
        g += gDir;
        if (g > 30) {
          gDir *= -1;
        }else if(g < 0){
          gDir *= -1;
        }
        b += bDir;
        if (b > 255) {
          bDir *= -1;
        }else if(b < 0){
          bDir *= -1;
        }

        return('rgba('+r+','+g+','+b+',0.1');
    }