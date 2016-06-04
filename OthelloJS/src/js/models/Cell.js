System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Cell;
    return {
        setters:[],
        execute: function() {
            Cell = (function () {
                function Cell(row, col, player, isTarget) {
                    this.row = row;
                    this.col = col;
                    this.player = player;
                    this.isTarget = isTarget;
                    this.distance = 0;
                }
                return Cell;
            }());
            exports_1("default", Cell);
        }
    }
});
//# sourceMappingURL=Cell.js.map