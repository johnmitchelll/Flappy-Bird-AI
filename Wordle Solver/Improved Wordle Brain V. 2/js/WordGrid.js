function WordGrid(x){
    this.cols = 5;
    this.rows = 6;
    this.grid = new Array(this.cols);
    this.currentIndex = new Vector(0,0);
    this.space = x;
    this.movesLeft = 1;
    this.word = words[Math.floor(Math.random() * words.length)];
    this.letters = new Array(26);
    this.spacesConfirmed = new Array(this.cols);
    this.lettersInWordConfirmed = [];
    this.lettersOccurence = [];
    this.wordsUsed = [];
    this.possibleWords = words;

    for (var i = 0; i < this.letters.length; i++) {
        this.letters[i] = new Letter(i);
    }

    for (var i = 0; i < this.grid.length; i++) {
        this.grid[i] = new Array(this.rows);
    }

    for (var col = 0; col < this.grid.length; col++) {
        for (var row = 0; row < this.grid[col].length; row++) {
            this.grid[col][row] = new Node(col,row, 
                                          (canvas.width/2 - GRID_SIDE_GAPS*2) / this.cols, 
                                          (canvas.height/1.25 - GRID_SIDE_GAPS*2) / this.rows);
        }   
    }

    this.checkRow = function(){
        //getting letter occurences in the word so I can give a correct answer to how many more letters
        let letterOccurenceInWord = new Array();
        for (var i = 0; i < this.cols; i++) {
            for (var j = 0; j < 26; j++) {
                if(equalIgnoreCase(String.fromCharCode(j + 65), this.word[i])){
                   
                    let inThisWord = false
                    let thisWordIndex = 0;
                    for (var e = 0; e < letterOccurenceInWord.length; e++) {
                        if(equalIgnoreCase(String.fromCharCode(j + 65), letterOccurenceInWord[e].letter)){
                            inThisWord = true;
                            thisWordIndex = e;
                        }
                    }

                    if(inThisWord){
                        letterOccurenceInWord[thisWordIndex].count++
                    }else{
                        letterOccurenceInWord.push(new Letter(j));
                    }

                }
            }
        }

        for (var i = 0; i < this.cols; i++) {
            if(equalIgnoreCase(this.grid[i][this.currentIndex.y].letter.letter, this.word[i])){
                for (var j = 0; j < letterOccurenceInWord.length; j++) {
                    if(equalIgnoreCase(this.grid[i][this.currentIndex.y].letter.letter, letterOccurenceInWord[j].letter)){
                        letterOccurenceInWord[j].count--;
                    }
                }
            }
        }

        //set the color of the nodes if correct or in word
        for (var i = 0; i < this.cols; i++) {
            let inWord = false;

            if(equalIgnoreCase(this.grid[i][this.currentIndex.y].letter.letter, this.word[i])){

                this.grid[i][this.currentIndex.y].color = 'rgb(0, 173, 0)';
                this.spacesConfirmed[i] = this.grid[i][this.currentIndex.y].letter.letter;
                inWord = true;
                
            }else{
                for (var j = 0; j < letterOccurenceInWord.length; j++) {
                   if(equalIgnoreCase(this.grid[i][this.currentIndex.y].letter.letter, letterOccurenceInWord[j].letter)){

                        if(letterOccurenceInWord[j].count >= 0){
                            this.grid[i][this.currentIndex.y].color = 'rgb(184, 184, 0)';
                            letterOccurenceInWord[j].count--;
                            let obj = {l: this.grid[i][this.currentIndex.y].letter.letter, index:i};

                            let repeat = false;
                            for (var e = 0; e < this.lettersInWordConfirmed.length; e++) {
                                if(equalIgnoreCase(obj.l, this.lettersInWordConfirmed[e].l) && 
                                   obj.index == this.lettersInWordConfirmed[e].index){
                                    repeat = true;
                                }
                            }

                            if(repeat == false){
                                this.lettersInWordConfirmed.push(obj);
                            }   
                        }
                        
                        inWord = true;
                   }
                }
            }

            if(inWord == false){
                this.letters[getIndexFromLetter(this.grid[i][this.currentIndex.y].letter.letter)].availble = false;
            }   
        }

        let lettersOccurenceInCurrentRow = []

        for (var i = 0; i < this.cols; i++) {
            if(this.grid[i][this.currentIndex.y].color == 'rgb(0, 173, 0)' || 
               this.grid[i][this.currentIndex.y].color == 'rgb(184, 184, 0)'){

                let found = false;
                for (var j = 0; j < lettersOccurenceInCurrentRow.length; j++) {
                    if(equalIgnoreCase(lettersOccurenceInCurrentRow[j].letter, this.grid[i][this.currentIndex.y].letter.letter)){
                        lettersOccurenceInCurrentRow[j].count++;
                        found = true;
                    }
                }

                if(found == false){
                    lettersOccurenceInCurrentRow.push({letter: this.grid[i][this.currentIndex.y].letter.letter, count: 0});
                }
            }
        }

        for (var i = 0; i < lettersOccurenceInCurrentRow.length; i++) {
            let newOccurence = true; 

            for (var j = 0; j < this.lettersOccurence.length; j++) {
               if(equalIgnoreCase(lettersOccurenceInCurrentRow[i].letter, this.lettersOccurence[j].letter)){
                newOccurence = false;

                    if(lettersOccurenceInCurrentRow[i].count > this.lettersOccurence[j].count){
                        this.lettersOccurence[j].count = lettersOccurenceInCurrentRow[i].count;
                    }
               }
           }

           if(newOccurence){
                 this.lettersOccurence.push({letter: lettersOccurenceInCurrentRow[i].letter, count: lettersOccurenceInCurrentRow[i].count});
            }
        }
    }

    this.draw = function(){
        for (var col = 0; col < this.grid.length; col++) {
            for (var row = 0; row < this.grid[col].length; row++) {

                if(this.grid[col][row].color == undefined){
                    colorRectNoFill(col * this.grid[col][row].w + GRID_SIDE_GAPS + this.space * canvas.width/2, 
                          row * this.grid[col][row].h + GRID_SIDE_GAPS + canvas.height/5, 
                          this.grid[col][row].w - GRID_BRICK_GAP, this.grid[col][row].h - GRID_BRICK_GAP, 'white', 1);
                }else{
                    colorRect(col * this.grid[col][row].w + GRID_SIDE_GAPS + this.space * canvas.width/2, 
                          row * this.grid[col][row].h + GRID_SIDE_GAPS + canvas.height/5, 
                          this.grid[col][row].w - GRID_BRICK_GAP, this.grid[col][row].h - GRID_BRICK_GAP, this.grid[col][row].color);
                }
                

                let width = 45;
                let height = this.grid[col][row].h - GRID_BRICK_GAP*2;
                drawText('white', height + 'px monospace', this.grid[col][row].letter.letter.toUpperCase(), 
                        col * this.grid[col][row].w + this.space * canvas.width/2 + this.grid[col][row].w/2 - width/3, 
                        row * this.grid[col][row].h + GRID_SIDE_GAPS + canvas.height/5 + this.grid[col][row].h/2 + height/4);
            }
        }


        //draw what letters are avalible and 
        let letterBoarderWidth = (canvas.width/2 - GRID_SIDE_GAPS*2) / this.letters.length;
        for (var i = 0; i < this.letters.length; i++) {
            let color = undefined;

            if(this.letters[i].availble == false){
                color = 'grey';
            }

            for (var j = 0; j < this.lettersInWordConfirmed.length; j++) {
                if(equalIgnoreCase(this.lettersInWordConfirmed[j].l, this.letters[i].letter)){
                    color = 'rgb(184, 184, 0)';
                }
            }

            for (var j = 0; j < this.spacesConfirmed.length; j++) {
                if(this.spacesConfirmed[j] && equalIgnoreCase(this.spacesConfirmed[j], this.letters[i].letter)){
                    color = 'rgb(0, 173, 0)';
                }
            }

            if(color == undefined){
                colorRectNoFill(i * letterBoarderWidth + GRID_SIDE_GAPS + this.space * canvas.width/2, 
                canvas.height/5 - 25, letterBoarderWidth - GRID_BRICK_GAP, 25, 'white', 1);
            }else{
                colorRect(i * letterBoarderWidth + GRID_SIDE_GAPS + this.space * canvas.width/2, 
                canvas.height/5 - 25, letterBoarderWidth - GRID_BRICK_GAP, 25, color, 1);
            }


            let fontSize = Math.floor(0.63538 * letterBoarderWidth);
            let thisLettersWidth = (fontSize * 0.6);
            drawText('white', 16 + 'px monospace', this.letters[i].letter.toUpperCase(), 
            i * letterBoarderWidth + GRID_SIDE_GAPS + this.space * canvas.width/2 + thisLettersWidth/2, canvas.height/5 - 7);
        }
    }

    this.checkWinner = function(){
        //check if winnner then go through and mark all of the letters used
        let win = true;
        for (var i = 0; i < this.cols; i++) {
            if(this.grid[i][this.currentIndex.y].color != 'rgb(0, 173, 0)'){
                win = false;
            }
        }

        if(win){
            winner = currentTurn;
            currentScene = scenes[3];
        }
        if(playerWordle.movesLeft == 0 && cpuWordle.movesLeft == 0){
            winner = "TIE";
            currentScene = scenes[3];
        }

        if(currentTurn == "Player" && !winner){
            currentTurn = "Computer"
        }
    }

    this.nextRow = function(){
        if(this.currentIndex.y < this.cols){
            this.currentIndex.y++;
            this.currentIndex.x = 0;

            if(peeking || this == cpuWordle){
                turn++;
            }
            
        }else{
            this.movesLeft = 0;
        }
    }

}

function Node(col, row, w, h){
    this.letter = new Letter();
    this.col = col;
    this.row = row;
    this.w = w;
    this.h = h;
    this.color = undefined;
}


function Letter(letterNumber){
    this.keyCode = letterNumber + 65;
    this.letter = String.fromCharCode(this.keyCode);
    this.availble = true;
    this.score = 0;
    this.count = 0;

    for (var i = 0; i < 26; i++) {
      if(equalIgnoreCase(letterFrequency[i], this.letter)){
        this.score = (26-i) / 26;
      }
    }
}

