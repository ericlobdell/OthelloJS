/// <reference path="../../typings/jquery/jquery.d.ts" />

(() => {
    const _playerOne = new Player( 1 );
    const _playerTwo = new Player( 2 );
    let _activePlayer = _playerOne;
    const _players = [ _playerOne, _playerTwo ];
    const _boardManager = new BoardManager();
    const gameBoard = _boardManager.getInitialGameboard();
    const _scoreKeeper = new ScoreKeeper( _boardManager );
    
    let renderGameBoard = () => {
        console.log("rendering game board");
        let html = "";
        gameBoard.rows.forEach( ( row, i ) => {
            row.forEach( ( cell, j ) => {
                html += `<div class='cell' data-target="${cell.isTarget}" data-is-highest-scoring-move="${cell.isHighestScoring}" data-player-num="${cell.player}" data-row-num='${i}' data-col-num='${j}'>${cell.player}</div>`;
            } );
        } );

        $( ".game-board" ).html( html );
    };
    
    $( ".game-board" ).on( "click", ".cell", function () {
        const $cell = $( this );
        const isTarget = $cell.data( "target" );
        if ( !isTarget )
            return;

        const row = +$cell.data( "row-num" );
        const col = +$cell.data( "col-num" );
        const isHighestScoring = $cell.data("is-highest-scoring-move");
        const cellObj = gameBoard.rows[ row ][ col ];
        
        const [ activePlayerNumber, otherPlayerNumber ] = getPlayerNumbers();

        // calculate points and set cell values
        const hits = _scoreKeeper.setScoreForMove( col, row, activePlayerNumber, gameBoard );
        console.log("HITS: ", hits);

        const pointsEarned = hits.length;
        if ( pointsEarned === 0 )
            return;
        const move = new Move( row, col, pointsEarned, activePlayerNumber, isHighestScoring );
        gameBoard.moves.push( move );

        cellObj.player = activePlayerNumber;

        hits.forEach( function ( h ) {
            h.player = activePlayerNumber;
        } );


        // check if next player has any moves based on board state
        // no, declare victory, else continue
        const potentialNextMoves = getPotentialNextMovesForNextPlayer();
        console.log( "Potential Next Moves: ", potentialNextMoves );
        const highestScoringNextMove = potentialNextMoves.sort( ( c1, c2 ) => {
            return c2.pointValue - c1.pointValue;
        } )[ 0 ];
        highestScoringNextMove.isHighestScoring = true;

        updateActivePlayer( otherPlayerNumber );
        renderGameBoard();
        updateScoreBoards( _players );
        _scoreKeeper.resetMoveScoreRatings( gameBoard );

        if ( potentialNextMoves ) {
            console.log( "It's now player %d's turn", otherPlayerNumber );
        } else {
            console.log( "No next moves for player %d", otherPlayerNumber );
        }


    } );

    // Move to Gameboard.get
    function getPotentialNextMovesForNextPlayer() {
        const flatGamBoard = _boardManager.getFlatGameBoard( gameBoard );
        flatGamBoard.forEach( ( cell ) => {
            cell.isTarget = false;
        } );
        const activePlayerCells = flatGamBoard
            .filter( ( cell ) => {
                return cell.player === _activePlayer.number;
            } );
        const potentialNextMoves = [];
        activePlayerCells.forEach( c => {
            const above = _boardManager.tryGetCell( c.col, c.row - 1, gameBoard );
            scoreMove( above, potentialNextMoves );
            const aboveRight = _boardManager.tryGetCell( c.col + 1, c.row - 1, gameBoard );
            scoreMove( aboveRight, potentialNextMoves );
            const aboveLeft = _boardManager.tryGetCell( c.col - 1, c.row - 1, gameBoard );
            scoreMove( aboveLeft, potentialNextMoves );
            const left = _boardManager.tryGetCell( c.col - 1, c.row, gameBoard );
            scoreMove( left, potentialNextMoves );
            const right = _boardManager.tryGetCell( c.col + 1, c.row, gameBoard );
            scoreMove( right, potentialNextMoves );
            const below = _boardManager.tryGetCell( c.col, c.row + 1, gameBoard );
            scoreMove( below, potentialNextMoves );
            const belowRight = _boardManager.tryGetCell( c.col + 1, c.row + 1, gameBoard );
            scoreMove( belowRight, potentialNextMoves );
            const belowLeft = _boardManager.tryGetCell( c.col - 1, c.row + 1, gameBoard );
            scoreMove( belowLeft, potentialNextMoves );
        } );

        return potentialNextMoves;
    }

    function moveEarnsPoints( cell ) {
        const [x,  otherPlayerNumber ] = getPlayerNumbers();
        const hits = _scoreKeeper.setScoreForMove( cell.col, cell.row, otherPlayerNumber, gameBoard );
        const points = hits.length;
        const isHit = cell.player === 0 && points > 0;
        return [ isHit, points ];
    }

    function scoreMove( move, potentialNextMoves ) {
        if ( move === null ) return;
        const [isHit, points] = moveEarnsPoints( move ); 
        if ( isHit ) {
            move.isTarget = true;
            move.pointValue = points;

            if ( potentialNextMoves.indexOf( move ) === -1 )
                potentialNextMoves.push( move );
        }
    }

    function updateActivePlayer( newPlayerNumber ) {
        const playerIndex = newPlayerNumber === 1 ? 0 : 1;
        _activePlayer = _players[ playerIndex ];
    }

    function updateScoreBoards( players ) {
        players.forEach( function ( player ) {
            const $playerSoreBoard = $( ".player-" + player.number );
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
        const otherPlayerIndex = _activePlayer.number === 1 ? 1 : 0;
        return [ _activePlayer.number, _players[ otherPlayerIndex ].number ];
    }

    renderGameBoard();
    updateScoreBoards( _players );
})();
