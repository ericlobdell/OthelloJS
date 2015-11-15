(() => {
    let _playerOne = new Player( 1 );
    let _playerTwo = new Player( 2 );
    let _currentPlayer = _playerOne;
    let _otherPlayer = _playerTwo;
    let _players = [ _playerOne, _playerTwo ];
    let _boardManager = new BoardManager();
    let _gameBoard = _boardManager.getInitialGameBoard( _players );
    let _scoreKeeper = new ScoreKeeper( _boardManager );
    let _othello = new Othello();
    let _view = new View();
    let _gameMode = null;
    let _gameModes = { singlePlayer: Symbol(), twoPlayer: Symbol(), learning: Symbol() };

    _view.onMove.subscribe( handleOnMove );
    _view.onGameModeSelect.subscribe( handleOnGameModeSelect );

    function handleOnMove ( move ) {
        let opponentCaptures = _scoreKeeper.recordMove( move.row, move.col, _currentPlayer.number, _gameBoard, move.isHighScoring );
        let opponentNextMoves = _scoreKeeper.getNextMovesForPlayer( _otherPlayer.number, _gameBoard );
        let currentPlayerNextMoves = _scoreKeeper.getNextMovesForPlayer( _currentPlayer.number, _gameBoard );

        _view.renderGameBoard( _gameBoard, opponentCaptures );

        _scoreKeeper.setPlayerScores( _players, _gameBoard );

        _view.updateScoreBoards( _players, _currentPlayer.number );

        _scoreKeeper.resetMoveRatings( _gameBoard );

        if ( opponentNextMoves.length ) {
            console.log( `It's now player ${_otherPlayer.number}'s turn` );

            if ( isComputerPlayerTurn() )
                takeComputerTurn( opponentNextMoves );

            updateActivePlayer();

        }
        else if ( currentPlayerNextMoves.length ) {
            console.log( `It's still player ${_currentPlayer.number}'s turn` );

            if ( isComputerPlayerTurn() )
                takeComputerTurn( currentPlayerNextMoves );
        }
        else
            handleEndOfMatch();

    }

    function handleOnGameModeSelect ( selectedGameMode ) {
        _gameMode = _gameModes[ selectedGameMode ];

        _view.renderGameBoard( _gameBoard, [] );
        _view.updateScoreBoards( _players, _currentPlayer.number );

        if ( _gameMode === _gameModes.learning ) {
            let currentPlayerNextMoves = _scoreKeeper.getNextMovesForPlayer( _currentPlayer.number, _gameBoard );
            takeComputerTurn( currentPlayerNextMoves );
        }
    }

    function handleEndOfMatch () {
        let leader = _scoreKeeper.getLeader( _playerOne, _playerTwo );
        _view.announceWinner( leader );
    }

    function isComputerPlayerTurn () {
        return _gameMode === _gameModes.learning ||
            ( _gameMode === _gameModes.singlePlayer && _otherPlayer.number === _playerTwo.number );
    }

    function takeComputerTurn ( availableNextMoves ) {
        setTimeout( () => {
            let nextMove = _otherPlayer.number === _playerOne.number ?
                _othello.makeRandomMove( availableNextMoves ) :
                _othello.makeMove( availableNextMoves );

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
