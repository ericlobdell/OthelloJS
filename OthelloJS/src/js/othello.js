/// <reference path="../../typings/jquery/jquery.d.ts" />

(() => {
    let _playerOne = new Player( 1 );
    let _playerTwo = new Player( 2 );
    let _activePlayer = _playerOne;
    let _players = [ _playerOne, _playerTwo ];
    let _boardManager = new BoardManager();
    let gameBoard = _boardManager.getInitialGameboard();
    let _scoreKeeper = new ScoreKeeper( _boardManager );
    
    let renderGameBoard = () => {
        let html = "";
        gameBoard.rows.forEach( ( row, i ) => {
            row.forEach( ( cell, j ) => {
                html += `<div class='cell' title='row: ${cell.row} col: ${cell.col} distance: ${cell.distance} isTarget: ${cell.isTarget}' data-target="${cell.isTarget}" data-is-highest-scoring-move="${cell.isHighestScoring}" data-player-num="${cell.player}" data-row-num='${cell.row}' data-col-num='${cell.col}'>${cell.player}</div>`;
            } );
        } );

        $( ".game-board" ).html( html );
    };
    
    $( ".game-board" ).on( "click", ".cell", function () {
        let $cell = $( this );
        let isTarget = $cell.data( "target" );

        //if ( !isTarget )
        //    return;

        let row = +$cell.data( "row-num" );
        let col = +$cell.data( "col-num" );
        

        let [ activePlayerNumber, otherPlayerNumber ] = getPlayerNumbers();

        console.log(`Recording move at row ${row} col ${col}`);
        // calculate points and set cell values
        let hits = _scoreKeeper.setScoreForMove( row, col, activePlayerNumber, gameBoard );
        console.log("Hits: ", hits);

        let pointsEarned = hits.length;

        if ( pointsEarned === 0 )
            return;

        let move = new Move( row, col, pointsEarned, activePlayerNumber );
        console.log("Move: ", move);
        
       
        gameBoard.moves.push( move );
        gameBoard.rows[row][col].player = activePlayerNumber;
        hits.forEach(  h =>  h.player = activePlayerNumber );

        let nextMoves = _scoreKeeper.nextMovesForPlayer( otherPlayerNumber, gameBoard );
        
        updateActivePlayer( otherPlayerNumber );
        renderGameBoard();

        updateScoreBoards( _players );
        _scoreKeeper.resetMoveScoreRatings( gameBoard );

        console.log( `It's now player ${otherPlayerNumber}'s turn` );
    } );

    function updateActivePlayer( newPlayerNumber ) {
        let playerIndex = newPlayerNumber === 1 ? 0 : 1;
        _activePlayer = _players[ playerIndex ];
    }

    function updateScoreBoards( players ) {
        players.forEach( function ( player ) {
            let $playerSoreBoard = $( ".player-" + player.number );
            player.score = _scoreKeeper.getScoreForPlayer( player.number, gameBoard );

            $( ".player-" + player.number + " .score" ).html( player.score );
            $( ".player-" + player.number + " .moves" ).html( player.moves.length );

            if ( player.number === _activePlayer.number ) {
                $playerSoreBoard.addClass( "active" );
            } else {
                $playerSoreBoard.removeClass( "active" );
            }
        } );
    }

    function getPlayerNumbers() {
        let otherPlayerIndex = _activePlayer.number === 1 ? 1 : 0;
        return [ _activePlayer.number, _players[ otherPlayerIndex ].number ];
    }

    renderGameBoard();
    updateScoreBoards( _players );
})();
