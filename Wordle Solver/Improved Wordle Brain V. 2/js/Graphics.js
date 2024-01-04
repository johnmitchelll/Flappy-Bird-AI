const GRID_SIDE_GAPS = 10;
const GRID_BRICK_GAP = 5;

var currentTurn;
var peeking;

var playerWordle;
var cpuWordle;

var winner = undefined;

var word;

var scenes = [];
var currentScene;

function drawGraph(){   
    colorRect(0, 0, canvas.width, canvas.height,  'rgb(18,18,18)');

    drawMap();
}

function drawMap(){
    drawLine(0,0,canvas.width,0,2,"white");
    drawLine(canvas.width,0,canvas.width,canvas.height,2,"white");
    drawLine(canvas.width,canvas.height,0,canvas.height,2,"white");
    drawLine(0,canvas.height,0,0,2,"white");
    drawLine(canvas.width/2-GRID_BRICK_GAP/2,canvas.height,canvas.width/2-GRID_BRICK_GAP/2,0,2,"white");

    if(currentTurn == "Player"){
        let width = measureText("YOUR TURN", 32, "monospace").width;
        drawText("white", "32px monospace", "YOUR TURN", canvas.width/2 + canvas.width/4 - width/2, canvas.height/8);
    }
    if(currentTurn == "Computer"){
        let width = measureText("COMPUTER'S TURN", 32, "monospace").width;
        drawText("white", "32px monospace", "COMPUTER'S TURN", canvas.width/4 - width/2, canvas.height/8);
    }

    playerWordle.draw();
    cpuWordle.draw();

    currentScene.draw();
}

