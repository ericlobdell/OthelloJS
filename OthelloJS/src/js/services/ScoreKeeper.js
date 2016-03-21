import BoardManager from "./BoardManager";
import Move from "../models/Move";

const ScoreKeeper = new class scoreKeeper {

    getMoveCaptures ( initialRow, initialCol, player, gameBoard ) {
        let hits = [];

        for ( let rowIncrement = -1; rowIncrement <= 1; rowIncrement++ )
            for ( let colIncrement = -1; colIncrement <= 1; colIncrement++ )
                if ( rowIncrement === 0 && colIncrement === 0 )
                    continue;
                else
                    hits = hits.concat( this.doDirectionalSearch( initialRow, initialCol, rowIncrement, colIncrement, player, gameBoard ) );

        return hits;
    }

    doDirectionalSearch ( row, col, rowInc, colInc, player, gameBoard ) {
        const cell = BoardManager.tryGetCell( row + rowInc, col + colInc, gameBoard );
        return cell !== null ?
            this.getDirectionalCaptures( cell, rowInc, colInc, player, gameBoard ) : [];
    }

    getDirectionalCaptures ( initialCell, rowInc, colInc, player, gameBoard ) {
        const captures = [];

        const getCapturesRecursive = ( r, c ) => {
            const cell = BoardManager.tryGetCell( r, c, gameBoard );

            if ( cell === null ) // we've walked off the game board
                return [];

            let { isEmptyPosition, isOpponentPosition } = this.evaluateCell( cell, player );

            if ( isEmptyPosition ) {
                return [];
            } else if ( isOpponentPosition ) {
                captures.push( cell );
                return getCapturesRecursive( r + rowInc, c + colInc );
            } else {
                return captures;
            }
        };

        return getCapturesRecursive( initialCell.row, initialCell.col );
    }

    evaluateCell ( cell, player ) {
        return {
            isEmptyPosition: cell.player === 0,
            isOpponentPosition: cell.player !== 0 && cell.player !== player
        };
    }

    recordMove ( row, col, playerNumber, gameBoard, isHighScoring ) {
        const opponentCaptures = this.getMoveCaptures( row, col, playerNumber, gameBoard );
        const currentMove = new Move( row, col, opponentCaptures.length, playerNumber, isHighScoring );

        if ( opponentCaptures.length ) {

            gameBoard.moves.push( currentMove );
            gameBoard.rows[ row ][ col ].player = playerNumber;

            opponentCaptures.forEach( c => {
                c.distance = this.getHitDistance( currentMove, c.col, c.row );
                c.player = playerNumber;
                c.isHit = true;
            } );

        }

        return opponentCaptures;

    }

    getHitDistance ( move, col, row ) {
        const rowDiff = Math.abs( row - move.row );
        const colDiff = Math.abs( col - move.col );

        return rowDiff || colDiff;
    }

    getScoreForPlayer ( playerNumber, gameBoard ) {
        return BoardManager.getFlatGameBoard( gameBoard )
            .filter( c => c.player === playerNumber )
            .length;
    }

    getLeader( player1, player2 ) {

        if ( player1.score > player2.score )
            return 1;

        else if ( player2.score > player1.score )
            return 2;

        else
            return 0;
    }

    resetMoveRatings ( gameBoard ) {
        BoardManager.getFlatGameBoard( gameBoard )
            .forEach( cell  => {
                cell.isHighestScoring = false;
                cell.isHit = false;
                cell.distance = 0;
            } );

        return gameBoard;
    }

    setPlayerScores ( players, gameBoard ) {
        players.forEach( p =>
            p.score = this.getScoreForPlayer( p.number, gameBoard ) );
    }

    getNextMovesForPlayer ( playerNumber, gameBoard ) {
        const nextMoves = [];
        const opponent = playerNumber === 1 ? 2 : 1;
        let highestPointValue = 0;
        
        BoardManager.resetTargetCells( gameBoard );

        BoardManager.getPlayerCells( opponent, gameBoard )
            .forEach( opponentCell => {

                BoardManager.getOpenAdjacentCells( opponentCell, gameBoard )
                    .forEach( adjacentCell => {

                        const pointsEarned = this.getMoveCaptures( adjacentCell.row, adjacentCell.col, playerNumber, gameBoard ).length;

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

}()

export default ScoreKeeper;
