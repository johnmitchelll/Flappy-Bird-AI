function computerMakeBestMove(){
	//pick word then go through and add all the letters in order
	let bestMoves = getBestMove();
	let topFifteen = [];
	let index = 0

	while(index < 30 && bestMoves[index]){
		topFifteen.push(bestMoves[index]);

		index++;
	}

	return topFifteen;
}

function getBestMove(){
	let bestWords = [];
	let bestScore = -Infinity;

	let availibleWords = [];

	console.log()

	for (var i = 0; i < words.length; i++) {
		let contains = true;
		let score = 0;

		//checks to see if there are all of the letters in a word when we are searching
		let containsFoundLetter = true
		for (var e = 0; e < cpuWordle.lettersInWordConfirmed.length; e++) {
			if(words[i].includes(cpuWordle.lettersInWordConfirmed[e].l) == false){
				containsFoundLetter = false;
				break;
			}
		}

		if(containsFoundLetter == false){
			contains = false;
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
			bestWords.push({word: words[i], score:score});
		}
	}


	if(bestWords.length != 0){
		bestWords.sort(function(a, b){return b.score - a.score});

 		return bestWords;
	}else{
		return [];
	}
	

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

function setRow(wordle, word){
	for (var i = 0; i < word.length; i++) {
		wordle.grid[i][wordle.currentIndex.y].letter = word[i];
	}
}

