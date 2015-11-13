class View {

    constructor () {
        let _this = this;

        this.onMove = new Observable();

        $( () => {
            let $shell = $( ".shell" );

            $( ".game-board" ).on( "click", ".cell", function () {
                let $cell = $( this );
                let isTarget = $cell.data( "target" );
                let isHighScoring = $cell.data("is-highest-scoring-move");

                if ( !isTarget )
                    return;

                let row = +$cell.data( "row-num" );
                let col = +$cell.data( "col-num" );


                _this.onMove.notify( { row: row, col: col, isHighScoring: isHighScoring } );
            } );

            $( ".demo-toolbar" )
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
                              title='row: ${cell.row} col: ${cell.col} distance: ${cell.distance} isTarget: ${cell.isTarget}'
                              data-target="${cell.isTarget}"
                              data-distance="${cell.distance}"
                              data-is-highest-scoring-move="${cell.isHighestScoring}"
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
            let $playerSoreBoard = $( ".player-" + player.number );

            $( ".player-" + player.number + " .score" )
                .html( player.score )
                .addClass(`animated-fast pulse`);

            if ( player.number === currentPlayer )
                $playerSoreBoard
                    .addClass( "active" );
            else
                $playerSoreBoard
                    .removeClass( "active" );

        } );
    }

    announceWinner( playerNumber ) {
        $(`.score-board.player-${ playerNumber }`)
            .addClass("active animated tada");
    }

    updateLogging ( entry ) {
        let $log = $( ".logging-container" );

        $log.append( entry );
        $log.animate( { scrollTop: $log.prop( "scrollHeight" ) }, 975 );
    }

}