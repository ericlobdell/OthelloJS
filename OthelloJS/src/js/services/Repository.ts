import Gameboard from "../models/Gameboard";

export default class Repository {

    snapshots: string[];
    
    constructor() {
        this.snapshots = [];
    }

    recordMove( data ) {
        const snapshot = this.getSnapshotPattern( data.gameBoard );

        this.snapshots.push( snapshot );
        data.snapShots = this.snapshots;
    }

    getSnapshotPattern( gameboard: Gameboard ) {
        return gameboard.moves.reduce( ( pattern, move ) => {
            return pattern + `${move.col}-${move.row}-${move.player}-${ +move.isHighestScoring || 0},`;
        }, "" );
    }
}

