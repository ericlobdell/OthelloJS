import Player from "./models/Player";
import { Gameboard } from "./models/Gameboard";
import View from "./othello.view";
import ScoreKeeper from "./services/ScoreKeeper";
import BoardManager from "./services/BoardManager";
import Othello from "./othello.ai";

let _this;
const PLAYER_ONE_NUMBER = 1;

const Loop = new class loop {

    playerOne: Player;
    playerTwo: Player;
    players: Player[];
    gameBoard: Gameboard;
    gameModes: Object
    gameMode: number;
    currentPlayer: Player;
    otherPlayer: Player;

    constructor() {
        _this = this;

        this.playerOne = new Player( 1 );
        this.playerTwo = new Player( 2 );
        this.players = [ _this.playerOne, _this.playerTwo ];
        this.gameBoard = BoardManager.getInitialGameBoard( _this.players );

        this.gameModes = { singlePlayer: 1, twoPlayer: 2, learning: 3 };
        this.gameMode = null;

        this.currentPlayer = _this.playerOne;
        this.otherPlayer = _this.playerTwo;

        View.onMove.subscribe( _this.handleOnMove );
        View.onGameModeSelect.subscribe( _this.handleOnGameModeSelect );
    }

    handleOnMove ( move ) {
        const result = ScoreKeeper.recordMove( move.row, move.col, _this.currentPlayer.number, _this.gameBoard, move.isHighScoring );
        
        if ( result.wasScoringMove ) {
           
            const opponentNextMoves = ScoreKeeper.getNextMovesForPlayer( _this.otherPlayer.number, _this.gameBoard );
            ScoreKeeper.setPlayerScores( _this.players, _this.gameBoard );

            View.renderGameBoard( _this.gameBoard, result.captures );

            ScoreKeeper.resetMoveRatings( _this.gameBoard );

            if ( opponentNextMoves.length ) {

                if ( _this.isComputerPlayerTurn() )
                    _this.takeComputerTurn( opponentNextMoves, _this.otherPlayer );
                 
            }

            _this.updateActivePlayer();
            View.updateScoreBoards( _this.players, _this.currentPlayer.number );

        } else {
            const currentPlayerNextMoves = ScoreKeeper.getNextMovesForPlayer( _this.currentPlayer.number, _this.gameBoard );
            View.renderGameBoard( _this.gameBoard, result.captures );

            if ( currentPlayerNextMoves.length ) {

                if ( _this.isComputerPlayerTurn() )
                    _this.takeComputerTurn( currentPlayerNextMoves, _this.otherPlayer );

                View.updateScoreBoards( _this.players, _this.currentPlayer.number );
            }
            else
                _this.handleEndOfMatch();
        }
        
    }

    handleOnGameModeSelect ( selectedGameMode ) {
        _this.gameMode = _this.gameModes[ selectedGameMode ];

        View.renderGameBoard( _this.gameBoard, [] );
        View.updateScoreBoards( _this.players, _this.currentPlayer.number );

        if ( _this.gameMode === _this.gameModes.learning ) {
            const currentPlayerNextMoves = ScoreKeeper.getNextMovesForPlayer( _this.currentPlayer.number, _this.gameBoard );
            _this.takeComputerTurn( currentPlayerNextMoves, _this.otherPlayer );
        }
    }

    handleEndOfMatch () {
        const leader = ScoreKeeper.getLeader( _this.playerOne, _this.playerTwo );
        View.announceWinner( leader );
    }

    isComputerPlayerTurn () {
        return _this.gameMode === _this.gameModes.learning ||
            ( _this.gameMode === _this.gameModes.singlePlayer && _this.otherPlayer.number === _this.playerTwo.number );
    }

    takeComputerTurn ( availableNextMoves, otherPlayer ) {
        setTimeout( () => {
            const nextMove = otherPlayer.number === PLAYER_ONE_NUMBER ?
                Othello.makeRandomMove( availableNextMoves ) :
                Othello.makeMove( availableNextMoves );

            _this.handleOnMove( nextMove );

        }, 1000 );
    }

    updateActivePlayer () {
        if ( _this.currentPlayer.number === _this.playerOne.number ) {
            _this.currentPlayer = _this.playerTwo;
            _this.otherPlayer = _this.playerOne;
        } else {
            _this.currentPlayer = _this.playerOne;
            _this.otherPlayer = _this.playerTwo;
        }
    }
}();

export default Loop;



