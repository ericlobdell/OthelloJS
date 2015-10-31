
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
    let gameModes = {
        singlePlayer: 0,
        twoPlayer: 1
    }
    let gameMode = gameModes.singlePlayer;

    let handleOnMove = ( move ) => {
        let pointsEarned = _scoreKeeper.recordMove( move.row, move.col, _currentPlayer.number, _gameBoard );
        
        if ( pointsEarned ) {
            let players = [_playerOne, _playerTwo];
            let nextMoves = _scoreKeeper.nextMovesForPlayer( _otherPlayer.number, _gameBoard );

            _scoreKeeper.setPlayerScores( players, _gameBoard );
            _view.updateScoreBoards( players, _currentPlayer.number );

            _view.renderGameBoard( _gameBoard );
            _scoreKeeper.resetMoveScoreRatings( _gameBoard );

            if ( nextMoves.length ) {
                console.log( `It's now player ${_otherPlayer.number}'s turn` );

                // computer player (inter) actions
                if ( gameMode === gameModes.singlePlayer && _otherPlayer.number === 2 ) {
                    setTimeout(() => {
                        let nextMove = _othello.makeMove( nextMoves );
                        console.log( `Othello is making move at row:${nextMove.row}, col:${nextMove.col}` );

                        handleOnMove( nextMove );

                    }, 2000 );
                }

                updateActivePlayer( _currentPlayer.number );

            } else {
                let leader = _scoreKeeper.getLeader( _playerOne, _playerTwo );
                if ( leader )
                    console.log( `Game Over! Our winner is player ${leader}` );
                else
                    console.log( `Game Over! We have a tie!` );
            }
        }

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
    _view.renderGameBoard( _gameBoard );
    _view.updateScoreBoards( _players, _currentPlayer.number );

} )();
