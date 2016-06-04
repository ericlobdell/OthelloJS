System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Gameboard;
    return {
        setters:[],
        execute: function() {
            Gameboard = (function () {
                function Gameboard(players) {
                    this.rows = [];
                    this.moves = [];
                    this.players = players;
                }
                return Gameboard;
            }());
            exports_1("Gameboard", Gameboard);
        }
    }
});
//# sourceMappingURL=Gameboard.js.map