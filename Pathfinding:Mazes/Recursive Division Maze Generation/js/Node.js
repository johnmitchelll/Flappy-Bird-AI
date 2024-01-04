const BRICK_GAP = 1;
const BRICK_W = 20;
const BRICK_H = 20;
function nodeClass(col,row){
    this.i = col;
    this.j = row;
    this.index = col + BRICK_COLS * row;
    this.wall = false;
    this.door = false;
    this.tooSmall = false;

    this.showNode = function(color){
                canvasContext.fillStyle = color;
                canvasContext.fillRect(this.i * BRICK_W +1 ,this.j * BRICK_H +1,
                                        BRICK_W-BRICK_GAP,BRICK_H-BRICK_GAP);
    }
}