
class BoardManager {

    constructor() { }

    static tryGetCell( row, col, gameBoard ) {
        return BoardManager.isValidMove( row, col ) ?
            gameBoard.rows[row][col] :
            null;
    }

    static isValidMove( row, col ) {
        return ( row > -1 && col > -1 ) && ( row < 8 && col < 8 );
    }

    static getFlatGameBoard( gameBoard ) {
        return Array.prototype.concat.apply( [], gameBoard.rows );
    }

    static getEmptyCells( gameBoard ) {
        return BoardManager.getFlatGameBoard( gameBoard )
            .filter( c  => c.player === 0 );
    }

    static getPlayerCells( playerNumber, gameBoard ) {
        return BoardManager.getFlatGameBoard( gameBoard )
            .filter( c => c.player === playerNumber ); 
    }

    static getAdjacentCells( cell, gameBoard ) {
        let above = BoardManager.tryGetCell( cell.row - 1, cell.col, gameBoard );
        let aboveRight = BoardManager.tryGetCell( cell.row - 1, cell.col + 1, gameBoard );
        let aboveLeft = BoardManager.tryGetCell( cell.row - 1, cell.col - 1, gameBoard );
        let left = BoardManager.tryGetCell( cell.row, cell.col -1, gameBoard );
        let right = BoardManager.tryGetCell( cell.row, cell.col + 1, gameBoard );
        let below = BoardManager.tryGetCell( cell.row + 1, cell.col, gameBoard );
        let belowRight = BoardManager.tryGetCell( cell.row + 1, cell.col + 1, gameBoard );
        let belowLeft = BoardManager.tryGetCell( cell.row + 1, cell.col - 1, gameBoard );

        return [above, aboveRight, aboveLeft, left, right, below, belowRight, belowLeft]
            .filter( c => c !== null );
    }

    static getOpenAdjacentCells( cell, gameBoard ) {
        return BoardManager.getAdjacentCells( cell, gameBoard )
            .filter( c => c.player === 0 );
    }


    static resetTargetCells( gameBoard ) {
        BoardManager.getFlatGameBoard( gameBoard )
            .forEach( c => c.isTarget = false );
    }

    static getInitialPlayer( row, col ) {

        if ( ( row === 3 && col === 3 ) || ( row === 4 && col === 4 ) )
            return 1;

        if ( ( row === 3 && col === 4 ) || ( row === 4 && col === 3 ) )
            return 2;

        return 0;

    };

    static cellIsInitialTarget( row, col ) {
        return ( row === 2 && col === 4 ) ||
            ( row === 3 && col === 5 ) ||
            ( row === 4 && col === 2 ) ||
            ( row === 5 && col === 3 );
    };

    static getInitialGameBoard( players ) {
        let gameBoard = new Gameboard( players );

        for ( let r = 0; r < 8; r++ ) {
            let row = [];
            for ( let c = 0; c < 8; c++ )
                row.push( new Cell( r, c, BoardManager.getInitialPlayer( r, c ), BoardManager.cellIsInitialTarget( r, c ) ) );

            gameBoard.rows.push( row );
        }

        return gameBoard;
    }

}


