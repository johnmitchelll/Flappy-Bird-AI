function Scene(){
    this.list = [];
    this.currentIndex = new Vector(0,0);

    this.onAction = function(input){}
    this.draw = function(){}
}

function initScenes(){
    scenes[0] = new Scene();
    scenes[0].list.push({w:0,c:"white"},{w:0,c:"white"});
    scenes[0].list[0].w = measureText("PLAY WITH THE SAME WORD", 32, "monospace").width;
    scenes[0].list[1].w = measureText("PLAY WITH SEPERATE WORDS", 32, "monospace").width;

    scenes[0].draw = function(){
        colorRect(0, 0, canvas.width, canvas.height,  'rgba(18,18,18,0.5)');

        let width = measureText("USE THE UP AND DOWN ARROW KEYS TO NAVIGATE", 32, "monospace").width;

        let wordWidth = scenes[0].list[scenes[0].currentIndex.y].w;
        colorRect(canvas.width/2-wordWidth/2 - GRID_BRICK_GAP, canvas.height/2 - 34 + scenes[0].currentIndex.y*34 + GRID_BRICK_GAP, 
                        wordWidth + GRID_BRICK_GAP*2, 34, "white", 1)

        for (var i = 0; i < scenes[0].list.length; i++) {
            if(i == scenes[0].currentIndex.y){
                scenes[0].list[i].c = "black";
            }else{
                scenes[0].list[i].c = "white";
            }
        }

        drawText('white', 32 + 'px monospace', "USE THE UP AND DOWN ARROW KEYS TO NAVIGATE", 
            canvas.width/2-width/2, canvas.height/3);
        
        drawText(scenes[0].list[0].c, 32 + 'px monospace', "PLAY WITH THE SAME WORD", 
            canvas.width/2-scenes[0].list[0].w/2, canvas.height/2);
        
        drawText(scenes[0].list[1].c, 32 + 'px monospace', "PLAY WITH SEPERATE WORDS", 
            canvas.width/2-scenes[0].list[1].w/2, canvas.height/2 + 34);

        
    }

    scenes[0].onAction = function(input){
        if(input == DOWN && scenes[0].currentIndex.y < scenes[0].list.length-1){
            scenes[0].currentIndex.y++;
        }
        if(input == UP && scenes[0].currentIndex.y > 0){
            scenes[0].currentIndex.y--;
        }

        if(input == ENTER){
            if(scenes[0].currentIndex.y == 0){
                //send this to a third screen where you can choose the dificulty
                word = words[Math.floor(Math.random() * words.length)];
                cpuWordle.word = word;
                playerWordle.word = word;
                currentScene = scenes[2];
            }
            if(scenes[0].currentIndex.y == 1){
                cpuWordle.word = words[Math.floor(Math.random() * words.length)];
                playerWordle.word = words[Math.floor(Math.random() * words.length)];
                currentScene = scenes[1];

                if(Math.random() > 0.5){
                    currentTurn = "Computer";
                }else{
                    currentTurn = "Player";
                }
            }

        }
    }

    scenes[1] = new Scene();

    scenes[1].onAction = function(input){
      //depending on the key code I want to get the corisponding letter and assign it to the space
      if(currentTurn == "Player" && playerWordle.movesLeft > 0 && !winner){
        if(input == DELETE){

          if(playerWordle.currentIndex.x == 0 || playerWordle.currentIndex.x == playerWordle.cols-1){
            if(playerWordle.grid[playerWordle.currentIndex.x][playerWordle.currentIndex.y].letter.letter == "" && 
                  playerWordle.currentIndex.x == playerWordle.cols-1){
              playerWordle.currentIndex.x--
              playerWordle.grid[playerWordle.currentIndex.x][playerWordle.currentIndex.y].letter.letter = "";
          }

            playerWordle.grid[playerWordle.currentIndex.x][playerWordle.currentIndex.y].letter.letter = "";

          }else{
            playerWordle.currentIndex.x--
            playerWordle.grid[playerWordle.currentIndex.x][playerWordle.currentIndex.y].letter.letter = "";
          }
          
        }

        for (var i = 0; i < 26; i++) {
          if(input == i + 65){
            playerWordle.grid[playerWordle.currentIndex.x][playerWordle.currentIndex.y].letter.letter = String.fromCharCode(i + 65);
            // playerWordle.letters[getIndexFromLetter(String.fromCharCode(i + 65))].availble = false;

            if(playerWordle.currentIndex.x != playerWordle.cols-1){
              playerWordle.currentIndex.x++;
            }
          } 

        }

      }

      if(playerWordle.currentIndex.x == playerWordle.cols-1 && input == ENTER){
        let contains = false;
        let currentWord = ""
        for (var i = 0; i < playerWordle.cols; i++) {
            currentWord += playerWordle.grid[i][playerWordle.currentIndex.y].letter.letter;
        }

        for (var i = 0; i < allowedWords.length; i++) {
            if(equalIgnoreCase(allowedWords[i], currentWord)){
                contains = true;
            }
        }

        for (var i = 0; i < words.length; i++) {
            if(equalIgnoreCase(words[i], currentWord)){
                contains = true;
            }
        }

        if(contains){
            playerWordle.checkRow();
            playerWordle.checkWinner();
            playerWordle.nextRow();
        }
      }
    }

    scenes[2] = new Scene();
    scenes[2].list.push({w:0,c:"white"},{w:0,c:"white"},{w:0,c:"white"});
    scenes[2].list[0].w = measureText("HARD: ALLOW COMPUTER TO SEE YOUR ANSWERS", 32, "monospace").width;
    scenes[2].list[1].w = measureText("EASY: DON'T ALLOW COMPUTER TO SEE YOUR ANSWERS", 32, "monospace").width+15;
    scenes[2].list[2].w = measureText("GO BACK", 32, "monospace").width;

    scenes[2].draw = function(){
        colorRect(0, 0, canvas.width, canvas.height,  'rgba(18,18,18,0.5)');

        let width = measureText("CHOOSE DIFFICULTY", 32, "monospace").width;

        let wordWidth = scenes[2].list[scenes[2].currentIndex.y].w;
        colorRect(canvas.width/2-wordWidth/2 - GRID_BRICK_GAP, canvas.height/2 - 34 + scenes[2].currentIndex.y*34 + GRID_BRICK_GAP, 
                        wordWidth + GRID_BRICK_GAP*2, 34, "white", 1)

        for (var i = 0; i < scenes[2].list.length; i++) {
            if(i == scenes[2].currentIndex.y){
                scenes[2].list[i].c = "black";
            }else{
                scenes[2].list[i].c = "white";
            }
        }

        drawText('white', 32 + 'px monospace', "CHOOSE DIFFICULTY", 
            canvas.width/2-width/2, canvas.height/3);
        
        drawText(scenes[2].list[0].c, 32 + 'px monospace', "HARD: ALLOW COMPUTER TO SEE YOUR ANSWERS", 
            canvas.width/2-scenes[2].list[0].w/2, canvas.height/2);
        
        drawText(scenes[2].list[1].c, 32 + 'px monospace', "EASY: DON'T ALLOW COMPUTER TO SEE YOUR ANSWERS", 
            canvas.width/2-scenes[2].list[1].w/2, canvas.height/2 + 34);

        drawText(scenes[2].list[2].c, 32 + 'px monospace', "GO BACK", 
            canvas.width/2-scenes[2].list[2].w/2, canvas.height/2 + 34*2);
    }

    scenes[2].onAction = function(input){
        if(input == DOWN && scenes[2].currentIndex.y < scenes[2].list.length-1){
            scenes[2].currentIndex.y++;
        }
        if(input == UP && scenes[2].currentIndex.y > 0){
            scenes[2].currentIndex.y--;
        }

        if(input == ENTER){
            if(scenes[2].currentIndex.y == 0){
                peeking = true;
                currentScene = scenes[1];

                if(Math.random() > 0.5){
                    currentTurn = "Computer";
                }else{
                    currentTurn = "Computer";
                }
            }
            if(scenes[2].currentIndex.y == 1){
                peeking = false;
                currentScene = scenes[1];

                if(Math.random() > 0.5){
                    currentTurn = "Computer";
                }else{
                    currentTurn = "Player";
                }
            }
            if(scenes[2].currentIndex.y == 2){
                currentScene = scenes[0];
            }

        }
    }

    scenes[3] = new Scene();

    scenes[3].draw = function(){
        colorRect(0, 0, canvas.width, canvas.height,  'rgba(18,18,18,0.85)');

        width = measureText("GAME OVER", 32, "monospace").width;
        drawText("white", "32px monospace", "GAME OVER", canvas.width/2 - width/2, canvas.height/3);

        if(winner != "TIE"){
            width = measureText(winner.toUpperCase() + " WINS!", 32, "monospace").width;
            drawText("white", "32px monospace", winner.toUpperCase() + " WINS!", canvas.width/2 - width/2, canvas.height/2 + 36);

            if(winner == "Computer"){
                width = measureText("YOUR WORD WAS " + playerWordle.word.toUpperCase(), 32, "monospace").width;
                drawText("white", "32px monospace", "YOUR WORD WAS " + playerWordle.word.toUpperCase(), canvas.width/2 - width/2, canvas.height/2 + 36*2);
            }

        }else{
            width = measureText("ITS A TIE", 32, "monospace").width;
            drawText("white", "32px monospace", "ITS A TIE", canvas.width/2 - width/2, canvas.height/2 + 36);
        }
        

        width = measureText("PRESS SPACE BAR TO PLAY AGAIN", 32, "monospace").width;
        drawText("white", "32px monospace", "PRESS SPACE BAR TO PLAY AGAIN", canvas.width/2 - width/2, canvas.height/2 + 36*3);
    }

    scenes[3].onAction = function(input){
        if(input == SPACE){
            start();
        }
    }
}