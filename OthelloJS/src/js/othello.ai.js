const Othello = new class Othello {

    isCorner( move ) {
        const corners = [[0, 0], [0, 7], [7, 0], [7, 7]];

        return corners.some( c =>
            c[0] === move.col && c[1] === move.row );
    }

    isEdge( move ) {
        return ( move.row === 0 || move.row === 7 ) ||
            ( move.col === 0 || move.col === 7 );
    }

    getHighestScoringMove( moves ) {
        return moves
            .sort(( m1, m2 ) => m2.pointValue - m1.pointValue )[0];
    }

    makeMove( availableMoves ) {
        let reason = "";
        const cornerMoves = availableMoves
                .filter( m => this.isCorner( m ) );

        const edgeMoves = availableMoves
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

    makeRandomMove( availableMoves ) {
        const randomMoveIndex = this.getRandomIndex( availableMoves.length );
        const randomMove = availableMoves[randomMoveIndex];

        return {
            row: randomMove.row,
            col: randomMove.col,
            basedOn: "random selection"
        }
    }

    getRandomIndex( max ) {
        return Math.floor( Math.random() * max );
    }

}();