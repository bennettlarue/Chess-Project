import Board from "./Board";

const Game = () => {
  return (
    <div className="game">
      <div className="game-board" style={{border: '5px ridge black', overflow: 'auto', display: 'inline-block'}}>
        <Board />
      </div>
      <div id="game-info">
        <div id="game-info-title">Moves</div>
        <div id="game-info-text"></div>
      </div>
    </div>
  );
};

export default Game;
