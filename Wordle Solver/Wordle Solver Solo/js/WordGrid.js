function WordGrid(x){
    this.cols = 5;
    this.rows = 6;
    this.grid = new Array(this.cols);
    this.currentIndex = new Vector(0,0);
    this.movesLeft = 1;
    this.letters = new Array(26);
    this.spacesConfirmed = new Array(this.cols);
    this.lettersInWordConfirmed = [];
    this.lettersOccurence = [];

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
                                          (canvas.height - GRID_SIDE_GAPS*2 - 25) / this.rows);
        }   
    }

    this.checkRow = function(){
        //set all of the values for the brains to work with
        this.lettersOccurence = [];

        for (var i = 0; i < this.cols; i++) {
            let inWord = false;

            //If this letter in the inputted word is gren then add it to our confirmed spaces
            //Also adds to the list of letter occurences
            if(this.grid[i][this.currentIndex.y].color == GREEN){
                inWord = true;
                this.spacesConfirmed[i] = this.grid[i][this.currentIndex.y].letter;
                
                let found = false;
                for (var j = 0; j < this.lettersOccurence.length; j++) {
                    if(equalIgnoreCase(this.lettersOccurence[j].letter, this.grid[i][this.currentIndex.y].letter)){
                        this.lettersOccurence[j].count++;
                        found = true;
                    }
                }

                if(found == false){
                    this.lettersOccurence.push({letter: this.grid[i][this.currentIndex.y].letter, count: 0, index: i});
                }

            }

            //If this letter is yello then add it to our list of letters as well as its index
            //Also adds to the list of letter occurences
            if(this.grid[i][this.currentIndex.y].color == YELLOW){
                let obj = {l: this.grid[i][this.currentIndex.y].letter, index:i};
                this.lettersInWordConfirmed.push(obj);
                inWord = true;

                let found = false;
                for (var j = 0; j < this.lettersOccurence.length; j++) {
                    if(equalIgnoreCase(this.lettersOccurence[j].letter, this.grid[i][this.currentIndex.y].letter)){
                        this.lettersOccurence[j].count++;
                        found = true;
                    }
                }

                if(found == false){
                    this.lettersOccurence.push({letter: this.grid[i][this.currentIndex.y].letter, count: 0, index: i});
                }
            }

            //goes through the list again to let the program know to not deactivate a letter that 
            //doesnt show up in the word again but is being used elsewhere in the word
            for (var j = 0; j < this.cols; j++) {
                 if((this.grid[j][this.currentIndex.y].color == GREEN || this.grid[j][this.currentIndex.y].color == YELLOW)
                    && equalIgnoreCase(this.grid[j][this.currentIndex.y].letter, this.grid[i][this.currentIndex.y].letter)){
                    inWord = true;
                }
            }

            //deactivate unused letters
            if(inWord == false){
                this.letters[getIndexFromLetter(this.grid[i][this.currentIndex.y].letter)].availble = false;
            }
        }

        //check if winnner then go through and mark all of the letters used
        let win = true;
        for (var i = 0; i < this.cols; i++) {
            if(this.grid[i][this.currentIndex.y].color != GREEN){
                win = false;
            }
        }

        if(win){
            winner = "COMPUTER"
        }else if(this.currentIndex.y == this.rows-1){
            winner = "NS"
        }
    }

    this.draw = function(){
        for (var col = 0; col < this.grid.length; col++) {
            for (var row = 0; row < this.grid[col].length; row++) {

                if(this.grid[col][row].color == undefined){
                    colorRectNoFill(col * this.grid[col][row].w + GRID_SIDE_GAPS + canvas.width/4, 
                          row * this.grid[col][row].h + GRID_SIDE_GAPS + 25 + GRID_SIDE_GAPS, 
                          this.grid[col][row].w - GRID_BRICK_GAP, this.grid[col][row].h - GRID_BRICK_GAP, 'white', 1);
                }else{
                    colorRect(col * this.grid[col][row].w + GRID_SIDE_GAPS + canvas.width/4, 
                          row * this.grid[col][row].h + GRID_SIDE_GAPS + 25 + GRID_SIDE_GAPS, 
                          this.grid[col][row].w - GRID_BRICK_GAP, this.grid[col][row].h - GRID_BRICK_GAP, this.grid[col][row].color);
                }
                

                
                let fontSize = Math.floor(this.grid[col][row].h - GRID_BRICK_GAP*2);
                let width = measureText(this.grid[col][row].letter, fontSize, "monospace").width

                drawText('white', fontSize + 'px monospace', this.grid[col][row].letter.toUpperCase(), 
                        col * this.grid[col][row].w + canvas.width/4 + this.grid[col][row].w/2 - width/2, 
                        row * this.grid[col][row].h + GRID_SIDE_GAPS + 25 + GRID_SIDE_GAPS + fontSize/1.2);
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
                    color = YELLOW;
                }
            }

            for (var j = 0; j < this.spacesConfirmed.length; j++) {
                if(this.spacesConfirmed[j] && equalIgnoreCase(this.spacesConfirmed[j], this.letters[i].letter)){
                    color = GREEN;
                }
            }

            if(color == undefined){
                colorRectNoFill(i * letterBoarderWidth + GRID_SIDE_GAPS + canvas.width/4, 
                GRID_BRICK_GAP + GRID_SIDE_GAPS, letterBoarderWidth - GRID_BRICK_GAP, 25, 'white', 1);
            }else{
                colorRect(i * letterBoarderWidth + GRID_SIDE_GAPS + canvas.width/4, 
                GRID_BRICK_GAP + GRID_SIDE_GAPS, letterBoarderWidth - GRID_BRICK_GAP, 25, color, 1);
            }

    
            let fontSize = Math.floor(0.6 * letterBoarderWidth);
            let thisLettersWidth = (fontSize * 0.6);
            drawText('white', fontSize + 'px monospace', this.letters[i].letter.toUpperCase(), 
            i * letterBoarderWidth + GRID_SIDE_GAPS + canvas.width/4  + thisLettersWidth/1.75, GRID_BRICK_GAP + 16 + GRID_SIDE_GAPS);
        }
    }

    this.nextRow = function(){
        if(this.currentIndex.y < this.cols){
            this.currentIndex.y++;
            this.currentIndex.x = 0;
        }else{
            this.movesLeft = 0;
        }
    }

}

function Node(col, row, w, h){
    this.letter = "";
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

