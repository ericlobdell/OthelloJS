import Move from "models/Move";
import Cell from "models/Cell";

class Othello {

    constructor() { }

    isCorner( move: Cell ) : boolean {
        const corners = [[0, 0], [0, 7], [7, 0], [7, 7]];

        return corners.some( c =>
            c[0] === move.col && c[1] === move.row );
    }

    isEdge( move: Cell ): boolean {
        return ( move.row === 0 || move.row === 7 ) ||
            ( move.col === 0 || move.col === 7 );
    }

    getHighestScoringMove( moves: Cell[] ): Cell {
        return moves
            .sort(( m1, m2 ) => m2.pointValue - m1.pointValue )[0];
    }

    makeMove( availableMoves: Cell[] ): MoveResult {
        let reason = "";
        const cornerMoves = availableMoves
                .filter( m => this.isCorner( m ) );

        const edgeMoves = availableMoves
                .filter( m => this.isEdge( m ) );

        let nextMove: Cell;
        if ( cornerMoves.length ) {
            nextMove = this.getHighestScoringMove( cornerMoves );
            reason = "corner position available";
        }

        else if ( edgeMoves.length ) {
            nextMove = this.getHighestScoringMove( edgeMoves );
            reason = "edge position available";
        }

        else {
            nextMove = this.getHighestScoringMove( availableMoves );
            reason = "highest point value";
        }

        return {
            row: nextMove.row,
            col: nextMove.col,
            basedOn: reason
        }
    }

    makeRandomMove( availableMoves: Cell[] ): MoveResult {
        const randomMoveIndex = this.getRandomIndex( availableMoves.length );
        const randomMove = availableMoves[randomMoveIndex];

        return {
            row: randomMove.row,
            col: randomMove.col,
            basedOn: "random selection"
        }
    }

    getRandomIndex( max: number ): number {
        return Math.floor( Math.random() * max );
    }

}

export default new Othello();

interface MoveResult {
    row: number;
    col: number;
    basedOn: string;
}