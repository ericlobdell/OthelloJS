(() => {
    const _playerOne = new Player( 1 );
    const _playerTwo = new Player( 2 );
    const _players = [ _playerOne, _playerTwo ];
    const _gameBoard = BoardManager.getInitialGameBoard( _players );
    const _gameModes = { singlePlayer: Symbol(), twoPlayer: Symbol(), learning: Symbol() };

    let _gameMode = null;
    let _currentPlayer = _playerOne;
    let _otherPlayer = _playerTwo;

    View.onMove.subscribe( handleOnMove );
    View.onGameModeSelect.subscribe( handleOnGameModeSelect );

    function handleOnMove ( move ) {
        const opponentCaptures = ScoreKeeper.recordMove( move.row, move.col, _currentPlayer.number, _gameBoard, move.isHighScoring );
        
        if ( opponentCaptures.length ) {
           
            const opponentNextMoves = ScoreKeeper.getNextMovesForPlayer( _otherPlayer.number, _gameBoard );
            ScoreKeeper.setPlayerScores( _players, _gameBoard );

            View.renderGameBoard( _gameBoard, opponentCaptures );

            ScoreKeeper.resetMoveRatings( _gameBoard );

            if ( opponentNextMoves.length ) {
                console.log( `It's now player ${_otherPlayer.number}'s turn` );

                if ( isComputerPlayerTurn() )
                    takeComputerTurn( opponentNextMoves );

            }

            View.updateScoreBoards( _players, _currentPlayer.number );

            updateActivePlayer();

        } else {
            const currentPlayerNextMoves = ScoreKeeper.getNextMovesForPlayer( _currentPlayer.number, _gameBoard );
            View.renderGameBoard( _gameBoard, opponentCaptures );

            if ( currentPlayerNextMoves.length ) {
                console.log( `It's still player ${_currentPlayer.number}'s turn` );

                if ( isComputerPlayerTurn() )
                    takeComputerTurn( currentPlayerNextMoves );

                View.updateScoreBoards( _players, _currentPlayer.number );
            }
            else
                handleEndOfMatch();
        }
        


    }

    function handleOnGameModeSelect ( selectedGameMode ) {
        _gameMode = _gameModes[ selectedGameMode ];

        View.renderGameBoard( _gameBoard, [] );
        View.updateScoreBoards( _players, _currentPlayer.number );

        if ( _gameMode === _gameModes.learning ) {
            const currentPlayerNextMoves = ScoreKeeper.getNextMovesForPlayer( _currentPlayer.number, _gameBoard );
            takeComputerTurn( currentPlayerNextMoves );
        }
    }

    function handleEndOfMatch () {
        const leader = ScoreKeeper.getLeader( _playerOne, _playerTwo );
        View.announceWinner( leader );
    }

    function isComputerPlayerTurn () {
        return _gameMode === _gameModes.learning ||
            ( _gameMode === _gameModes.singlePlayer && _otherPlayer.number === _playerTwo.number );
    }

    function takeComputerTurn ( availableNextMoves ) {
        setTimeout( () => {
            const nextMove = _otherPlayer.number === _playerOne.number ?
                Othello.makeRandomMove( availableNextMoves ) :
                Othello.makeMove( availableNextMoves );

            handleOnMove( nextMove );

        }, 1000 );
    }

    function updateActivePlayer () {
        if ( _currentPlayer.number === _playerOne.number ) {
            _currentPlayer = _playerTwo;
            _otherPlayer = _playerOne;
        } else {
            _currentPlayer = _playerOne;
            _otherPlayer = _playerTwo;
        }
    }

})();
