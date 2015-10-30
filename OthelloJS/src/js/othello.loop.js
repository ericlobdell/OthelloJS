/// <reference path="../../typings/jquery/jquery.d.ts" />

( () => {
    let _playerOne = new Player( 1 );
    let _playerTwo = new Player( 2 );
    let _currentPlayer = _playerOne;
    let _otherPlayer = _playerTwo;
    let _players = [_playerOne, _playerTwo];
    let _boardManager = new BoardManager();
    let _gameBoard = _boardManager.getInitialGameboard();
    let _scoreKeeper = new ScoreKeeper( _boardManager );
    let _othello = new Othello( _scoreKeeper );

    let renderGameBoard = () => {
        let html = "";
        _gameBoard.rows.forEach(( row, i ) => {
            row.forEach(( cell, j ) => {
                html += `<div class='cell' title='row: ${cell.row} col: ${cell.col} distance: ${cell.distance} isTarget: ${cell.isTarget}' data-target="${cell.isTarget}" data-is-highest-scoring-move="${cell.isHighestScoring}" data-player-num="${cell.player}" data-row-num='${cell.row}' data-col-num='${cell.col}'>${cell.player}</div>`;
            } );
        } );

        $( ".game-board" ).html( html );
    };

    $( ".game-board" ).on( "click", ".cell", function () {
        let $cell = $( this );
        let isTarget = $cell.data( "target" );

        if ( !isTarget )
            return;

        let row = +$cell.data( "row-num" );
        let col = +$cell.data( "col-num" );

        console.log( `Recording move at row ${row} col ${col}` );
        // calculate points and set cell values
        let hits = _scoreKeeper.setScoreForMove( row, col, _currentPlayer.number, _gameBoard );
        console.log( "Hits: ", hits );

        let pointsEarned = hits.length;

        if ( pointsEarned === 0 )
            return;

        let move = new Move( row, col, pointsEarned, _currentPlayer.number );
        console.log( "Move: ", move );

        _gameBoard.moves.push( move );
        _gameBoard.rows[row][col].player = _currentPlayer.number;
        hits.forEach( h =>  h.player = _currentPlayer.number );

        let nextMoves = _scoreKeeper.nextMovesForPlayer( _otherPlayer.number, _gameBoard );

        renderGameBoard();

        _playerOne.score = _scoreKeeper.getScoreForPlayer( _playerOne.number, _gameBoard );
        _playerTwo.score = _scoreKeeper.getScoreForPlayer( _playerTwo.number, _gameBoard );
        updateScoreBoards( [_playerOne, _playerTwo] );
        _scoreKeeper.resetMoveScoreRatings( _gameBoard );

        let leader = _scoreKeeper.getLeader( _playerOne, _playerTwo );

        if ( nextMoves.length ) {
            console.log( `It's now player ${_otherPlayer.number}'s turn` );
            updateActivePlayer( _currentPlayer.number );
        } else {
            if ( leader )
                console.log( `Game Over! Our winner is player ${leader}` );
            else
                console.log( `Game Over! We have a tie!` );
        }

    } );

    function updateActivePlayer( currentPlayerNumber ) {
        if ( currentPlayerNumber === 1 ) {
            _currentPlayer = _playerTwo;
            _otherPlayer = _playerOne;
        } else {
            _currentPlayer = _playerOne;
            _otherPlayer = _playerTwo;
        }
    }

    function updateScoreBoards( players ) {
        players.forEach( function ( player ) {
            let $playerSoreBoard = $( ".player-" + player.number );

            $( ".player-" + player.number + " .score" ).html( player.score );
            $( ".player-" + player.number + " .moves" ).html( player.moves.length );

            if ( player.number === _currentPlayer.number ) {
                $playerSoreBoard.addClass( "active" );
            } else {
                $playerSoreBoard.removeClass( "active" );
            }

        } );
    }

    renderGameBoard();
    updateScoreBoards( _players );

} )();
