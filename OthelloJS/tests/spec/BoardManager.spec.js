
describe( "BoardManager", function () {
    var _sk, _bm;

    beforeEach( () => {
        _bm = new BoardManager();
        _sk = new ScoreKeeper( _bm );
    } );

    describe( "getFlatGameboard", () => {
        it( "should return a matrix as a flat one dimensional array", function () {
            let gb = {
                rows: [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9]
                ]
            };
            let expected = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            expect( _bm.getFlatGameBoard( gb ) ).toEqual( expected );
        } );
    } );

    describe( "getEmptyCells", () => {
        it( "should return only the cells of the game board that are unoccupied", function () {
            let expected = [{ player: 0 }, { player: 0 }, { player: 0 }, { player: 0 }];
            let gb = {
                rows: [
                    [{ player: 1 }, { player: 1 }, { player: 0 }],
                    [{ player: 1 }, { player: 1 }, { player: 0 }],
                    [{ player: 1 }, { player: 0 }, { player: 0 }]
                ]
            };
            let sut = _bm.getEmptyCells( gb );

            expect( sut.length ).toBe( 4 );
            expect( sut ).toEqual( expected );
        } );
    } );

    describe( "getInitialGameboard", () => {
        it( "should return a gameboard with the initial center squares occupied", () => {
            let gb = _bm.getInitialGameboard();

            expect( gb.rows[3][3].player ).toBe( 1 );
            expect( gb.rows[4][4].player ).toBe( 1 );
            expect( gb.rows[3][4].player ).toBe( 2 );
            expect( gb.rows[4][3].player ).toBe( 2 );
        } )
    } );

    describe( "getiInitialPlayer", () => {
        it( "should return the correct player number for initial positions on gameboard", () => {
            expect( _bm.getiInitialPlayer( 3, 3 ) ).toBe( 1 );
            expect( _bm.getiInitialPlayer( 4, 4 ) ).toBe( 1 );
            expect( _bm.getiInitialPlayer( 3, 4 ) ).toBe( 2 );
            expect( _bm.getiInitialPlayer( 4, 3 ) ).toBe( 2 );
        } )
    } );

    describe( "cellIsTarget", () => {
        it( "should return true for initial potential moves for player one", () => {
            expect( _bm.cellIsInitialTarget( 2, 4 ) ).toBe( true );
            expect( _bm.cellIsInitialTarget( 4, 2 ) ).toBe( true );
            expect( _bm.cellIsInitialTarget( 3, 5 ) ).toBe( true );
            expect( _bm.cellIsInitialTarget( 5, 3 ) ).toBe( true );
        } );
    } );

    describe( "resetTargetCells", () => {
        it( "should set isTarget property of all cells to false", () => {
            let gb = _bm.getInitialGameboard();

            expect( _bm.getFlatGameBoard( gb )
                .some( c => c.isTarget ) )
                .toBe( true );

            _bm.resetTargetCells( gb );

            expect( _bm.getFlatGameBoard( gb )
                .some( c => c.isTarget ) )
                .toBe( false );

        } );
    } );

    describe( "getPlayerCells", () => {
        it( "should return an array of cells belonging to the player", () => {
            let gb = _bm.getInitialGameboard();
            let player2Cells = _bm.getPlayerCells( 2, gb );

            expect( player2Cells.length ).toBe( 2 );
            player2Cells.forEach( c => {
                expect( c.player ).toBe( 2 );
            } );

        } );
    } );

    describe( "getAdjacentCells", () => {
        it( "should return every cell surrounding the position on the gameboard", () => {
            let gb = _bm.getInitialGameboard();

            let position1 = gb.rows[4][3];
            let sut1 = _bm.getAdjacentCells( position1, gb );

            expect( sut1.length ).toBe( 8 );

            let position2 = gb.rows[0][0];
            let sut2 = _bm.getAdjacentCells( position2, gb );

            expect( sut2.length ).toBe( 3 );
        } )
    } );

    describe( "getOpenAdjacentCells", () => {
        it( "should return te cells adjacent to the passed cell on the gameboard", () => {
            let gb = _bm.getInitialGameboard();

            let position1 = gb.rows[4][3];
            let sut1 = _bm.getOpenAdjacentCells( position1, gb );

            expect( sut1.length ).toBe( 5 );

            let position2 = gb.rows[0][0];
            let sut2 = _bm.getOpenAdjacentCells( position2, gb );

            expect( sut2.length ).toBe( 3 );

        } );
    } );



} );