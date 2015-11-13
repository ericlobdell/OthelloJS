class Othello {

    sortMovesByPointValue ( moves ) {
        return moves
            .map( x => x )
            .sort( ( m1, m2 ) => m2.pointValue - m1.pointValue );
    }

    isCorner ( move ) {
        let corners = [ [ 0, 0 ], [ 0, 7 ], [ 7, 0 ], [ 7, 7 ] ];

        return corners.some( c =>
            c[ 0 ] === move.col && c[ 1 ] === move.row );
    }

    isEdge ( move ) {
        return ( move.row === 0 || move.row === 7 ) ||
            ( move.col === 0 || move.col === 7 );
    }

    getHighestScoringMove ( moves ) {
        return this.sortMovesByPointValue( moves )[ 0 ];
    }

    makeMove ( availableMoves ) {
        let reason = "";
        let cornerMoves = availableMoves
                .filter( m => this.isCorner( m ) );

        let edgeMoves = availableMoves
                .filter( m => this.isEdge( m ) );

        let nextMove = {};
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

    makeRandomMove ( availableMoves ) {
        let randomMoveIndex = this.getRandomIndex( availableMoves.length );
        let randomMove = availableMoves[ randomMoveIndex ];

        return {
            row: randomMove.row,
            col: randomMove.col,
            basedOn: "random selection"
        }
    }

    getRandomIndex ( max ) {
        return Math.floor( Math.random() * max );
    }

}