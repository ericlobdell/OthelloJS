
class Cell {

    constructor( row, col, player, isTarget ) {
        this.row = row;
        this.col = col;
        this.player = player;
        this.isTarget = isTarget;
        this.distance = 0;
    }
}