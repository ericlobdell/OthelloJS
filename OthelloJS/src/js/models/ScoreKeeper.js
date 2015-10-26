
class ScoreKeeper {

    constructor( boardManager ) {
        this.boardManager = boardManager;
    }

    setScoreForMove( initialRow, initialCol, player, gameBoard ) {
        var hits = [];

      //  console.log( `Scoring move: ${initialRow}, ${initialCol}, ${player}` )

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

       // console.log( "calculatePoints called with: ", [initialCell, rowInc, colInc, player, gameBoard] );

        function getScore( r, c ) {
            var cell = self.boardManager.tryGetCell( r, c, gameBoard );

           // console.log( "checking cell: ", cell );

            if ( cell === null )
                return [];

            let result = self.checkCell( cell, player );

           // console.log( "check result: ", result );

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
        let opponent = player === 1 ? 2 : 1;

        _this.boardManager.resetTargetCells( gameBoard );

        var opponentsCells = _this.boardManager.getPlayerCells( opponent, gameBoard );

        console.log( opponentsCells );

        opponentsCells.forEach( c => {

                var adjacentCells = _this.boardManager.getOpenAdjacentCells( c, gameBoard );

                adjacentCells.forEach( ac => {

                    let pointsEarned = _this.setScoreForMove( ac.row, ac.col, player, gameBoard );

                    if ( pointsEarned.length ) {
                        ac.isTarget = true;
                        ac.pointValue = pointsEarned.length;
                        console.log( "Adding - ", ac );
                        nextMoves.push( ac );

                    }
                } );

            } );

        return nextMoves;
    }

}
