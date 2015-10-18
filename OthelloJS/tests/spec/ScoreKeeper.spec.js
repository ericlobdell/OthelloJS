const _ = null;

describe( "ScoreKeeper", () => {
    var _sk, _bm;

    beforeEach(() => {
        _bm = new BoardManager();
        _sk = new ScoreKeeper( _bm );
    } );

    describe( "getScoreForPlayer", () => {
        it( "should return the number of cells of the game board occupied by the player", () => {
            const gb = {
                rows: [
                    [{ player: 1 }, { player: 1 }, { player: 0 }],
                    [{ player: 1 }, { player: 1 }, { player: 0 }],
                    [{ player: 1 }, { player: 0 }, { player: 0 }]
                ]
            };

            const sut = _sk.getScoreForPlayer( 1, gb );
            expect( sut ).toBe( 5 );
        } );
    } );

    describe( "resetMoveScoreRatings", () => {
        it( "should set isHighestScoring property to false on all cells", () => {
            const expected = {
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
            const gb = {
                rows: [
                    [{ player: 1, isHighestScoring: true }, { player: 1 }, { player: 0 }],
                    [{ player: 1 }, { player: 1 }, { player: 0 }],
                    [{ player: 1 }, { player: 0 }, { player: 0 }]
                ]
            };
            const sut = _sk.resetMoveScoreRatings( gb );
            expect( sut ).toEqual( expected );
        } );
    } );

    describe( "checkCell", () => {
        it( "should return an object with the results from scoring that location for player", () => {
            var sut = _sk.checkCell( { player: 2, row: 2, col: 1 }, 1 );
            const expected = {
                isValidMove: true,
                isEmpty: false,
                isPoint: true
            };
            expect( sut ).toEqual( expected );

        } );

        it( "should return false for valid move if coords are out of bounds", () => {
            const sut = _sk.checkCell( { player: 2, row: 8, col: 1 }, 1 );
            const expected = {
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

    describe("setHitDistance", () => {
        it("should set the distance from the cell the move originated", () => {
            const move = new Cell( 1, 1, _, _);
            const hitRow = 3;
            const hitCol = 4;
            _sk.setHitDistance( move, hitRow, hitCol );
            expect(move.distance).toBe(5);
        });

    });

    describe( "setScoreForMove", () => {
        it( "should search in all 8 directions for possible points", () => {
            const gb = [[], [], [], [], [], [], [], []];

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
            const gb = _bm.getInitialGameboard();
            const hits = _sk.setScoreForMove( 5, 3, 1, gb );
            expect(hits.length).toBe(1);

        } );

        it("should mark the appropriate cell(s) with player number", () => {
            const gb = _bm.getInitialGameboard();
            const hits = _sk.setScoreForMove( 5, 3, 1, gb );
            const sut = gb.rows[4][3].player;

            expect(sut).toBe(1);
        });
    } );

    describe("nextMovesForPlayer", () => {
        it("should return an array of cells that the next player can use as a next move", () => {
            const gb = _bm.getInitialGameboard();

            const sut = _sk.nextMovesForPlayer( 1, gb );

            expect( sut.length ).toBe( 4 );


        });
    });
} );


