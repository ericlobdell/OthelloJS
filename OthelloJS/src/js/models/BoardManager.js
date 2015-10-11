
class BoardManager {

    tryGetCell( x, y, gameBoard ) {
        return this.isValidMove( x, y ) ?
            gameBoard.rows[y][x] :
            null;
    }

    isValidMove( x, y ) {
        return ( x > -1 && y > -1 ) && ( x < 8 && y < 8 );
    }

    getFlatGameBoard( gameBoard ) {
        return Array.prototype.concat.apply( [], gameBoard.rows );
    }

    getEmptyCells( gameBoard ) {
        return this.getFlatGameBoard( gameBoard )
            .filter( c  => c.player === 0 );
    }

    getInitialGameboard() {
        let gameBoard = new Gameboard();

        let initialPlayer = ( x, y ) => {

            if ( ( x === 3 && y === 3 ) || ( x === 4 && y === 4 ) )
                return 1;

            if ( ( x === 3 && y === 4 ) || ( x === 4 && y === 3 ) )
                return 2;

            return 0;

        }

        let cellIsTarget = ( row, col ) => {
            return ( row === 2 && col === 4 ) ||
            ( row === 3 && col === 5 ) ||
            ( row === 4 && col === 2 ) ||
            ( row === 5 && col === 3 );
        }

        const rowNum = 8;
        const colNum = 8;

        for ( let i = 0; i < rowNum; i++ ) {
            let row = [];

            for ( let j = 0; j < colNum; j++ )
                row.push( new Cell( i, j, initialPlayer( i, j ), cellIsTarget( i, j ) ) );

            gameBoard.rows.push( row );
        }

        return gameBoard;
    }



}
