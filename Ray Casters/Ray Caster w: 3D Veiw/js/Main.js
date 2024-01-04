var canvas;
var canvasContext;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;

	start();

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

		halfScreen = canvas.width/2;

		for (var i = 0; i < walls.length; i++) {
			walls[i] = new Boundary(Math.random() * halfScreen,Math.random() * canvas.height,
									Math.random() * halfScreen,Math.random() * canvas.height);
		}
		walls.push(new Boundary(0,0,0,canvas.height))
		walls.push(new Boundary(0,0,halfScreen,0))
		walls.push(new Boundary(halfScreen,0,halfScreen,canvas.height))
		walls.push(new Boundary(halfScreen,canvas.height,0,canvas.height))

		particle = new Particle();
		particle.init();
	}
