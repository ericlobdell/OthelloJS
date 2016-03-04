class Repository {
    
    constructor() {
        this.snapshots = [];
    }

    recordMove( data ) {
        const snapshot = this.getSnapshotPattern( data.gameBoard );
        console.log( "Snapshot created: ", snapshot );

        this.snapshots.push( snapshot );
        data.snapShots = this.snapshots;
        console.log( "Saving Data: ", data );
    }

    getSnapshotPattern( gameboard ) {
        return gameboard.moves.reduce( ( pattern, move ) => {
            return pattern + `${move.col}-${move.row}-${move.player}-${ +move.wasHighestScoring || 0},`;
        }, "" );
    }
}

