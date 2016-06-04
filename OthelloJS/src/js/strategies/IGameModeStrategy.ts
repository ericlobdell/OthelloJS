import Move from '../models/Move';

interface IGameModeStrategy {
    startGame: Function;
    handleOnMove: HandleOnMoveFunc;
}

interface HandleOnMoveFunc {
    ( move: Move ): IMoveResult;
}

interface IMoveResult {
    CurrentPlayer: number;
}