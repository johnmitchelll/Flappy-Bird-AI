function Fourier(n, parent){
	this.x = 200;
	this.y = canvas.height/2;
	this.parent = parent; 
	this.r;

	this.outputX;
	this.outputY;

	this.n = n;
	this.coeficient = 2*this.n+1;

	this.draw = function(){
		this.r = 100 * 4/(Math.PI*this.coeficient);
		this.outputX = this.r*Math.cos(this.coeficient*(totalTime/2));
		this.outputY = this.r*Math.sin(this.coeficient*(totalTime/2));

		drawLine(this.x,this.y,this.x+this.outputX,this.y+this.outputY,2,"white")
		// colorNoFillCircle(this.x, this.y, this.r, "white", 2);
		colorCircle(this.x+this.outputX, this.y+this.outputY, 3, "white")
	}
}