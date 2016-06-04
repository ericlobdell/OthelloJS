System.register(["../../src/js/services/ScoreKeeper", "../../src/js/models/Cell", "../../src/js/models/Player", "../../src/js/services/BoardManager"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ScoreKeeper_1, Cell_1, Player_1, BoardManager_1;
    var _;
    return {
        setters:[
            function (ScoreKeeper_1_1) {
                ScoreKeeper_1 = ScoreKeeper_1_1;
            },
            function (Cell_1_1) {
                Cell_1 = Cell_1_1;
            },
            function (Player_1_1) {
                Player_1 = Player_1_1;
            },
            function (BoardManager_1_1) {
                BoardManager_1 = BoardManager_1_1;
            }],
        execute: function() {
            _ = null;
            describe("ScoreKeeper", function () {
                var _players = [new Player_1.default(1), new Player_1.default(2)];
                describe("getScoreForPlayer", function () {
                    it("should return the number of cells of the game board occupied by the player", function () {
                        var gb = {
                            moves: [[null]],
                            rows: [
                                [{ player: 1 }, { player: 1 }, { player: 0 }],
                                [{ player: 1 }, { player: 1 }, { player: 0 }],
                                [{ player: 1 }, { player: 0 }, { player: 0 }]
                            ]
                        };
                        var sut = ScoreKeeper_1.default.getScoreForPlayer(1, gb);
                        expect(sut).toBe(5);
                    });
                });
                describe("doDirectionalSearch", function () {
                    it("should return an empty array if passed an invalid cell location", function () {
                        var sut = ScoreKeeper_1.default.doDirectionalSearch(0, 0, 0, 0, 1, {
                            moves: [[null]],
                            rows: [
                                [{ row: -1, col: 1 }]
                            ]
                        });
                        expect(sut).toEqual([]);
                    });
                });
                describe("getHitDistance", function () {
                    it("should set the distance from the cell the move originated", function () {
                        var move = new Cell_1.default(1, 1, _, _);
                        var hitRow = 4;
                        var hitCol = 4;
                        var d = ScoreKeeper_1.default.getHitDistance(move, hitRow, hitCol);
                        expect(d).toBe(3);
                        var hitRow2 = 1;
                        var hitCol2 = 5;
                        var d2 = ScoreKeeper_1.default.getHitDistance(move, hitRow2, hitCol2);
                        expect(d2).toBe(4);
                        var hitRow3 = 3;
                        var hitCol3 = 1;
                        var d3 = ScoreKeeper_1.default.getHitDistance(move, hitRow3, hitCol3);
                        expect(d3).toBe(2);
                    });
                });
                describe("getMoveCaptures", function () {
                    it("should search in all 8 directions for possible points", function () {
                        var gb = BoardManager_1.default.getInitialGameBoard(_players);
                        spyOn(ScoreKeeper_1.default, "doDirectionalSearch");
                        ScoreKeeper_1.default.getMoveCaptures(3, 3, 1, gb);
                        var calls = ScoreKeeper_1.default.doDirectionalSearch.calls;
                        expect(calls.count()).toBe(8);
                        // up and left
                        expect(calls.argsFor(0)[2]).toBe(-1);
                        expect(calls.argsFor(0)[3]).toBe(-1);
                        // up
                        expect(calls.argsFor(1)[2]).toBe(-1);
                        expect(calls.argsFor(1)[3]).toBe(0);
                        // up and right
                        expect(calls.argsFor(2)[2]).toBe(-1);
                        expect(calls.argsFor(2)[3]).toBe(1);
                        // left
                        expect(calls.argsFor(3)[2]).toBe(0);
                        expect(calls.argsFor(3)[3]).toBe(-1);
                        // right
                        expect(calls.argsFor(4)[2]).toBe(0);
                        expect(calls.argsFor(4)[3]).toBe(1);
                        // down and left
                        expect(calls.argsFor(5)[2]).toBe(1);
                        expect(calls.argsFor(5)[3]).toBe(-1);
                        // down
                        expect(calls.argsFor(6)[2]).toBe(1);
                        expect(calls.argsFor(6)[3]).toBe(0);
                        // down and right
                        expect(calls.argsFor(7)[2]).toBe(1);
                        expect(calls.argsFor(7)[3]).toBe(1);
                    });
                    it("should calculate the correct score", function () {
                        var gb = BoardManager_1.default.getInitialGameBoard(_players);
                        var hits = ScoreKeeper_1.default.getMoveCaptures(5, 3, 1, gb);
                        expect(hits.length).toBe(1);
                    });
                });
                describe("getNextMovesForPlayer", function () {
                    it("should return an array of cells that the next player can use as a next move", function () {
                        var gb = BoardManager_1.default.getInitialGameBoard(_players);
                        var sut = ScoreKeeper_1.default.getNextMovesForPlayer(1, gb);
                        expect(sut.length).toBe(4);
                    });
                    it("should mark all cells as isTarget", function () {
                        var gb = BoardManager_1.default.getInitialGameBoard(_players);
                        var nextMoves = ScoreKeeper_1.default.getNextMovesForPlayer(1, gb);
                        nextMoves.forEach(function (m) { return expect(m.isTarget).toBe(true); });
                    });
                });
                describe("getLeader", function () {
                    it("should return the player number of the player with the higher score", function () {
                        var p1 = new Player_1.default(1);
                        var p2 = new Player_1.default(2);
                        p1.score = 10;
                        p2.score = 4;
                        console.log(ScoreKeeper_1.default);
                        var sut = ScoreKeeper_1.default.getLeader(p1, p2);
                        expect(sut).toBe(1);
                    });
                    it("should return zero if scores are equal", function () {
                        var p1 = new Player_1.default(1);
                        var p2 = new Player_1.default(2);
                        p1.score = 10;
                        p2.score = 10;
                        var sut = ScoreKeeper_1.default.getLeader(p1, p2);
                        expect(sut).toBe(0);
                    });
                });
                describe("recordMove", function () {
                });
            });
        }
    }
});
//# sourceMappingURL=ScoreKeeper.spec.js.map