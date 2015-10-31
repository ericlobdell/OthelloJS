class Move {

    constructor( row, col, points, playerId, isHighestScoring ) {
        this.col = col;
        this.row = row;
        this.pointValue = points;
        this.player = playerId;
        this.highestScoring = isHighestScoring || false;
    }
}