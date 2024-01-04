boids = new Array(50);

function Boid(){
	this.r = 5;
	this.maxVel = 3;
	this.pos = new Vector(Math.random() * canvas.width,Math.random() * canvas.height);
	this.vel = new Vector(random(-this.maxVel,this.maxVel), random(-this.maxVel,this.maxVel));
	this.acc = new Vector(0,0);

	this.maxInfluence = 0.05;
	this.ang = Math.atan2((this.vel.y/this.maxVel),(this.vel.x/this.maxVel))
	this.perception = 100;
	this.localBoids = [];


	this.draw = function(){
		colorCircle(this.pos.x,this.pos.y, this.r, 'white');

		drawLine(this.pos.x,this.pos.y,
						 this.pos.x+Math.cos(this.ang)*this.r,this.pos.y+Math.sin(this.ang)*this.r,
						 3,'blue')
	}

	this.update = function(){
		this.localBoids = [];

		for (var i = 0; i < boids.length; i++) {
			let d = dist(this.pos.x,this.pos.y,boids[i].pos.x,boids[i].pos.y)

				if(d < this.perception && boids[i] != this){
					this.localBoids.push(boids[i])
				}
		}

		this.ang = Math.atan2((this.vel.y/this.maxVel),(this.vel.x/this.maxVel))
		this.vel.add(this.acc)
		this.pos.add(this.vel);
		this.acc.mult(new Vector(0,0));

		limit(this.vel, this.maxVel)

		if(this.pos.x - this.r > canvas.width){
			this.pos.x = 0 - this.r;
		}
		if(this.pos.x + this.r < 0){
			this.pos.x = canvas.width + this.r;
		}
		if(this.pos.y - this.r > canvas.height){
			this.pos.y = 0 - this.r;
		}
		if(this.pos.y + this.r < 0){
			this.pos.y = canvas.height + this.r;
		}
	}

	this.align = function(){
		let steering = new Vector(0,0);

		for (var i = 0; i < this.localBoids.length; i++) {
				steering.add(this.localBoids[i].vel)
		}

		if(this.localBoids.length != 0){
			//averaging velocities out
			steering.x /= this.localBoids.length;
			steering.y /= this.localBoids.length;
			//setting magnitude of vector to max speed
			let steeringAng = Math.atan2((steering.y/this.maxVel),(steering.x/this.maxVel))
			steering.x = Math.cos(steeringAng) * this.maxVel;
			steering.y = Math.sin(steeringAng) * this.maxVel;
			// find the real value of the vel away from this.vel
			steering.sub(this.vel);
			limit(steering, this.maxInfluence)
		}

		return steering
	}

	this.cohere = function(){
		let steering = new Vector(0,0);

		for (var i = 0; i < this.localBoids.length; i++) {
				steering.add(this.localBoids[i].pos)
		}

		if(this.localBoids.length != 0){

			steering.x /= this.localBoids.length;
			steering.y /= this.localBoids.length;

			steering.sub(this.pos)

			let steeringAng = Math.atan2((steering.y/this.maxVel),(steering.x/this.maxVel))
			steering.x = Math.cos(steeringAng) * this.maxVel;
			steering.y = Math.sin(steeringAng) * this.maxVel;

			steering.sub(this.vel);
			limit(steering, this.maxInfluence)
		}

		return steering
	}

	this.separate = function(){
		let steering = new Vector(0,0);
		let total = 0;

		for (var i = 0; i < boids.length; i++) {
			let d = dist(this.pos.x,this.pos.y,boids[i].pos.x,boids[i].pos.y)

				if(d < 40 && boids[i] != this){
					let diff = new Vector(this.pos.x - boids[i].pos.x, this.pos.y - boids[i].pos.y)
					diff.x /= d;
					diff.y /= d;

					steering.add(diff)
					total++;
				}
		}

		if(total != 0){
			steering.x /= total;
			steering.y /= total;

			let steeringAng = Math.atan2((steering.y/this.maxVel),(steering.x/this.maxVel))
			steering.x = Math.cos(steeringAng) * this.maxVel*2;
			steering.y = Math.sin(steeringAng) * this.maxVel*2;

			steering.sub(this.vel);

			limit(steering, 0.2)
		}

		return steering
	}


	this.applyForces = function(){
		let alignment = this.align();
		let cohesion = this.cohere()
		let separatation = this.separate()
		let finalforce = new Vector(0,0)

		finalforce.add(alignment)
		finalforce.add(cohesion)
		finalforce.add(separatation);

		let ang = Math.atan2(finalforce.y,finalforce.x)
		drawLine(this.pos.x,this.pos.y,
						 this.pos.x+Math.cos(ang)*20,this.pos.y+Math.sin(ang)*20,
						 3,'green')

		this.acc.add(finalforce)
	}

}



function Vector(x,y){
	this.x = x;
	this.y = y;

	this.add = function(vec){
		this.x += vec.x;
		this.y += vec.y;
	}

	this.sub = function(vec){
		this.x -= vec.x;
		this.y -= vec.y;
	}

	this.mult = function(vec){
		this.x *= vec.x;
		this.y *= vec.y;
	}

	this.div = function(vec){
		this.x /= vec.x;
		this.y /= vec.y;
	}
}

function limit(vec, limit){
	if(vec.x < -limit){
		vec.x = -limit;
	}
	if(vec.x > limit){
		vec.x = limit;
	}
	if(vec.y < -limit){
		vec.y = -limit;
	}
	if(vec.y > limit){
		vec.y = limit;
	}
}