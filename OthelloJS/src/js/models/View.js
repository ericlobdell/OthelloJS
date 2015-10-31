
class View {

    constructor() {
        let _this = this;

        this.onMove = new Observable();

        $(() => {
            $( ".game-board" ).on( "click", ".cell", function () {
                let $cell = $( this );
                let isTarget = $cell.data( "target" );

                if ( !isTarget )
                    return;

                let row = +$cell.data( "row-num" );
                let col = +$cell.data( "col-num" );

                console.log( "notifying!" );
                _this.onMove.notify( { row: row, col: col } );
            } );
        } );
        
    }

    renderGameBoard( gameBoard ) {
        console.log( "Rendering: ", gameBoard );
        let html = "";
        gameBoard.rows.forEach( row => {
            row.forEach( cell => {
                html += `<div class='cell' title='row: ${cell.row} col: ${cell.col} distance: ${cell.distance} isTarget: ${cell.isTarget}' data-target="${cell.isTarget}" data-is-highest-scoring-move="${cell.isHighestScoring}" data-player-num="${cell.player}" data-row-num='${cell.row}' data-col-num='${cell.col}'>${cell.player}</div>`;
            } );
        } );

        $( ".game-board" ).html( html );
    }

    updateScoreBoards( players, currentPlpayer ) {
        players.forEach( function ( player ) {
            let $playerSoreBoard = $( ".player-" + player.number );

            $( ".player-" + player.number + " .score" ).html( player.score );
            $( ".player-" + player.number + " .moves" ).html( player.moves.length );

            if ( player.number === currentPlpayer ) {
                $playerSoreBoard.addClass( "active" );
            } else {
                $playerSoreBoard.removeClass( "active" );
            }

        } );
    }

}