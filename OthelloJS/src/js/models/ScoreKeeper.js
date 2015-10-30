
class ScoreKeeper {

    constructor( boardManager ) {
        this.boardManager = boardManager;
    }

    setScoreForMove( initialRow, initialCol, player, gameBoard ) {
        var hits = [];

        for ( let row = -1 ; row <= 1; row++ )
            for ( let col = -1 ; col <= 1; col++ )
                if ( row === 0 && col === 0 )
                    continue;
                else
                    hits = hits.concat( this.searchAt( initialRow, initialCol, row, col, player, gameBoard ) );

        return hits;
    }

    setHitDistance( move, col, row ) {
        move.distance = Math.abs( col - move.col ) + Math.abs( row - move.row );
    }

    calculatePoints( initialCell, rowInc, colInc, player, gameBoard ) {
        let cells = [];
        let self = this;

        function getScore( r, c ) {
            var cell = self.boardManager.tryGetCell( r, c, gameBoard );

            if ( cell === null )
                return [];

            let result = self.checkCell( cell, player );

            if ( !result.isValidMove || result.isEmpty ) {
                return [];
            } else if ( result.isPoint ) {
                cells.push( cell );
                return getScore( r + rowInc, c + colInc );
            } else {
                return cells;
            }
        }

        return getScore( initialCell.row, initialCell.col );
    }

    checkCell( cell, player ) {
        var valid = this.boardManager.isValidMove( cell.row, cell.col ),
            empty = valid ? cell.player === 0 : false,
            point = valid ? cell.player !== player && !empty : false;

        return {
            isValidMove: valid,
            isEmpty: empty,
            isPoint: point
        };
    }

    getScoreForPlayer( playerNumber, gameBoard ) {
        return this.boardManager.getFlatGameBoard( gameBoard )
            .reduce(( score, cell ) => {
                if ( cell.player === playerNumber )
                    score++;

                return score;
            }, 0 );
    }

    getLeader( player1, player2 ) {
        if ( player1.score > player2.score )
            return 1;

        else if ( player2.score > player1.score )
            return 2;

        else
            return 0;
    }

    resetMoveScoreRatings( gameBoard ) {
        this.boardManager.getFlatGameBoard( gameBoard )
            .forEach( cell  => cell.isHighestScoring = false );

        return gameBoard;
    }

    searchAt( row, col, rowInc, colInc, player, gameBoard ) {
        let cell = this.boardManager.tryGetCell( row + rowInc, col + colInc, gameBoard );
        return cell !== null ?
            this.calculatePoints( cell, rowInc, colInc, player, gameBoard ) : [];
    }

    nextMovesForPlayer( player, gameBoard ) {
        let _this = this;
        var nextMoves = [];
        let highScore = 0;
        let opponent = player === 1 ? 2 : 1;

        _this.boardManager.resetTargetCells( gameBoard );

        _this.boardManager.getPlayerCells( opponent, gameBoard )
            .forEach( c => {

                _this.boardManager.getOpenAdjacentCells( c, gameBoard )
                    .forEach( ac => {

                        let pointsEarned = _this.setScoreForMove( ac.row, ac.col, player, gameBoard ).length;

                        highScore = ( highScore > pointsEarned ) ? highScore : pointsEarned;

                        if ( pointsEarned ) {
                            ac.isTarget = true;
                            ac.pointValue = pointsEarned;
                            nextMoves.push( ac );
                        }
                    } );

            } );

        nextMoves.forEach( m => m.isHighestScoring = m.pointValue === highScore );
        return nextMoves;
    }

}
