describe( "Othello.ai", () => {

    var _othello;

    beforeEach(() => {
        _othello = new Othello( new ScoreKeeper() );
    } );

    describe( "sortMovesBypointValue", () => {
        it( "should return moves sorted by pointValue high to low", () => {
            let moves = [{ pointValue: 2 }, { pointValue: 4 }, { pointValue: 2 }, { pointValue: 1 }];
            let expected = [{ pointValue: 4 }, { pointValue: 2 }, { pointValue: 2 }, { pointValue: 1 }];

            let sut = _othello.sortMovesByPointValue( moves );
            expect( sut ).toEqual( expected );
        } );
    } );

    describe( "isCorner", () => {
        it( "should test if move location is in corner position", () => {
            let notCornerMove = { row: 0, col: 3 };
            let cornerMove = { row: 7, col: 0 }

            expect( _othello.isCorner( notCornerMove ) ).toBe( false );
            expect( _othello.isCorner( cornerMove ) ).toBe( true );

        } );
    } );

    describe( "isEdge", () => {
        it( "should test if a move is an edge position", () => {
            let nonEdgeMove = { col: 3, row: 5 };
            let edgeMove = { row: 0, col: 5 };

            expect( _othello.isEdge( nonEdgeMove ) ).toBe( false );
            expect( _othello.isEdge( edgeMove ) ).toBe( true );
        } );
    } );

    describe( "sortMovesByCornerPosition", () => {
        it( "should return moves sorted by pointValue high to low", () => {
            let notCornerMove1 = { row: 0, col: 3 };
            let cornerMove = { row: 7, col: 0 }
            let notCornerMove2 = { row: 4, col: 3 };
            let notCornerMove3 = { row: 5, col: 0 }

            let moves = [notCornerMove2, notCornerMove1, cornerMove, notCornerMove3];


            let sut = _othello.sortMovesByCornerPosition( moves );
            expect( sut[0] ).toEqual( cornerMove );
        } );
    } );

    describe( "getHighestScoringMove", () => {
        it( "should return a move with the highest pointValue", () => {
            let moves = [{ pointValue: 2 }, { pointValue: 4 }, { pointValue: 2 }, { pointValue: 1 }];

            expect( _othello.getHighestScoringMove( moves ) ).toEqual( { pointValue: 4 } );
        } );
    } );

    describe( "makeMove", () => {
        it( "should return the coordinates of the emove it wants to make", () => {
            let moves = [
                { col: 1, row: 1, pointValue: 4 },
                { col: 2, row: 3, pointValue: 3 },
                { col: 1, row: 2, pointValue: 6 }
            ];

            let sut = _othello.makeMove( moves );
            expect( sut )
                .toEqual( { row: jasmine.any( Number ), col: jasmine.any( Number ) } );
        } )
    } );

} );