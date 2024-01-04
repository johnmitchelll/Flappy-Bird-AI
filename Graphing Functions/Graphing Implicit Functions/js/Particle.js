
function Func(x, y){
  let point =  particleIsThere(y*y/x, x + Math.sin(t+x*y), 0.1);

  return point;
}

// particleIsThere(Math.sin(y*y*x*x*x-t), Math.cos(y*y*y*x*x), .1)
// particleIsThere(Math.sin(y*y+t), Math.cos(y*x*x), 0.1)
// particleIsThere(x*x*x+y*y/x, x + Math.sin(t+x*y), 0.1);
// particleIsThere(y*y/x, x + Math.sin(t+x*y), 0.1);

// //////////////////////////////////////////////////////////////////////////////////////
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//setting the domains collumns in main
var domain;

function getDomain(t){
  var zoom_rangeslider = document.getElementById("zoom");
  zoom = zoom_rangeslider.value;

  for (var x = canvas.width-1; x >= 0; x--) {

    domain[x] = new Array(canvas.height)

    for (var y = canvas.height-1; y >= 0; y--) {
      let X = (x - canvas.width/2)/canvas.width * zoom - offX;
      let Y = (y - canvas.height/2)/canvas.height * zoom + offY;

      let point = Func(X, Y)

      if(point.case){
        domain[x][y] = point;
      }else{
        domain[x][y] = -1;
      }//if particle
    }//for y

  }//for x
}

function particleIsThere(outPut, goal, tollerance){
  let point = {case:false, offSet: 0};

  if(outPut >= goal-tollerance && outPut <= goal+tollerance)  {
    point.case = true;
    point.offSet = outPut - goal;
  }
  return point;
}


