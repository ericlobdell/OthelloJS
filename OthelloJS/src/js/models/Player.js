System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Player;
    return {
        setters:[],
        execute: function() {
            Player = (function () {
                function Player(num) {
                    this.number = num;
                    this.score = 2;
                }
                return Player;
            }());
            exports_1("default", Player);
        }
    }
});
//# sourceMappingURL=Player.js.map