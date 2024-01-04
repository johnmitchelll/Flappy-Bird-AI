function computerMakeBestMove(){
	//pick word then go through and add all the letters in order

	if(peeking){
		updateInformation();
	}

	console.log(cpuWordle)

	let bestMove = getBestMove();

	cpuWordle.wordsUsed.push(bestMove);

	for (var i = 0; i < bestMove.length; i++) {
		cpuWordle.grid[cpuWordle.currentIndex.x][cpuWordle.currentIndex.y].letter.letter = bestMove[i];

        if(cpuWordle.currentIndex.x == cpuWordle.cols-1){
          cpuWordle.checkRow();
          currentTurn = "Player";
        }else{
          cpuWordle.currentIndex.x++;
        }
	}


}

function getBestMove(){
	let bestWord = "NOANS";
	let bestScore = -Infinity;

	let availibleWords = [];

	for (var i = 0; i < words.length; i++) {
		let contains = true;
		let score = 0;

		//checks to see if there are all of the letters in a word when we are searching

		for (var e = 0; e < cpuWordle.lettersInWordConfirmed.length; e++) {
			if(words[i].includes(cpuWordle.lettersInWordConfirmed[e].l.toLowerCase()) == false){
				contains = false;
				break;
			}
		}

		for (var j = 0; j < cpuWordle.wordsUsed.length; j++) {
			if(equalIgnoreCase(cpuWordle.wordsUsed[j], words[i])){
				contains = false;
				break;
			}
		}

		let tempLettersOccurence = deepCopy(cpuWordle.lettersOccurence);

		for (var j = 0; j < words[i].length; j++) {
			if(cpuWordle.spacesConfirmed[j]){
				if(equalIgnoreCase(cpuWordle.spacesConfirmed[j], words[i][j]) == false){
					contains = false;
					break;
				}
			}

			for (var e = 0; e < tempLettersOccurence.length; e++) {
				if(equalIgnoreCase(tempLettersOccurence[e].letter, words[i][j])){
					tempLettersOccurence[e].count--;
				}
			}

			for (var e = 0; e < cpuWordle.lettersInWordConfirmed.length; e++) {
				if(equalIgnoreCase(cpuWordle.lettersInWordConfirmed[e].l, words[i][j]) && j == cpuWordle.lettersInWordConfirmed[e].index){
						contains = false;
						break;
				}
			}
			
			if(cpuWordle.letters[getIndexFromLetter(words[i][j])].availble && 
			  equalIgnoreCase(cpuWordle.letters[getIndexFromLetter(words[i][j])].letter, words[i][j])){

				score += getScore(cpuWordle.letters[getIndexFromLetter(words[i][j])], j);

			}else{
				contains = false;
			}
		}

		for (var j = 0; j < tempLettersOccurence.length; j++) {
			if(tempLettersOccurence[j].count >= 0){
				contains = false;
			}
		}

		if(contains){
			console.log(words[i])
		}

		if(contains && score > bestScore){
			bestScore = score
			bestWord = words[i];
		}
	}

 	return bestWord;

}

function getScore(letter, index){
	let score = 0//letter.score;

	for (var i = 0; i < 26; i++) {
		if(equalIgnoreCase(letter.letter, letterPositionalFrequency[index][i].letter)){
			score += (26-i) / 26;
		}
	}

	return score;
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

