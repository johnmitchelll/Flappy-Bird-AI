function computerMakeBestMove(){
	//pick word then go through and add all the letters in order
	let bestMove = "SOARE";

	let combinationsAndTheirWords = [];

	if(turn != 0){
		if(peeking){
			updateInformation();
		}

		let possibleWords = getpossibleWords(cpuWordle, cpuWordle.possibleWords);
		cpuWordle.possibleWords = possibleWords;

		let wordsComputing;

		wordsComputing = getPossibleWordsData(possibleWords);
		
		console.clear();
		console.log(possibleWords)
// 
		let score = -Infinity;

		for (var i = 0; i < wordsComputing.length; i++) {
			let probability = 0;
			let information = 0;
			let wordScore = 0;

			for (var j = 0; j < wordsComputing[i].configNWords.length; j++) {

				let len = 0;
				for (var e = 0; e < wordsComputing[i].configNWords[j].words.length; e++) {
					if(possibleWords.includes(wordsComputing[i].configNWords[j].words[e])){
						len++;
					}
				}

				probability += len / possibleWords.length;
				

				if(probability != 0){
					information = Math.log2(1/probability);
				}

				wordScore += probability * information;
			}

			console.log(wordsComputing[i].word, wordScore)

			if(wordScore > score){
				bestMove = wordsComputing[i].word;
				score = wordScore;
			}
		}
		
	}

	addWordToRow(bestMove, cpuWordle);

	currentTurn = "Player"
}



function getpossibleWords(config, thisWords){
	let possibleWords = [];

	for (var i = 0; i < thisWords.length; i++) {
		let contains = true;

		for (var e = 0; e < config.lettersInWordConfirmed.length; e++) {
			if(thisWords[i].includes(config.lettersInWordConfirmed[e].l.toLowerCase()) == false){
				contains = false;
				break;
			}
		}

		if(contains == false){ continue; }

		for (var j = 0; j < config.wordsUsed.length; j++) {
			if(equalIgnoreCase(config.wordsUsed[j], thisWords[i])){
				contains = false;
				break;
			}
		}

		let tempLettersOccurence = deepCopy(config.lettersOccurence);

		if(contains){
			for (var j = 0; j < thisWords[i].length; j++) {
				if(config.spacesConfirmed[j]){
					if(equalIgnoreCase(config.spacesConfirmed[j], thisWords[i][j]) == false){
						contains = false;
						break;
					}
				}

				if(contains == false){ break; }

				for (var e = 0; e < tempLettersOccurence.length; e++) {
					if(equalIgnoreCase(tempLettersOccurence[e].letter, thisWords[i][j])){
						tempLettersOccurence[e].count--;
					}
				}

				if(contains == false){ break; }

				for (var e = 0; e < config.lettersInWordConfirmed.length; e++) {
					if(equalIgnoreCase(config.lettersInWordConfirmed[e].l, thisWords[i][j]) && j == config.lettersInWordConfirmed[e].index){
							contains = false;
							break;
					}
				}

				if(contains == false){ break; }
				
				if(config.letters[getIndexFromLetter(thisWords[i][j])].availble && 
				  equalIgnoreCase(config.letters[getIndexFromLetter(thisWords[i][j])].letter, thisWords[i][j])){
				}else{
					contains = false;
					break;
				}

			}
		}

		if(contains == false){ continue; }

		for (var j = 0; j < tempLettersOccurence.length; j++) {
			if(tempLettersOccurence[j].count >= 0){
				contains = false;
				break;
			}
		}

		if(contains){
			possibleWords.push(thisWords[i]);
		}
	}

 	return possibleWords;

}

function getPossibleWordsData(words){
	let wordsFromConfigs = [];

	for (var i = configs.length - 1; i >= 0; i--) {
		let contains = false;

		for (var j = words.length - 1; j >= 0; j--) {
			if(equalIgnoreCase(configs[i].word, words[j])){
				contains = true;
				wordsFromConfigs.push(configs[i]);
			}
		}
	}

	return wordsFromConfigs;
}

function updateInformation(){
	for (var i = 0; i < playerWordle.spacesConfirmed.length; i++) {
		if(playerWordle.spacesConfirmed[i]){
			cpuWordle.spacesConfirmed[i] = playerWordle.spacesConfirmed[i];
		}
	}

	for (var i = 0; i < playerWordle.letters.length; i++) {
		if(playerWordle.letters[i].availble == false){
			cpuWordle.letters[i].availble = false;
		}	
	}

	for (var i = 0; i < playerWordle.lettersInWordConfirmed.length; i++) {
		cpuWordle.lettersInWordConfirmed.push(playerWordle.lettersInWordConfirmed[i]);
	}
}


// function getStringFromArray(arr){
// 	let string = "["

// 	for (var i = 0; i < arr.length; i++) {
// 		string += "{word:\"" + arr[i].word + "\", configNWords:[";

// 		for (var j = 0; j < arr[i].configNWords.length; j++) {
// 			string += "{words:[";

// 			for (var e = 0; e < arr[i].configNWords[j].words.length; e++) {
// 				string += "\"" + arr[i].configNWords[j].words[e] + "\"";

// 				if(e != arr[i].configNWords[j].words.length-1){
// 					string += ",";
// 				}
// 			}

// 			string += "],config:[";

// 			for (var e = 0; e < arr[i].configNWords[j].config.length; e++) {
// 				string += "\"" + arr[i].configNWords[j].config[e] + "\"";

// 				if(e != arr[i].configNWords[j].config.length-1){
// 					string += ",";
// 				}
// 			}

// 			string += "]}"

// 			if(j != arr[i].configNWords.length-1){
// 				string += ",";
// 			}
// 		}

// 		string += "]}\n"

// 		if(i != arr.length-1){
// 			string += ",";
// 		}
// 	}

// 	string += "]"
// 	console.log(string)
// }

