
function Brain(){
	this.layers = new Array(3);
	
	for (var i = 0; i < this.layers.length; i++) {
		this.layers[i] = new Array();
	}


	// needed bc we have so many copies of this
	this.layers[this.layers.length-1].push(new BrainNode(2, 0));
	// this.layers[this.layers.length-1].push(new BrainNode(2, 1));


	// add all other nodes besides output
	for (var i = 0; i < 5; i++) {
		for (var j = 0; j < this.layers.length-1; j++) {
			this.layers[j].push(new BrainNode(0, i));
		}
	}

	// connect every layer of the brain
	for (var i = 0; i < this.layers.length-2; i++) {
		for (var j = 0; j < this.layers[i].length; j++) {
			// for (var e = 0; e < this.layers[i+1].length; e++) {
				let conection = new Connection({i:i, j:j}, {i:i+1, j:j});
				this.layers[i][j].outwardConnections.push(conection);
			// }
		}
	}

	for (var i = 0; i < this.layers[this.layers.length-2].length; i++) {
		for (var e = 0; e < this.layers[this.layers.length-1].length; e++) {
			conection = new Connection({i:this.layers.length-2, j:i}, {i:this.layers.length-1, j:e});
			this.layers[this.layers.length-2][i].outwardConnections.push(conection);
		}
	}

	this.getOutput = function(){
		for (var i = 0; i < this.layers.length; i++) {
		  for (var j = 0; j < this.layers[i].length; j++) {
		  	if(!this.layers[i][j]){
		  		continue;
		  	}

			this.layers[i][j].calculateOutput(this);
		  }
		}


		for (var i = 0; i < this.layers.length; i++) {
		  for (var j = 0; j < this.layers[i].length; j++) {
		  	if(!this.layers[i][j]){
		  		continue;
		  	}

			this.layers[i][j].inputs = [];
		  }
		}

		let maxOutput = {val:-Infinity, index:0};

		for (var i = 0; i < this.layers[2].length; i++) {
			if(this.layers[2][i].output > maxOutput.val){
				maxOutput.val = this.layers[2][i].output;
				maxOutput.index = i;
			}
		}

		return maxOutput;
	}

	this.randomlyMutate = function(){
		let seed = Math.random();

		// change any weight of any connection: increment or randomize
		for (var i = 0; i < this.layers.length; i++) {
			for (var j = 0; j < this.layers[i].length; j++) {
				for (var e = 0; e < this.layers[i][j].outwardConnections.length; e++) {


					let conectionWeight = this.layers[i][j].outwardConnections[e].weight
					if(seed < 0.3){
						if(Math.random() > 0.5){	
							this.layers[i][j].outwardConnections[e].weight += 0.03;
						}else{
							this.layers[i][j].outwardConnections[e].weight -= 0.03;
						}
					}else if(seed < 0.6){
						this.layers[i][j].outwardConnections[e].weight = randomIntFromInterval(Math.min(-1, conectionWeight-0.1), Math.max(1, conectionWeight+0.1));
					}else{
						this.layers[i][j].outwardConnections[e].weight = 0;
					}
				}
			}
		}
	}

	this.display = function(){
		for (var i = 0; i < this.layers.length; i++) {
			for (var j = 0; j < this.layers[i].length; j++) {
				if(!this.layers[i][j]){
		  			continue;
		  		}

				for (var e = 0; e < this.layers[i][j].outwardConnections.length; e++) {
					let conection = this.layers[i][j].outwardConnections[e];

					let color = "rgb(0, " + conection.weight*255 + ", 0)";;

					if(conection.weight < 0){
						color = "rgb(" + Math.abs(conection.weight*255) + ", 0, 0)";
					}

					drawLine(50 + conection.from.i * 60, 50 + conection.from.j * 30,
							 50 + conection.to.i * 60, 50 + conection.to.j * 30,
							 Math.max(Math.abs(conection.weight*10), 3), color)
				}

				colorCircle(50 + i * 60, 50 + j * 30, 10, "white");
				colorNoFillCircle(50 + i * 60, 50 + j * 30, 10, "black");
			}
		}
	}

	
}

function Connection(from, to){
	this.weight = randomIntFromInterval(-1, 1);
	this.from = from;
	this.to = to;

	this.sendValue = function(val, brain){
		brain.layers[this.to.i][this.to.j].inputs.push({weight:this.weight,val:val});
	}
}

function BrainNode(i, j){
	this.inputs = [];
	this.outwardConnections = [];
	this.output;
	this.index = {i:i, j:j};

	this.calculateOutput = function(brain){
	//this will be called after we get the input(s)
	//then we will get the output and send that output to the next connection

	  let sum = 0;
	  for (var i = 0; i < this.inputs.length; i++) {
	  	let weigthedInput = this.inputs[i].val * this.inputs[i].weight;
	  	sum += weigthedInput;
	  }

	  this.output = sigmoid(sum);

	  for (var i = 0; i < this.outwardConnections.length; i++) {
	  	this.outwardConnections[i].sendValue(this.output, brain);
	  }
	}
}

function addNoRepeatList(arr, val, id){
	for (var i = 0; i < arr.length; i++) {
		if(arr[i].id == id){
			return;
		}
	}

	arr.push(val)
}

function sigmoid(x){
	var inverseVal = (-1*x);
	return 1/(1+Math.pow(Math.E,inverseVal));
}

function hasNodeBeenUsed(node){
	for (var e = 0; e < conectionsList.length; e++) {
		if(conectionsList[e].from == node && conectionsList[e].to > 6){
			return true;
		}
	}

	return false;
}

function normalizeValue(min, max, val){
	let maxDiff = max - min;
	let valDiff = val - min;

	// console.log(valDiff / maxDiff)

	return valDiff / maxDiff;
}

