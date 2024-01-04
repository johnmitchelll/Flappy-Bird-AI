function Scene(){
    this.list = [];
    this.currentIndex = new Vector(0,0);

    this.onAction = function(input){}
    this.draw = function(){}
}

function initScenes(){
    scenes = [];
    scenes.push(new Scene());
    scenes.push(new Scene());

    scenes[0].list = computerMakeBestMove();
    scenes[0].onAction = function(input){
        if(input == UP && scenes[0].currentIndex.y != 0){
            scenes[0].currentIndex.y--;
        }

        if(input == DOWN && scenes[0].currentIndex.y != scenes[0].list.length-1){
            scenes[0].currentIndex.y++;
        }

        if(input == ENTER){
            setRow(cpuWordle, scenes[0].list[scenes[0].currentIndex.y].word);
            currentScene = scenes[1];

            scenes[1].list = [];
            for (var i = 0; i < cpuWordle.cols; i++) {
                scenes[1].list.push(cpuWordle.grid[i][cpuWordle.currentIndex.y]);

                if(cpuWordle.spacesConfirmed[i]){
                    cpuWordle.grid[i][cpuWordle.currentIndex.y].color = GREEN;
                }
            }
        }

    }

    scenes[0].draw = function(){
        let sceneWidth = GRID_SIDE_GAPS + canvas.width/4;
        let font1 = Math.floor(sceneWidth * 0.05);
        let font2 = Math.floor(sceneWidth * 0.0375);

        drawText("white", font1 + "px monospace", "SELECT WORD:", sceneWidth/10, canvas.height/16);
        drawText("white", font2 + "px monospace", "TOP WORD IS THE BEST CHOICE", sceneWidth/10, canvas.height/16 + font1 + 2);
        drawText("white", font2 + "px monospace", "USE THE UP AND DOWN ARROW KEYS", sceneWidth/10, canvas.height/16 + font1 + font2 + 4);

        for (var i = 0; i < scenes[0].list.length; i++) {
            drawText("white", font1 + "px monospace", scenes[0].list[i].word.toUpperCase(), 
                    sceneWidth/10, canvas.height/16 + font1 + font2*4 + i * 18);
        }

        let wordWidth = canvasContext.measureText(scenes[0].list[0].word).width;
        colorRectNoFill(sceneWidth/10 - GRID_BRICK_GAP, canvas.height/16 + font1 + font2*4 + scenes[0].currentIndex.y * 18 - font1 + 3, 
                        wordWidth + GRID_BRICK_GAP*2, font1 + 1, "white", 1)
    }


    scenes[1].onAction = function(input){
        if(input == RIGHT && scenes[1].currentIndex.x != cpuWordle.cols-1){
            scenes[1].currentIndex.x++;
        }

        if(input == LEFT && scenes[1].currentIndex.x != 0){
            scenes[1].currentIndex.x--;
        }

        if(input == G){
            cpuWordle.grid[scenes[1].currentIndex.x][cpuWordle.currentIndex.y].color = GREEN;
        }
        if(input == Y){
            cpuWordle.grid[scenes[1].currentIndex.x][cpuWordle.currentIndex.y].color = YELLOW;
        }
        if(input == B){
            cpuWordle.grid[scenes[1].currentIndex.x][cpuWordle.currentIndex.y].color = undefined;
        }

        if(input == ENTER){
            cpuWordle.checkRow();
            scenes[0].list = computerMakeBestMove();
            
            if(scenes[0].list.length == 0){ winner = "NS" }

            if(!winner){
                currentScene = scenes[0];
                currentScene.currentIndex = new Vector(0,0);
                cpuWordle.nextRow();
            }
        }
    }

    scenes[1].draw = function(){
        let sceneWidth = GRID_SIDE_GAPS + canvas.width/4;
        let wordleWidth = GRID_SIDE_GAPS*2 + cpuWordle.cols*cpuWordle.grid[0][0].w;

        let font1 = Math.floor(sceneWidth * 0.05);
        let font2 = Math.floor(sceneWidth * 0.0375);

        drawText("white", font1 + "px monospace", "INPUT CORRECTNESS OF WORD:", sceneWidth/20 + wordleWidth + sceneWidth, canvas.height/16);
        drawText("white", font2 + "px monospace", "USE LEFT AND RIGHT ARROW KEYS", sceneWidth/20 + wordleWidth + sceneWidth, canvas.height/16 + font1 + 4);
        drawText("white", font2 + "px monospace", "INPUT THE CORRECTNESS OF EACH LETTER", sceneWidth/20 + wordleWidth + sceneWidth, canvas.height/16 + font1 + font2 + 4);
        drawText("white", font2 + "px monospace", "USING: \"G\", \"Y\", \"B\" FOR GREEN,", sceneWidth/20 + wordleWidth + sceneWidth, canvas.height/16 + font1 + font2*2 + 4);
        drawText("white", font2 + "px monospace", "YELLOW, AND BLANK RESPECTIVELY", sceneWidth/20 + wordleWidth + sceneWidth, canvas.height/16 + font1 + font2*3 + 4);
        drawText("white", font2 + "px monospace", "PRESS ENTER TO LOCK IN THE INPUT", sceneWidth/20 + wordleWidth + sceneWidth, canvas.height/16 + font1 + font2*4 + 4);

        colorRectNoFill(scenes[1].currentIndex.x * cpuWordle.grid[scenes[1].currentIndex.x][cpuWordle.currentIndex.y].w + GRID_SIDE_GAPS + canvas.width/4, 
                          cpuWordle.currentIndex.y * cpuWordle.grid[scenes[1].currentIndex.x][cpuWordle.currentIndex.y].h + GRID_SIDE_GAPS + 25 + GRID_SIDE_GAPS, 
                          cpuWordle.grid[scenes[1].currentIndex.x][cpuWordle.currentIndex.y].w - GRID_BRICK_GAP, cpuWordle.grid[scenes[1].currentIndex.x][cpuWordle.currentIndex.y].h - GRID_BRICK_GAP, 'white', 10);
    }

}




