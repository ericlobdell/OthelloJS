class View {

    constructor () {
        let _this = this;

        this.onMove = new ObservableEvent();
        this.onGameModeSelect = new ObservableEvent();

        $( () => {
            let $shell = $( ".shell" );

            $( ".game-board" ).on( "click", ".cell", function () {
                let $cell = $( this );

                if ( !$cell.data( "is-target" ) )
                    return;

                _this.onMove.notify( {
                    row: +$cell.data( "row-num" ),
                    col: +$cell.data( "col-num" ),
                    isHighScoring: $cell.data( "is-highest-scoring" )
                } );

            } );

            $shell
                .on( "change", ".show-move-marks", function () {
                    if ( this.checked )
                        $shell.addClass( 'show-marks' );
                    else
                        $shell.removeClass( 'show-marks' );
                } )
                .on( "change", ".show-logging", function () {
                    if ( this.checked )
                        $shell.addClass( 'show-logging' );
                    else
                        $shell.removeClass( 'show-logging' );

                } )
                .on( "click", ".game-mode-button", function () {
                    let mode = $( this ).data( "game-mode" );
                    let $chooseView = $( ".choose-game-mode-view" );

                    $chooseView.addClass( "animated-fast fadeOut" );

                    setTimeout( () => {
                        $chooseView.hide();
                        $( ".game-view" )
                            .show()
                            .addClass( "animated-fast fadeIn" );

                        _this.onGameModeSelect.notify( mode );
                    }, 250 );

                } );

        } );

    }

    renderGameBoard ( gameBoard, opponentCaptures ) {
        let html = "";

        gameBoard.rows.forEach( row => {
            row.forEach( cell => {

                let cellContents = cell.player ?
                    `<div class='player-game-piece'></div>` : '';

                html += `<div class='cell'
                              data-distance="${cell.distance}"
                              data-is-target="${cell.isTarget}"
                              data-is-highest-scoring="${cell.isHighestScoring}"
                              data-player-num="${cell.player}"
                              data-row-num='${cell.row}'
                              data-col-num='${cell.col}'>${ cellContents }</div>`;
            } );
        } );

        $( ".game-board" ).html( html );

        opponentCaptures
            .map( c => c.distance )
            .filter( ( d, i, uniqueDistances ) => uniqueDistances.indexOf( d ) === i )
            .sort( ( d1, d2 ) => d1 - d2 )
            .forEach( ( d, i ) => {
                setTimeout( () => {
                    $( `[data-distance='${d}'] .player-game-piece` )
                        .addClass( `animated-fast pulse` );
                }, 75 * i );
            } );
    }

    updateScoreBoards ( players, currentPlayer ) {
        players.forEach( player => {
            let $playerSoreBoard = $( ".score-board.player-" + player.number );

            $playerSoreBoard
                .find( ".score" )
                .html( player.score );

            if ( player.number === currentPlayer )
                $playerSoreBoard
                    .addClass( "active" );
            else
                $playerSoreBoard
                    .removeClass( "active" );

        } );
    }

    announceWinner ( winner ) {
        var $winningScoreBoard;

        if ( winner )
            $winningScoreBoard = $( `.score-board.player-${ winner }` );
        else
            $winningScoreBoard = $( `.score-board` );

        $winningScoreBoard.addClass( "active animated tada" );
    }

    updateLogging ( entry ) {
        let $log = $( ".logging-container" );

        $log.append( entry );
        $log.animate( { scrollTop: $log.prop( "scrollHeight" ) }, 975 );
    }

}