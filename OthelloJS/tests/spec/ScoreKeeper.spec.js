
describe( "ScoreKeeper", () => {
    var _sk, _bm;

    beforeEach( () => {
        _bm = new BoardManager();
        _sk = new ScoreKeeper(_bm);
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
        it("should set isHighestScoring property to false on all cells", () => {
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
            const sut = _sk.resetMoveScoreRatings(gb);
            expect(sut).toEqual(expected);
        });
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
} );
