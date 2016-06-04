System.register(["./models/ObservableEvent", 'jquery'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ObservableEvent_1, jquery_1;
    var View;
    return {
        setters:[
            function (ObservableEvent_1_1) {
                ObservableEvent_1 = ObservableEvent_1_1;
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            }],
        execute: function() {
            View = new (function () {
                function view() {
                    var _this = this;
                    this.onMove = new ObservableEvent_1.default();
                    this.onGameModeSelect = new ObservableEvent_1.default();
                    jquery_1.default(function () {
                        var $shell = jquery_1.default(".shell");
                        jquery_1.default(".game-board").on("click", ".cell", function () {
                            var $cell = jquery_1.default(this);
                            if (!$cell.data("is-target"))
                                return;
                            _this.onMove.notify({
                                row: +$cell.data("row-num"),
                                col: +$cell.data("col-num"),
                                isHighScoring: $cell.data("is-highest-scoring")
                            });
                        });
                        $shell
                            .on("change", ".show-move-marks", function () {
                            if (this.checked)
                                $shell.addClass('show-marks');
                            else
                                $shell.removeClass('show-marks');
                        })
                            .on("change", ".show-logging", function () {
                            if (this.checked)
                                $shell.addClass('show-logging');
                            else
                                $shell.removeClass('show-logging');
                        })
                            .on("click", ".game-mode-button", function () {
                            var mode = jquery_1.default(this).data("game-mode");
                            var $chooseView = jquery_1.default(".choose-game-mode-view");
                            $chooseView.addClass("animated-fast fadeOut");
                            setTimeout(function () {
                                $chooseView.hide();
                                jquery_1.default(".game-view")
                                    .show()
                                    .addClass("animated-fast fadeIn");
                                _this.onGameModeSelect.notify(mode);
                            }, 250);
                        });
                    });
                }
                view.prototype.renderGameBoard = function (gameBoard, opponentCaptures) {
                    var html = "";
                    gameBoard.rows.forEach(function (row) {
                        row.forEach(function (cell) {
                            var cellContents = cell.player ?
                                "<div class='player-game-piece'></div>" : '';
                            html += "<div class='cell'\n                              data-distance=\"" + cell.distance + "\"\n                              data-is-target=\"" + cell.isTarget + "\"\n                              data-is-highest-scoring=\"" + cell.isHighestScoring + "\"\n                              data-player-num=\"" + cell.player + "\"\n                              data-row-num='" + cell.row + "'\n                              data-col-num='" + cell.col + "'>" + cellContents + "</div>";
                        });
                    });
                    jquery_1.default(".game-board").html(html);
                    opponentCaptures
                        .map(function (c) { return c.distance; })
                        .filter(function (d, i, uniqueDistances) { return uniqueDistances.indexOf(d) === i; })
                        .sort(function (d1, d2) { return d1 - d2; })
                        .forEach(function (d, i) {
                        setTimeout(function () {
                            jquery_1.default("[data-distance='" + d + "'] .player-game-piece")
                                .addClass("animated-fast pulse");
                        }, 75 * i);
                    });
                };
                view.prototype.updateScoreBoards = function (players, currentPlayer) {
                    players.forEach(function (player) {
                        var $playerSoreBoard = jquery_1.default(".score-board.player-" + player.number);
                        $playerSoreBoard
                            .find(".score")
                            .html(player.score.toString());
                        if (player.number === currentPlayer)
                            $playerSoreBoard
                                .addClass("active");
                        else
                            $playerSoreBoard
                                .removeClass("active");
                    });
                };
                view.prototype.announceWinner = function (winner) {
                    var $winningScoreBoard;
                    if (winner)
                        $winningScoreBoard = jquery_1.default(".score-board.player-" + winner);
                    else
                        $winningScoreBoard = jquery_1.default(".score-board");
                    $winningScoreBoard.addClass("active animated tada");
                };
                view.prototype.updateLogging = function (entry) {
                    var $log = jquery_1.default(".logging-container");
                    $log.append(entry);
                    $log.animate({ scrollTop: $log.prop("scrollHeight") }, 975);
                };
                return view;
            }())();
            exports_1("default",View);
        }
    }
});
//# sourceMappingURL=othello.view.js.map