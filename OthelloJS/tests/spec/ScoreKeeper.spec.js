/// <reference path="../lib/jasmine/jasmine.js" />
/// <reference path="D:\repos\JS\OthelloJS\OthelloJS\src/js/models/Move.js" />
/// <reference path="ScoreKeeper.spec.js" />
/// <reference path="BoardManager.spec.js" />

let _ = null;

describe( "ScoreKeeper", () => {
    var _sk, _bm;

    beforeEach(() => {
        _bm = new BoardManager();
        _sk = new ScoreKeeper( _bm );
    } );

    describe( "getScoreForPlayer", () => {
        it( "should return the number of cells of the game board occupied by the player", () => {
            let gb = {
                rows: [
                    [{ player: 1 }, { player: 1 }, { player: 0 }],
                    [{ player: 1 }, { player: 1 }, { player: 0 }],
                    [{ player: 1 }, { player: 0 }, { player: 0 }]
                ]
            };

            let sut = _sk.getScoreForPlayer( 1, gb );
            expect( sut ).toBe( 5 );
        } );
    } );

    describe( "resetMoveScoreRatings", () => {
        it( "should set isHighestScoring property to false on all cells", () => {
            let expected = {
                rows: [
                    [
                        { player: 1, isHighestScoring: false }, { player: 1, isHighestScoring: false }, {
                            player: 0,
                            isHighestScoring: false
                        }
                    ],
                    [
                        { player: 1, isHighestScoring: false }, { player: 1, isHighestScoring: false }, {
                            player: 0,
                            isHighestScoring: false
                        }
                    ],
                    [
                        { player: 1, isHighestScoring: false }, { player: 0, isHighestScoring: false }, {
                            player: 0,
                            isHighestScoring: false
                        }
                    ]
                ]
            };
            let gb = {
                rows: [
                    [{ player: 1, isHighestScoring: true }, { player: 1 }, { player: 0 }],
                    [{ player: 1 }, { player: 1 }, { player: 0 }],
                    [{ player: 1 }, { player: 0 }, { player: 0 }]
                ]
            };
            let sut = _sk.resetMoveScoreRatings( gb );
            expect( sut ).toEqual( expected );
        } );
    } );

    describe( "checkCell", () => {
        it( "should return an object with the results from scoring that location for player", () => {
            var sut = _sk.checkCell( { player: 2, row: 2, col: 1 }, 1 );
            let expected = {
                isValidMove: true,
                isEmpty: false,
                isPoint: true
            };
            expect( sut ).toEqual( expected );

        } );

        it( "should return false for valid move if coords are out of bounds", () => {
            let sut = _sk.checkCell( { player: 2, row: 8, col: 1 }, 1 );
            let expected = {
                isValidMove: false,
                isEmpty: false,
                isPoint: false
            };
            expect( sut ).toEqual( expected );

            var sut2 = _sk.checkCell( { player: 2, row: 1, col: -1 }, 1 );

            expect( sut2 ).toEqual( expected );
        } );
    } );

    describe( "searchAt", () => {
        it( "should return an empty array if passed an invalid cell location", () => {
            var sut = _sk.searchAt( 0, 0, 0, 0, 1, {
                rows: [
                    [{ row: -1, col: 1 }]
                ]
            } );

            expect( sut ).toEqual( [] );
        } );
    } );

    describe("getHitDistance", () => {
        it("should set the distance from the cell the move originated", () => {
            let move = new Cell( 1, 1, _, _);
            let hitRow = 4;
            let hitCol = 4;
            let d = _sk.getHitDistance( move, hitRow, hitCol );

            expect( d ).toBe(3);

            let hitRow2 = 1;
            let hitCol2 = 5;
            let d2 = _sk.getHitDistance( move, hitRow2, hitCol2 );

            expect(d2).toBe(4);

            let hitRow3 = 3;
            let hitCol3 = 1;
            let d3 = _sk.getHitDistance( move, hitRow3, hitCol3 );

            expect(d3).toBe(2);



        });

    });

    describe( "setScoreForMove", () => {
        it( "should search in all 8 directions for possible points", () => {
            let gb = _bm.getInitialGameboard();

            spyOn( _sk, "searchAt" );

            _sk.setScoreForMove( 3, 3, 1, gb );
            let calls = _sk.searchAt.calls;

            expect( calls.count() ).toBe( 8 );

            // up and left
            expect( calls.argsFor( 0 )[2] ).toBe( -1 );
            expect( calls.argsFor( 0 )[3] ).toBe( -1 );

            // up
            expect( calls.argsFor( 1 )[2] ).toBe( -1 );
            expect( calls.argsFor( 1 )[3] ).toBe( 0 );

            // up and right
            expect( calls.argsFor( 2 )[2] ).toBe( -1 );
            expect( calls.argsFor( 2 )[3] ).toBe( 1 );

            // left
            expect( calls.argsFor( 3 )[2] ).toBe( 0 );
            expect( calls.argsFor( 3 )[3] ).toBe( -1 );

            // right
            expect( calls.argsFor( 4 )[2] ).toBe( 0 );
            expect( calls.argsFor( 4 )[3] ).toBe( 1 );

            // down and left
            expect( calls.argsFor( 5 )[2] ).toBe( 1 );
            expect( calls.argsFor( 5 )[3] ).toBe( -1 );

            // down
            expect( calls.argsFor( 6 )[2] ).toBe( 1 );
            expect( calls.argsFor( 6 )[3] ).toBe( 0 );

            // down and right
            expect( calls.argsFor( 7 )[2] ).toBe( 1 );
            expect( calls.argsFor( 7 )[3] ).toBe( 1 );
        } );

        it( "should calculate the correct score", () => {
            let gb = _bm.getInitialGameboard();
            let hits = _sk.setScoreForMove( 5, 3, 1, gb );
            expect(hits.length).toBe(1);

        } );

    } );

    describe("nextMovesForPlayer", () => {
        it("should return an array of cells that the next player can use as a next move", () => {
            let gb = _bm.getInitialGameboard();

            let sut = _sk.nextMovesForPlayer( 1, gb );

            expect( sut.length ).toBe( 4 );
        } );

        it( "should mark all cells as isTarget", () => {
            let gb = _bm.getInitialGameboard();

            let nextMoves = _sk.nextMovesForPlayer( 1, gb );

            nextMoves.forEach(
                m => expect( m.isTarget ).toBe( true ) );
        } );
    } );

    describe( "getLeader", () => {
        it( "should return the player number of the player with the higher score", () => {
            let p1 = new Player( 1 );
            let p2 = new Player( 2 );

            p1.score = 10;
            p2.score = 4;

            let sut = _sk.getLeader( p1, p2 );
            expect( sut ).toBe( 1 );
        } );

        it( "should return zero if scores are equal", () => {
            let p1 = new Player( 1 );
            let p2 = new Player( 2 );

            p1.score = 10;
            p2.score = 10;

            let sut = _sk.getLeader( p1, p2 );
            expect( sut ).toBe( 0 );
        } );

    } );

    describe( "recordMove", () => {
        it( "should return a falsy value for a non-scoring move", function () {
            let gb = _bm.getInitialGameboard();

            expect( _sk.recordMove( 0, 0, 1, gb ) ).toBeFalsy();
        } );

        it( "should return the point value for a scoring move", () => {
            let gb = _bm.getInitialGameboard();

            expect( _sk.recordMove( 5, 3, 1, gb ) ).toBe(1);
        } );
    } );
} );


