
class BoardManager {

    tryGetCell( row, col, gameBoard ) {
        return this.isValidMove( row, col ) ?
            gameBoard.rows[row][col] :
            null;
    }

    isValidMove( row, col ) {
        return ( row > -1 && col > -1 ) && ( row < 8 && col < 8 );
    }

    getFlatGameBoard( gameBoard ) {
        return Array.prototype.concat.apply( [], gameBoard.rows );
    }

    getEmptyCells( gameBoard ) {
        return this.getFlatGameBoard( gameBoard )
            .filter( c  => c.player === 0 );
    }

    getPlayerCells( playerNumber, gameBoard ) {
        return this.getFlatGameBoard( gameBoard )
            .filter( c => c.player === playerNumber );
    }

    getAdjacentCells( cell, gameBoard ) {
        let above = this.tryGetCell( cell.row - 1, cell.col, gameBoard );
        let aboveRight = this.tryGetCell( cell.row - 1, cell.col + 1, gameBoard );
        let aboveLeft = this.tryGetCell( cell.row - 1, cell.col - 1, gameBoard );
        let left = this.tryGetCell( cell.row, cell.col -1, gameBoard );
        let right = this.tryGetCell( cell.row, cell.col + 1, gameBoard );
        let below = this.tryGetCell( cell.row + 1, cell.col, gameBoard );
        let belowRight = this.tryGetCell( cell.row + 1, cell.col + 1, gameBoard );
        let belowLeft = this.tryGetCell( cell.row + 1, cell.col - 1, gameBoard );

        return [above, aboveRight, aboveLeft, left, right, below, belowRight, belowLeft]
            .filter( c => c !== null );
    }

    getOpenAdjacentCells( cell, gameBoard ) {
        return this.getAdjacentCells( cell, gameBoard )
            .filter( c => c.player === 0 );
    }


    resetTargetCells( gameBoard ) {
        this.getFlatGameBoard( gameBoard )
            .forEach( c => c.isTarget = false );
    }

    __getInitialPlayer__( row, col ) {

        if ( ( row === 3 && col === 3 ) || ( row === 4 && col === 4 ) )
            return 1;

        if ( ( row === 3 && col === 4 ) || ( row === 4 && col === 3 ) )
            return 2;

        return 0;

    };

    __cellIsInitialTarget__( row, col ) {
        return ( row === 2 && col === 4 ) ||
            ( row === 3 && col === 5 ) ||
            ( row === 4 && col === 2 ) ||
            ( row === 5 && col === 3 );
    };

    getInitialGameBoard( players ) {
        let gameBoard = new Gameboard( players );

        for ( let r = 0; r < 8; r++ ) {
            let row = [];
            for ( let c = 0; c < 8; c++ )
                row.push( new Cell( r, c, this.__getInitialPlayer__( r, c ), this.__cellIsInitialTarget__( r, c ) ) );

            gameBoard.rows.push( row );
        }

        return gameBoard;
    }

}


