var canvas;
var canvasContext;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;

	start();

	go()

	var framesPerSecond = 60;
	setInterval(function(){update();},1000/framesPerSecond);

	canvas.addEventListener('mousemove',updateMousePos);	

	}
	function update(){
		drawEverything();
	}

	function start(){
		document.addEventListener('keydown', keyPressed);
		document.addEventListener('keyup', keyReleased);

		for (var i = 0; i < walls.length; i++) {
			walls[i] = new Boundary(Math.random() * canvas.width,Math.random() * canvas.height,
									Math.random() * canvas.width,Math.random() * canvas.height);
		}
		walls.push(new Boundary(0,0,0,canvas.height))
		walls.push(new Boundary(0,0,canvas.width,0))
		walls.push(new Boundary(canvas.width,0,canvas.width,canvas.height))
		walls.push(new Boundary(canvas.width,canvas.height,0,canvas.height))

		particle = new Particle();
	}










function go(){
	let age1 = 0;
	let age2 = 2003 - 1976;

	let ages = [];


	for (var i = 0; i < 2000; i++) {
		ages.push([getPuotput(age1 + i), getPuotput(age2 + i), "My age:"+(age1 + i), "Mom age:"+(age2 + i)]);
	}

	console.log(ages)
}


function getPuotput(num){
	num = num.toString();
	let output = num;

	while(num.length > 1){
		let nums = [];
		output = 0;

		for (var j = 0; j < num.length; j++) {
			nums.push(parseInt(num[j]));
		}

		for (var j = 0; j < num.length; j++) {
			output += nums[j]
		}

		num = output.toString();
		nums = [];
	}

	return output;
}


