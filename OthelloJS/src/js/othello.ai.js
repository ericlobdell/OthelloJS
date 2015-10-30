


class Othello {

    // prep
    sortMovesByPointValue( moves ) {
        return this.copy( moves )
            .sort(( m1, m2 ) =>
                m2.pointValue - m1.pointValue );
    }

    sortMovesByCornerPosition( moves ) {
        return this.copy( moves )
            .sort(( m1, m2 ) =>
                this.isCorner( m2 ) - this.isCorner( m1 ) );
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
        let topScoringMove = this.getHighestScoringMove( availableMoves );
        let cornerMoves = availableMoves
            .filter( m => this.isCorner( m ) );

        return {
            row: topScoringMove.row,
            col: topScoringMove.col
        }
    }

    copy( arr ) {
        return arr.map( x => x );
    }

}