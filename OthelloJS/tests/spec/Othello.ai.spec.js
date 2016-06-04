System.register(["../../src/js/othello.ai", '../../src/js/models/Move', '../mocks/MockDataBuilder'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var othello_ai_1, Move_1, MockDataBuilder_1;
    return {
        setters:[
            function (othello_ai_1_1) {
                othello_ai_1 = othello_ai_1_1;
            },
            function (Move_1_1) {
                Move_1 = Move_1_1;
            },
            function (MockDataBuilder_1_1) {
                MockDataBuilder_1 = MockDataBuilder_1_1;
            }],
        execute: function() {
            describe("Othello.ai", function () {
                var moveBuilder;
                beforeEach(function () {
                    moveBuilder = new MockDataBuilder_1.default(Move_1.default);
                });
                describe("isCorner", function () {
                    it("should test if move location is in corner position", function () {
                        var notCornerMove = moveBuilder
                            .setRow(1)
                            .setCol(1)
                            .build();
                        var cornerMove = moveBuilder
                            .setRow(7)
                            .setCol(0)
                            .build();
                        expect(othello_ai_1.default.isCorner(notCornerMove)).toBe(false);
                        expect(othello_ai_1.default.isCorner(cornerMove)).toBe(true);
                    });
                });
                describe("isEdge", function () {
                    it("should test if a move is an edge position", function () {
                        var nonEdgeMove = moveBuilder
                            .setRow(3)
                            .setCol(5)
                            .build();
                        var edgeMove = moveBuilder
                            .setRow(0)
                            .setCol(5)
                            .build();
                        expect(othello_ai_1.default.isEdge(nonEdgeMove)).toBe(false);
                        expect(othello_ai_1.default.isEdge(edgeMove)).toBe(true);
                    });
                });
                describe("getHighestScoringMove", function () {
                    it("should return a move with the highest pointValue", function () {
                        var m1 = moveBuilder.setPointValue(2).build();
                        var m2 = moveBuilder.setPointValue(4).build();
                        var m3 = moveBuilder.setPointValue(2).build();
                        var m4 = moveBuilder.setPointValue(1).build();
                        var moves = [m1, m2, m3, m4];
                        expect(othello_ai_1.default.getHighestScoringMove(moves)).toEqual(m2);
                    });
                });
                describe("makeMove", function () {
                    it("should return the coordinates of the move it wants to make", function () {
                        var m1 = moveBuilder
                            .setRow(1)
                            .setCol(1)
                            .setPointValue(4)
                            .build();
                        var m2 = moveBuilder
                            .setRow(3)
                            .setCol(2)
                            .setPointValue(3)
                            .build();
                        var m3 = moveBuilder
                            .setRow(2)
                            .setCol(1)
                            .setPointValue(6)
                            .build();
                        var moves = [m1, m2, m3];
                        var sut = othello_ai_1.default.makeMove(moves);
                        expect(sut)
                            .toEqual({
                            row: jasmine.any(Number),
                            col: jasmine.any(Number),
                            basedOn: "highest point value" });
                    });
                    it("should select a corner position even if it isn't the highest scoring move", function () {
                        var nonCorner1 = moveBuilder
                            .setRow(2)
                            .setCol(6)
                            .setPointValue(4)
                            .build();
                        var nonCorner2 = moveBuilder
                            .setRow(2)
                            .setCol(1)
                            .setPointValue(6)
                            .build();
                        var cornerMove = moveBuilder
                            .setRow(0)
                            .setCol(0)
                            .setPointValue(3)
                            .build();
                        var sut = othello_ai_1.default.makeMove([nonCorner1, cornerMove, nonCorner2]);
                        expect(sut).toEqual({
                            row: cornerMove.row,
                            col: cornerMove.col,
                            basedOn: "corner position available" });
                    });
                    it("should select an edge position even if it isn't the highest scoring move, but no corner available", function () {
                        var nonEdge1 = moveBuilder
                            .setRow(2)
                            .setCol(6)
                            .setPointValue(4)
                            .build();
                        var nonEdge2 = moveBuilder
                            .setRow(2)
                            .setCol(1)
                            .setPointValue(6)
                            .build();
                        var edgeMove = moveBuilder
                            .setRow(0)
                            .setCol(4)
                            .setPointValue(3)
                            .build();
                        var sut = othello_ai_1.default.makeMove([nonEdge1, edgeMove, nonEdge2]);
                        expect(sut).toEqual({
                            row: edgeMove.row,
                            col: edgeMove.col,
                            basedOn: "edge position available" });
                    });
                });
                describe("getRandomIndex", function () {
                    it("should return a number between zero and the max number passed", function () {
                        var max = 100;
                        for (var i = 0; i <= max; i++) {
                            var sut = othello_ai_1.default.getRandomIndex(max);
                            expect(sut >= 0).toBe(true);
                            expect(sut <= max).toBe(true);
                        }
                    });
                });
                describe("makeRandomMove", function () {
                    it("should select a move at random", function () {
                        var nonCorner1 = moveBuilder
                            .setRow(2)
                            .setCol(6)
                            .setPointValue(4)
                            .build();
                        var nonCorner2 = moveBuilder
                            .setRow(2)
                            .setCol(1)
                            .setPointValue(6)
                            .build();
                        var cornerMove = moveBuilder
                            .setRow(0)
                            .setCol(0)
                            .setPointValue(3)
                            .build();
                        var sut = othello_ai_1.default.makeRandomMove([nonCorner1, cornerMove, nonCorner2]);
                        expect(sut)
                            .toEqual({
                            row: jasmine.any(Number),
                            col: jasmine.any(Number),
                            basedOn: "random selection" });
                    });
                });
            });
        }
    }
});
//# sourceMappingURL=Othello.ai.spec.js.map