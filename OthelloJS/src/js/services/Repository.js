System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Repository;
    return {
        setters:[],
        execute: function() {
            Repository = (function () {
                function Repository() {
                    this.snapshots = [];
                }
                Repository.prototype.recordMove = function (data) {
                    var snapshot = this.getSnapshotPattern(data.gameBoard);
                    this.snapshots.push(snapshot);
                    data.snapShots = this.snapshots;
                };
                Repository.prototype.getSnapshotPattern = function (gameboard) {
                    return gameboard.moves.reduce(function (pattern, move) {
                        return pattern + (move.col + "-" + move.row + "-" + move.player + "-" + (+move.isHighestScoring || 0) + ",");
                    }, "");
                };
                return Repository;
            }());
            exports_1("default", Repository);
        }
    }
});
//# sourceMappingURL=Repository.js.map