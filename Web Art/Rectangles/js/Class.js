function Rect(x,y, w,h){
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;

  this.show = function(color){
    colorNoFillRect((this.x/zoom) * canvas.width,(this.y / zoom) * canvas.height, this.w,this.h, color)
  }
}

function Line(x,y, dir){
  this.x = x;
  this.y = y;
  this.dir = dir;

  this.show = function(color){
    if(this.dir == 0){
      drawLine(-canvas.width/2,(this.y / zoom) * canvas.height,canvas.width/2,(this.y / zoom) * canvas.height,1,color);
    }else if(this.dir == 1){
      drawLine((this.x / zoom) * canvas.width,-canvas.height/2,(this.x / zoom) * canvas.width,canvas.height/2,1,color);
    }
  }
}