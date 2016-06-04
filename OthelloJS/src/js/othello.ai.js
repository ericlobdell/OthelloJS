System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Othello;
    return {
        setters:[],
        execute: function() {
            Othello = (function () {
                function Othello() {
                }
                Othello.prototype.isCorner = function (move) {
                    var corners = [[0, 0], [0, 7], [7, 0], [7, 7]];
                    console.log([corners, move]);
                    return corners.some(function (c) {
                        return c[0] === move.col && c[1] === move.row;
                    });
                };
                Othello.prototype.isEdge = function (move) {
                    return (move.row === 0 || move.row === 7) ||
                        (move.col === 0 || move.col === 7);
                };
                Othello.prototype.getHighestScoringMove = function (moves) {
                    return moves
                        .sort(function (m1, m2) { return m2.pointValue - m1.pointValue; })[0];
                };
                Othello.prototype.makeMove = function (availableMoves) {
                    var _this = this;
                    var reason = "";
                    var cornerMoves = availableMoves
                        .filter(function (m) { return _this.isCorner(m); });
                    var edgeMoves = availableMoves
                        .filter(function (m) { return _this.isEdge(m); });
                    var nextMove;
                    if (cornerMoves.length) {
                        nextMove = this.getHighestScoringMove(cornerMoves);
                        reason = "corner position available";
                    }
                    else if (edgeMoves.length) {
                        nextMove = this.getHighestScoringMove(edgeMoves);
                        reason = "edge position available";
                    }
                    else {
                        nextMove = this.getHighestScoringMove(availableMoves);
                        reason = "highest point value";
                    }
                    return {
                        row: nextMove.row,
                        col: nextMove.col,
                        basedOn: reason
                    };
                };
                Othello.prototype.makeRandomMove = function (availableMoves) {
                    var randomMoveIndex = this.getRandomIndex(availableMoves.length);
                    var randomMove = availableMoves[randomMoveIndex];
                    return {
                        row: randomMove.row,
                        col: randomMove.col,
                        basedOn: "random selection"
                    };
                };
                Othello.prototype.getRandomIndex = function (max) {
                    return Math.floor(Math.random() * max);
                };
                return Othello;
            }());
            exports_1("default",new Othello());
        }
    }
});
//# sourceMappingURL=othello.ai.js.map