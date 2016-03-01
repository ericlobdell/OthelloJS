/// <reference path="D:\repos\JS\OthelloJS\OthelloJS\src/js/models/Move.js" />

class ScoreKeeper {

    static getMoveCaptures ( initialRow, initialCol, player, gameBoard ) {
        var hits = [];

        for ( let rowIncrement = -1; rowIncrement <= 1; rowIncrement++ )
            for ( let colIncrement = -1; colIncrement <= 1; colIncrement++ )
                if ( rowIncrement === 0 && colIncrement === 0 )
                    continue;
                else
                    hits = hits.concat( this.doDirectionalSearch( initialRow, initialCol, rowIncrement, colIncrement, player, gameBoard ) );

        return hits;
    }

    static doDirectionalSearch ( row, col, rowInc, colInc, player, gameBoard ) {
        let cell = BoardManager.tryGetCell( row + rowInc, col + colInc, gameBoard );
        return cell !== null ?
            this.getDirectionalCaptures( cell, rowInc, colInc, player, gameBoard ) : [];
    }

    static getDirectionalCaptures ( initialCell, rowInc, colInc, player, gameBoard ) {
        let captures = [];
        let _this = this;

        let getCapturesRecursive = ( r, c ) => {
            var cell = BoardManager.tryGetCell( r, c, gameBoard );

            if ( cell === null ) // we've walked off the game board
                return [];

            let cellEvaluation = _this.evaluateCell( cell, player );

            if ( cellEvaluation.isEmptyPosition ) {
                return [];
            } else if ( cellEvaluation.isOpponentPosition ) {
                captures.push( cell );
                return getCapturesRecursive( r + rowInc, c + colInc );
            } else {
                return captures;
            }
        };

        return getCapturesRecursive( initialCell.row, initialCell.col );
    }

    static evaluateCell ( cell, player ) {
        return {
            isEmptyPosition: cell.player === 0,
            isOpponentPosition: cell.player !== player
        };
    }

    static recordMove ( row, col, playerNumber, gameBoard, isHighScoring ) {
        let opponentCaptures = this.getMoveCaptures( row, col, playerNumber, gameBoard );
        let currentMove = new Move( row, col, opponentCaptures.length, playerNumber, isHighScoring );

        if ( opponentCaptures.length ) {

            gameBoard.moves.push( currentMove );
            gameBoard.rows[ row ][ col ].player = playerNumber;

            opponentCaptures.forEach( c => {
                c.distance = this.getHitDistance( currentMove, c.col, c.row );
                c.player = playerNumber;
                c.isHit = true;
            } );

            console.log( "Recording move: ", gameBoard );
        }

        return opponentCaptures;

    }

    static getHitDistance ( move, col, row ) {
        let rowDiff = Math.abs( row - move.row );
        let colDiff = Math.abs( col - move.col );

        return rowDiff || colDiff;
    }

    static getScoreForPlayer ( playerNumber, gameBoard ) {
        return BoardManager.getFlatGameBoard( gameBoard )
            .filter( c => c.player === playerNumber )
            .length;
    }

    static getLeader( player1, player2 ) {

        if ( player1.score > player2.score )
            return 1;

        else if ( player2.score > player1.score )
            return 2;

        else
            return 0;
    }

    static resetMoveRatings ( gameBoard ) {
        BoardManager.getFlatGameBoard( gameBoard )
            .forEach( cell  => {
                cell.isHighestScoring = false;
                cell.isHit = false;
                cell.distance = 0;
            } );

        console.log( "RESET GB: ", gameBoard );
        return gameBoard;
    }

    static setPlayerScores ( players, gameBoard ) {
        players.forEach( p =>
            p.score = ScoreKeeper.getScoreForPlayer( p.number, gameBoard ) );
    }

    static getNextMovesForPlayer ( playerNumber, gameBoard ) {
        let nextMoves = [];
        let highestPointValue = 0;
        let opponent = playerNumber === 1 ? 2 : 1;

        BoardManager.resetTargetCells( gameBoard );

        BoardManager.getPlayerCells( opponent, gameBoard )
            .forEach( opponentCell => {

                BoardManager.getOpenAdjacentCells( opponentCell, gameBoard )
                    .forEach( adjacentCell => {

                        let pointsEarned = ScoreKeeper.getMoveCaptures( adjacentCell.row, adjacentCell.col, playerNumber, gameBoard ).length;

                        highestPointValue = ( highestPointValue > pointsEarned ) ? highestPointValue : pointsEarned;

                        if ( pointsEarned ) {
                            adjacentCell.isTarget = true;
                            adjacentCell.pointValue = pointsEarned;
                            nextMoves.push( adjacentCell );
                        }

                    } );

            } );

        nextMoves.forEach( m => m.isHighestScoring = m.pointValue === highestPointValue );
        return nextMoves;
    }

}
