import Board from "./Board";

const Game = () => {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <div>{/* TODO */}</div>
      </div>
    </div>
  );
};

export default Game;
