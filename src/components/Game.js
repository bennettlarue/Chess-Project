import Board from "./Board";

const Game = () => {
  return (
    <div className="game">
      <div className="game-board" style={{border: '15px groove grey', overflow: 'auto', display: 'inline-block'}}>
        <Board />
      </div>
      <div id="game-info">
        <div>hello world</div>
        <div>{/* TODO */}</div>
      </div>
    </div>
  );
};

export default Game;
