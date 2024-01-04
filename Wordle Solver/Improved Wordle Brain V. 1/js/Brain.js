//first we need to go through each possible combination of possibilities for each word
//then we neeed to calculate hoe likely it is then how valuable it is
//after weve done that for each word we should go through each words "score" and pick the highest one



/*
Revised: now that we have the configurations of the words we can go through all avlible 
guesses and add up 
the poissible words from that configuration / all possible words * the information that rhat configuration would give us
then pick out the word with the highest score
and were done 
*/

let lettersFound = 0;
function computerMakeBestMove(){
	//pick word then go through and add all the letters in order
	let bestMove = "RAISE";

	let combinationsAndTheirWords = [];

	if(turn != 0){
		if(peeking){
			updateInformation();
		}

		let possibleWords = getpossibleWords(cpuWordle, cpuWordle.possibleWords);
		cpuWordle.possibleWords = possibleWords;

		if(possibleWords.length < 5){
			lettersFound = 0;
		}

		let wordsComputing;
		if(lettersFound == 4){
			wordsComputing = words;
		}else{
			wordsComputing = possibleWords;
		}
		 

		let score = -Infinity;

		console.clear();
		console.log(lettersFound);

		//go through every possible word to get their scores
		for (var i = 0; i < wordsComputing.length; i++) {
			let probability = 0;
			let information = 0;
			let wordScore = 0;

			// let configAndWords = [];
			//go through every combination to get its 
			for (var j = 0; j < configurations.length; j++) {
				let tempConfig = deepCopyObject(cpuWordle);

				tempConfig.lettersOccurence = [];

			    for (var e = 0; e < tempConfig.cols; e++) {
			        let inWord = false;

			        //If tempConfig letter in the inputted word is gren then add it to our confirmed spaces
			        //Also adds to the list of letter occurences
			        if(configurations[j][e] == "g"){
			            inWord = true;
			            tempConfig.spacesConfirmed[e] = wordsComputing[i][e];
			               
			            let found = false;
			            for (var u = 0; u < tempConfig.lettersOccurence.length; u++) {
			                if(equalIgnoreCase(wordsComputing[i][u], wordsComputing[i][e])){
			                    tempConfig.lettersOccurence[u].count++;
			                    found = true;
			                }
			             }

			            if(found == false){
			                tempConfig.lettersOccurence.push({letter: wordsComputing[i][e], count: 0, index: e});
			            }
			        }

			        //If tempConfig letter is yello then add it to our list of letters as well as its index
			        //Also adds to the list of letter occurences
			        if(configurations[j][e] == "y"){
			            let obj = {l: wordsComputing[i][e], index:e};
			            tempConfig.lettersInWordConfirmed.push(obj);
			            inWord = true;
			            let found = false;
			            for (var u = 0; u < tempConfig.lettersOccurence.length; u++) {
			                if(equalIgnoreCase(wordsComputing[i][u], wordsComputing[i][e])){
			                     tempConfig.lettersOccurence[u].count++;
			                    found = true;
			                }
			            }

			            if(found == false){
			                tempConfig.lettersOccurence.push({letter: wordsComputing[i][e], count: 0, index: e});
			            }
			        }

			        //goes through the list again to let the program know to not deactivate a letter that 
			        //doesnt show up in the word again but is being used elsewhere in the word
			        for (var u = 0; u < tempConfig.cols; u++) {
			             if(configurations[j][e] == "g" || configurations[j][e] == "y"
			                && equalIgnoreCase(wordsComputing[i][u], wordsComputing[i][e])){
			                inWord = true;
			            }
			        }

			           //deactivate unused letters
			        if(inWord == false){
			            tempConfig.letters[getIndexFromLetter(wordsComputing[i][e])].availble = false;
			        }
			    }//for temp


			    let currentPossibleWords = getpossibleWords(tempConfig, wordsComputing);
	    		probability = currentPossibleWords.length / possibleWords.length;

				// configAndWords.push({words:currentPossibleWords, config:configurations[j]});

				if(probability != 0){
					information = Math.log2(1/probability);
				}

				wordScore += probability * information;
			}//for configs

			// combinationsAndTheirWords.push({word:possibleWords[i], configNWords:configAndWords});

			if(wordScore > score){
				score = wordScore;
				bestMove = wordsComputing[i];
			}

			console.log(wordsComputing[i], wordScore);
		}//for word 
	}

	// console.log(combinationsAndTheirWords);
	// getStringFromArray(combinationsAndTheirWords)


	addWordToRow(bestMove, cpuWordle);

	lettersFound = 0;
	for (var i = 0; i < cpuWordle.cols; i++) {
		if(equalIgnoreCase(cpuWordle.grid[i][cpuWordle.currentIndex.y-1].letter.letter, cpuWordle.word[i])){
			lettersFound++;
		}
	}

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

