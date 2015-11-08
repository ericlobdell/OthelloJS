class View {

    constructor () {
        let _this = this;

        this.onMove = new Observable();
        this.loggingEnabled = false;

        $( () => {
            let $shell = $( ".shell" );

            $( ".game-board" ).on( "click", ".cell", function () {
                let $cell = $( this );
                let isTarget = $cell.data( "target" );

                if ( !isTarget )
                    return;

                let row = +$cell.data( "row-num" );
                let col = +$cell.data( "col-num" );

                _this.onMove.notify( { row: row, col: col } );
            } );

            $( ".demo-toolbar" )
                .on( "change", ".show-move-marks", function () {
                    if ( this.checked )
                        $shell.addClass( 'show-marks' );
                    else
                        $shell.removeClass( 'show-marks' );
                } )
                .on( "change", ".show-logging", function () {
                    _this.loggingEnabled = this.checked;

                    if ( this.checked )
                        $shell.addClass( 'show-logging' );
                    else
                        $shell.removeClass( 'show-logging' );

                } );

        } );

    }

    renderGameBoard ( gameBoard, opponentCaptures ) {
        let html = "";
        gameBoard.rows.forEach( row => {
            row.forEach( cell => {
                html += `<div class='cell'
                              title='row: ${cell.row} col: ${cell.col} distance: ${cell.distance} isTarget: ${cell.isTarget}'
                              data-target="${cell.isTarget}"
                              data-distance="${cell.distance}"
                              data-is-highest-scoring-move="${cell.isHighestScoring}"
                              data-player-num="${cell.player}"
                              data-row-num='${cell.row}'
                              data-col-num='${cell.col}'>
                              ${ cell.player ? "<div class='player-game-piece'></div>" : '' }
                         </div>`;
            } );
        } );

        $( ".game-board" ).html( html );

        opponentCaptures
            .map( c => c.distance )
            .filter( ( d, i, uniqueValues ) => uniqueValues.indexOf(d) === i )
            .sort( (d1, d2) => d1 - d2 )
            .forEach( (d, i) => {
                setTimeout( () => {
                    $(`[data-distance='${d}'] .player-game-piece`)
                        .addClass("animated pulse");
                }, 200 * i );
            } );
    }

    updateScoreBoards ( players, currentPlayer ) {
        players.forEach( player => {
            let $playerSoreBoard = $( ".player-" + player.number );

            $( ".player-" + player.number + " .score" ).html( player.score );
            $( ".player-" + player.number + " .moves" ).html( player.moves.length );

            if ( player.number === currentPlayer ) {
                $playerSoreBoard.addClass( "active" );
            } else {
                $playerSoreBoard.removeClass( "active" );
            }

        } );
    }

    updateLogging ( entry ) {

        if ( this.loggingEnabled ) {
            let $log = $( ".logging-container" );

            $log.append( entry );
            $log.animate( { scrollTop: $log.prop( "scrollHeight" ) }, 2000 );
        }

    }

}