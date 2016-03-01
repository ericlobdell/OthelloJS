describe( "Othello.ai", () => {

    var _othello;

    beforeEach(() => {
        _othello = new Othello( new ScoreKeeper() );
    } );

    describe( "sortMovesBypointValue", () => {
        it( "should return moves sorted by pointValue high to low", () => {
            let moves = [{ pointValue: 2 }, { pointValue: 4 }, { pointValue: 2 }, { pointValue: 1 }];
            let expected = [{ pointValue: 4 }, { pointValue: 2 }, { pointValue: 2 }, { pointValue: 1 }];

            let sut = Othello.sortMovesByPointValue( moves );
            expect( sut ).toEqual( expected );
        } );
    } );

    describe( "isCorner", () => {
        it( "should test if move location is in corner position", () => {
            let notCornerMove = { row: 0, col: 3 };
            let cornerMove = { row: 7, col: 0 }

            expect( Othello.isCorner( notCornerMove ) ).toBe( false );
            expect( Othello.isCorner( cornerMove ) ).toBe( true );

        } );
    } );

    describe( "isEdge", () => {
        it( "should test if a move is an edge position", () => {
            let nonEdgeMove = { col: 3, row: 5 };
            let edgeMove = { row: 0, col: 5 };

            expect( Othello.isEdge( nonEdgeMove ) ).toBe( false );
            expect( Othello.isEdge( edgeMove ) ).toBe( true );
        } );
    } );

    describe( "getHighestScoringMove", () => {
        it( "should return a move with the highest pointValue", () => {
            let moves = [{ pointValue: 2 }, { pointValue: 4 }, { pointValue: 2 }, { pointValue: 1 }];

            expect( Othello.getHighestScoringMove( moves ) ).toEqual( { pointValue: 4 } );
        } );
    } );

    describe( "makeMove", () => {
        it( "should return the coordinates of the move it wants to make", () => {
            let moves = [
                { col: 1, row: 1, pointValue: 4 },
                { col: 2, row: 3, pointValue: 3 },
                { col: 1, row: 2, pointValue: 6 }
            ];

            let sut = Othello.makeMove( moves );
            expect( sut )
                .toEqual( {
                    row: jasmine.any( Number ),
                    col: jasmine.any( Number ),
                    basedOn: "highest point value" } );
        } );

        it( "should select a corner position even if it isn't the ehighest scoring move", () => {
            let nonCorner1 = { col: 6, row: 2, pointValue: 4 };
            let nonCorner2 = { col: 1, row: 2, pointValue: 6 };
            let cornerMove = { col: 0, row: 0, pointValue: 3 };

            let sut = Othello.makeMove( [nonCorner1, cornerMove, nonCorner2] );
            expect( sut ).toEqual( {
                row: cornerMove.row,
                col: cornerMove.col,
                basedOn: "corner position available" } );
        } );

        it( "should select an edge position even if it isn't the ehighest scoring move, but nocorner available", () => {
            let nonEdge1 = { col: 6, row: 2, pointValue: 4 };
            let nonEdge2 = { col: 1, row: 2, pointValue: 6 };
            let edgeMove = { col: 4, row: 0, pointValue: 3 };

            let sut = Othello.makeMove( [nonEdge1, edgeMove, nonEdge2] );
            expect( sut ).toEqual( {
                row: edgeMove.row,
                col: edgeMove.col,
                basedOn: "edge position available" } );
        } );

    

    } );

    describe("getRandomIndex", () => {
       it("should return a number between zero and the max number passed", () => {
          let max = 100;

           for(let i = 0; i <= max; i++) {
               let sut = Othello.getRandomIndex(max);
               expect(sut >= 0).toBe(true);
               expect(sut <= max).toBe(true);
           }

       });
    });

    describe("makeRandomMove", () => {
        it( "should select a move at random", () => {
            let nonCorner1 = { col: 6, row: 2, pointValue: 4 };
            let nonCorner2 = { col: 1, row: 2, pointValue: 6 };
            let cornerMove = { col: 0, row: 0, pointValue: 3 };

            let sut = Othello.makeRandomMove( [nonCorner1, cornerMove, nonCorner2] );
            expect( sut )
                .toEqual( {
                    row: jasmine.any( Number ),
                    col: jasmine.any( Number ),
                    basedOn: "random selection" } );
        } );
    });

} );