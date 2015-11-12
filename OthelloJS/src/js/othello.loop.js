(() => {
    let _playerOne = new Player( 1 );
    let _playerTwo = new Player( 2 );
    let _currentPlayer = _playerOne;
    let _otherPlayer = _playerTwo;
    let _players = [ _playerOne, _playerTwo ];
    let _boardManager = new BoardManager();
    let _gameBoard = _boardManager.getInitialGameboard();
    let _scoreKeeper = new ScoreKeeper( _boardManager );
    let _othello = new Othello();
    let _view = new View();

    // manage game modes
    let gameModes = { singlePlayer: 0, twoPlayer: 1, learning: 2 };
    // hard code for now
    let gameMode = gameModes.learning;

    let handleOnMove = ( move ) => {
        let opponentCaptures = _scoreKeeper.recordMove( move.row, move.col, _currentPlayer.number, _gameBoard );
        let pointsEarned = opponentCaptures.length;

        if ( pointsEarned ) {
            let opponentNextMoves = _scoreKeeper.nextMovesForPlayer( _otherPlayer.number, _gameBoard );


            _scoreKeeper.setPlayerScores( _players, _gameBoard );

            _view.renderGameBoard( _gameBoard, opponentCaptures );
            _scoreKeeper.resetMoveScoreRatings( _gameBoard );

            if ( opponentNextMoves.length ) {
                console.log( `It's now player ${_otherPlayer.number}'s turn` );

                // computer player (inter) actions
                if ( isComputerPlayerTurn( gameMode, _otherPlayer ) ) {
                    let otherPlayerNum = _otherPlayer.number;


                    _view.updateLogging( `Player ${otherPlayerNum} is thinking...` );
                    setTimeout( () => {
                        let nextMove = otherPlayerNum === 1 ?
                            _othello.makeRandomMove(opponentNextMoves) :
                            _othello.makeMove( opponentNextMoves );
                        
                        _view.updateLogging( `<p class="p${otherPlayerNum}">Player ${otherPlayerNum} chose row: ${nextMove.row}, col: ${nextMove.col} based on: ${nextMove.basedOn}</p>` );

                        handleOnMove( nextMove );

                    }, 2000 );
                }

                updateActivePlayer( _currentPlayer.number );

            }
            else {
                let currentPlayerNextMoves = _scoreKeeper.nextMovesForPlayer( _currentPlayer.number, _gameBoard );
                _view.renderGameBoard( _gameBoard, opponentCaptures );

                if ( currentPlayerNextMoves.length ) {
                    console.log( `It's still player ${_currentPlayer.number}'s turn` );

                    // computer player (inter) actions
                    if ( isComputerPlayerTurn( gameMode, _otherPlayer ) ) {
                        setTimeout( () => {
                            let otherPlayerNum = _otherPlayer.number;
                            let nextMove = otherPlayerNum === 1 ?
                                _othello.makeRandomMove(currentPlayerNextMoves) :
                                _othello.makeMove( currentPlayerNextMoves );

                            console.log( `Player ${otherPlayerNum} chose row: ${nextMove.row}, col: ${nextMove.col} based on: ${nextMove.basedOn}` );

                            handleOnMove( nextMove );

                        }, 1000 );
                    }

                } else {
                    let leader = _scoreKeeper.getLeader( _playerOne, _playerTwo );
                    if ( leader ) {
                        console.log( `Game Over! Our winner is player ${leader}` );
                        _view.announceWinner( leader );
                    }
                    else
                        console.log( `Game Over! We have a tie!` );
                }
            }

            _view.updateScoreBoards( _players, _currentPlayer.number );
        }

    };

    let isComputerPlayerTurn = ( gameMode, otherPlayer ) => {
        return gameMode === gameModes.learning ||
            ( gameMode === gameModes.singlePlayer && otherPlayer.number === 2 );
    };

    let updateActivePlayer = ( currentPlayerNumber ) => {
        if ( currentPlayerNumber === 1 ) {
            _currentPlayer = _playerTwo;
            _otherPlayer = _playerOne;
        } else {
            _currentPlayer = _playerOne;
            _otherPlayer = _playerTwo;
        }
    };

    _view.onMove.subscribe( handleOnMove );
    _view.renderGameBoard( _gameBoard, [] );
    _view.updateScoreBoards( _players, _currentPlayer.number );

})();
