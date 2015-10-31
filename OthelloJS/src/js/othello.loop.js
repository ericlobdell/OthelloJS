
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

    
    let handleOnMove = ( move ) => {
        let pointsEarned = _scoreKeeper.recordMove( move.row, move.col, _currentPlayer.number, _gameBoard );

        if ( pointsEarned ) {
            let nextMoves = _scoreKeeper.nextMovesForPlayer( _otherPlayer.number, _gameBoard );

            _view.renderGameBoard( _gameBoard );

            _playerOne.score = _scoreKeeper.getScoreForPlayer( _playerOne.number, _gameBoard );
            _playerTwo.score = _scoreKeeper.getScoreForPlayer( _playerTwo.number, _gameBoard );
            
            _view.updateScoreBoards( [_playerOne, _playerTwo], _currentPlayer.number );
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
