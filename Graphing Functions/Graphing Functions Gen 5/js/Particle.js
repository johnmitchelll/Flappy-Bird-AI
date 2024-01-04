var domain = [];
var derivitiveDomains = [];
var derivitiveDepth = 0;
const colorList = ['rgb(255, 0, 0, 0.5)',
                   'rgb(255, 0, 0, 0.5)',
                   'rgb(150, 150, 0, 0.5)',
                   'rgb(150, 0, 150, 0.5)',];

var prevString = undefined;

function getDomain(t){
  //sets zoom value
  var zoom_rangeslider = document.getElementById("zoom");
  zoom = zoom_rangeslider.value;

  var n_rangeslider = document.getElementById("n");
  n = n_rangeslider.value;

  let inputs = canvas.width;

  //initailize to empty
  domain = [];
  derivitiveDomains = [];

  //gets domain for the function
  for (var i = -offX * canvas.width/zoom - inputs/2; i < -offX * canvas.width/zoom + inputs/2; i++) {

    let x = (i / canvas.width ) * zoom;
    let y = Func(x);
    
    domain.push(y);
  }

  //gets domain for a given number of detrivitives
  derivitiveDomains = getDerivites(derivitiveDepth, inputs)
}

function getDerivites(depth, inputs){
  let tempDomains = [];
  tempDomains.push(domain);

  for (var i = 1; i < depth+1; i++) {

    let tempDomain = [];

    for (var x = -offX * canvas.width/zoom - inputs/2; x < -offX * canvas.width/zoom + inputs/2; x++) {

      let m = FuncDerivitive(x, tempDomains[i-1]);

      let slopeAtI = m.d / m.dx;

      tempDomain.push(slopeAtI);
    }

    tempDomains.push(tempDomain);
  }

  return tempDomains;
}

// //////////////////////////////////////////////////////////////////////////////////////
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

var func_string = "";
var prev_string = "";

function Func(x){

  func_string = document.getElementById('form-function').value;

  if(prev_string != func_string){
    prev_string = func_string;
    parse(func_string);
  }

  let y = eval(outputQueue, x);

  return -y;
}

function FuncDerivitive(x, set){
    let xAfterZoom = (x / canvas.width) * zoom;

    let h = (zoom / canvas.width);

    // if(x > -0.5 && x < 0.5){

      // console.log((x /canvas.width) * zoom)
    // } 
    
    let riseRight = set[Math.floor((x + offX * canvas.width/zoom + set.length/2) + 1)] - set[Math.floor(x + offX * canvas.width/zoom + set.length/2)];//Func(xAfterZoom + h) - Func(xAfterZoom)
    let runRight = (xAfterZoom + h) - xAfterZoom;

    let riseLeft = set[Math.floor((x + offX * canvas.width/zoom + set.length/2) - 1)] - set[Math.floor(x + offX * canvas.width/zoom + set.length/2)];//Func(xAfterZoom - h) - Func(xAfterZoom)
    let runLeft = (xAfterZoom - h) - xAfterZoom;

    let avgRise = riseRight + riseLeft / 2;
    let avgRun = runRight + runLeft / 2;

  return {d:avgRise, dx:avgRun};
}

// Math.cos(x*x*x-t)
// 2 * Math.cos(Math.sin(Math.cos(t)*Math.cos(x)*t)) - 1.5;
// Math.tan(Math.sin(x+t) * 10*Math.cos(x));
// 3 * Math.sin(t * x) / x * x * x;
// 1 / (1 + Math.pow(Math.E, -1 * x))
// Math.tan(Math.cos(Math.sin(x+t) * 10*Math.cos(x)))
// Math.sin(x) / Math.cos(t/2);
// Math.abs(Math.sin(x*x)/2 * (x*x-Math.PI/2)/Math.PI)
// Math.sin(Math.tan(Math.sin(x+t) * 10*Math.cos(x)));
