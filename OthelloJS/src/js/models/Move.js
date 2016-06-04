System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Move;
    return {
        setters:[],
        execute: function() {
            Move = (function () {
                function Move(row, col, points, playerId, isHighestScoring) {
                    if (isHighestScoring === void 0) { isHighestScoring = false; }
                    this.col = col;
                    this.row = row;
                    this.pointValue = points;
                    this.player = playerId;
                    this.isHighestScoring = isHighestScoring;
                }
                return Move;
            }());
            exports_1("default", Move);
        }
    }
});
//# sourceMappingURL=Move.js.map