const GRID_SIDE_GAPS = 10;
const GRID_BRICK_GAP = 5;

const YELLOW = 'rgb(184, 184, 0)';
const GREEN = 'rgb(0, 173, 0)';

var cpuWordle;
var currentScene;

var winner = undefined;

var scenes = [];

function drawGraph(){   
    colorRect(0, 0, canvas.width, canvas.height,  'rgb(18,18,18)');

    drawMap();

    // console.log(cpuWordle.currentIndex)
}

function drawMap(){
    drawLine(0,0,canvas.width,0,2,"white");
    drawLine(canvas.width,0,canvas.width,canvas.height,2,"white");
    drawLine(canvas.width,canvas.height,0,canvas.height,2,"white");
    drawLine(0,canvas.height,0,0,2,"white");

    cpuWordle.draw();
    currentScene.draw();

    if(winner){
        colorRect(0, 0, canvas.width, canvas.height,  'rgba(18,18,18,0.85)');

        if(winner != "NS"){
            width = measureText("WORD FOUND!", 32, "monospace").width
            drawText("white", "32px monospace", "WORD FOUND!", canvas.width/2 - width/2, canvas.height/2 + 36);
        }else{
            if(cpuWordle.currentIndex.y == cpuWordle.rows-1){
                width = measureText("NEEDED MORE TRIES", 32, "monospace").width
                drawText("white", "32px monospace", "NEEDED MORE TRIES", canvas.width/2 - width/2, canvas.height/2 + 36);
            }else{
                width = measureText("SORRY I DONT KNOW THIS WORD", 32, "monospace").width
                drawText("white", "32px monospace", "SORRY I DONT KNOW THIS WORD", canvas.width/2 - width/2, canvas.height/2 + 36);
            }
        }
        

        width = measureText("PRESS SPACE BAR TO CALCULATE ANOTHER WORD", 32, "monospace").width
        drawText("white", "32px monospace", "PRESS SPACE BAR TO CALCULATE ANOTHER WORD", canvas.width/2 - width/2, canvas.height/2 + 36*3);
    }
}

