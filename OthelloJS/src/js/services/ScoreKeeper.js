System.register(["./BoardManager", "../models/Move"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var BoardManager_1, Move_1;
    var ScoreKeeper, RecordMoveResult;
    return {
        setters:[
            function (BoardManager_1_1) {
                BoardManager_1 = BoardManager_1_1;
            },
            function (Move_1_1) {
                Move_1 = Move_1_1;
            }],
        execute: function() {
            ScoreKeeper = (function () {
                function ScoreKeeper() {
                }
                ScoreKeeper.prototype.getMoveCaptures = function (initialRow, initialCol, player, gameBoard) {
                    var hits = [];
                    for (var rowIncrement = -1; rowIncrement <= 1; rowIncrement++)
                        for (var colIncrement = -1; colIncrement <= 1; colIncrement++)
                            if (rowIncrement === 0 && colIncrement === 0)
                                continue;
                            else
                                hits = hits.concat(this.doDirectionalSearch(initialRow, initialCol, rowIncrement, colIncrement, player, gameBoard));
                    return hits;
                };
                ScoreKeeper.prototype.doDirectionalSearch = function (row, col, rowInc, colInc, player, gameBoard) {
                    var cell = BoardManager_1.default.tryGetCell(row + rowInc, col + colInc, gameBoard);
                    return cell !== null ?
                        this.getDirectionalCaptures(cell, rowInc, colInc, player, gameBoard) : [];
                };
                ScoreKeeper.prototype.getDirectionalCaptures = function (initialCell, rowInc, colInc, player, gameBoard) {
                    var _this = this;
                    var captures = [];
                    var getCapturesRecursive = function (r, c) {
                        var cell = BoardManager_1.default.tryGetCell(r, c, gameBoard);
                        if (cell === null)
                            return [];
                        var _a = _this.evaluateCell(cell, player), isEmptyPosition = _a.isEmptyPosition, isOpponentPosition = _a.isOpponentPosition;
                        if (isEmptyPosition) {
                            return [];
                        }
                        else if (isOpponentPosition) {
                            captures.push(cell);
                            return getCapturesRecursive(r + rowInc, c + colInc);
                        }
                        else {
                            return captures;
                        }
                    };
                    return getCapturesRecursive(initialCell.row, initialCell.col);
                };
                ScoreKeeper.prototype.evaluateCell = function (cell, player) {
                    return {
                        isEmptyPosition: cell.player === 0,
                        isOpponentPosition: cell.player !== 0 && cell.player !== player
                    };
                };
                ScoreKeeper.prototype.recordMove = function (row, col, playerNumber, gameBoard, isHighScoring) {
                    var _this = this;
                    var opponentCaptures = this.getMoveCaptures(row, col, playerNumber, gameBoard);
                    var currentMove = new Move_1.default(row, col, opponentCaptures.length, playerNumber, isHighScoring);
                    if (opponentCaptures.length) {
                        gameBoard.moves.push(currentMove);
                        gameBoard.rows[row][col].player = playerNumber;
                        opponentCaptures.forEach(function (c) {
                            c.distance = _this.getHitDistance(currentMove, c.col, c.row);
                            c.player = playerNumber;
                            c.isHit = true;
                        });
                    }
                    return new RecordMoveResult(opponentCaptures);
                };
                ScoreKeeper.prototype.getHitDistance = function (move, col, row) {
                    var rowDiff = Math.abs(row - move.row);
                    var colDiff = Math.abs(col - move.col);
                    return rowDiff || colDiff;
                };
                ScoreKeeper.prototype.getScoreForPlayer = function (playerNumber, gameBoard) {
                    return BoardManager_1.default.getFlatGameBoard(gameBoard)
                        .filter(function (c) { return c.player === playerNumber; })
                        .length;
                };
                ScoreKeeper.prototype.getLeader = function (player1, player2) {
                    if (player1.score > player2.score)
                        return 1;
                    else if (player2.score > player1.score)
                        return 2;
                    else
                        return 0;
                };
                ScoreKeeper.prototype.resetMoveRatings = function (gameBoard) {
                    BoardManager_1.default.getFlatGameBoard(gameBoard)
                        .forEach(function (cell) {
                        cell.isHighestScoring = false;
                        cell.isHit = false;
                        cell.distance = 0;
                    });
                    return gameBoard;
                };
                // impure
                ScoreKeeper.prototype.setPlayerScores = function (players, gameBoard) {
                    var _this = this;
                    players.forEach(function (p) {
                        return p.score = _this.getScoreForPlayer(p.number, gameBoard);
                    });
                };
                ScoreKeeper.prototype.getNextMovesForPlayer = function (playerNumber, gameBoard) {
                    var _this = this;
                    var nextMoves = [];
                    var opponent = playerNumber === 1 ? 2 : 1;
                    var highestPointValue = 0;
                    BoardManager_1.default.resetTargetCells(gameBoard);
                    BoardManager_1.default.getPlayerCells(opponent, gameBoard)
                        .forEach(function (opponentCell) {
                        BoardManager_1.default.getOpenAdjacentCells(opponentCell, gameBoard)
                            .forEach(function (adjacentCell) {
                            var pointsEarned = _this.getMoveCaptures(adjacentCell.row, adjacentCell.col, playerNumber, gameBoard).length;
                            highestPointValue = (highestPointValue > pointsEarned) ? highestPointValue : pointsEarned;
                            if (pointsEarned) {
                                adjacentCell.isTarget = true;
                                adjacentCell.pointValue = pointsEarned;
                                nextMoves.push(adjacentCell);
                            }
                        });
                    });
                    nextMoves.forEach(function (m) { return m.isHighestScoring = m.pointValue === highestPointValue; });
                    return nextMoves;
                };
                return ScoreKeeper;
            }());
            exports_1("default",new ScoreKeeper());
            RecordMoveResult = (function () {
                function RecordMoveResult(captures) {
                    this.captures = captures;
                    this.wasScoringMove = captures.length > 0;
                }
                return RecordMoveResult;
            }());
        }
    }
});
//# sourceMappingURL=ScoreKeeper.js.map