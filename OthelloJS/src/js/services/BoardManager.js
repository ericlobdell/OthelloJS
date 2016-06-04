System.register(['../models/Cell', "../models/Gameboard"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Cell_1, Gameboard_1;
    var BoardManager;
    return {
        setters:[
            function (Cell_1_1) {
                Cell_1 = Cell_1_1;
            },
            function (Gameboard_1_1) {
                Gameboard_1 = Gameboard_1_1;
            }],
        execute: function() {
            BoardManager = (function () {
                function BoardManager() {
                }
                BoardManager.prototype.tryGetCell = function (row, col, gameBoard) {
                    return this.isValidMove(row, col) ?
                        gameBoard.rows[row][col] :
                        null;
                };
                BoardManager.prototype.isValidMove = function (row, col) {
                    return (row > -1 && col > -1) && (row < 8 && col < 8);
                };
                BoardManager.prototype.getFlatGameBoard = function (gameBoard) {
                    return Array.prototype.concat.apply([], gameBoard.rows);
                };
                BoardManager.prototype.getEmptyCells = function (gameBoard) {
                    return this.getFlatGameBoard(gameBoard)
                        .filter(function (c) { return c.player === 0; });
                };
                BoardManager.prototype.getPlayerCells = function (playerNumber, gameBoard) {
                    return this.getFlatGameBoard(gameBoard)
                        .filter(function (c) { return c.player === playerNumber; });
                };
                BoardManager.prototype.getAdjacentCells = function (cell, gameBoard) {
                    var above = this.tryGetCell(cell.row - 1, cell.col, gameBoard);
                    var aboveRight = this.tryGetCell(cell.row - 1, cell.col + 1, gameBoard);
                    var aboveLeft = this.tryGetCell(cell.row - 1, cell.col - 1, gameBoard);
                    var left = this.tryGetCell(cell.row, cell.col - 1, gameBoard);
                    var right = this.tryGetCell(cell.row, cell.col + 1, gameBoard);
                    var below = this.tryGetCell(cell.row + 1, cell.col, gameBoard);
                    var belowRight = this.tryGetCell(cell.row + 1, cell.col + 1, gameBoard);
                    var belowLeft = this.tryGetCell(cell.row + 1, cell.col - 1, gameBoard);
                    return [above, aboveRight, aboveLeft, left, right, below, belowRight, belowLeft]
                        .filter(function (c) { return c !== null; });
                };
                BoardManager.prototype.getOpenAdjacentCells = function (cell, gameBoard) {
                    return this.getAdjacentCells(cell, gameBoard)
                        .filter(function (c) { return c.player === 0; });
                };
                // impure
                BoardManager.prototype.resetTargetCells = function (gameBoard) {
                    this.getFlatGameBoard(gameBoard)
                        .forEach(function (c) { return c.isTarget = false; });
                };
                BoardManager.prototype.getInitialPlayer = function (row, col) {
                    var playerNumber = 0;
                    if ((row === 3 && col === 3) || (row === 4 && col === 4))
                        playerNumber = 1;
                    if ((row === 3 && col === 4) || (row === 4 && col === 3))
                        playerNumber = 2;
                    return playerNumber;
                };
                BoardManager.prototype.cellIsInitialTarget = function (row, col) {
                    return (row === 2 && col === 4) ||
                        (row === 3 && col === 5) ||
                        (row === 4 && col === 2) ||
                        (row === 5 && col === 3);
                };
                BoardManager.prototype.getInitialGameBoard = function (players) {
                    var gameBoard = new Gameboard_1.Gameboard(players);
                    for (var r = 0; r < 8; r++) {
                        var row = [];
                        for (var c = 0; c < 8; c++)
                            row.push(new Cell_1.default(r, c, this.getInitialPlayer(r, c), this.cellIsInitialTarget(r, c)));
                        gameBoard.rows.push(row);
                    }
                    return gameBoard;
                };
                return BoardManager;
            }());
            exports_1("default",new BoardManager());
        }
    }
});
//# sourceMappingURL=BoardManager.js.map