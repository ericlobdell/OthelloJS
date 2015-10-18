class Move {

    constructor( row, col, points, playerId, isHighestScoring ) {
        this.col = col;
        this.row = row;
        this.pointValue = points;
        this.player = playerId;
        this.time = 0;
        this.timeInMatch = 0;
        this.distance = 0;
        this.highestScoring = isHighestScoring;
    }
}