
( () => {
    let _playerOne = new Player( 1 );
    let _playerTwo = new Player( 2 );
    let _currentPlayer = _playerOne;
    let _otherPlayer = _playerTwo;
    let _players = [_playerOne, _playerTwo];
    let _boardManager = new BoardManager();
    let _gameBoard = _boardManager.getInitialGameboard();
    let _scoreKeeper = new ScoreKeeper( _boardManager );
    let _othello = new Othello();
    let _view = new View();

    // manage game modes
    let gameModes = { singlePlayer: 0, twoPlayer: 1, learning: 2 };
    // hard code for now
    let gameMode = gameModes.twoPlayer;

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
                    _view.updateLogging( "Othello is thinking..." );
                    setTimeout(() => {
                        let nextMove = _othello.makeMove( opponentNextMoves );

                        _view.updateLogging( `<p>Othello is making move at row:${nextMove.row}, col:${nextMove.col}</p>` );

                        handleOnMove( nextMove );

                    }, 2000 );
                }

                updateActivePlayer( _currentPlayer.number );

            }
            else {
                let currentPlayerNextMoves = _scoreKeeper.nextMovesForPlayer( _currentPlayer.number, _gameBoard );

                if ( currentPlayerNextMoves.length ) {
                    console.log( `It's still player ${_currentPlayer.number}'s turn` );

                    // computer player (inter) actions
                    if ( isComputerPlayerTurn( gameMode, _otherPlayer ) ) {
                        setTimeout(() => {
                            let nextMove = _othello.makeMove( currentPlayerNextMoves );
                            console.log( `Othello is making move at row:${nextMove.row}, col:${nextMove.col}` );

                            handleOnMove( nextMove );

                        }, 1000 );
                    }

                } else {
                    let leader = _scoreKeeper.getLeader( _playerOne, _playerTwo );
                    if ( leader )
                        console.log( `Game Over! Our winner is player ${leader}` );
                    else
                        console.log( `Game Over! We have a tie!` );
                }  
            }

            _view.updateScoreBoards( _players, _currentPlayer.number );
        }

    }

    let isComputerPlayerTurn = ( gameMode, currentPlayer ) => {
        return gameMode === gameModes.learning ||
            ( gameMode === gameModes.singlePlayer && currentPlayer.number === 2 );
    }

    let updateActivePlayer = ( currentPlayerNumber ) => {
        if ( currentPlayerNumber === 1 ) {
            _currentPlayer = _playerTwo;
            _otherPlayer = _playerOne;
        } else {
            _currentPlayer = _playerOne;
            _otherPlayer = _playerTwo;
        }
    }

    _view.onMove.subscribe( handleOnMove );
    _view.renderGameBoard( _gameBoard, [] );
    _view.updateScoreBoards( _players, _currentPlayer.number );

} )();
