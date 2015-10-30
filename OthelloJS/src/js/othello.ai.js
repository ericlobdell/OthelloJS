
class Othello {

    constructor( scoreKeeper ) {
        this.scoreKeeper = scoreKeeper;
    }

    // prep
    sortMovesByPointValue( moves ) {
        let copy = moves.map( m => m );

        return copy.sort(( m1, m2 ) =>
            m2.pointValue - m1.pointValue );
    }

    sortMovesByCornerPosition( moves ) {
        let copy = moves.map( m => m );

        return copy.sort(( m1, m2 ) =>
            this.isCorner( m2 ) - this.isCorner( m1 ) );
    }

    getHighestScoringMove( moves ) {
        return this.sortMovesByPointValue( moves )[0];
    }


    // classify
    isCorner( move ) {
        let corners = [[0, 0], [0, 7], [7, 0], [7, 7]];

        return corners.some( c =>
            c[0] === move.col && c[1] === move.row );
    }

    isEdge( move ) {
        return ( move.row === 0 || move.row === 7 ) ||
               ( move.col === 0 || move.col === 7 );
    }

    


    // rank

    // choose

    // act
    makeMove( availableMoves ) {
        let topScoringMove = this.sortMovesByPointValue( availableMoves )[0];
        let cornerMoves = availableMoves.filter( m => this.isCorner( m ) );


        return {
            row: topScoringMove.row,
            col: topScoringMove.col
        }
    }

}