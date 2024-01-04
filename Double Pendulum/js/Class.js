function Vector(x,y){
	this.x = x;
	this.y = y;
}

function Pendulum(r,m,a,x,y){
	this.r = r;
	this.m = m;
	this.a = a;
	this.pos = new Vector(x,y)
	this.vel = 0;
	this.acc = 0;
}

var g = 0.4;

var pen1 = new Pendulum(120,10,Math.random()*Math.PI*2,0,0);
var pen2 = new Pendulum(120,10,Math.random()*Math.PI*2,0,0);



function calculateAngVel(){
	let num1 = -g * (2 * pen1.m + pen2.m) * Math.sin(pen1.a);
	let num2 = -pen2.m * g * Math.sin(pen1.a - 2*pen2.a);
	let num3 = -2*Math.sin(pen1.a - pen2.a) * pen2.m;
	let num4 = pen2.vel*pen2.vel*pen2.r + pen1.vel*pen1.vel*pen1.r * Math.cos(pen1.a - pen2.a);
	let den = pen1.r*(2*pen1.m + pen2.m - pen2.m * Math.cos(2*pen1.a - 2*pen2.a));

	pen1.acc = (num1 + num2 + num3 * num4)/den;

	num1 = 2 * Math.sin(pen1.a - pen2.a);
	num2 = pen1.vel*pen1.vel*pen1.r*(pen1.m + pen2.m);
	num3 = g*(pen1.m + pen2.m)*Math.cos(pen1.a);
	num4 = pen2.vel*pen2.vel*pen2.r*pen2.m * Math.cos(pen1.a - pen2.a);
	den = pen2.r*(2*pen1.m + pen2.m - pen2.m * Math.cos(2*pen1.a - 2*pen2.a));

	pen2.acc = num1 * (num2 + num3 + num4)/den;
}


function moveDrawPendulums(){
	let prev = deepCopyObject(pen2.pos);

	pen1.vel += pen1.acc;
	pen2.vel += pen2.acc;
	pen1.a += pen1.vel;
	pen2.a += pen2.vel;

	// pen1.vel *= 0.999;
	pen1.vel *= 1.0001;

	canvasContext.translate(canvas.width/2, canvas.height/2);

	//0,0 is at the center of the screen in between these traslates

	pen1.pos.x = pen1.r * Math.sin(pen1.a);
	pen1.pos.y = pen1.r * Math.cos(pen1.a);

	pen2.pos.x = pen1.pos.x + pen2.r * Math.sin(pen2.a);
	pen2.pos.y = pen1.pos.y + pen2.r * Math.cos(pen2.a);

	drawLine(0,0,pen1.pos.x,pen1.pos.y,2,'blue');
	colorCircle(pen1.pos.x,pen1.pos.y, pen1.m, 'blue');

	drawLine(pen1.pos.x,pen1.pos.y,pen2.pos.x,pen2.pos.y,2,'blue');
	colorCircle(pen2.pos.x,pen2.pos.y, pen2.m, 'blue');

	if(prev.x !== 0 && prev.y !== 0){
		drawLine(pen2.pos.x,pen2.pos.y,prev.x,prev.y,2,'blue');
	}

	canvasContext.translate(-canvas.width/2, -canvas.height/2);
}


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