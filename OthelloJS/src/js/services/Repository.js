export default class Repository {
    
    constructor() {
        this.snapshots = [];
    }

    recordMove( data ) {
        const snapshot = this.getSnapshotPattern( data.gameBoard );

        this.snapshots.push( snapshot );
        data.snapShots = this.snapshots;
    }

    getSnapshotPattern( gameboard ) {
        return gameboard.moves.reduce( ( pattern, move ) => {
            return pattern + `${move.col}-${move.row}-${move.player}-${ +move.wasHighestScoring || 0},`;
        }, "" );
    }
}

