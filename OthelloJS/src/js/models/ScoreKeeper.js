/// <reference path="D:\repos\JS\OthelloJS\OthelloJS\src/js/models/Move.js" />

class ScoreKeeper {

    constructor ( boardManager ) {
        this.boardManager = boardManager;
    }

    setScoreForMove ( initialRow, initialCol, player, gameBoard ) {
        var hits = [];

        for ( let row = -1; row <= 1; row++ )
            for ( let col = -1; col <= 1; col++ )
                if ( row === 0 && col === 0 )
                    continue;
                else
                    hits = hits.concat( this.searchAt( initialRow, initialCol, row, col, player, gameBoard ) );

        return hits;
    }

    recordMove ( row, col, player, gameBoard, isHighScoring ) {
        let opponentCaptures = this.setScoreForMove( row, col, player, gameBoard );
        let currentMove = new Move( row, col, opponentCaptures.length, player, isHighScoring );

        if ( opponentCaptures.length ) {
            gameBoard.moves.push( currentMove );
            gameBoard.rows[ row ][ col ].player = player;
            opponentCaptures.forEach( c => {

                c.distance = this.getHitDistance( currentMove, c.col, c.row );
                c.player = player;
                c.isHit = true;

            } );

            console.log( "Recording move: ", gameBoard );
        }

        return opponentCaptures;

    }

    getHitDistance ( move, col, row ) {
        let rowDiff = Math.abs( row - move.row );
        let colDiff = Math.abs( col - move.col );

        return colDiff || rowDiff;
    }

    calculatePoints ( initialCell, rowInc, colInc, player, gameBoard ) {
        let cells = [];
        let self = this;

        function getScore ( r, c ) {
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

    checkCell ( cell, player ) {
        var valid = this.boardManager.isValidMove( cell.row, cell.col ),
            empty = valid ? cell.player === 0 : false,
            point = valid ? cell.player !== player && !empty : false;

        return {
            isValidMove: valid,
            isEmpty: empty,
            isPoint: point
        };
    }

    getScoreForPlayer ( playerNumber, gameBoard ) {
        return this.boardManager.getFlatGameBoard( gameBoard )
            .reduce( ( score, cell ) => {
                if ( cell.player === playerNumber )
                    score++;

                return score;
            }, 0 );
    }

    getLeader ( player1, player2 ) {
        if ( player1.score > player2.score )
            return 1;

        else if ( player2.score > player1.score )
            return 2;

        else
            return 0;
    }

    resetMoveScoreRatings ( gameBoard ) {
        this.boardManager.getFlatGameBoard( gameBoard )
            .forEach( cell  => {
                cell.isHighestScoring = false;
                cell.isHit = false;
                cell.distance = 0;
            } );

        return gameBoard;
    }

    searchAt ( row, col, rowInc, colInc, player, gameBoard ) {
        let cell = this.boardManager.tryGetCell( row + rowInc, col + colInc, gameBoard );
        return cell !== null ?
            this.calculatePoints( cell, rowInc, colInc, player, gameBoard ) : [];
    }

    setPlayerScores ( players, gameBoard ) {
        players.forEach( p =>
            p.score = this.getScoreForPlayer( p.number, gameBoard ) );
    }

    nextMovesForPlayer ( player, gameBoard ) {
        let _this = this;
        var nextMoves = [];
        let highScore = 0;
        let opponent = player === 1 ? 2 : 1;
        let gameBoardCopy = { rows: gameBoard.rows.slice( 0 ) };

        _this.boardManager.resetTargetCells( gameBoardCopy );

        _this.boardManager.getPlayerCells( opponent, gameBoardCopy )
            .forEach( c => {

                _this.boardManager.getOpenAdjacentCells( c, gameBoardCopy )
                    .forEach( ac => {

                        let pointsEarned = _this.setScoreForMove( ac.row, ac.col, player, gameBoardCopy ).length;

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
