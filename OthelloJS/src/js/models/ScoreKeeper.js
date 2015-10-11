
class ScoreKeeper {

    constructor( boardManager ) {
        this.boardManager = boardManager;
    }

    playerHasNextMove( playerNumber, gameBoard ) {
        let self = this;

        self.boardManager.getEmptyCells( gameBoard ).forEach( (cell)  =>
            self.setScoreForMove( cell.col, cell.row, playerNumber, gameBoard ).length > 0 );

        return false;
    }

    setScoreForMove( x, y, player, gameBoard ) {
        let hits = [];

        for ( let row = -1 ; row <= 1; row++ )
            for ( let col = -1 ; col <= 1; col++ )
                if ( row === 0 && col === 0 )
                    continue;
                else
                    hits = hits.concat( this.searchAt( x, y, row, col, player, gameBoard ));

        return hits;
    }

    calculatePoints( cell, rowInc, colInc, player, gameBoard ) {
        let cells = [], self = this;

        function getScore( r, c ) {
            if ( self.boardManager.tryGetCell( c, r, gameBoard ) === null ) {
                return [];
            }

            let cell = gameBoard.rows[r][c];
            const result = self.checkCell( cell, player );
            if ( !result.isValidMove || result.isEmpty ) {
                return [];
            } else if ( result.isPoint ) {
                cells.push( cell );
                return getScore( r + rowInc, c + colInc );
            } else {
                return cells;
            }
        }

        return getScore( cell.row, cell.col );
    }

    checkCell( cell, player ) {
        const valid = this.boardManager.isValidMove( cell.col, cell.row ),
              empty = valid ? cell.player === 0 : false,
              point = valid ? cell.player !== player && !empty : false;

        return {
            isValidMove: valid,
            isEmpty: empty,
            isPoint: point
        };
    }

    getScoreForPlayer( playerNumber, gameBoard ) {
        return this.boardManager.getFlatGameBoard(gameBoard).reduce(( score, cell ) => {
            if (cell.player === playerNumber)
                score++;

            return score;
        }, 0);
    }

    resetMoveScoreRatings( gameBoard ) {
        this.boardManager.getFlatGameBoard( gameBoard )
            .forEach( cell  => cell.isHighestScoring = false );

        return gameBoard;
    }

    searchAt( x, y, rowInc, colInc, player, gameBoard ) {
        const cell = this.boardManager.tryGetCell( x + colInc, y + rowInc, gameBoard );
        return cell !== null ?
            this.calculatePoints( cell, rowInc, colInc, player, gameBoard ) : [];
    }


}
