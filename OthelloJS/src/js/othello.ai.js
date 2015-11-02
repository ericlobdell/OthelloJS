


class Othello {

    // prep
    sortMovesByPointValue( moves ) {
        return moves
            .map( x => x )
            .sort(( m1, m2 ) =>
                m2.pointValue - m1.pointValue );
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

    // choose
    getHighestScoringMove( moves ) {
        return this.sortMovesByPointValue( moves )[0];
    }

    // act
    makeMove( availableMoves ) {
        let cornerMoves = availableMoves
            .filter( m => this.isCorner( m ) );

        let edgeMoves = availableMoves
            .filter( m => this.isEdge( m ) );

        let nextMove = {};
        if ( cornerMoves.length )
            nextMove = this.getHighestScoringMove( cornerMoves );

        else if ( edgeMoves.length )
            nextMove = this.getHighestScoringMove( edgeMoves );

        else
            nextMove = this.getHighestScoringMove( availableMoves );

        return {
            row: nextMove.row,
            col: nextMove.col
        }
    }

}