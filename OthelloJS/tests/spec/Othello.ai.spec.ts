import Othello from "../../src/js/othello.ai";
import Move from '../../src/js/models/Move';
import MockDataBuilder from '../mocks/MockDataBuilder';

describe( "Othello.ai", () => {
    let moveBuilder;

    beforeEach(() => {
        moveBuilder = new MockDataBuilder( Move );
    });

    describe( "isCorner", () => {
        it( "should test if move location is in corner position", () => {
            const notCornerMove = moveBuilder
                .setRow( 1 )
                .setCol( 1 )
                .build();

            const cornerMove = moveBuilder
                .setRow( 7 )
                .setCol( 0 )
                .build();

            expect( Othello.isCorner( notCornerMove ) ).toBe( false );
            expect( Othello.isCorner( cornerMove ) ).toBe( true );

        } );
    } );

    describe( "isEdge", () => {
        it( "should test if a move is an edge position", () => {
            const nonEdgeMove = moveBuilder
                .setRow( 3 )
                .setCol( 5 )
                .build();
            const edgeMove = moveBuilder
                .setRow( 0)
                .setCol( 5 )
                .build();

            expect( Othello.isEdge( nonEdgeMove ) ).toBe( false );
            expect( Othello.isEdge( edgeMove ) ).toBe( true );
        } );
    } );

    describe( "getHighestScoringMove", () => {
        it( "should return a move with the highest pointValue", () => {
            const m1 = moveBuilder.setPointValue( 2 ).build();
            const m2 = moveBuilder.setPointValue( 4 ).build();
            const m3 = moveBuilder.setPointValue( 2 ).build();
            const m4 = moveBuilder.setPointValue( 1 ).build();

            const moves = [m1, m2, m3, m4];

            expect( Othello.getHighestScoringMove( moves ) ).toEqual( m2 );
        } );
    } );

    describe( "makeMove", () => {
        it( "should return the coordinates of the move it wants to make", () => {
            const m1 = moveBuilder
                .setRow( 1 )
                .setCol(1)
                .setPointValue( 4 )
                .build();

            const m2 = moveBuilder
                .setRow( 3 )
                .setCol( 2 )
                .setPointValue( 3 )
                .build();

            const m3 = moveBuilder
                .setRow( 2 )
                .setCol( 1 )
                .setPointValue( 6 )
                .build();

            const moves = [m1, m2, m3];

            const sut = Othello.makeMove( moves );
            expect( sut )
                .toEqual( {
                    row: jasmine.any( Number ),
                    col: jasmine.any( Number ),
                    basedOn: "highest point value" } );
        } );

        it( "should select a corner position even if it isn't the highest scoring move", () => {
            const nonCorner1 = moveBuilder
                .setRow( 2 )
                .setCol( 6 )
                .setPointValue( 4 )
                .build();

            const nonCorner2 = moveBuilder
                .setRow( 2 )
                .setCol( 1 )
                .setPointValue( 6 )
                .build();

            const cornerMove = moveBuilder
                .setRow( 0 )
                .setCol( 0 )
                .setPointValue( 3 )
                .build();

            const sut = Othello.makeMove( [nonCorner1, cornerMove, nonCorner2] );
            expect( sut ).toEqual( {
                row: cornerMove.row,
                col: cornerMove.col,
                basedOn: "corner position available" } );
        } );

        it( "should select an edge position even if it isn't the highest scoring move, but no corner available", () => {
            const nonEdge1 = moveBuilder
                .setRow( 2 )
                .setCol( 6 )
                .setPointValue( 4 )
                .build();

            const nonEdge2 = moveBuilder
                .setRow( 2 )
                .setCol( 1 )
                .setPointValue( 6 )
                .build();

            const edgeMove = moveBuilder
                .setRow( 0 )
                .setCol( 4 )
                .setPointValue( 3 )
                .build();

            const sut = Othello.makeMove( [nonEdge1, edgeMove, nonEdge2] );
            expect( sut ).toEqual( {
                row: edgeMove.row,
                col: edgeMove.col,
                basedOn: "edge position available" } );
        } );
    } );

    describe("getRandomIndex", () => {
       it("should return a number between zero and the max number passed", () => {
          const max = 100;

           for(let i = 0; i <= max; i++) {
               const sut = Othello.getRandomIndex(max);
               expect(sut >= 0).toBe(true);
               expect(sut <= max).toBe(true);
           }
       });
    });

    describe("makeRandomMove", () => {
        it( "should select a move at random", () => {
            const nonCorner1 = moveBuilder
                .setRow( 2 )
                .setCol( 6 )
                .setPointValue( 4 )
                .build();

            const nonCorner2 = moveBuilder
                .setRow( 2 )
                .setCol( 1 )
                .setPointValue( 6 )
                .build();

            const cornerMove = moveBuilder
                .setRow( 0 )
                .setCol( 0 )
                .setPointValue( 3 )
                .build();

            let sut = Othello.makeRandomMove( [nonCorner1, cornerMove, nonCorner2] );
            expect( sut )
                .toEqual( {
                    row: jasmine.any( Number ),
                    col: jasmine.any( Number ),
                    basedOn: "random selection" } );
        } );
    });

} );