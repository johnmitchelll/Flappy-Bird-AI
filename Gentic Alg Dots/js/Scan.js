function Box(x,y,w,h){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.centerX = this.x + (this.w/2);
	this.centerY = this.y + (this.h/2);

	this.show = function(){
		colorRect(this.x, this.y, this.w, this.h, 'purple')
	}

	this.intersects = function(x,y,r){
		let distX = Math.abs(x - this.centerX);
		let distY = Math.abs(y - this.centerY);

		if (distX > (this.w/2 + r) || distY > (this.h/2 + r)){ 
			return false; 
		} 

		if(distX <= (this.w/2) || distY <= (this.h/2)){
			return true
		}

		let euclidianDist = dist(this.centerX,x,this.centerY,y);

		if(euclidianDist <= (r*r)){
			return true;
		}
		
	}
}