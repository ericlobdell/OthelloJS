class Move {

    constructor( row, col, points, playerId, isHighestScoring ) {
        this.x = col;
        this.y = row;
        this.pointValue = points;
        this.player = playerId;
        this.time = 0;
        this.timeInMatch = 0;
        this.highestScoring = isHighestScoring;
    }
}