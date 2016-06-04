System.register(["./models/Player", "./othello.view", "./services/ScoreKeeper", "./services/BoardManager", "./othello.ai"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Player_1, othello_view_1, ScoreKeeper_1, BoardManager_1, othello_ai_1;
    var _this, PLAYER_ONE_NUMBER, Loop;
    return {
        setters:[
            function (Player_1_1) {
                Player_1 = Player_1_1;
            },
            function (othello_view_1_1) {
                othello_view_1 = othello_view_1_1;
            },
            function (ScoreKeeper_1_1) {
                ScoreKeeper_1 = ScoreKeeper_1_1;
            },
            function (BoardManager_1_1) {
                BoardManager_1 = BoardManager_1_1;
            },
            function (othello_ai_1_1) {
                othello_ai_1 = othello_ai_1_1;
            }],
        execute: function() {
            PLAYER_ONE_NUMBER = 1;
            Loop = new (function () {
                function loop() {
                    _this = this;
                    this.playerOne = new Player_1.default(1);
                    this.playerTwo = new Player_1.default(2);
                    this.players = [_this.playerOne, _this.playerTwo];
                    this.gameBoard = BoardManager_1.default.getInitialGameBoard(_this.players);
                    this.gameModes = { singlePlayer: 1, twoPlayer: 2, learning: 3 };
                    this.gameMode = null;
                    this.currentPlayer = _this.playerOne;
                    this.otherPlayer = _this.playerTwo;
                    othello_view_1.default.onMove.subscribe(_this.handleOnMove);
                    othello_view_1.default.onGameModeSelect.subscribe(_this.handleOnGameModeSelect);
                }
                loop.prototype.handleOnMove = function (move) {
                    var result = ScoreKeeper_1.default.recordMove(move.row, move.col, _this.currentPlayer.number, _this.gameBoard, move.isHighScoring);
                    if (result.wasScoringMove) {
                        var opponentNextMoves = ScoreKeeper_1.default.getNextMovesForPlayer(_this.otherPlayer.number, _this.gameBoard);
                        ScoreKeeper_1.default.setPlayerScores(_this.players, _this.gameBoard);
                        othello_view_1.default.renderGameBoard(_this.gameBoard, result.captures);
                        ScoreKeeper_1.default.resetMoveRatings(_this.gameBoard);
                        if (opponentNextMoves.length) {
                            if (_this.isComputerPlayerTurn())
                                _this.takeComputerTurn(opponentNextMoves, _this.otherPlayer);
                        }
                        _this.updateActivePlayer();
                        othello_view_1.default.updateScoreBoards(_this.players, _this.currentPlayer.number);
                    }
                    else {
                        var currentPlayerNextMoves = ScoreKeeper_1.default.getNextMovesForPlayer(_this.currentPlayer.number, _this.gameBoard);
                        othello_view_1.default.renderGameBoard(_this.gameBoard, result.captures);
                        if (currentPlayerNextMoves.length) {
                            if (_this.isComputerPlayerTurn())
                                _this.takeComputerTurn(currentPlayerNextMoves, _this.otherPlayer);
                            othello_view_1.default.updateScoreBoards(_this.players, _this.currentPlayer.number);
                        }
                        else
                            _this.handleEndOfMatch();
                    }
                };
                loop.prototype.handleOnGameModeSelect = function (selectedGameMode) {
                    _this.gameMode = _this.gameModes[selectedGameMode];
                    othello_view_1.default.renderGameBoard(_this.gameBoard, []);
                    othello_view_1.default.updateScoreBoards(_this.players, _this.currentPlayer.number);
                    if (_this.gameMode === _this.gameModes.learning) {
                        var currentPlayerNextMoves = ScoreKeeper_1.default.getNextMovesForPlayer(_this.currentPlayer.number, _this.gameBoard);
                        _this.takeComputerTurn(currentPlayerNextMoves, _this.otherPlayer);
                    }
                };
                loop.prototype.handleEndOfMatch = function () {
                    var leader = ScoreKeeper_1.default.getLeader(_this.playerOne, _this.playerTwo);
                    othello_view_1.default.announceWinner(leader);
                };
                loop.prototype.isComputerPlayerTurn = function () {
                    return _this.gameMode === _this.gameModes.learning ||
                        (_this.gameMode === _this.gameModes.singlePlayer && _this.otherPlayer.number === _this.playerTwo.number);
                };
                loop.prototype.takeComputerTurn = function (availableNextMoves, otherPlayer) {
                    setTimeout(function () {
                        var nextMove = otherPlayer.number === PLAYER_ONE_NUMBER ?
                            othello_ai_1.default.makeRandomMove(availableNextMoves) :
                            othello_ai_1.default.makeMove(availableNextMoves);
                        _this.handleOnMove(nextMove);
                    }, 1000);
                };
                loop.prototype.updateActivePlayer = function () {
                    if (_this.currentPlayer.number === _this.playerOne.number) {
                        _this.currentPlayer = _this.playerTwo;
                        _this.otherPlayer = _this.playerOne;
                    }
                    else {
                        _this.currentPlayer = _this.playerOne;
                        _this.otherPlayer = _this.playerTwo;
                    }
                };
                return loop;
            }())();
            exports_1("default",Loop);
        }
    }
});
//# sourceMappingURL=othello.loop.js.map