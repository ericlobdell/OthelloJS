
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

    getOpenAdjacentCells( cell, gameBoard ) {
        const above = this.tryGetCell( cell.row - 1, cell.col, gameBoard );
        const aboveRight = this.tryGetCell( cell.row - 1, cell.col + 1, gameBoard );
        const aboveLeft = this.tryGetCell( cell.row - 1, cell.col - 1, gameBoard );
        const left = this.tryGetCell( cell.row, cell.col -1, gameBoard );
        const right = this.tryGetCell( cell.row, cell.col + 1, gameBoard );
        const below = this.tryGetCell( cell.row + 1, cell.col, gameBoard );
        const belowRight = this.tryGetCell( cell.row + 1, cell.col + 1, gameBoard );
        const belowLeft = this.tryGetCell( cell.row + 1, cell.col - 1, gameBoard );

        return [above, aboveRight, aboveLeft, left, right, below, belowRight, belowLeft]
            .filter( c => c !== null && c.player === 0 );
    }

    resetTargetCells( gameBoard ) {
        this.getFlatGameBoard( gameBoard )
            .forEach( c => c.isTarget = false );
    }

    getInitialGameboard() {
        const gameBoard = new Gameboard();

        let initialPlayer = ( row, col ) => {

            if ( ( row === 3 && col === 3 ) || ( row === 4 && col === 4 ) )
                return 1;

            if ( ( row === 3 && col === 4 ) || ( row === 4 && col === 3 ) )
                return 2;

            return 0;

        };

        let cellIsTarget = ( row, col ) => {
            return ( row === 2 && col === 4 ) ||
            ( row === 3 && col === 5 ) ||
            ( row === 4 && col === 2 ) ||
            ( row === 5 && col === 3 );
        };

        for ( let r = 0; r < 8; r++ ) {
            const row = [];
            for ( let c = 0; c < 8; c++ )
                row.push( new Cell( r, c, initialPlayer( r, c ), cellIsTarget( r, c ) ) );

            gameBoard.rows.push( row );
        }

        return gameBoard;
    }



}
