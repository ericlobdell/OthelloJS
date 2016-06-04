System.register(["../../src/js/services/BoardManager", "../../src/js/models/Player"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var BoardManager_1, Player_1;
    return {
        setters:[
            function (BoardManager_1_1) {
                BoardManager_1 = BoardManager_1_1;
            },
            function (Player_1_1) {
                Player_1 = Player_1_1;
            }],
        execute: function() {
            describe("BoardManager", function () {
                var _players = [new Player_1.default(1), new Player_1.default(2)];
                describe("getFlatGameboard", function () {
                    it("should return a matrix as a flat one dimensional array", function () {
                        var gb = {
                            rows: [
                                [1, 2, 3],
                                [4, 5, 6],
                                [7, 8, 9]
                            ],
                            moves: []
                        };
                        console.log(BoardManager_1.default);
                        var expected = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                        expect(BoardManager_1.default.getFlatGameBoard(gb)).toEqual(expected);
                    });
                });
                describe("getEmptyCells", function () {
                    it("should return only the cells of the game board that are unoccupied", function () {
                        var expected = [{ player: 0 }, { player: 0 }, { player: 0 }, { player: 0 }];
                        var gb = {
                            rows: [
                                [{ player: 1 }, { player: 1 }, { player: 0 }],
                                [{ player: 1 }, { player: 1 }, { player: 0 }],
                                [{ player: 1 }, { player: 0 }, { player: 0 }]
                            ],
                            moves: []
                        };
                        var sut = BoardManager_1.default.getEmptyCells(gb);
                        expect(sut.length).toBe(4);
                        expect(sut).toEqual(expected);
                    });
                });
                describe("getInitialGameBoard", function () {
                    it("should return a gameboard with the initial center squares occupied", function () {
                        var gb = BoardManager_1.default.getInitialGameBoard(_players);
                        expect(gb.rows[3][3].player).toBe(1);
                        expect(gb.rows[4][4].player).toBe(1);
                        expect(gb.rows[3][4].player).toBe(2);
                        expect(gb.rows[4][3].player).toBe(2);
                    });
                });
                describe("getiInitialPlayer", function () {
                    it("should return the correct player number for initial positions on gameboard", function () {
                        expect(BoardManager_1.default.getInitialPlayer(3, 3)).toBe(1);
                        expect(BoardManager_1.default.getInitialPlayer(4, 4)).toBe(1);
                        expect(BoardManager_1.default.getInitialPlayer(3, 4)).toBe(2);
                        expect(BoardManager_1.default.getInitialPlayer(4, 3)).toBe(2);
                    });
                });
                describe("cellIsTarget", function () {
                    it("should return true for initial potential moves for player one", function () {
                        expect(BoardManager_1.default.cellIsInitialTarget(2, 4)).toBe(true);
                        expect(BoardManager_1.default.cellIsInitialTarget(4, 2)).toBe(true);
                        expect(BoardManager_1.default.cellIsInitialTarget(3, 5)).toBe(true);
                        expect(BoardManager_1.default.cellIsInitialTarget(5, 3)).toBe(true);
                    });
                });
                describe("resetTargetCells", function () {
                    it("should set isTarget property of all cells to false", function () {
                        var gb = BoardManager_1.default.getInitialGameBoard(_players);
                        expect(BoardManager_1.default.getFlatGameBoard(gb)
                            .some(function (c) { return c.isTarget; }))
                            .toBe(true);
                        BoardManager_1.default.resetTargetCells(gb);
                        expect(BoardManager_1.default.getFlatGameBoard(gb)
                            .some(function (c) { return c.isTarget; }))
                            .toBe(false);
                    });
                });
                describe("getPlayerCells", function () {
                    it("should return an array of cells belonging to the player", function () {
                        var gb = BoardManager_1.default.getInitialGameBoard(_players);
                        var player2Cells = BoardManager_1.default.getPlayerCells(2, gb);
                        expect(player2Cells.length).toBe(2);
                        player2Cells.forEach(function (c) {
                            expect(c.player).toBe(2);
                        });
                    });
                });
                describe("getAdjacentCells", function () {
                    it("should return every cell surrounding the position on the game board", function () {
                        var gb = BoardManager_1.default.getInitialGameBoard(_players);
                        var position1 = gb.rows[4][3];
                        var sut1 = BoardManager_1.default.getAdjacentCells(position1, gb);
                        expect(sut1.length).toBe(8);
                        var position2 = gb.rows[0][0];
                        var sut2 = BoardManager_1.default.getAdjacentCells(position2, gb);
                        expect(sut2.length).toBe(3);
                    });
                });
                describe("getOpenAdjacentCells", function () {
                    it("should return te cells adjacent to the passed cell on the game board", function () {
                        var gb = BoardManager_1.default.getInitialGameBoard(_players);
                        var position1 = gb.rows[4][3];
                        var sut1 = BoardManager_1.default.getOpenAdjacentCells(position1, gb);
                        expect(sut1.length).toBe(5);
                        var position2 = gb.rows[0][0];
                        var sut2 = BoardManager_1.default.getOpenAdjacentCells(position2, gb);
                        expect(sut2.length).toBe(3);
                    });
                });
            });
        }
    }
});
//# sourceMappingURL=BoardManager.spec.js.map