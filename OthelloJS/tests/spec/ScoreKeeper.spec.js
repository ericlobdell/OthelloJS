/// <reference path="../lib/jasmine/jasmine.js" />
/// <reference path="D:\repos\JS\OthelloJS\OthelloJS\src/js/models/Move.js" />
/// <reference path="ScoreKeeper.spec.js" />
/// <reference path="BoardManager.spec.js" />

let _ = null;

describe( "ScoreKeeper", () => {

    describe( "getScoreForPlayer", () => {
        it( "should return the number of cells of the game board occupied by the player", () => {
            let gb = {
                rows: [
                    [{ player: 1 }, { player: 1 }, { player: 0 }],
                    [{ player: 1 }, { player: 1 }, { player: 0 }],
                    [{ player: 1 }, { player: 0 }, { player: 0 }]
                ]
            };

            let sut = ScoreKeeper.getScoreForPlayer( 1, gb );
            expect( sut ).toBe( 5 );
        } );
    } );


    describe( "doDirectionalSearch", () => {
        it( "should return an empty array if passed an invalid cell location", () => {
            var sut = ScoreKeeper.doDirectionalSearch( 0, 0, 0, 0, 1, {
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
            let d = ScoreKeeper.getHitDistance( move, hitRow, hitCol );

            expect( d ).toBe(3);

            let hitRow2 = 1;
            let hitCol2 = 5;
            let d2 = ScoreKeeper.getHitDistance( move, hitRow2, hitCol2 );

            expect(d2).toBe(4);

            let hitRow3 = 3;
            let hitCol3 = 1;
            let d3 = ScoreKeeper.getHitDistance( move, hitRow3, hitCol3 );

            expect(d3).toBe(2);



        });

    });

    describe( "getMoveCaptures", () => {
        it( "should search in all 8 directions for possible points", () => {
            let gb = BoardManager.getInitialGameBoard();

            spyOn( ScoreKeeper, "doDirectionalSearch" );

            ScoreKeeper.getMoveCaptures( 3, 3, 1, gb );
            let calls = ScoreKeeper.doDirectionalSearch.calls;

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
            let gb = BoardManager.getInitialGameBoard();
            let hits = ScoreKeeper.getMoveCaptures( 5, 3, 1, gb );
            expect(hits.length).toBe(1);

        } );

    } );

    describe("getNextMovesForPlayer", () => {
        it("should return an array of cells that the next player can use as a next move", () => {
            let gb = BoardManager.getInitialGameBoard();

            let sut = ScoreKeeper.getNextMovesForPlayer( 1, gb );

            expect( sut.length ).toBe( 4 );
        } );

        it( "should mark all cells as isTarget", () => {
            let gb = BoardManager.getInitialGameBoard();

            let nextMoves = ScoreKeeper.getNextMovesForPlayer( 1, gb );

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

            let sut = ScoreKeeper.getLeader( p1, p2 );
            expect( sut ).toBe( 1 );
        } );

        it( "should return zero if scores are equal", () => {
            let p1 = new Player( 1 );
            let p2 = new Player( 2 );

            p1.score = 10;
            p2.score = 10;

            let sut = ScoreKeeper.getLeader( p1, p2 );
            expect( sut ).toBe( 0 );
        } );

    } );

    describe( "recordMove", () => {
        
    } );
} );


