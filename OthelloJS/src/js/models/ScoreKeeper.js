
class ScoreKeeper {

    constructor( boardManager ) {
        this.boardManager = boardManager;
    }

    setScoreForMove( initialRow, initialCol, player, gameBoard ) {
        let hits = [];

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
        const self = this;

        function getScore( r, c ) {
            let cell = self.boardManager.tryGetCell( r, c, gameBoard );

            if ( cell === null )
                return [];

            const result = self.checkCell( cell, player );

            if ( !result.isValidMove || result.isEmpty ) {
                return [];
            } else if ( result.isPoint ) {
                //self.setHitDistance( cell, r, c );
                cell.player = player;
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
        const cell = this.boardManager.tryGetCell( row + rowInc, col + colInc, gameBoard );
        return cell !== null ?
            this.calculatePoints( cell, rowInc, colInc, player, gameBoard ) : [];
    }

    nextMovesForPlayer( player, gameBoard ) {
        const _this = this;
        var nextMoves = [];
        let opponent = player === 1 ? 2 : 1;

        _this.boardManager.resetTargetCells( gameBoard );

        let opponentsCells = _this.boardManager.getPlayerCells( opponent, gameBoard );

        //console.log( opponentsCells );
        
        opponentsCells.forEach( c => {
                let adjacentCells = _this.boardManager.getOpenAdjacentCells( c, gameBoard );
                
                console.log( adjacentCells );

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
