var dir = 1;
var limit = 1;
function Point(x,y,userData) {
        this.x = x;
        this.y = y;

    this.show = function(){
        colorRect(this.x,this.y, 2,2, 'white')
    }

    this.velX = 0
    this.accX = 0;
    this.velY = 0;
    this.accY = 0;

    this.speed = randomIntFromInterval(0.4, 0.6);

    this.move = function(){
        if(this.x > mouseX){
            this.accX = -this.speed * dir;
        }
        if(this.x < mouseX){
            this.accX = this.speed * dir;
        }
        if(this.y > mouseY){
            this.accY = -this.speed * dir;
        }
        if(this.y < mouseY){
            this.accY = this.speed * dir;
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

      if(this.x > canvas.width){
        this.x = 0;
      }
      if(this.x < 0){
       this.x = canvas.width;
      }
      if(this.y > canvas.height){
        this.y = 0;
      }
      if(this.y < 0){
         this.y = canvas.height;
      }

    }
}

function Rectangle(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

     this.contains = function(point){
        if(point.x > this.x - this.w && 
            point.x < this.x + this.w &&
            point.y > this.y - this.h &&
            point.y < this.y + this.h){
             return true;
        }else{
            return false;
        }
       
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

        return('rgba('+r+','+g+','+b+')');
    }

function QuadTree(boundary,capacity,depth){
        this.boundary = boundary;
        this.capacity = capacity;
        this.points = [];
        this.divided = false;
        this.depth = depth;

    this.subDivide = function(){
        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.w;
        let h = this.boundary.h;

        let nw = new Rectangle(x - w/2,y - h/2,w/2,h/2)
        this.northWest = new QuadTree(nw,limit,depth+1);
        let ne = new Rectangle(x + w/2,y - h/2,w/2,h/2)
        this.northEast = new QuadTree(ne,limit,depth+1);
        let sw = new Rectangle(x - w/2,y + h/2,w/2,h/2)
        this.southWest = new QuadTree(sw,limit,depth+1);
        let se = new Rectangle(x + w/2,y + h/2,w/2,h/2)
        this.southEast = new QuadTree(se,limit,depth+1);  

        this.divided = true;
    }

    this.insert = function(point){
        if(!this.boundary.contains(point)){
            return;
        }

        if(this.points.length < this.capacity){
            this.points.push(point)
            
        }else{
            if(!this.divided){
                this.subDivide();
            }
            this.northEast.insert(point);
            this.northWest.insert(point);
            this.southEast.insert(point);
            this.southWest.insert(point);
        }
    }

    this.show = function(){

        canvasContext.beginPath();
        canvasContext.strokeStyle = getRGB();
        canvasContext.rect(boundary.x-boundary.w, boundary.y-boundary.h, boundary.w*2, boundary.h*2);
        canvasContext.stroke();

        if(this.depth < 8){
            for (var i = 0; i < this.points.length; i++) {
                if(this.divided){
                    this.northEast.show();
                    this.northWest.show();
                    this.southEast.show();
                    this.southWest.show(); 
                }
              }
        }

    }
}


